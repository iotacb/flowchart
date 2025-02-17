import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Flowchart";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					display: "flex",
					height: "100%",
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					background: "rgb(24, 24, 27)",
					fontSize: 60,
					letterSpacing: -2,
					fontWeight: 700,
					textAlign: "center",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundImage:
							"radial-gradient(ellipse 120% 80% at 50% -20%, rgb(113, 52, 210), rgb(24, 24, 27))",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundImage:
							"linear-gradient(to right, rgb(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgb(255, 255, 255, 0.1) 1px, transparent 1px)",
						backgroundSize: "30rem 30rem",
						backgroundPosition: "center center",
					}}
				></div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={485}
					height={270}
					viewBox="0 0 968.67 538.91"
				>
					<g>
						<polygon
							points="263.02 278.24 229 278.24 229 311.29 211.94 311.29 211.94 224.11 269.77 224.11 269.77 239.56 229 239.56 229 262.79 263.02 262.79 263.02 278.24"
							fill="#fff"
							stroke-width="0"
						/>
						<polygon
							points="301.44 295.94 340.25 295.94 340.25 311.29 284.13 311.29 284.13 224.11 301.44 224.11 301.44 295.94"
							fill="#fff"
							stroke-width="0"
						/>
						<path
							d="m434.8,257.19c-.74-3.89-2.1-7.75-4.07-11.59-1.94-3.86-4.68-7.5-8.16-10.95-3.48-3.43-7.96-6.24-13.43-8.39-5.5-2.17-11.36-3.27-17.57-3.27s-12.33,1.13-17.86,3.33c-5.53,2.2-10.28,5.32-14.25,9.34s-7.01,8.77-9.16,14.3c-2.12,5.53-3.17,11.43-3.17,17.75s1.05,12.18,3.17,17.68c2.15,5.47,5.19,10.23,9.16,14.25,3.96,3.99,8.72,7.11,14.25,9.31,5.53,2.23,11.49,3.33,17.86,3.33s12.07-1.05,17.57-3.2c5.47-2.12,10.21-5.17,14.17-9.13,3.96-3.99,7.06-8.72,9.26-14.25,2.23-5.53,3.33-11.54,3.33-17.98,0-3.12-.36-6.63-1.1-10.51Zm-18.8,21.67c-1.3,3.53-3.17,6.57-5.58,9.16-2.4,2.58-5.24,4.58-8.47,6.01-3.25,1.43-6.65,2.15-10.26,2.15s-7.32-.74-10.62-2.2c-3.33-1.48-6.17-3.5-8.54-6.09-2.38-2.58-4.22-5.63-5.53-9.13-1.3-3.53-1.97-7.21-1.97-11.05,0-4.83.92-9.13,2.71-12.89,1.79-3.76,4.02-6.83,6.63-9.16,2.63-2.33,5.47-3.99,8.54-4.96,3.07-1,5.99-1.48,8.77-1.48,4.58,0,8.98,1.2,13.2,3.63,4.22,2.4,7.44,5.91,9.7,10.49,2.25,4.58,3.38,9.36,3.38,14.38,0,3.91-.67,7.65-1.97,11.15Z"
							fill="#fff"
							stroke-width="0"
						/>
					</g>
					<g>
						<path
							d="m269.77,239.56v-15.45h-57.84v87.18h17.06v-33.05h34.02v-15.45h-34.02v-23.23h40.78Z"
							fill="#fff"
							stroke-width="0"
						/>
						<path
							d="m301.44,295.94v-71.83h-17.32v87.18h56.12v-15.35h-38.81Z"
							fill="#fff"
							stroke-width="0"
						/>
						<path
							d="m434.8,257.19c-.74-3.89-2.1-7.75-4.07-11.59-1.94-3.86-4.68-7.5-8.16-10.95-3.48-3.43-7.96-6.24-13.43-8.39-5.5-2.17-11.36-3.27-17.57-3.27s-12.33,1.13-17.86,3.33c-5.53,2.2-10.28,5.32-14.25,9.34s-7.01,8.77-9.16,14.3c-2.12,5.53-3.17,11.43-3.17,17.75s1.05,12.18,3.17,17.68c2.15,5.47,5.19,10.23,9.16,14.25,3.96,3.99,8.72,7.11,14.25,9.31,5.53,2.23,11.49,3.33,17.86,3.33s12.07-1.05,17.57-3.2c5.47-2.12,10.21-5.17,14.17-9.13,3.96-3.99,7.06-8.72,9.26-14.25,2.23-5.53,3.33-11.54,3.33-17.98,0-3.12-.36-6.63-1.1-10.51Zm-18.8,21.67c-1.3,3.53-3.17,6.57-5.58,9.16-2.4,2.58-5.24,4.58-8.47,6.01-3.25,1.43-6.65,2.15-10.26,2.15s-7.32-.74-10.62-2.2c-3.33-1.48-6.17-3.5-8.54-6.09-2.38-2.58-4.22-5.63-5.53-9.13-1.3-3.53-1.97-7.21-1.97-11.05,0-4.83.92-9.13,2.71-12.89,1.79-3.76,4.02-6.83,6.63-9.16,2.63-2.33,5.47-3.99,8.54-4.96,3.07-1,5.99-1.48,8.77-1.48,4.58,0,8.98,1.2,13.2,3.63,4.22,2.4,7.44,5.91,9.7,10.49,2.25,4.58,3.38,9.36,3.38,14.38,0,3.91-.67,7.65-1.97,11.15Z"
							fill="#fff"
							stroke-width="0"
						/>
						<polygon
							points="560.04 224.11 532.54 311.29 516.58 311.29 500.23 249.28 499.87 249.28 482.91 311.29 467.08 311.29 464.39 302.85 464.39 302.83 439.58 224.11 458 224.11 464.44 246.55 474.93 283.05 475.19 283.05 490.66 224.11 508.95 224.11 524.43 283.05 524.56 283.05 541.62 224.11 560.04 224.11"
							fill="#fff"
							stroke-width="0"
						/>
						<path
							d="m633.69,287.81l9.11,7.88c-2.58,3.22-5.63,6.06-9.11,8.47-1.79,1.28-3.71,2.4-5.76,3.45-5.96,3.02-12.61,4.53-19.9,4.53-5.88,0-11.54-.95-16.93-2.89-5.4-1.92-10.16-4.78-14.3-8.6-4.14-3.79-7.37-8.49-9.7-14.04-2.35-5.58-3.5-11.79-3.5-18.67,0-6.14.97-11.95,2.94-17.42,1.97-5.5,4.86-10.31,8.72-14.43,3.84-4.14,8.54-7.37,14.12-9.64,5.55-2.3,11.79-3.45,18.65-3.45,6.24,0,12.46,1.43,18.67,4.25,2.46,1.13,4.81,2.46,6.98,3.99,3.35,2.33,6.4,5.17,9.11,8.47l-9.11,7.8-3.53,3.02c-2.79-3.2-6.11-5.83-9.95-7.93-3.86-2.1-7.9-3.12-12.18-3.12-7.6,0-13.92,2.61-18.9,7.85-4.99,5.24-7.47,12.1-7.47,20.62,0,2.94.41,6.01,1.28,9.16.87,3.15,2.48,6.27,4.83,9.39,2.38,3.12,5.42,5.45,9.11,7.01,3.68,1.53,7.39,2.33,11.15,2.33,4.35,0,8.44-1.02,12.3-3.07,3.84-2.05,7.11-4.71,9.82-7.98l3.53,3.04Z"
							fill="#fff"
							stroke-width="0"
						/>
						<path
							d="m787.07,224.11h-16.58l-32.28,87.18h18.03l5.91-17.45h33.51l5.88,17.45h18.06l-32.54-87.18Zm-19.9,55l11.56-34.25h.23l11.66,34.25h-23.46Z"
							fill="#fff"
							stroke-width="0"
						/>
						<path
							d="m876.58,279.37c5.73-1.89,10.16-5.04,13.28-9.46,3.1-4.43,4.66-10.03,4.66-16.83,0-6.37-1.28-11.72-3.81-16.01s-6.01-7.52-10.44-9.7c-4.43-2.17-9.77-3.25-16.09-3.25h-33.02v87.18h17.06v-29.85h10.08l19.52,29.85h20.39l-21.62-31.92Zm-8.47-14.43c-2.53.84-5.17,1.28-7.85,1.28h-12.05v-26.76h12.79c4.91,0,8.75,1.2,11.54,3.61,2.79,2.43,4.17,5.63,4.17,9.64,0,2.94-.79,5.5-2.4,7.67-1.59,2.17-3.66,3.68-6.19,4.55Z"
							fill="#fff"
							stroke-width="0"
						/>
						<path
							d="m903.23,224.11v15.45h24.05v71.73h17.19v-71.73h24.2v-15.45h-65.44Z"
							fill="#fff"
							stroke-width="0"
						/>
					</g>
					<g>
						<polygon
							points="726.65 224.11 726.65 311.29 709.35 311.29 709.35 277.27 673.62 277.27 673.62 311.29 656.3 311.29 656.3 224.11 673.62 224.11 673.62 261.79 709.35 261.79 709.35 224.11 726.65 224.11"
							fill="#fff"
							stroke-width="0"
						/>
						<path
							d="m279.67,110v-19.47h-37.5c-49.78,0-90.25,40.47-90.25,90.25v10.23h57.63c.18,0,.38,0,.56.05-18.67,1.25-33.49,21.77-33.49,46.84v63.11c0,25.89,15.81,46.89,35.3,46.89h-60.01v10.23c0,49.75,40.47,90.25,90.25,90.25h37.5v-19.47c0-25.91,21-46.92,46.92-46.92h181.62c28.24,0,51.16,22.92,51.16,51.16v58.84c0,25.91-21,46.92-46.92,46.92h-185.87c-25.91,0-46.92-21-46.92-46.92v-19.47h-37.5c-63.08,0-114.4-51.32-114.4-114.4v-10.23H46.89c-25.89,0-46.89-21-46.89-46.89v-63.11c0-25.89,21-46.89,46.89-46.89h80.89v-10.23c0-63.08,51.31-114.4,114.4-114.4h37.5v-19.49c0-25.89,21-46.89,46.92-46.89h181.62c28.24,0,51.16,22.92,51.16,51.16v58.84c0,25.91-21,46.89-46.92,46.89h-185.87c-25.91,0-46.92-20.98-46.92-46.89Z"
							fill="#fff"
							stroke-width="0"
						/>
					</g>
				</svg>
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
		}
	);
}
