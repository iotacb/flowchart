import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabse";
import { SupabaseClient } from "@supabase/auth-helpers-react";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
	const reqText = await request.text();
	return webhookHandler(reqText, request);
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
	try {
		const customer = await stripe.customers.retrieve(customerId);
		return (customer as Stripe.Customer).email;
	} catch (error) {
		console.error("Error fetching customer:", error);
		return null;
	}
}

async function handleSubscriptionEvent(
	event: Stripe.Event,
	type: "created" | "updated" | "deleted",
	supabase: SupabaseClient
) {
	const subscription = event.data.object as Stripe.Subscription;
	const customerEmail = await getCustomerEmail(subscription.customer as string);

	// if (!customerEmail) {
	// 	return NextResponse.json({
	// 		status: 1337,
	// 		error: "Customer email could not be fetched",
	// 	});
	// }

	const subscriptionData: any = {
		subscription_id: subscription.id,
		stripe_user_id: subscription.customer,
		status: subscription.status,
		start_date: new Date(subscription.created * 1000).toISOString(),
		plan_id: subscription.items.data[0]?.price.id,
		user_id: subscription.metadata?.userId || "",
		email: customerEmail,
	};

	// let data: any;
	// let error: any;

	// if (type === "deleted") {
	// 	({ data, error } = await supabase
	// 		.from("subscriptions")
	// 		.update({ status: "cancelled" })
	// 		.match({ id: subscription.id })
	// 		.select());

	// 	if (!error) {
	// 		const { error: userError } = await supabase
	// 			.from("user")
	// 			.update({ subscription: null })
	// 			.eq("email", customerEmail);
	// 		if (userError) {
	// 			console.error("Error updating user subscription status:", userError);
	// 			return NextResponse.json({
	// 				status: 7331,
	// 				error: "Error updating user subscription status",
	// 			});
	// 		}
	// 	}
	// } else {
	// 	({ data, error } = await supabase
	// 		.from("subscriptions")
	// 		[type === "created" ? "insert" : "update"](
	// 			type === "created" ? [subscriptionData] : subscriptionData
	// 		)
	// 		.match({ subscription_id: subscription.id })
	// 		.select());
	// }
	if (type === "created") {
		const { data: userData, error: userError } = await supabase
			.from("subscriptions")
			.insert({ ...subscriptionData })
			.select();
	}

	if (type === "updated") {
		const { data: userData, error: userError } = await supabase
			.from("subscriptions")
			.update({ ...subscriptionData })
			.match({ subscription_id: subscription.id })
			.select();
	}

	// if (error) {
	// 	console.error(`Error during subscription ${type}:`, error);
	// 	return NextResponse.json({
	// 		status: 999,
	// 		error: `Error during subscription ${type}`,
	// 	});
	// }

	return NextResponse.json({
		status: 200,
		message: `Subscription ${type} success`,
		// data,
	});
}

async function webhookHandler(requestRaw: string, request: NextRequest) {
	const signature = request.headers.get("Stripe-Signature");

	try {
		const event = await stripe.webhooks.constructEvent(
			requestRaw,
			signature!,
			process.env.STRIPE_WEBHOOK_SECRET!
		);

		switch (event.type) {
			case "customer.subscription.created":
				return handleSubscriptionEvent(event, "created", supabase);
			case "customer.subscription.updated":
				return handleSubscriptionEvent(event, "updated", supabase);
			case "customer.subscription.deleted":
				return handleSubscriptionEvent(event, "deleted", supabase);
			case "invoice.payment_succeeded":
			case "invoice.payment_failed":
			case "checkout.session.completed":
			default:
				return NextResponse.json({
					status: 400,
					error: "Unhandled event type",
				});
		}
	} catch (error) {
		console.error("Error constructing Stripe event:", error);
		return NextResponse.json({
			status: 777,
			error: "Webhook Error: Invalid Signature",
		});
	}
}
