import SmallFlow from "@/components/home/SmallFlow";
import Navbar from "@/components/Navbar";
import { ReactFlowProvider } from "@xyflow/react";

export default function Home() {
	return (
		<div className="w-full min-h-dvh grid grid-rows-[auto_1fr_auto] gap-10">
			<Navbar />
			<main className="w-full px-8 md:px-20 flex flex-col items-center mt-20">
				{/* <section className="w-full max-w-7xl gap-10 grid grid-cols-4">
					<div className="col-start-1 col-span-3 row-start-1 flex flex-col gap-10">
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
					<div className="col-start-3 col-span-full row-start-1">
						<ReactFlowProvider>
							<SmallFlow />
						</ReactFlowProvider>
					</div>
				</section>
				<h1>Hello</h1> */}
				<section className="w-full text-center max-w-7xl gap-10 flex flex-col items-center">
					<h1 className="text-6xl lg:text-[5vw] lg:w-2/3 font-bold leading-none">
						Effortless projects with Flowcharts
					</h1>
					<p className="w-3/4 lg:w-2/3 text-2xl">
						Unleash creativity and streamline workflows with our flowchart
						creator's drag-and-drop and easy to use stuffff.
					</p>

					<div className="flex gap-4">
						<button className="duration-150 bg-white hover:bg-zinc-300 px-6 py-2 text-zinc-900 font-bold rounded-md">
							Get Started
						</button>
						<button className="duration-150 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-6 py-2 font-bold rounded-md">
							Get Started
						</button>
					</div>

					<div className="w-full aspect-video mt-20 lg:mt-0">
						<ReactFlowProvider>
							<SmallFlow />
						</ReactFlowProvider>
					</div>
				</section>
			</main>
			<footer>hi</footer>
		</div>
	);
}
