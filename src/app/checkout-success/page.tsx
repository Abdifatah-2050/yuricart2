"use client";

import { getWixServerClient } from "@/lib/wix-client.server";
import { getLoggedInMember } from "@/wix-api/members";
import { getOrder } from "@/wix-api/orders";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClearCart from "./ClearCart";
import Order from "@/components/Order";
import twilio from "twilio";
import MpesaPayment from "@/components/ui/MpesaPayment";

interface PageProps {
  searchParams: { orderId: string };
}

export const metadata: Metadata = {
  title: "Checkout success",
};

// Twilio Client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!,
);

export default async function Page({ searchParams: { orderId } }: PageProps) {
  const wixClient = getWixServerClient();

  const [order, loggedInMember] = await Promise.all([
    getOrder(wixClient, orderId),
    getLoggedInMember(wixClient),
  ]);

  if (!order) {
    notFound();
  }

  // -------------------
  // WhatsApp Notification
  const shippingDestination =
    order.shippingInfo?.logistics?.shippingDestination;
  const customerName = `${shippingDestination?.contactDetails?.firstName || "Unknown"} ${shippingDestination?.contactDetails?.lastName || ""}`;
  const total =
    order.priceSummary?.total?.formattedAmount ||
    order.priceSummary?.subtotal?.formattedAmount ||
    "Unknown Total";
  const products =
    order.lineItems?.map((item) => item.productName?.translated).join(", ") ||
    "Unknown Products";
  const deliveryAddress = shippingDestination?.address
    ? `${shippingDestination.address.streetAddress?.name || ""} ${shippingDestination.address.streetAddress?.number || ""}, ${shippingDestination.address.postalCode || ""} ${shippingDestination.address.city || ""}, ${shippingDestination.address.subdivision || shippingDestination.address.country || ""}`
    : "Unknown Address";

  try {
    await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER!,
      to: "whatsapp:+254768054542", // Admin WhatsApp
      body: `
🛍️ New Order Received!
Order ID: ${order.number}
Customer: ${customerName}
Total: ${total}
Products: ${products}
Delivery: ${deliveryAddress}
      `,
    });
    console.log("✅ WhatsApp notification sent successfully");
  } catch (err) {
    console.error("❌ Twilio WhatsApp Error:", err);
  }

  const orderCreatedDate = order._createdDate
    ? new Date(order._createdDate)
    : null;

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center space-y-5 px-5 py-10">
      <h1 className="text-3xl font-bold">We received your order!</h1>
      <p>A summary of your order was sent to your email address.</p>

      <h2 className="text-2xl font-bold">Order details</h2>
      <Order order={order} />

      {loggedInMember && (
        <Link href="/profile" className="block text-primary hover:underline">
          View all your orders
        </Link>
      )}

      {orderCreatedDate &&
        orderCreatedDate.getTime() > Date.now() - 60_000 * 5 && <ClearCart />}
      <MpesaPayment order={order} />
    </main>
  );
}
