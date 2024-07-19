"use client";
import React, { useState } from "react";

type Props = {
	title: string;
	setTitle: (title: string) => void;
	onTitleSubmit: () => void;
};

export default function Title({ title, setTitle, onTitleSubmit }: Props) {
	return (
		<input
			className="fixed w-1/2 top-5 left-1/2 -translate-x-1/2 font-bold text-2xl text-center z-10 text-white bg-transparent"
			value={title}
			onChange={(event) => setTitle(event.target.value)}
			onKeyDown={(event) => {
				if (event.key === "Enter") {
					event.currentTarget.blur();
				}
			}}
			onBlur={onTitleSubmit}
		></input>
	);
}
