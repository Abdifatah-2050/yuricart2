// import logo from "@/assets/logo.png";
import { getWixServerClient } from "@/lib/wix-client.server";
// import { getWixClient } from "@/lib/wix-client.base";
import { getCart } from "@/wix-api/cart";
// import SearchField from "@/components/SearchField";
// import UserButton from "@/components/UserButton";
// import { getWixServerClient } from "@/lib/wix-client.server";
// import { getCart } from "@/wix-api/cart";
// import { getCollections } from "@/wix-api/collections";
// import { getLoggedInMember } from "@/wix-api/members";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollections } from "@/wix-api/collections";
import { Suspense } from "react";
import MainNavigation from "./MainNavigation";
import SearchField from "@/components/SearchFiend";
import MobileMenu from "./MobileMenu";
import MobileBottomNav from "@/components/ui/MobileBottomNav";
// import { Suspense } from "react";
// import MainNavigation from "./MainNavigation";
// import MobileMenu from "./MobileMenu";
// import ShoppingCartButton from "./ShoppingCartButton";

// TEMP
// async function getCart() {
//     const wixClient = getWixClient()

//     try {
//         return await wixClient.currentCart.getCurrentCart()

//     } catch (error) {
//         if ((error as any).details.applicationError.code === "OWNED_CART_NOT_FOUND") {
//           return null
//         } else {
//             throw error;
//       }

//     }

// }

export default async function Navbar() {
  // TEMP
  //  const totalQuantity =
  //   cart?.lineItems?.reduce(
  //     (acc, item) => acc + (item.quantity || 0),
  //     0,
  //   ) || 0;

  const wixClient = getWixServerClient();
  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto max-w-7xl p-5">
        {/* Mobile Menu → only mobile */}
        <Suspense>
          <div className="block md:hidden">
            <MobileMenu
              collections={collections}
              loggedInMember={loggedInMember}
            />
          </div>
        </Suspense>

        {/* Desktop header → only desktop */}
        <div className="hidden items-center justify-between gap-5 md:flex">
          <div className="flex">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Flow Shop logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold">Yuricart</span>
            </Link>
            <MainNavigation
              collections={collections}
              className="hidden md:flex"
            />
          </div>

          {/* SEARCHBAR */}
          <SearchField className="right-3 hidden max-w-96 md:inline" />

          {/* USER & CART */}
          <div className="flex items-center justify-center gap-5">
            <UserButton
              loggedInMember={loggedInMember}
              className="hidden md:inline-flex"
            />
            <ShoppingCartButton
              initialData={cart}
              // className="hidden md:inline-flex"
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav → only mobile */}
      <MobileBottomNav />
    </header>
  );
}
