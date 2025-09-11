import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone, amount } = await req.json();

  // 🕒 Generate timestamp
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);

  // 🔑 Generate password
  const password = Buffer.from(
    process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp,
  ).toString("base64");

  // 🎫 Get Access Token
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`,
  ).toString("base64");

  const tokenRes = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    },
  );

  const { access_token } = await tokenRes.json();

  // 🚀 STK Push Request
  const res = await fetch(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: `${process.env.MPESA_CALLBACK_BASE}`,
        AccountReference: "MyShop",
        TransactionDesc: "Order Payment",
      }),
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
