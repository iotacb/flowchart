import { ReactFlowProvider } from "@xyflow/react";
import React from "react";
import SmallFlow from "./SmallFlow";

type Props = {};

export default function Hero({}: Props) {
	return (
		<div className="container">
			<div>
				<h1 className="text-3xl md:text-5xl font-semibold text-center">
					Plan projects easily with flowcharts
				</h1>
				<h1 className="text-2xl md:text-4xl mt-5 font-light text-center text-white/50">
					Modern, intuitive, and easy to use
				</h1>
				<div className="mt-10 flex gap-4 w-full justify-center">
					<button className="bg-flowchart-accent rounded-full px-4 py-2 border-t border-t-flowchart-accent-bright border-l border-l-flowchart-accent-bright">
						Try a demo
					</button>
					<button className="bg-zinc-800 rounded-full px-4 py-2 border-t border-t-zinc-700 border-l border-l-zinc-700">
						Sign up
					</button>
				</div>
			</div>
			<div className="mt-6 h-[280px] md:h-[480px]">
				<ReactFlowProvider>
					<SmallFlow />
				</ReactFlowProvider>
			</div>
		</div>
	);
}
