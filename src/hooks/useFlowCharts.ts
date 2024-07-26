import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Edge, Node } from "@xyflow/react";
import { useEffect, useState } from "react";

export type UserChart = {
	id: string | number;
	user_id: string | number;
	nodes: [];
	edges: [];
	chart_name: string;
};

export function useGetUserFlowCharts() {
	const [charts, setCharts] = useState<UserChart[]>([]);
	const session = useSession();
	const supabase = useSupabaseClient();

	const fetchCharts = async () => {
		if (!session?.user) {
			return;
		}

		const { data, error } = await supabase
			.from("charts")
			.select("*")
			.eq("user_id", session.user.id);

		if (error) {
			return;
		} else {
			setCharts(data);
		}
	};

	useEffect(() => {
		fetchCharts();
	}, [session]);
	return charts;
}

export function useGetFlowChart(id: any) {
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const supabase = useSupabaseClient();

	supabase
		.from("charts")
		.select("*")
		.eq("id", id)
		.then(({ data, error }) => {
			if (error) {
				return;
			} else {
				if (data.length === 0) {
					return;
				}
				const chart = data[0];
				setNodes(chart.nodes);
				setEdges(chart.edges);
			}
		});
	return { nodes, edges };
}
