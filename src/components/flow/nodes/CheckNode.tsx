"use client";
import { useFlow } from "@/hooks/useFlow";
import { useHandleConnections, useReactFlow } from "@xyflow/react";
import React, { useEffect, useState } from "react";
import NodeTitle from "./components/NodeTitle";
import NodeBody from "./components/NodeBody";

type Props = {
	data: {
		label: string;
		state: boolean;
		noClick?: boolean;
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

	function updateConnectedEdges() {
		if (!flowInstance) return;
		connections.forEach((connection) => {
			const edge = flowInstance.getEdge(connection.edgeId);
			if (!edge) return;
			updateEdge(edge.id, {
				animated: true,
				data: {
					animated: true,
				},
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
		updateConnectedEdges();
		onSomethingChanged();
	}, [checked]);

	useEffect(() => {
		updateConnectedEdges();
	}, [connections, flowInstance]);

	return (
		<NodeBody noClick={data.noClick} className="flex flex-row gap-2" id={id}>
			<NodeTitle data={data} id={id} />
			<input
				className="cursor-pointer nodrag accent-flowchart-accent"
				type="checkbox"
				checked={checked}
				onChange={(event) => onClickCheckbox(event.target.checked)}
			/>
		</NodeBody>
	);
}
