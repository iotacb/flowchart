import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Edge, Node, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";

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

type FlowState = {
	nodes: Node[];
	edges: Edge[];
};

type UseUndoRedoProps = FlowState & {
	setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
	setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
};

export function useUndoRedo({
	nodes,
	edges,
	setNodes,
	setEdges,
}: UseUndoRedoProps) {
	const [past, setPast] = useState<FlowState[]>([]);
	const [future, setFuture] = useState<FlowState[]>([]);

	const saveCurrentState = useCallback((currentState: FlowState) => {
		setPast((prev) => [...prev, currentState]);
		setFuture([]);
	}, []);

	const undo = useCallback(() => {
		if (past.length === 0) return;

		const newPresent = past[past.length - 1];
		const newPast = past.slice(0, -1);

		setFuture((prev) => [{ nodes, edges }, ...prev]);
		setPast(newPast);
		setNodes(newPresent.nodes);
		setEdges(newPresent.edges);
	}, [past, nodes, edges, setNodes, setEdges]);

	const redo = useCallback(() => {
		if (future.length === 0) return;

		const newPresent = future[0];
		const newFuture = future.slice(1);

		setPast((prev) => [...prev, { nodes, edges }]);
		setFuture(newFuture);
		setNodes(newPresent.nodes);
		setEdges(newPresent.edges);
	}, [future, nodes, edges, setNodes, setEdges]);

	return {
		undo,
		redo,
		saveCurrentState,
		canUndo: past.length > 0,
		canRedo: future.length > 0,
	};
}
