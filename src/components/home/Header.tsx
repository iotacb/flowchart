export default function Header() {
	return (
		<main className="flex flex-col items-center justify-center px-12 pb-48 pt-12 md:pt-24">
			<h1 className="max-w-4xl text-center text-4xl font-black leading-[1.15] md:text-7xl md:leading-[1.15]">
				Launch your product with a cool landing page
			</h1>
			<p className="my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-2xl md:leading-relaxed">
				Your 1-2 sentence elevator pitch for what your product does and why goes
				here. Be concise, get to the point, don't use jargon.
			</p>
			<button className="transition-colors bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg text-base uppercase">
				Get Started
			</button>
		</main>
	);
}
