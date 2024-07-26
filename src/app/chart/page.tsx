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

type Props = {};

export default function Page({}: Props) {
	const [somethingChanged, setSomethingChanged] = useState(false);
	const [loading, setLoading] = useState(true);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [chartName, setChartName] = useState<string>("New Chart");
	const [chartPublic, setChartPublic] = useState<boolean>(false);
	const [chartPublicId, setChartPublicId] = useState<string | null>(null);
	const [chartId, setChartId] = useState<string | null>(null);
	const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>();
	const [isOwner, setIsOwner] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const supabase = useSupabaseClient();
	const session = useSession();
	const router = useRouter();

	const { screenToFlowPosition } = useReactFlow();

	const updateChartInfo = async () => {
		if (!searchParams) return;
		if (searchParams.has("id")) {
			setChartId(searchParams.get("id"));
		}
		if (searchParams.has("is_public")) {
			setChartPublic(searchParams.get("is_public") === "true");
		}
		if (searchParams.has("public_id")) {
			setChartPublicId(searchParams.get("public_id"));
		}
	};

	const fetchChartData = async () => {
		const { data, error } = await supabase
			.from("charts")
			.select("*")
			.eq("id", chartId)
			.eq("user_id", session?.user.id);
		if (error || !data || data.length === 0) {
			router.push("/dashboard?error=chart_not_found");
			return;
		}

		const chart = data[0];

		if (chart.nodes !== null) {
			setNodes(chart.nodes);
		}
		if (chart.edges !== null) {
			chart.edges.forEach((edge: Edge) => {
				const edgeData = edge.data;
				if (edgeData) {
					edge.animated = edgeData.animated as boolean;
				}
			});
			setEdges(chart.edges);
		}

		if (chart.chart_name !== null) {
			setChartName(chart.chart_name);
		}

		if (chart.is_public !== null) {
			setChartPublic(chart.is_public);
		}

		if (chart.public_id !== null) {
			setChartPublicId(chart.public_id);
		}
		if (chart.user_id !== null) {
			setIsOwner(chart.user_id === session?.user.id);
		}

		setLoading(false);
	};

	const fetchPublicChartData = async () => {
		const { data, error } = await supabase
			.from("charts")
			.select("*")
			.eq("public_id", chartPublicId)
			.eq("is_public", true);
		if (error || !data || data.length === 0) {
			router.push("/dashboard?error=chart_not_found");
			return;
		}

		const chart = data[0];

		if (chart.nodes !== null) {
			setNodes(chart.nodes);
		}
		if (chart.edges !== null) {
			chart.edges.forEach((edge: Edge) => {
				const edgeData = edge.data;
				if (edgeData) {
					edge.animated = edgeData.animated as boolean;
				}
			});
			setEdges(chart.edges);
		}

		if (chart.chart_name !== null) {
			setChartName(chart.chart_name);
		}
		if (chart.user_id !== null) {
			const isOwner = chart.user_id === session?.user.id;
			if (isOwner) {
				router.push("/chart?id=" + chart.id);
				setIsOwner(isOwner);
			}
		}
		setLoading(false);
	};

	const genPublicLink = () => {
		const dev = process.env.NODE_ENV === "development";
		return dev
			? `localhost:3000/chart?public_id=${chartPublicId}&is_public=true`
			: `https://flowchart.chrisbrandt.xyz/chart?public_id=${chartPublicId}&is_public=true`;
	};

	const saveChartData = async () => {
		if (!chartId) return;
		const { error } = await supabase
			.from("charts")
			.update({
				nodes: nodes,
				edges: edges,
				chart_name: chartName,
				is_public: chartPublic,
			})
			.match({ id: chartId });
		if (error) {
			console.error(error);
			return;
		}
	};

	useEffect(() => {
		updateChartInfo();
	}, [searchParams]);

	useEffect(() => {
		if (chartPublicId && chartPublic) {
			fetchPublicChartData();
			return;
		}
		if (chartId && session) {
			fetchChartData();
		}
	}, [chartId, session, chartPublicId, chartPublic]);

	useEffect(() => {
		if (somethingChanged) {
			saveChartData();
			setSomethingChanged(false);
		}
	}, [somethingChanged]);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => {
			setNodes((nds) => applyNodeChanges(changes, nds));
		},
		[setNodes]
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => {
			setEdges((eds) => applyEdgeChanges(changes, eds));
		},
		[setEdges]
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
				data: { label: `${type} node` },
			};
			setNodes((nds) => nds.concat(newNode));
			setSomethingChanged(true);
		},
		[screenToFlowPosition]
	);

	const onConnect: OnConnect = useCallback(
		(connection) => {
			setEdges((eds) => addEdge(connection, eds));
			setSomethingChanged(true);
		},
		[setEdges]
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
					className="group border border-zinc-600 hover:border-4 hover:border-zinc-400 grid-cols-1 grid-rows-1 w-20 h-20 hover:w-60 fixed grid items-center top-5 left-5 overflow-hidden font-bold text-2xl bg-zinc-800/50 duration-300 text-white hover:bg-zinc-100/20 p-6 rounded-full z-50 drop-shadow-lg backdrop-blur-lg"
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
					</>
				)}
			</main>
		</FlowContextProvider>
	);
}
