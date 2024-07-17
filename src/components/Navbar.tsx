import React from "react";
import { navLinks } from "../../shared.values";

type Props = {};

export default function Navbar({}: Props) {
	return (
		<nav className="w-screen px-20 py-5 flex gap-5">
			{navLinks.map((link, index) => (
				<NavLink key={index} title={link.title} href={link.href} />
			))}
		</nav>
	);
}

function NavLink({ title, href }: { title: string; href: string }) {
	return <a>{title}</a>;
}
