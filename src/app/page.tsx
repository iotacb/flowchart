import Hero from "@/components/home/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
	return (
		<div className="w-full min-h-dvh grid grid-rows-[auto_1fr_auto] gap-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-40%,var(--flowchart-accent-translucent),rgb(24_24_27)_100%)]">
			<Navbar />
			<main className="md:mt-20">
				<Hero />
			</main>
			<footer>hi</footer>
		</div>
	);
}
