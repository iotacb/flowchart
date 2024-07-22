"use client";
import { useFlow } from "@/hooks/useFlow";
import {
	Handle,
	Position,
	useHandleConnections,
	useNodesData,
	useReactFlow,
} from "@xyflow/react";
import { on } from "events";
import { animate } from "framer-motion";
import React, { useEffect, useState } from "react";

type Props = {
	data: {
		label: string;
		state: boolean;
	};
	id: string;
};

export default function CheckNode({ data, id }: Props) {
	const [checked, setChecked] = useState(data.state);
	const { onSomethingChanged, flowInstance } = useFlow();
	const { updateEdge } = useReactFlow();

	const connections = useHandleConnections({
		type: "source",
		id: `${id}_src_right`,
	});

	function onClickCheckbox(state: boolean) {
		setChecked(state);
	}

	function updateConnectedEdge() {
		if (!flowInstance) return;
		connections.forEach((connection) => {
			const edge = flowInstance.getEdge(connection.edgeId);
			if (!edge) return;
			updateEdge(edge.id, {
				animated: checked,
				style: {
					strokeWidth: checked ? 2 : 1,
					stroke: checked
						? "var(--flowchart-accent)"
						: "var(--xy-edge-stroke-default)",
				},
			});
		});
	}

	useEffect(() => {
		data.state = checked;
		updateConnectedEdge();
		onSomethingChanged();
	}, [checked]);

	useEffect(() => {
		updateConnectedEdge();
	}, [connections]);

	return (
		<>
			<Handle
				style={{
					width: "8px",
					height: "8px",
					zIndex: 1,
				}}
				type="target"
				id={`${id}_src_left`}
				position={Position.Left}
			/>
			<div className="flex justify-center gap-2 bg-zinc-700/50 border backdrop-blur-sm border-zinc-700 rounded-full shadow-lg px-4 py-2 text-white font-semibold hover:border-sky-400">
				<p>{data.label}</p>
				<input
					className="cursor-pointer nodrag"
					type="checkbox"
					checked={checked}
					onChange={(event) => onClickCheckbox(event.target.checked)}
				/>
			</div>
			<Handle
				style={{
					width: "8px",
					height: "8px",
					zIndex: 1,
				}}
				type="source"
				id={`${id}_src_right`}
				position={Position.Right}
			/>
		</>
	);
}
