import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";

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


export default async function Navbar() {

  const wixClient = getWixServerClient();
  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Suspense>
          <MobileMenu
            collections={collections}
            loggedInMember={loggedInMember}
          />
        </Suspense>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Yuricart Electronics logo"
              width={75}
              height={75}
            />
          </Link>
          <MainNavigation
            collections={collections}
            className="hidden lg:flex"
          />
        </div>

        {/* SEARCHBAR */}
        <SearchField className="right-3 hidden max-w-96 lg:inline" />

        {/* USER-ICON */}
        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center justify-center gap-5">
            <UserButton
              loggedInMember={loggedInMember}
              className="hidden lg:inline-flex"
            />
            <ShoppingCartButton initialData={cart} />
          </div>
        </div>
      </div>
    </header>
  );
}
