import { Edge, Node } from "reactflow";

export const navLinks = [
	{ title: "Product", href: "/" },
	{ title: "Solutions", href: "/" },
	{ title: "Documentation", href: "/" },
	{ title: "Media", href: "/" },
	{ title: "Pricing", href: "/" },
];

export const projects: ProjectType[] = [
	{
		title: "Project 1",
		nodes: [
			{
				id: "1",
				position: { x: 0, y: 0 },
				data: { label: "1" },
				type: "basicNode",
			},
			{
				id: "2",
				position: { x: 0, y: 100 },
				data: { label: "2" },
				type: "basicNode",
			},
		],
		edges: [{ id: "e1-2", source: "1", target: "2", type: "" }],
	},
	{
		title: "Demo Project",
		nodes: [
			{
				id: "1",
				position: { x: 0, y: 0 },
				data: { label: "1" },
				type: "basicNode",
			},
			{
				id: "2",
				position: { x: 0, y: 100 },
				data: { label: "2" },
				type: "basicNode",
			},
		],
		edges: [{ id: "e1-2", source: "1", target: "2", type: "" }],
	},
];

export type ProjectType = {
	title: string;
	nodes: Node[];
	edges: Edge[];
};
