"use client";
import { useGetUserFlowCharts, UserChart } from "@/hooks/useFlowCharts";
import { loadStripe } from "@stripe/stripe-js";
import {
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi2";
import { toast, ToastContainer } from "react-toastify";
import { uuid } from "uuidv4";

export default function Home() {
	const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
	const user = useUser();

	useEffect(() => {
		setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!));
	}, []);

	const handleCheckout = async (priceId: string, subscription: boolean) => {
		try {
			const response = await fetch(`/api/payments/create-checkout-session`, {
				method: "POST",
				body: JSON.stringify({
					userId: user?.id,
					email: user?.email,
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
					handleCheckout("price_1Pi06jKq9YOQyluUgI71Kej1", true);
				}}
			>
				Buy
			</button>
		</main>
	);
}
