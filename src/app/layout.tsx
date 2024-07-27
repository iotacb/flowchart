import type { Metadata } from "next";
import { Manrope, Roboto } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import SupabaseProvider from "@/lib/SupabaseProvider";
import SmoothScroll from "@/components/SmoothScroll";

const manrope = Manrope({
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Flowchart",
	description: "A flowchart app built with Next.js and React Flow",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={manrope.className}>
			<body className="bg-zinc-900 text-white">
				<SmoothScroll>
					{/* <Navbar /> */}
					<SupabaseProvider>{children}</SupabaseProvider>
				</SmoothScroll>
			</body>
		</html>
	);
}
