import type { Config } from "tailwindcss";
import { colors, shadows } from "@chrisbrandt/vallium";
const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				vallium: {
					...colors,
				},
				"flowchart-accent": {
					DEFAULT: "var(--flowchart-accent)",
					translucent: "var(--flowchart-accent-translucent)",
					dark: "var(--flowchart-accent-dark)",
					bright: "var(--flowchart-accent-bright)",
				},
			},
			boxShadow: {
				...shadows,
			},
			keyframes: {
				"ping-small": {
					"75%": {
						transform: "scaleX(1.05) scaleY(1.15)",
						opacity: "0",
					},
					"0%, 100%": { opacity: ".5" },
				},
			},
			animation: {
				"ping-small": "ping-small 2s ease-in-out infinite forwards",
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "20px",
					lg: "80px",
				},
			},
		},
	},
	plugins: [],
};
export default config;
