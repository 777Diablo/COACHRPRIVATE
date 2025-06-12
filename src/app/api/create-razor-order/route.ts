import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ! WE ARE NOT USING THIS ENDPOINT - BUT KEPT FOR RAZOR PAY REFERENCE
export async function POST(req: NextRequest) {
  try {
    const order = await razorpay.orders.create({
      amount: 100,
      currency: "INR",
      receipt: `recept_${Math.random().toString(36).substring(7)}`,
    });
    return NextResponse.json(
      {
        orderId: order.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
