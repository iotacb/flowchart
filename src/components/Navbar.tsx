import React from "react";
import { navLinks } from "../../shared.values";

type Props = {};

export default function Navbar({}: Props) {
	return (
		<nav className="w-full flex items-center justify-center text-white px-20 py-4">
			<div className="max-w-7xl w-full flex items-center justify-between gap-10">
				<h1 className="text-2xl font-bold">Flowchart</h1>
				<div className="flex gap-5 items-center justify-between font-light">
					{navLinks.map((link, index) => (
						<a key={index} href={link.href}>
							{link.title}
						</a>
					))}
				</div>
			</div>
		</nav>
	);
}
