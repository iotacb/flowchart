import { useFlow } from "@/hooks/useFlow";
import { cn } from "@chrisbrandt/vallium";
import { Handle, NodeToolbar, Position, useReactFlow } from "@xyflow/react";
import React, { useState } from "react";
import { HiTrash } from "react-icons/hi";

type Props = {
	id: string;
	children: React.ReactNode;
	className?: string;
	noClick?: boolean;
};

export default function NodeBody({ id, children, className, noClick }: Props) {
	const [menuOpen, setMenuOpen] = useState(false);
	const { flowInstance } = useFlow();

	function deleteNode() {
		if (!flowInstance) return;
		const node = flowInstance.getNode(id);
		if (!node) return;
		flowInstance.deleteElements({
			nodes: [node],
		});
	}

	return (
		<>
			<NodeToolbar isVisible={menuOpen} position={Position.Top}>
				<div className="min-w-[200px] bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 flex flex-col rounded-md translate-y-full">
					<h1 className="border-b border-b-zinc-700 p-2">Node Menu</h1>
					<button
						onClick={() => deleteNode()}
						className="hover:bg-zinc-700 px-2 py-1 text-left border-t border-t-zinc-700 flex items-center gap-2"
					>
						Delete <HiTrash className="text-red-400" />
					</button>
					<button
						onClick={() => setMenuOpen(false)}
						className="hover:bg-zinc-700 px-2 py-1 text-left border-t border-t-zinc-700"
					>
						Exit
					</button>
				</div>
			</NodeToolbar>
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
					"bg-zinc-700/10 border backdrop-blur-[2px] border-zinc-700 rounded-full shadow-lg px-4 py-2 text-white hover:border-flowchart-accent",
					className,
					noClick && "pointer-events-none"
				)}
				onContextMenu={(event) => {
					event.preventDefault();
					event.stopPropagation();
					setMenuOpen(!menuOpen);
				}}
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
