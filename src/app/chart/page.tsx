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
	OnNodesChange,
	OnNodesDelete,
	ReactFlow,
	useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import NodeSidebar from "@/components/flow/NodeSidebar";
import { nodeTypes } from "@/components/flow/nodes/Nodes";
import { v4 as uuid } from "uuid";
import Loading from "@/components/Loading";

type Props = {};

export default function page({}: Props) {
	const [loading, setLoading] = useState(true);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [chartName, setChartName] = useState<string | null>(null);
	const [chartId, setChartId] = useState<string | null>(null);
	const searchParams = useSearchParams();
	const supabase = useSupabaseClient();

	const { screenToFlowPosition } = useReactFlow();

	const updateChartInfo = async () => {
		if (!searchParams) return;
		if (searchParams.has("chart_name")) {
			setChartName(searchParams.get("chart_name"));
		}
		if (searchParams.has("id")) {
			setChartId(searchParams.get("id"));
		}
	};

	const fetchChartData = async () => {
		const { data, error } = await supabase
			.from("charts")
			.select("*")
			.eq("id", chartId);
		if (error) return;
		if (data.length === 0) return;

		const chart = data[0];

		if (chart.nodes !== null) {
			setNodes(chart.nodes);
		}
		if (chart.edges !== null) {
			setEdges(chart.edges);
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
		if (chartId) {
			fetchChartData();
		}
	}, [chartId]);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[setNodes]
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges]
	);

	const onNodesDelete: OnNodesDelete = useCallback((nodeIds) => {
		saveChartData();
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
		},
		[screenToFlowPosition]
	);

	const onConnect: OnConnect = useCallback(
		(connection) => {
			setEdges((eds) => addEdge(connection, eds));
		},
		[setEdges]
	);

	return (
		<main className="flex flex-col w-screen h-screen absolute">
			<Loading visible={loading} />
			<h1
				contentEditable
				onInput={(event) => setChartName(event.currentTarget.textContent)}
				className="fixed top-5 left-1/2 -translate-x-1/2 font-bold text-2xl z-10 text-white"
			>
				{chartName}
			</h1>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onNodesDelete={(nodeIds) => {
					onNodesDelete(nodeIds);
					saveChartData();
				}}
				onConnect={(connection) => {
					onConnect(connection);
					saveChartData();
				}}
				onDragOver={onDragOver}
				onDrop={(event) => {
					onDrop(event);
					saveChartData();
				}}
				fitView
				colorMode="dark"
			>
				<Background />
				<Controls position="top-left" />
			</ReactFlow>
			<NodeSidebar />
		</main>
	);
}
