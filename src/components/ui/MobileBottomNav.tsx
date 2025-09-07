"use client";

import Link from "next/link";
import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useCartDrawer } from "@/components/ui/CartDrawerContext";

export default function MobileBottomNav() {
  const { openDrawer } = useCartDrawer(); // ✅ hook ab kaam karega

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-inner lg:hidden">
      <ul className="flex items-center justify-around py-2">
        <li>
          <Link
            href="/"
            className="flex flex-col items-center text-xs text-gray-600"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/shop"
            className="flex flex-col items-center text-xs text-gray-600"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Shop</span>
          </Link>
        </li>
        <li>
          <button
            onClick={openDrawer}
            className="flex flex-col items-center text-xs text-gray-600"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
          </button>
        </li>
        <li>
          <Link
            href="/account"
            className="flex flex-col items-center text-xs text-gray-600"
          >
            <User className="h-5 w-5" />
            <span>Account</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
