import { useFlow } from "@/hooks/useFlow";
import React, { useEffect, useRef, useState } from "react";

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
		</>
	);
}
