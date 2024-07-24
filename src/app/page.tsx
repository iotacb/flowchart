import SmallFlow from "@/components/home/SmallFlow";
import Navbar from "@/components/Navbar";
import { ReactFlowProvider } from "@xyflow/react";

export default function Home() {
	return (
		<main className="w-full min-h-dvh grid grid-rows-[auto_1fr_auto] gap-10">
			<Navbar />
			<div className="w-full px-20 flex justify-center mt-20">
				<section className="w-full max-w-7xl gap-10 grid grid-cols-6 grid-rows-8 h-screen bg-red-200">
					<div className="row-start-1 row-end-4 col-start-1 col-span-4 flex flex-col gap-10">
						<h1 className="text-[4vw] font-bold leading-none">
							Effortless projects with simple Flowcharts
						</h1>
						<p className="w-3/4 text-2xl">
							Unleash creativity and streamline workflows with our flowchart
							creator's drag-and-drop tools and real-time collaboration.
						</p>
						<div className="flex gap-4">
							<button className="duration-150 bg-white hover:bg-zinc-300 px-6 py-2 text-zinc-900 font-bold rounded-md">
								Get Started
							</button>
							<button className="duration-150 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-6 py-2 font-bold rounded-md">
								Get Started
							</button>
						</div>
					</div>
					<div className="row-start-1 row-span-6 col-start-3 col-span-full bg-white/10">
						<ReactFlowProvider>
							<SmallFlow />
						</ReactFlowProvider>
					</div>
				</section>
				<section className="w-full max-w-7xl gap-10 grid grid-cols-6 grid-rows-8 h-screen bg-red-200"></section>
			</div>
			<footer>hi</footer>
		</main>
	);
}
