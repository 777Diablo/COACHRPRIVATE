
import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/store-otp";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, otp } = body;

  console.log("incomming from page email and otp"+ email +" otp"+otp);

  if (!email || !otp) {
    return NextResponse.json(
      { success: false, message: "Missing email or OTP" },
      { status: 400 }
    );
  }

  const isValid = await verifyOtp(email, otp); 

  console.log("from is valid+" + isValid)

  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired OTP" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true, message: "OTP verified" });
}