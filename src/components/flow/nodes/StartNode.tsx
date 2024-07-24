import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeTitle from "./components/NodeTitle";
import { cn } from "@chrisbrandt/vallium";

type Props = {
	data: {
		label: string;
		noClick?: boolean;
	};
	id: string;
};

export default function StartNode({ data, id }: Props) {
	return (
		<>
			<div
				className={cn(
					"before:content-[''] before:absolute before:inset-0 before:border-2 before:rounded-full before:animate-ping-small before:-z-10 before:border-sky-500 relative bg-zinc-700/50 border backdrop-blur-sm border-zinc-700 rounded-full shadow-lg px-4 py-2 text-white font-semibold hover:border-sky-400",
					data.noClick && "pointer-events-none"
				)}
			>
				{/* {data.label} */}
				<NodeTitle data={data} id={id} />
			</div>
			<Handle
				style={{
					width: "8px",
					height: "8px",
					zIndex: 1,
					pointerEvents: data.noClick ? "none" : "auto",
				}}
				type="source"
				id={`${id}_src_right`}
				position={Position.Right}
			/>
		</>
	);
}
