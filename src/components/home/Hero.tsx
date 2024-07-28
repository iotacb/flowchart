import { ReactFlowProvider } from "@xyflow/react";
import React from "react";
import SmallFlow from "./SmallFlow";

type Props = {};

export default function Hero({}: Props) {
	return (
		<div className="container">
			<div className="absolute top-0 left-0 w-screen h-screen bg-grid -z-10"></div>
			<div>
				<p className="text-center px-4 py-2 w-fit mx-auto rounded-full bg-flowchart-accent-translucent border border-flowchart-accent bg-dotted">
					Version 1.0 just released!
				</p>
				<h1 className="mt-5 text-3xl md:text-5xl font-semibold text-center">
					Plan projects easily with flowcharts
				</h1>
				<h1 className="text-2xl md:text-4xl mt-5 font-light text-center text-zinc-400">
					Modern, intuitive, and easy to use
				</h1>
				<div className="mt-10 flex gap-4 w-full justify-center">
					<button className="bg-flowchart-accent hover:bg-flowchart-accent-bright duration-150 rounded-full px-6 py-3 border-t border-t-flowchart-accent-bright border-l border-l-flowchart-accent-bright">
						Try a demo
					</button>
					<button className="bg-zinc-800 hover:bg-zinc-700 duration-150 rounded-full px-6 py-3 border-t border-t-zinc-700 border-l border-l-zinc-700">
						Sign up
					</button>
				</div>
			</div>
			<div className="mt-6 h-[280px] md:h-[480px] relative">
				<div className="absolute inset-0 z-10"></div>
				<ReactFlowProvider>
					<SmallFlow />
				</ReactFlowProvider>
			</div>
		</div>
	);
}
