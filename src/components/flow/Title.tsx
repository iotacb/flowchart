"use client";
import React from "react";

type Props = {
	title: string;
	isOwner: boolean;
	chartPublic: boolean;
	chartPublicLink: string;
	setTitle: (title: string) => void;
	setChartPublic: (publicState: boolean) => void;
	onTitleSubmit: () => void;
};

export default function Title({
	isOwner,
	title,
	setTitle,
	onTitleSubmit,
	chartPublic,
	chartPublicLink,
	setChartPublic,
}: Props) {
	return (
		<div className="bg-gradient-to-b from-zinc-900 to-transparent z-10 fixed w-full grid p-4 place-content-center">
			<input
				id="chart_name"
				type="text"
				readOnly={!isOwner}
				className="font-bold text-2xl text-center z-10 text-white bg-transparent"
				value={title}
				onChange={(event) => {
					if (!isOwner) return;
					setTitle(event.target.value);
				}}
				onKeyDown={(event) => {
					if (!isOwner) return;
					if (event.key === "Enter") {
						event.currentTarget.blur();
					}
				}}
				onBlur={onTitleSubmit}
			></input>
			{isOwner && (
				<div className="flex items-center justify-center gap-4">
					<div className="flex items-center gap-4">
						<label htmlFor="chart_public">Public</label>
						<input
							id="chart_public"
							type="checkbox"
							className="w-4 h-4 accent-flowchart-accent"
							checked={chartPublic}
							onChange={(event) => setChartPublic(event.target.checked)}
						></input>
					</div>
					{chartPublic && (
						<button
							onClick={() => {
								navigator.clipboard.writeText(chartPublicLink);
							}}
							className="text-center px-4 py-2 rounded-full bg-flowchart-accent-translucent border border-flowchart-accent bg-dotted"
						>
							Get link
						</button>
					)}
				</div>
			)}
		</div>
	);
}
