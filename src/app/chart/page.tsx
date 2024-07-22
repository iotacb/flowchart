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

type Props = {};

export default function page({}: Props) {
	const [somethingChanged, setSomethingChanged] = useState(false);
	const [loading, setLoading] = useState(true);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [chartName, setChartName] = useState<string>("New Chart");
	const [chartId, setChartId] = useState<string | null>(null);
	const [flowInstance, setFlowInstance] = useState<ReactFlowInstance>();
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

		setLoading(false);
	};

	const saveChartData = async () => {
		if (!chartId) return;
		const { error } = await supabase
			.from("charts")
			.update({
				nodes: nodes,
				edges: edges,
				chart_name: chartName,
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
		if (chartId && session) {
			fetchChartData();
		}
	}, [chartId, session]);

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
				{/* <h1
				contentEditable
				onInput={(event) => setChartName(event.currentTarget.textContent)}
				className="fixed top-5 left-1/2 -translate-x-1/2 font-bold text-2xl z-10 text-white"
			>
				{chartName}
			</h1> */}
				<Title
					title={chartName}
					setTitle={setChartName}
					onTitleSubmit={() => setSomethingChanged(true)}
				/>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onInit={(instance) => {
						setFlowInstance(instance);
						console.log("flow instance", instance);
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
				>
					<Background />
					<Controls position="top-left" />
				</ReactFlow>
				<NodeSidebar />
			</main>
		</FlowContextProvider>
	);
}
