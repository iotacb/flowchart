"use client";
import ReactLenis from "lenis/react";
import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function SmoothScroll({ children }: Props) {
	return (
		<ReactLenis
			options={{
				duration: 1.2,
				easing: (t) => Math.min(1, 1.002 - Math.pow(2, -10 * t)),
			}}
			root
		>
			{children}
		</ReactLenis>
	);
}
