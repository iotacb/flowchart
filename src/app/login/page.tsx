"use client";
import { ProviderLoginButton } from "@/components/auth/AuthStateComponents";
import Navbar from "@/components/Navbar";
import React from "react";
import { loginProviders } from "../../../shared.values";

export default function Home() {
	return (
		<div className="w-full min-h-dvh grid grid-rows-[auto_1fr_auto] gap-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,var(--flowchart-accent-translucent),rgb(24_24_27)_100%)]">
			<Navbar />
			<div className="max-w-lg w-full mx-auto h-full flex justify-center items-center">
				<div className="absolute top-0 left-0 w-screen h-screen bg-grid -z-10"></div>
				<div className="bg-zinc-800 rounded-lg border border-zinc-700 p-4 w-full">
					<div className="text-center">
						<h1 className="text-4xl">Welcome</h1>
						<p className="text-zinc-400">
							Please enter your details to sign in
						</p>
					</div>
					<div className="mt-5 flex gap-4 w-full justify-center">
						{loginProviders.map((provider) => (
							<ProviderLoginButton
								key={provider.provider}
								title={provider.title}
								icon={provider.icon}
								provider={provider.provider}
							/>
						))}
					</div>
					<div className="mt-5 w-full flex justify-between items-center text-center gap-4">
						<span className="bg-zinc-700 h-[1px] w-full"></span>
						<p>OR</p>
						<span className="bg-zinc-700 h-[1px] w-full"></span>
					</div>
					<div className="flex flex-col gap-4">
						<div>
							<label htmlFor="email">E-Mail Address</label>
							<input
								id="email"
								type="email"
								placeholder="Enter your email..."
								className="w-full mt-2 p-2 border border-zinc-700 rounded-md bg-transparent accent-flowchart-accent"
							/>
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input
								id="password"
								type="password"
								placeholder="Enter your password..."
								className="w-full mt-2 p-2 border border-zinc-700 rounded-md bg-transparent"
							/>
						</div>
						<button className="bg-flowchart-accent w-full hover:bg-flowchart-accent-bright duration-150 rounded-full px-6 py-3 border-t border-t-flowchart-accent-bright border-l border-l-flowchart-accent-bright">
							Sign up
						</button>
						<p className="text-center text-zinc-400">
							Forgot password?{" "}
							<a className="text-flowchart-accent-bright cursor-pointer underline font-semibold">
								Click here
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
