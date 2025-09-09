// Navbar.tsx (server component)
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollections } from "@/wix-api/collections";
import NavbarClient from "@/components/ui/NavbarClient";

export default async function Navbar() {
  const wixClient = getWixServerClient();
  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <NavbarClient
      initialCart={cart}
      loggedInMember={loggedInMember}
      collections={collections}
    />
  );
}
