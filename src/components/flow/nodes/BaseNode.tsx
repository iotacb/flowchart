"use client";
import { useFlow } from "@/hooks/useFlow";
import { cn } from "@chrisbrandt/vallium";
import { Handle, Position } from "@xyflow/react";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	data: {
		label: string;
	};
	id: string;
};

export default function BaseNode({ data, id }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [editing, setEditing] = useState(false);
	const [label, setLabel] = useState(data.label);

	const { onSomethingChanged } = useFlow();

	function onLabelChange(event: React.ChangeEvent<HTMLInputElement>) {
		const text = event.target.value;
		setLabel(text);
		data.label = text;
		onSomethingChanged(id);
	}

	useEffect(() => {
		if (editing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editing]);

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
			<div
				className={cn(
					"bg-zinc-700/50 border backdrop-blur-sm border-zinc-700 rounded-full shadow-lg px-4 py-2 text-white hover:border-sky-400"
				)}
			>
				{editing ? (
					<input
						ref={inputRef}
						type="text"
						className="bg-transparent text-white read-only:outline-none"
						value={label}
						onChange={onLabelChange}
						onBlur={() => setEditing(false)}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								setEditing(false);
							}
						}}
					/>
				) : (
					<p
						onDoubleClick={() => {
							setEditing(true);
						}}
					>
						{label}
					</p>
				)}
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
