import { Handle, Position } from "@xyflow/react";
import React from "react";

type Props = {
	data: any;
	id: string;
};

export default function BaseNode({ data, id }: Props) {
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
			<div className="bg-zinc-700/50 border backdrop-blur-sm border-zinc-700 rounded-full shadow-lg px-4 py-2 text-white font-semibold hover:border-sky-400">
				{data.label}
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
