import { NextResponse } from "next/server";
import Stripe from "stripe";
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27.acacia" });
const MONGO_URI = process.env.MONGO_URI!;
if (!mongoose.connection.readyState) mongoose.connect(MONGO_URI);

const User = mongoose.models.User;

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      await User.updateOne({ email: session.customer_email }, { subscription: "pro" });
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as any;
      await User.updateOne({ email: subscription.customer_email }, { subscription: "free" });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
