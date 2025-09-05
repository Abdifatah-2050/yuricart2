// pages/api/whatsapp.ts (Next.js Pages Router)
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { orderId, customerName, total } = req.body;

    const message = `🛍️ New Order Received!\n\nOrder ID: ${orderId}\nCustomer: ${customerName}\nTotal: ${total}\n\nPlease check admin panel for details.`;

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER!,
      to: process.env.MY_WHATSAPP_NUMBER!, // Admin ka number
      body: message,
    });

    return res
      .status(200)
      .json({ success: true, message: "WhatsApp notification sent!" });
  } catch (error: any) {
    console.error("Twilio Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
