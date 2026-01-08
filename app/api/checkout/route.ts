import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { CartItem } from "@/store/useCartStore";

export async function POST(req: Request) {
  try {
    const { items, userId } = await req.json();

    if (!items || items.length === 0) {
      return new NextResponse("No items in cart", { status: 400 });
    }

    const line_items = items.map((item: CartItem) => {
      // Pre-order logic: If it's a pre-order, the initial charge might be a deposit
      // For this implementation, we'll charge the full amount or a fixed deposit if defined
      const unitAmount = item.isPreOrder && item.depositAmount 
        ? item.depositAmount 
        : item.price;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${item.name} (${item.isPreOrder ? 'PRE-ORDER' : 'READY'})`,
            images: [item.image],
            metadata: {
              size: item.size,
              category: item.category,
              isPreOrder: item.isPreOrder.toString(),
            },
          },
          unit_amount: Math.round(unitAmount * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      metadata: {
        userId: userId || "guest",
        orderType: items.some((i: CartItem) => i.isPreOrder) ? "PRE_ORDER" : "NORMAL",
      },
    });

    // Create order and items in database within a transaction
    await db.transaction(async (tx) => {
      const [newOrder] = await tx.insert(orders).values({
        userId: userId || null,
        status: "PENDING",
        type: items.some((i: CartItem) => i.isPreOrder) ? "PRE_ORDER" : "NORMAL",
        totalAmount: (items.reduce((acc: number, i: CartItem) => acc + (i.isPreOrder && i.depositAmount ? i.depositAmount : i.price) * i.quantity, 0)).toString(),
        stripeSessionId: session.id,
      }).returning();

      await tx.insert(orderItems).values(
        items.map((item: CartItem) => ({
          orderId: newOrder.id,
          productId: item.id,
          name: item.name,
          price: item.price.toString(),
          quantity: item.quantity,
          size: item.size,
          category: item.category,
        }))
      );
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("[CHECKOUT_ERROR]", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return new NextResponse(message, { status: 500 });
  }
}
