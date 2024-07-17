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
			},
			boxShadow: {
				...shadows,
			},
		},
	},
	plugins: [],
};
export default config;
