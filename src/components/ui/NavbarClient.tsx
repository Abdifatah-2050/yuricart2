"use client";

import { useEffect, Suspense } from "react";
import { useCart } from "@/hooks/cart";
import { useCartDrawer } from "@/components/ui/CartDrawerContext";
import Link from "next/link";
import Image from "next/image";
import MainNavigation from "@/app/MainNavigation";
import SearchField from "@/components/SearchFiend";
import MobileMenu from "@/app/MobileMenu";
import MobileBottomNav from "@/components/ui/MobileBottomNav";
import UserButton from "@/components/UserButton";
import ShoppingCartButton from "@/app/ShoppingCartButton";

export default function NavbarClient({
  initialCart,
  loggedInMember,
  collections,
}: any) {
  const { data: cartData } = useCart(initialCart);
  const { setCart } = useCartDrawer();

  // Sync cart from React Query to context
  useEffect(() => {
    if (cartData) setCart(cartData);
  }, [cartData, setCart]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background shadow-sm">
        <div className="mx-auto max-w-7xl p-3 md:p-5">
          {/* Mobile Menu */}
          <Suspense>
            <div className="block md:hidden">
              <MobileMenu
                collections={collections}
                loggedInMember={loggedInMember}
              />
            </div>
          </Suspense>

          {/* Desktop navbar */}
          <div className="hidden items-center gap-3 md:flex md:justify-between">
            <div className="flex">
              <Link href="/" className="flex items-center gap-4">
                <Image src="/logonew.svg" alt="Logo" width={60} height={60} />
                {/* <span className="text-xl font-bold">Yuricart</span> */}
              </Link>
              <MainNavigation
                collections={collections}
                className="hidden md:flex"
              />
            </div>

            <SearchField className="hidden max-w-96 md:inline" />

            <div className="flex items-center justify-center gap-5">
              <UserButton
                loggedInMember={loggedInMember}
                className="hidden md:inline-flex"
              />
              <ShoppingCartButton initialData={cartData} />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <MobileBottomNav loggedInMember={loggedInMember} />
      </header>
    </>
  );
}

// "use client";

// import { useCart } from "@/hooks/cart";
// import { getWixServerClient } from "@/lib/wix-client.server";
// import { getCart } from "@/wix-api/cart";
// import Image from "next/image";
// import Link from "next/link";
// import ShoppingCartButton from "@/app/ShoppingCartButton";
// import UserButton from "@/components/UserButton";
// import { getLoggedInMember } from "@/wix-api/members";
// import { getCollections } from "@/wix-api/collections";
// import { Suspense } from "react";
// import MainNavigation from "@/app/MainNavigation";
// import SearchField from "@/components/SearchFiend";
// import MobileMenu from "@/app/MobileMenu";
// import MobileBottomNav from "@/components/ui/MobileBottomNav";

// export default function NavbarClient({
//   initialCart,
//   loggedInMember,
//   collections,
// }: any) {
//   const { data: cart } = useCart(initialCart);

//   return (
//     <>
//       <header className="bg-background shadow-sm">
//         <div className="mx-auto max-w-7xl p-5">
//           {/* Mobile Menu → only mobile */}
//           <Suspense>
//             <div className="block md:hidden">
//               <MobileMenu
//                 collections={collections}
//                 loggedInMember={loggedInMember}
//               />
//             </div>
//           </Suspense>

//           {/* Desktop header → only desktop */}
//           <div className="hidden items-center justify-between gap-5 md:flex">
//             <div className="flex">
//               <Link href="/" className="flex items-center gap-4">
//                 <Image
//                   src="/logo.png"
//                   alt="Flow Shop logo"
//                   width={40}
//                   height={40}
//                 />
//                 <span className="text-xl font-bold">Yuricart</span>
//               </Link>
//               <MainNavigation
//                 collections={collections}
//                 className="hidden md:flex"
//               />
//             </div>

//             {/* SEARCHBAR */}
//             <SearchField className="right-3 hidden max-w-96 md:inline" />

//             {/* USER & CART */}
//             <div className="flex items-center justify-center gap-5">
//               <UserButton
//                 loggedInMember={loggedInMember}
//                 className="hidden md:inline-flex"
//               />
//               <ShoppingCartButton
//                 initialData={cart}
//                 // className="hidden md:inline-flex"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Mobile Bottom Nav → only mobile */}
//         <MobileBottomNav loggedInMember={loggedInMember} cart={cart} />
//       </header>
//       {/* yahan tumhara desktop navbar ka code reh sakta hai (MainNavigation, SearchField etc.) */}

//       {/* Mobile Bottom Nav */}
//       {/* <MobileBottomNav loggedInMember={loggedInMember} cart={cart} /> */}
//     </>
//   );
// }
