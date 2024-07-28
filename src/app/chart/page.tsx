"use client";
import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	Controls,
	Edge,
	Node,
	OnConnect,
	OnConnectEnd,
	OnConnectStart,
	OnEdgesChange,
	OnEdgesDelete,
	OnNodesChange,
	OnNodesDelete,
	ReactFlow,
	ReactFlowInstance,
	useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import NodeSidebar from "@/components/flow/NodeSidebar";
import { nodeTypes } from "@/components/flow/nodes/Nodes";
import { v4 as uuid } from "uuid";
import Loading from "@/components/Loading";
import Title from "@/components/flow/Title";
import { FlowContextProvider } from "@/context/FlowContext";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";
import { useUndoRedo } from "@/hooks/useFlowCharts";
import { cn } from "@chrisbrandt/vallium";

type Props = {};

export default function Page({}: Props) {
	const [somethingChanged, setSomethingChanged] = useState(false);
	const [loading, setLoading] = useState(true);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [chartName, setChartName] = useState<string>("New Chart");
	const [chartPublic, setChartPublic] = useState<boolean>(false);
	const [viewingPublicChart, setViewingPublicChart] = useState<boolean>(false);
	const [chartPublicId, setChartPublicId] = useState<string | null>(null);
	const [chartId, setChartId] = useState<string | null>(null);
	const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>();
	const [isOwner, setIsOwner] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const supabase = useSupabaseClient();
	const session = useSession();
	const router = useRouter();

	const { undo, redo, saveCurrentState, canUndo, canRedo } = useUndoRedo({
		nodes,
		edges,
		setNodes,
		setEdges,
	});

	const { screenToFlowPosition } = useReactFlow();

	const updateChartInfo = useCallback(() => {
		const id = searchParams.get("id");
		const publicId = searchParams.get("public_id");

		if (id) setChartId(id);
		if (publicId) {
			setViewingPublicChart(true);
			setChartPublicId(publicId);
		}
	}, [searchParams]);

	const fetchChartData = useCallback(async () => {
		if (!chartId || !session) return;

		const { data, error } = await supabase
			.from("charts")
			.select("*")
			.eq("id", chartId)
			.eq("user_id", session.user.id);

		if (error || !data?.length) {
			router.push("/dashboard?error=chart_not_found");
			return;
		}

		const chart = data[0];
		setNodes(chart.nodes || []);
		setEdges(
			chart.edges?.map((edge: { data: { animated: any } }) => ({
				...edge,
				animated: edge.data?.animated,
			})) || []
		);
		setChartName(chart.chart_name || "New Chart");
		setChartPublic(chart.is_public ?? false);
		setChartPublicId(chart.public_id || null);
		setIsOwner(chart.user_id === session.user.id);
		setLoading(false);
	}, [chartId, session, supabase, router]);

	const fetchPublicChartData = useCallback(async () => {
		if (!chartPublicId) return;

		const { data, error } = await supabase
			.from("charts")
			.select("*")
			.eq("public_id", chartPublicId)
			.eq("is_public", true);

		if (error || !data?.length) {
			router.push("/dashboard?error=chart_not_found");
			return;
		}

		const chart = data[0];
		setNodes(chart.nodes || []);
		setEdges(
			chart.edges?.map((edge: { data: { animated: any } }) => ({
				...edge,
				animated: edge.data?.animated,
			})) || []
		);
		setChartName(chart.chart_name || "New Chart");

		if (chart.user_id === session?.user.id) {
			router.push(`/chart?id=${chart.id}`);
			setIsOwner(true);
		}

		setLoading(false);
	}, [chartPublicId, session, supabase, router]);

	const genPublicLink = () => {
		const baseUrl =
			process.env.NODE_ENV === "development"
				? "localhost:3000"
				: "flowchart.chrisbrandt.xyz";
		return `${baseUrl}/chart?public_id=${chartPublicId}`;
	};

	const saveChartData = useCallback(async () => {
		if (!chartId || !somethingChanged) return;

		const { error } = await supabase
			.from("charts")
			.update({ nodes, edges, chart_name: chartName, is_public: chartPublic })
			.match({ id: chartId });

		if (error) {
			console.error(error);
		} else {
			setSomethingChanged(false);
		}
	}, [
		chartId,
		nodes,
		edges,
		chartName,
		chartPublic,
		somethingChanged,
		supabase,
	]);

	useEffect(() => {
		updateChartInfo();
	}, [updateChartInfo]);

	useEffect(() => {
		if (viewingPublicChart) {
			fetchPublicChartData();
		} else if (chartId && session) {
			fetchChartData();
		}
	}, [chartId, session, chartPublicId, fetchChartData, fetchPublicChartData]);

	useEffect(() => {
		saveChartData();
	}, [saveChartData]);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => {
			const newNodes = applyNodeChanges(changes, nodes);
			setNodes(newNodes);
			setSomethingChanged(true);
		},
		[nodes, edges, saveCurrentState]
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => {
			const newEdges = applyEdgeChanges(changes, edges);
			setEdges(newEdges);
			setSomethingChanged(true);
		},
		[nodes, edges, saveCurrentState]
	);

	const onNodesDelete: OnNodesDelete = useCallback((nodeIds) => {
		setSomethingChanged(true);
	}, []);

	const onEdgesDelete: OnEdgesDelete = useCallback((edgesIds) => {
		setSomethingChanged(true);
	}, []);

	const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			const type = event.dataTransfer.getData("application/reactflow");

			if (typeof type === "undefined" || !type) {
				return;
			}

			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			const newNode = {
				id: uuid(),
				type,
				position,
				data: { label: `Node` },
			};
			const newNodes = nodes.concat(newNode);
			setNodes(newNodes);
			saveCurrentState({ nodes: newNodes, edges });
			setSomethingChanged(true);
		},
		[screenToFlowPosition, nodes, edges, saveCurrentState]
	);

	const onConnect: OnConnect = useCallback(
		(connection) => {
			const newEdges = addEdge(connection, edges);
			setEdges(newEdges);
			saveCurrentState({ nodes, edges: newEdges });
			setSomethingChanged(true);
		},
		[nodes, edges, saveCurrentState]
	);

	return (
		<FlowContextProvider
			value={{
				onSomethingChanged: () => setSomethingChanged(true),
				flowInstance: flowInstance,
			}}
		>
			<main className="flex flex-col w-screen h-screen absolute">
				<Loading visible={loading} />

				<Link
					href="/dashboard"
					className="group border border-zinc-600 hover:border-zinc-400 grid-cols-1 grid-rows-1 w-20 h-20 hover:w-60 fixed grid items-center top-5 left-5 overflow-hidden font-bold text-2xl bg-zinc-800/50 duration-300 text-white hover:bg-zinc-100/20 p-6 rounded-full z-50 drop-shadow-lg backdrop-blur-lg"
				>
					<HiArrowLeft className="ease-in-out row-start-1 col-start-1 text-4xl cursor-pointer duration-300 group-hover:-translate-x-[200%]" />
					<p className="ease-in-out row-start-1 col-start-1 text-nowrap duration-300 pointer-events-none translate-x-[200%] group-hover:translate-x-0">
						Go to dashboard
					</p>
				</Link>

				<Title
					title={chartName}
					isOwner={isOwner}
					chartPublic={chartPublic}
					chartPublicLink={genPublicLink()}
					setTitle={setChartName}
					setChartPublic={(publicState) => {
						setChartPublic(publicState);
						setSomethingChanged(true);
					}}
					onTitleSubmit={() => setSomethingChanged(true)}
				/>
				{!isOwner && (
					<>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							nodeTypes={nodeTypes}
							onInit={(instance) => {
								setFlowInstance(instance);
							}}
							fitView
							colorMode="dark"
							proOptions={{ hideAttribution: true }}
						>
							<Background />
							<Controls position="top-right" />
						</ReactFlow>
					</>
				)}
				{isOwner && (
					<>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							nodeTypes={nodeTypes}
							onInit={(instance) => {
								setFlowInstance(instance);
							}}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onNodesDelete={onNodesDelete}
							onEdgesDelete={onEdgesDelete}
							onConnect={onConnect}
							onDragOver={onDragOver}
							onDrop={onDrop}
							fitView
							colorMode="dark"
							proOptions={{ hideAttribution: true }}
						>
							<Background />
							<Controls position="top-right" />
						</ReactFlow>
						<NodeSidebar />
						<div className="fixed top-40 left-1/2 flex gap-4 z-50">
							<button
								className={cn(
									"bg-zinc-700 rounded-md p-4",
									canUndo && "bg-green-400"
								)}
								onClick={undo}
								disabled={!canUndo}
							>
								Undo
							</button>
							<button
								className={cn(
									"bg-zinc-700 rounded-md p-4",
									canRedo && "bg-green-400"
								)}
								onClick={redo}
								disabled={!canRedo}
							>
								Redo
							</button>
						</div>
					</>
				)}
			</main>
		</FlowContextProvider>
	);
}
