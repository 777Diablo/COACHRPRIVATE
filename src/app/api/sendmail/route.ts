
import { NextRequest, NextResponse } from "next/server";

import nodemailer from "nodemailer";

import { saveOtp } from "@/lib/store-otp";

export const runtime = "nodejs";

let otp_generated = Math.floor(1000 + Math.random() * 9000);



export async function POST(req: NextRequest) {
  const body = await req.json();
  const Email  = body.email;
  saveOtp(Email, otp_generated.toString());

console.log(Email);

  const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'me.jupyter@gmail.com',
      pass: 'vclrwglowqamrejo', //to be used by a company email
    },
  });

  await transporter.sendMail({
    to: Email,
    subject: "Your OTP Code",
    html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your OTP Code</title>
    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 32px;
      }
      .header {
        text-align: center;
        margin-bottom: 24px;
      }
      .header img {
        width: 100px;
        margin-bottom: 16px;
      }
      .header h1 {
        color: #004080;
        font-size: 22px;
        margin: 0;
      }
      .message {
        font-size: 16px;
        color: #333333;
        margin-top: 24px;
        line-height: 1.6;
      }
      .otp-box {
        margin: 24px auto;
        padding: 16px;
        background-color: #e8f0fe;
        border: 2px dashed #004080;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        letter-spacing: 2px;
        color: #004080;
        border-radius: 6px;
        width: fit-content;
      }
      .footer {
        margin-top: 32px;
        font-size: 14px;
        color: #777777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://i.imgur.com/ZJ1vNVp.png" alt="Company Logo" />
        <h1>Verify Your Email</h1>
      </div>
      <div class="message">
        Hello,<br /><br />
        Thank you for signing up with us. To complete your registration, please use the following One-Time Password (OTP):
      </div>
      <div class="otp-box">${otp_generated}</div>
      <div class="message">
        This OTP is valid for 5 minutes. Please do not share it with anyone for security reasons.
      </div>
      <div class="footer">
        If you did not request this, please ignore this email.<br />
        &copy; ${new Date().getFullYear()} CoachR. All rights reserved.
      </div>
    </div>
  </body>
</html>
`,
  });

  console.log(`OTP ${otp_generated} sent to ${Email}`);
  return NextResponse.json({ success: true, message: "OTP sent" });
}
