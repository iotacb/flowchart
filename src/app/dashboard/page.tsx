"use client";
import { useGetUserFlowCharts, UserChart } from "@/hooks/useFlowCharts";
import { useIsPremium } from "@/hooks/usePricing";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi2";
import { toast, ToastContainer } from "react-toastify";
import { uuid } from "uuidv4";

export default function Home() {
	const [charts, setCharts] = useState<UserChart[]>([]);
	const session = useSession();
	const supabase = useSupabaseClient();
	const userCharts = useGetUserFlowCharts();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!userCharts) return;
		setCharts(userCharts);
	}, [userCharts]);

	useEffect(() => {
		if (!searchParams) return;
		if (searchParams.has("error")) {
			toast.error("Chart not found");
		}
	}, [searchParams]);

	const createNewChart = async () => {
		if (!session) return;
		const { data, error } = await supabase
			.from("charts")
			.insert([
				{
					chart_name: "New Chart",
					user_id: session.user.id,
					public_id: uuid(),
					nodes: [
						{
							id: "start_node",
							type: "start-node",
							position: {
								x: 0,
								y: 0,
							},
							data: {
								label: "Start Here",
							},
						},
					],
				},
			])
			.select();
		if (error) {
			console.error(error);
			return;
		}
		if (!data) return;
		const newChart = data[0];
		setCharts(charts.concat(newChart));
	};

	const deleteChart = async (chart: UserChart) => {
		if (!session) return;
		const { error } = await supabase
			.from("charts")
			.delete()
			.match({ id: chart.id });
		if (error) {
			console.error(error);
			return;
		}
		setCharts(charts.filter((c) => c.id !== chart.id));
	};

	const isPremium = useIsPremium();

	return (
		<main className="bg-gray-900 w-svw min-h-svh grid place-content-center">
			<ToastContainer position="bottom-center" />
			{!session && (
				<a
					onClick={() => {
						supabase.auth.signInWithOAuth({ provider: "google" });
					}}
					className="px-4 py-2 text-black bg-white cursor-pointer hover:bg-slate-100 border-4 rounded-lg border-gray-300 shadow-sm"
				>
					Login
				</a>
			)}
			{session && (
				<div>
					<div className="flex flex-col gap-4">
						<h1 className="text-white text-2xl">
							Welcome {session.user.email} {isPremium && "Premium"}
						</h1>
						<button
							onClick={() => {
								supabase.auth.signOut();
							}}
							className="px-4 py-2 text-black bg-white cursor-pointer hover:bg-slate-100 border-4 rounded-lg border-gray-300 shadow-sm"
						>
							Logout
						</button>
						<a
							onClick={() => createNewChart()}
							className="px-4 py-2 text-black bg-white cursor-pointer hover:bg-slate-100 border-4 rounded-lg border-gray-300 shadow-sm"
						>
							Create new chart
						</a>
					</div>
					<Flowcharts
						charts={charts}
						onDeleteChart={(chart) => deleteChart(chart)}
					/>
				</div>
			)}
		</main>
	);
}

function Flowcharts({
	charts,
	onDeleteChart,
}: {
	charts: UserChart[];
	onDeleteChart: (chart: UserChart) => void;
}) {
	const router = useRouter();
	return (
		<div className="flex flex-col gap-2">
			{charts.map((chart, index) => (
				<div
					key={index}
					className="flex justify-between items-center gap-10 border border-zinc-700 rounded-md text-white px-4 py-2 bg-zinc-800"
				>
					<h1 onClick={() => router.push(`/chart?id=${chart.id}`)}>
						{chart.chart_name}
					</h1>
					<HiTrash
						onClick={() => onDeleteChart(chart)}
						className="text-2xl cursor-pointer hover:opacity-80 hover:text-red-400"
					/>
				</div>
			))}
		</div>
	);
}
