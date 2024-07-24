"use client";
import React, { useState } from "react";

type Props = {
	title: string;
	setTitle: (title: string) => void;
	onTitleSubmit: () => void;
};

export default function Title({ title, setTitle, onTitleSubmit }: Props) {
	return (
		<div className="bg-gradient-to-b from-zinc-900 to-transparent z-10 fixed w-full grid p-4 place-content-center">
			<input
				className="font-bold text-2xl text-center z-10 text-white bg-transparent"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.currentTarget.blur();
					}
				}}
				onBlur={onTitleSubmit}
			></input>
		</div>
	);
}
