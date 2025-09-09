"use client";

import Link from "next/link";
import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useCartDrawer } from "@/components/ui/CartDrawerContext";
import useAuth from "@/hooks/auth";

interface MobileBottomNavProps {
  loggedInMember: any;
  cart: any;
}

export default function MobileBottomNav({
  loggedInMember,
  cart,
}: MobileBottomNavProps) {
  const { openDrawer } = useCartDrawer();
  const { login } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-inner lg:hidden">
      <ul className="flex items-center justify-around py-2">
        {/* Home */}
        <li>
          <Link
            href="/"
            className="flex flex-col items-center text-xs text-gray-600"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>

        {/* Shop */}
        <li>
          <Link
            href="/shop"
            className="flex flex-col items-center text-xs text-gray-600"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Shop</span>
          </Link>
        </li>

        {/* Cart */}
        <li>
          <button
            onClick={openDrawer}
            className="relative flex flex-col items-center text-xs text-gray-600"
          >
            <ShoppingCart className="h-5 w-5" />
            <span
              className={`absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white ${cart?.lineItems?.length > 0 ? "bg-red-500" : "bg-red-500"}`}
            >
              {cart?.lineItems?.length ?? 0}
            </span>
            <span>Cart</span>

            {/* <ShoppingCart className="h-5 w-5" />
            {cart?.lineItems?.length > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {cart.lineItems.length}
              </span>
            )} */}
          </button>
        </li>

        {/* Account */}
        <li>
          {loggedInMember ? (
            <Link
              href="/profile"
              className="flex flex-col items-center text-xs text-gray-600"
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </Link>
          ) : (
            <button
              onClick={login}
              className="flex flex-col items-center text-xs text-gray-600"
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
