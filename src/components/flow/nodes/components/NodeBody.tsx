import { cn } from "@chrisbrandt/vallium";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeTitle from "./NodeTitle";

type Props = {
	id: string | number;
	children: React.ReactNode;
	className?: string;
	noClick?: boolean;
};

export default function NodeBody({ id, children, className, noClick }: Props) {
	return (
		<>
			<Handle
				style={{
					width: "8px",
					height: "8px",
					zIndex: 1,
					pointerEvents: noClick ? "none" : "auto",
				}}
				type="target"
				id={`${id}_src_left`}
				position={Position.Left}
			/>
			<div
				className={cn(
					"bg-zinc-700/10 border backdrop-blur-[2px] border-zinc-700 rounded-full shadow-lg px-4 py-2 text-white hover:border-sky-400",
					className,
					noClick && "pointer-events-none"
				)}
			>
				{children}
			</div>
			<Handle
				style={{
					width: "8px",
					height: "8px",
					zIndex: 1,
					pointerEvents: noClick ? "none" : "auto",
				}}
				type="source"
				id={`${id}_src_right`}
				position={Position.Right}
			/>
		</>
	);
}
