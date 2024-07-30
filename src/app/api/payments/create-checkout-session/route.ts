import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { userId, email, priceId, subscription } = await request.json();

	if (!subscription) {
		return NextResponse.json({ error: "Failed to create checkout session" });
	}

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card", "sofort"],
			line_items: [{ price: priceId, quantity: 1 }],
			subscription_data: {
				metadata: {
					userId: userId,
					email: email,
					subscription: subscription,
				},
			},
			mode: "subscription",
			success_url: `https://flowchart.chrisbrandt.xyz/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `https://flowchart.chrisbrandt.xyz/pricing?success=false`,
			allow_promotion_codes: true,
		});

		return NextResponse.json({ sessionId: session.id });
	} catch (error) {
		console.error("Error creating checkout session:", error);
		return NextResponse.json({ error: "Failed to create checkout session" });
	}
}
