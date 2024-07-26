"use client";
import React, { useState } from "react";
import { navLinks } from "../../shared.values";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useSession } from "@supabase/auth-helpers-react";

type Props = {};

const variants = {
	open: {
		x: 0,
	},
	closed: {
		x: "-100%",
	},
};

function RenderNavLinks() {
	return (
		<>
			{navLinks.map((link, index) => (
				<a
					className="hover:underline cursor-pointer"
					key={index}
					href={link.href}
				>
					{link.title}
				</a>
			))}
		</>
	);
}

function RenderAuth() {
	const session = useSession();
	return <></>;
}

export default function Navbar({}: Props) {
	const [open, setOpen] = useState(false);
	return (
		<nav className="w-full text-white py-4 h-20">
			<div className="relative container flex items-center justify-between gap-10">
				<button
					onClick={() => setOpen(!open)}
					className="md:hidden fixed top-4 right-4 text-4xl z-50"
				>
					{open ? <HiX /> : <HiMenu />}
				</button>
				<h1 className="text-2xl font-bold">Flowchart</h1>
				<div className="hidden md:flex gap-5 items-center justify-between font-light">
					<RenderNavLinks />
				</div>
				<motion.div
					variants={variants}
					initial="closed"
					animate={open ? "open" : "closed"}
					transition={{
						duration: 0.2,
						ease: "easeInOut",
					}}
					className="md:hidden fixed inset-0 bg-zinc-900 z-40 grid place-content-center gap-10 text-2xl text-center"
				>
					<RenderNavLinks />
					<h1 className="absolute bottom-10 w-full">Flowchart</h1>
				</motion.div>
			</div>
		</nav>
	);
}
