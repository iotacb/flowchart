import React, { useEffect, useRef, useState } from "react";
import { useFlow } from "@/hooks/useFlow";

type Props = {
	data: any;
	id: string | number;
};

export default function NodeTitle({ data, id }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [editing, setEditing] = useState(false);
	const [label, setLabel] = useState(data.label);

	const { onSomethingChanged } = useFlow();

	function onLabelChange(event: React.ChangeEvent<HTMLInputElement>) {
		setLabel(event.target.value);
	}

	function onEditComplete(reset: boolean = false) {
		if (reset || label.trim().length === 0) {
			setLabel(data.label);
		} else {
			data.label = label.trim();
			onSomethingChanged(id);
		}
		setEditing(false);
	}

	useEffect(() => {
		if (editing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editing]);

	return (
		<>
			{editing ? (
				<input
					ref={inputRef}
					type="text"
					className="bg-transparent text-white read-only:outline-none"
					value={label}
					onChange={onLabelChange}
					onBlur={() => onEditComplete()}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							onEditComplete();
						}
						if (event.key === "Escape") {
							onEditComplete(true);
						}
					}}
				/>
			) : (
				<p onDoubleClick={() => setEditing(true)}>{data.label}</p>
			)}
		</>
	);
}
