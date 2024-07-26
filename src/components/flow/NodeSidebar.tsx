"use client";
import React, { useState } from "react";
import { nodeTypes } from "./nodes/Nodes";
import { cn } from "@chrisbrandt/vallium";
import { HiChevronUp } from "react-icons/hi2";
import { HiChevronDoubleUp } from "react-icons/hi";

type Props = {};

export default function NodeSidebar({}: Props) {
	const [open, setOpen] = useState(true);
	const onDragStart = (
		event: React.DragEvent<HTMLDivElement>,
		nodeType: string
	) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<section
			className={cn(
				"fixed -bottom-32 left-0 w-screen gap-5 p-10 flex justify-center items-center bg-zinc-900 border-t border-t-zinc-700 text-white duration-150",
				open && "bottom-0"
			)}
		>
			<button
				onClick={() => setOpen(!open)}
				className={cn(
					"bg-zinc-800 border border-zinc-700 flex justify-center items-center absolute left-1/2 -top-1/2 -translate-x-1/2 translate-y-1/2 w-32 h-10 rounded-md duration-150",
					open && "translate-y-full"
				)}
			>
				<div className={cn("rotate-0 duration-150", open && "rotate-180")}>
					<HiChevronDoubleUp />
				</div>
			</button>
			{Object.keys(nodeTypes)
				.filter((type) => type !== "start-node")
				.map((nodeType) => {
					/* @ts-ignore */
					return (
						<div
							key={nodeType}
							onDragStart={(event) => onDragStart(event, nodeType)}
							draggable
							className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer"
						>
							{nodeType}
						</div>
					);
				})}
		</section>
	);
}
