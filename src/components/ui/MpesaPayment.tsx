"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { initiateMpesa } from "@/lib/mpesa"; // MPESA helper function
import type { Order } from "@/wix-api/orders"; // ✅ now uses correct type

interface MpesaPaymentProps {
  order: Order | null; // order type from wix-api/orders
}

export default function MpesaPayment({ order }: MpesaPaymentProps) {
  const [phone, setPhone] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  async function handleMpesaPayment() {
    if (!phone) {
      alert("⚠️ Please enter a valid phone number.");
      return;
    }

    if (!order) {
      alert("⚠️ Order not found.");
      return;
    }

    const cleanedPhone = phone.replace(/\D/g, ""); // remove non-digits
    const amountRaw = order.priceSummary?.total?.amount || "0";
    const amount = Math.round(Number(amountRaw));
    const orderId =
      (order as any)?._id || (order as any)?.number || "unknown-order";

    setIsPaying(true);

    try {
      const res = await initiateMpesa(cleanedPhone, amount, orderId);

      if (res.ResponseCode === "0") {
        alert("✅ MPESA Payment initiated. Check your phone for confirmation.");
      } else {
        alert(
          `❌ Payment failed: ${res.ResponseDescription || "Unknown error"}`,
        );
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong with MPESA payment.");
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <div className="mt-6 rounded-md border bg-gray-50 p-4">
      <h3 className="mb-2 text-lg font-semibold">Pay via MPESA</h3>

      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="2547XXXXXXXX"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <Button
        className="w-full bg-green-500 text-white hover:bg-green-600"
        onClick={handleMpesaPayment}
        disabled={isPaying}
      >
        {isPaying ? "Processing..." : "Pay with MPESA"}
      </Button>
    </div>
  );
}
