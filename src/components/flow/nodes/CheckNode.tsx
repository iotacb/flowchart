import { Handle, Position } from "@xyflow/react";
import React, { useState } from "react";

type Props = {
	data: {
		label: string;
		state: boolean;
	};
	id: string;
};

export default function CheckNode({ data, id }: Props) {
	const [checked, setChecked] = useState(data.state);

	function onClickCheckbox(state: boolean) {
		setChecked(state);
		data.state = state;
	}

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
