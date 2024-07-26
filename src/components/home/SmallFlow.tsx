"use client";
import {
	Node,
	Edge,
	ReactFlow,
	useStore,
	ReactFlowState,
	useReactFlow,
	Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useEffect, useState } from "react";
import { nodeTypes } from "../flow/nodes/Nodes";

type Props = {};
const viewportSizeSelector = (state: ReactFlowState) => {
	return {
		width: state.width,
		height: state.height,
	};
};
export default function SmallFlow({}: Props) {
	const [nodes] = useState<Node[]>([
		{
			id: "start_node",
			type: "start-node",
			position: {
				x: -100,
				y: -140,
			},
			data: {
				label: "This",
				noClick: true,
			},
		},
		{
			id: "b3c806ac-1bef-4620-b188-5102b4bd7c40",
			type: "base-node",
			position: {
				x: 0,
				y: -150,
			},
			data: {
				label: "is",
				noClick: true,
			},
		},
		{
			id: "2871a95e-04d9-4c08-9300-c3cdb53f265f",
			type: "check-node",
			position: {
				x: 100,
				y: 0,
			},
			data: {
				label: "Cool?",
				state: true,
				noClick: true,
			},
		},
		{
			id: "9746db25-2601-483e-97ce-e8466ca79cbb",
			type: "base-node",
			position: {
				x: 150,
				y: -110,
			},
			data: {
				label: "Chart",
				noClick: true,
			},
		},
		{
			id: "447d48e4-586c-444c-bc62-20d9a66e3530",
			type: "base-node",
			position: {
				x: -30,
				y: -80,
			},
			data: {
				label: "Flow",
				noClick: true,
			},
		},
	]);
	const [edges] = useState<Edge[]>([
		{
			source: "start_node",
			sourceHandle: "start_node_src_right",
			target: "b3c806ac-1bef-4620-b188-5102b4bd7c40",
			targetHandle: "b3c806ac-1bef-4620-b188-5102b4bd7c40_src_left",
			id: "xy-edge__start_nodestart_node_src_right-b3c806ac-1bef-4620-b188-5102b4bd7c40b3c806ac-1bef-4620-b188-5102b4bd7c40_src_left",
			selected: false,
		},
		{
			source: "b3c806ac-1bef-4620-b188-5102b4bd7c40",
			sourceHandle: "b3c806ac-1bef-4620-b188-5102b4bd7c40_src_right",
			target: "9746db25-2601-483e-97ce-e8466ca79cbb",
			targetHandle: "9746db25-2601-483e-97ce-e8466ca79cbb_src_left",
			id: "xy-edge__b3c806ac-1bef-4620-b188-5102b4bd7c40b3c806ac-1bef-4620-b188-5102b4bd7c40_src_right-9746db25-2601-483e-97ce-e8466ca79cbb9746db25-2601-483e-97ce-e8466ca79cbb_src_left",
		},
		{
			source: "2871a95e-04d9-4c08-9300-c3cdb53f265f",
			sourceHandle: "2871a95e-04d9-4c08-9300-c3cdb53f265f_src_right",
			target: "9746db25-2601-483e-97ce-e8466ca79cbb",
			targetHandle: "9746db25-2601-483e-97ce-e8466ca79cbb_src_left",
			id: "xy-edge__2871a95e-04d9-4c08-9300-c3cdb53f265f2871a95e-04d9-4c08-9300-c3cdb53f265f_src_right-9746db25-2601-483e-97ce-e8466ca79cbb9746db25-2601-483e-97ce-e8466ca79cbb_src_left",
			animated: true,
			style: {
				strokeWidth: 2,
				stroke: "var(--flowchart-accent)",
			},
		},
		{
			source: "start_node",
			sourceHandle: "start_node_src_right",
			target: "447d48e4-586c-444c-bc62-20d9a66e3530",
			targetHandle: "447d48e4-586c-444c-bc62-20d9a66e3530_src_left",
			id: "xy-edge__start_nodestart_node_src_right-447d48e4-586c-444c-bc62-20d9a66e3530447d48e4-586c-444c-bc62-20d9a66e3530_src_left",
		},
		{
			source: "447d48e4-586c-444c-bc62-20d9a66e3530",
			sourceHandle: "447d48e4-586c-444c-bc62-20d9a66e3530_src_right",
			target: "9746db25-2601-483e-97ce-e8466ca79cbb",
			targetHandle: "9746db25-2601-483e-97ce-e8466ca79cbb_src_left",
			id: "xy-edge__447d48e4-586c-444c-bc62-20d9a66e3530447d48e4-586c-444c-bc62-20d9a66e3530_src_right-9746db25-2601-483e-97ce-e8466ca79cbb9746db25-2601-483e-97ce-e8466ca79cbb_src_left",
		},
		{
			source: "447d48e4-586c-444c-bc62-20d9a66e3530",
			sourceHandle: "447d48e4-586c-444c-bc62-20d9a66e3530_src_right",
			target: "2871a95e-04d9-4c08-9300-c3cdb53f265f",
			targetHandle: "2871a95e-04d9-4c08-9300-c3cdb53f265f_src_left",
			id: "xy-edge__447d48e4-586c-444c-bc62-20d9a66e3530447d48e4-586c-444c-bc62-20d9a66e3530_src_right-2871a95e-04d9-4c08-9300-c3cdb53f265f2871a95e-04d9-4c08-9300-c3cdb53f265f_src_left",
		},
	]);
	const { fitView } = useReactFlow();

	const viewportSize = useStore(viewportSizeSelector);

	useEffect(() => {
		fitView({ duration: 0 });
	}, [viewportSize.width]);

	return (
		<ReactFlow
			className="pointer-events-none"
			nodes={nodes}
			edges={edges}
			panOnScroll={false}
			panOnDrag={false}
			zoomOnScroll={false}
			zoomOnDoubleClick={false}
			zoomOnPinch={false}
			nodesFocusable={false}
			nodeTypes={nodeTypes}
			fitView
			proOptions={{ hideAttribution: true }}
		></ReactFlow>
	);
}
