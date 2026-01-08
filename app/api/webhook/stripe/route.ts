import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { orders, orderItems } from "@/db/schema";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  if (!signature) {
    return new NextResponse("No signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderType = session.metadata?.orderType;
    const newStatus = orderType === "PRE_ORDER" ? "DEPOSIT_PAID" : "FULLY_PAID";

    if (session.id) {
      try {
        await db.transaction(async (tx) => {
          // 1. Update Order Status
          const [updatedOrder] = await tx
            .update(orders)
            .set({
              status: newStatus,
              updatedAt: new Date(),
            })
            .where(eq(orders.stripeSessionId, session.id))
            .returning();

          if (!updatedOrder) {
            throw new Error(`Order not found for session ${session.id}`);
          }

          // 2. Fetch Order Items
          const items = await tx
            .select()
            .from(orderItems)
            .where(eq(orderItems.orderId, updatedOrder.id));

          // 3. Decrement Stock for each item
          // Note: Only decrement if it's not a pre-order, or handle pre-order stock differently if needed
          for (const item of items) {
            // We use sql to perform atomic decrement
            await tx.execute(
              sql`UPDATE products SET stock = stock - ${item.quantity} WHERE id = ${item.productId}`
            );
          }
        });
      } catch (error) {
        console.error("[WEBHOOK_UPDATE_ERROR]", error);
        // We might want to notify admin here, but we return 200 to Stripe to avoid retries
        // if the error is "business logic" related rather than "infrastructure" related.
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
