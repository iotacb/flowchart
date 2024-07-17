import { cn } from "@chrisbrandt/vallium";
import React from "react";
import { HiCog } from "react-icons/hi2";

type Props = {
	visible: boolean;
};

export default function Loading({ visible = true }: Props) {
	return (
		<div
			className={cn(
				"transition-opacity pointer-events-none bg-zinc-900 fixed top-0 left-0 w-screen h-screen z-50 grid place-content-center opacity-0",
				visible && "opacity-100 pointer-events-auto"
			)}
		>
			<HiCog className="text-6xl text-zinc-100 animate-spin" />
		</div>
	);
}
