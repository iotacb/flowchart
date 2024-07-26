import React from "react";

import image1 from "@/assets/1.png";
import Image from "next/image";

type Props = {};

export default function Features({}: Props) {
	return (
		<div className="container">
			<div>
				<h1 className="mt-5 text-3xl md:text-5xl font-semibold text-center">
					Plan projects easily with flowcharts
				</h1>
				<div className="mt-10 lg:mt-20 flex flex-col gap-10">
					<div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-10 justify-between items-center p-4 bg-zinc-900 rounded-md border border-zinc-800 lg:border-none lg:bg-transparent">
						<div className="lg:w-1/2">
							<h2 className="text-2xl md:text-4xl mt-5 font-light">
								Modern, intuitive, and easy to use
							</h2>
							<p className="text-white/50 mt-2">
								Flowchart provides a simple drag-and-drop interface for creating
								flowcharts. It&apos;s easy to use and intuitive, making it
								perfect for teams that need to collaborate on projects.
							</p>
						</div>
						<Image
							src={image1}
							alt="image1"
							className="lg:w-1/2 border-2 shadow-lg border-zinc-700 rounded-md"
						/>
					</div>
					<div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-10 justify-between items-center p-4 bg-zinc-900 rounded-md border border-zinc-800 lg:border-none lg:bg-transparent">
						<div className="lg:w-1/2">
							<h2 className="text-2xl md:text-4xl mt-5 font-light">
								Forever free
							</h2>
							<p className="text-white/50 mt-2">
								Flowchart will always be free to use. No ads, no subscriptions,
								no hidden costs. You can use it for free forever.
							</p>
						</div>
						<Image
							src={image1}
							alt="image1"
							className="lg:w-1/2 border-2 shadow-lg border-zinc-700 rounded-md"
						/>
					</div>
					<div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-10 justify-between items-center p-4 bg-zinc-900 rounded-md border border-zinc-800 lg:border-none lg:bg-transparent">
						<div className="lg:w-1/2">
							<h2 className="text-2xl md:text-4xl mt-5 font-light">
								Everywhere you go
							</h2>
							<p className="text-white/50 mt-2">
								Flowchart runs in your browser, so you can use it anywhere you
								go. Whether you&apos;re on your desktop, laptop, or mobile
								device, you can use it to create flowcharts and collaborate with
								your team.
							</p>
						</div>
						<Image
							src={image1}
							alt="image1"
							className="lg:w-1/2 border-2 shadow-lg border-zinc-700 rounded-md"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
