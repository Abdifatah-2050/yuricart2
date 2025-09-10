"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ShoppingCartIcon } from "lucide-react";

interface WhatsAppOrderButtonProps {
  phoneNumber: string;
  productName?: string | null; // allow null/undefined
  productUrl: string;
  quantity: number;
}

export default function WhatsAppOrderButton({
  phoneNumber,
  productName,
  productUrl,
  quantity,
}: WhatsAppOrderButtonProps) {
  const message = `Hi, I want to order this product:\n\n*${productName}*\nQuantity: ${quantity}\n${productUrl}`;

  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <a href={waLink} target="_blank" rel="noopener noreferrer">
      <Button className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600">
        <ShoppingCartIcon className="h-5 w-5" />
        Order via WhatsApp
      </Button>
    </a>
  );
}
