"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";

export default function Home() {
	const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
	const session = useSession();

	useEffect(() => {
		setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!));
	}, []);

	const handleCheckout = async (priceId: string, subscription: boolean) => {
		try {
			const response = await fetch(`/api/payments/create-checkout-session`, {
				method: "POST",
				body: JSON.stringify({
					userId: session?.user?.id,
					email: session?.user?.email,
					priceId,
					subscription,
				}),
			});

			const data = await response.json();

			if (data.sessionId) {
				const stripe = await stripePromise;

				const response = await stripe?.redirectToCheckout({
					sessionId: data.sessionId,
				});

				return response;
			} else {
				console.error("Failed to create checkout session");
				return;
			}
		} catch (error) {
			console.error("Error during checkout:", error);
			return;
		}
	};

	return (
		<main className="bg-gray-900 w-svw min-h-svh grid place-content-center">
			<button
				onClick={() => {
					handleCheckout("price_1PiM0VKq9YOQyluUmBPSE068", true);
				}}
			>
				444
			</button>
		</main>
	);
}
