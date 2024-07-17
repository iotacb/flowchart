import { ReactFlowProvider } from "@xyflow/react";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <ReactFlowProvider>{children}</ReactFlowProvider>;
}
