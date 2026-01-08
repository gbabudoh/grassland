import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/useCartStore";

const calculateOrderAmount = (items: CartItem[]) => {
  return Math.round(items.reduce((acc, item) => {
    const price = item.isPreOrder && item.depositAmount 
      ? item.depositAmount 
      : item.price;
    return acc + price * item.quantity;
  }, 0) * 100); // Convert to cents
};

export async function POST(req: Request) {
  try {
    const { items, userId } = await req.json();

    if (!items || items.length === 0) {
      return new NextResponse("No items in cart", { status: 400 });
    }

    const amount = calculateOrderAmount(items);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: userId || "guest",
        orderType: items.some((i: CartItem) => i.isPreOrder) ? "PRE_ORDER" : "NORMAL",
        items_description: items.map((i: CartItem) => `${i.quantity}x ${i.name}`).join(", ")
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      amount: amount
    });
  } catch (error: unknown) {
    console.error("[PAYMENT_INTENT_ERROR]", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
