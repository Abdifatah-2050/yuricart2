"use client";

// import { Button } from "@/components/ui/button";
// import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { useCart } from "@/hooks/cart";
// import { currentCart } from "@wix/ecom";
// import { Link, Loader2, Sheet, ShoppingCartIcon } from "lucide-react";
// import { useState } from "react";

// //////
// import CheckoutButton from "@/components/CheckoutButton";
// import CheckoutButton from "@/components/CheckoutButton";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import WixImage from "@/components/WixImage";
// // import WixImage from "@/components/WixImage";
// import {
//   useCart,
//   useRemoveCartItem,
//   useUpdateCartItemQuantity,
//   // useRemoveCartItem,
//   // useUpdateCartItemQuantity,
// } from "@/hooks/cart";
// import { currentCart } from "@wix/ecom";
// import { Loader2, ShoppingCartIcon, X } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

// // //TEMP//////
// interface ShoppingCartButtonProps {
//   initialData: currentCart.Cart | null;
// }

// export default function ShoppingCartButton({
//     initialData,
// }: ShoppingCartButtonProps) {
//   const [sheetOpen, setSheetOpen] = useState(false);

//     const cartQuery = useCart(initialData)

//       const totalQuantity =
//     cartQuery.data?.lineItems?.reduce(
//       (acc, item) => acc + (item.quantity || 0),
//       0,
//     ) || 0;

//   return (
//     <>
//     <div className="relative">
//       <Button variant="ghost" size="icon" onClick={() => setSheetOpen(true)}>
//         <ShoppingCartIcon />
//         <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
//           {totalQuantity < 10 ? totalQuantity : "9+"}
//         </span>
//       </Button>
//       </div>

//        {/* SHEET-OPEN */}
//     <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
//         <SheetContent className="flex flex-col sm:max-w-lg">
//           <SheetHeader>
//             <SheetTitle>
//               Your cart{" "}
//               <span className="text-base">
//                 ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
//               </span>
//             </SheetTitle>
//           </SheetHeader>
//           <div className="flex grow flex-col space-y-5 overflow-y-auto pt-1">
//             <ul className="space-y-5">
//               {cartQuery.data?.lineItems?.map((item) => (
//                 <ShoppingCartItem
//                   key={item._id}
//                   item={item}
//                   onProductLinkClicked={() => setSheetOpen(false)}
//                 />
//               ))}

//             </ul>
//             {cartQuery.isPending && (
//               <Loader2 className="mx-auto animate-spin" />
//             )}
//             {cartQuery.error && (
//               <p className="text-destructive">{cartQuery.error.message}</p>
//             )}

//             {!cartQuery.isPending && !cartQuery.data?.lineItems?.length && (
//               <div className="flex grow items-center justify-center text-center">
//                 <div className="space-y-1.5">
//                   <p className="text-lg font-semibold">Your cart is empty</p>
//                   <Link
//                     href="/shop"
//                     className="text-primary hover:underline"
//                     onClick={() => setSheetOpen(false)}
//                   >
//                     Start shopping now
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>
//           <hr />
//           <div className="flex items-center justify-between gap-5">
//             <div className="space-y-0.5">
//               <p className="text-sm">Subtotal amount:</p>
//               <p className="font-bold">

//                 {/* @ts-expect-error */}
//                 {cartQuery.data?.subtotal?.formattedConvertedAmount}
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 delivery fee and taxes calculated at checkout
//               </p>
//             </div>

//             {/* TEMP */}

//             <CheckoutButton className="lg"
//               disabled={!totalQuantity || cartQuery.isFetching}
//               size="lg"
//             />

//             {/* SHOPPING CART */}
//             <CheckoutButton
//             />
//           </div>
//         </SheetContent>
//       </Sheet>

//       </>
//   );
// }

// interface ShoppingCartItemProps {
//   item: currentCart.LineItem;
//   onProductLinkClicked: () => void;
// }

// function ShoppingCartItem({
//   item,
//   onProductLinkClicked,
// }: ShoppingCartItemProps) {

//   const updateQuantityMutation = useUpdateCartItemQuantity();

//   const removeItemMutation = useRemoveCartItem();

//   const productId = item._id;

//   if (!productId) return null;

//   const slug = item.url?.split("/").pop();

//     const quantityLimitReached =
//     !!item.quantity &&
//     !!item.availability?.quantityAvailable &&
//     item.quantity >= item.availability.quantityAvailable;

// return (
//   <li className="flex items-center gap-3">
//     <div className="relative size-fit flex-none">
//       <Link href={`/products/${slug}`} onClick={onProductLinkClicked} >
//         <WixImage
//           mediaIdentifier={item.image}
//           width={110}
//           height={110}
//           alt={item.productName?.translated || "Product image"}
//           className="flex-none bg-secondary"
//         />
//       </Link>

//      <button
//         className="absolute -right-1 -top-1 rounded-full border bg-background p-0.5"
//         onClick={() => removeItemMutation.mutate(productId)}
//       >
//         <X className="size-3" />
//       </button>

//       <div className="space-y-1.5 text-sm">
//         <Link href={`/products/${slug}`} onClick={onProductLinkClicked} >
//           <p className="font-bold">{item.productName?.translated || "Item"}</p>
//         </Link>
//         {!!item.descriptionLines?.length && (
//           <p>
//             {item.descriptionLines
//               .map(
//                 (line) =>
//                   line.colorInfo?.translated || line.plainText?.translated,
//               )
//               .join(", ")}
//           </p>
//         )}
//         <div className="flex items-center gap-2">
//           {item.quantity} x {item.price?.formattedConvertedAmount}
//           {item.fullPrice && item.fullPrice.amount !== item.price?.amount && (
//             <span className="text-muted-foreground line-through">
//               {item.fullPrice.formattedConvertedAmount}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>

//       <div className="flex items-center gap-1.5">
//        <Button
//           variant="outline"
//           size="sm"
//           disabled={item.quantity === 1}
//           onClick={() =>
//             updateQuantityMutation.mutate({
//               productId,
//               newQuantity: !item.quantity ? 0 : item.quantity - 1,
//             })
//           }
//         >
//           -
//         </Button>
//         <span>{item.quantity}</span>
//         <Button
//           variant="outline"
//           size="sm"
//           disabled={quantityLimitReached}
//           onClick={() =>
//             updateQuantityMutation.mutate({
//               productId,
//               newQuantity: !item.quantity ? 1 : item.quantity + 1,
//             })
//           }
//         >
//           +
//         </Button>
//         {quantityLimitReached && <span>Quantity limit reached</span>}
//       </div>

//   </li>
// );
// }

import CheckoutButton from "@/components/CheckoutButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import WixImage from "@/components/WixImage";
import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { Loader2, ShoppingCartIcon, X } from "lucide-react";
import Link from "next/link";
import { useCartDrawer } from "@/components/ui/CartDrawerContext"; // ✅ context import

interface ShoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}

export default function ShoppingCartButton({
  initialData,
}: ShoppingCartButtonProps) {
  const { isOpen, openDrawer, closeDrawer } = useCartDrawer(); // ✅ context use

  const cartQuery = useCart(initialData);

  const totalQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0,
    ) || 0;

  return (
    <>
      <div className="relative">
        <Button variant="ghost" size="icon" onClick={openDrawer}>
          <ShoppingCartIcon />
          <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {totalQuantity < 10 ? totalQuantity : "9+"}
          </span>
        </Button>
      </div>

      {/* ✅ global drawer control */}
      <Sheet
        open={isOpen}
        onOpenChange={(open) => (open ? openDrawer() : closeDrawer())}
      >
        <SheetContent className="flex flex-col sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>
              Your cart{" "}
              <span className="text-base">
                ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex grow flex-col space-y-5 overflow-y-auto pt-1">
            <ul className="space-y-5">
              {cartQuery.data?.lineItems?.map((item) => (
                <ShoppingCartItem
                  key={item._id}
                  item={item}
                  onProductLinkClicked={closeDrawer} // ✅ context fn
                />
              ))}
            </ul>
            {cartQuery.isPending && (
              <Loader2 className="mx-auto animate-spin" />
            )}
            {cartQuery.error && (
              <p className="text-destructive">{cartQuery.error.message}</p>
            )}
            {!cartQuery.isPending && !cartQuery.data?.lineItems?.length && (
              <div className="flex grow items-center justify-center text-center">
                <div className="space-y-1.5">
                  <p className="text-lg font-semibold">Your cart is empty</p>
                  <Link
                    href="/shop"
                    className="text-primary hover:underline"
                    onClick={closeDrawer} // ✅ close drawer
                  >
                    Start shopping now
                  </Link>
                </div>
              </div>
            )}
          </div>
          <hr />
          <div className="flex items-center justify-between gap-5">
            <div className="space-y-0.5">
              <p className="text-sm">Subtotal amount:</p>
              <p className="font-bold">
                {/* @ts-expect-error */}
                {cartQuery.data?.subtotal?.formattedConvertedAmount}
              </p>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
            </div>
            <CheckoutButton
              size="lg"
              disabled={!totalQuantity || cartQuery.isFetching}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface ShoppingCartItemProps {
  item: currentCart.LineItem;
  onProductLinkClicked: () => void;
}

function ShoppingCartItem({
  item,
  onProductLinkClicked,
}: ShoppingCartItemProps) {
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemMutation = useRemoveCartItem();

  const productId = item._id;
  if (!productId) return null;

  const slug = item.url?.split("/").pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  return (
    <li className="flex items-center gap-3">
      <div className="relative size-fit flex-none">
        <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
          <WixImage
            mediaIdentifier={item.image}
            width={110}
            height={110}
            alt={item.productName?.translated || "Product image"}
            className="flex-none bg-secondary"
          />
        </Link>
        <button
          className="absolute -right-1 -top-1 rounded-full border bg-background p-0.5"
          onClick={() => removeItemMutation.mutate(productId)}
        >
          <X className="size-3" />
        </button>
      </div>
      <div className="space-y-1.5 text-sm">
        <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
          <p className="font-bold">{item.productName?.translated || "Item"}</p>
        </Link>
        {!!item.descriptionLines?.length && (
          <p>
            {item.descriptionLines
              .map(
                (line) =>
                  line.colorInfo?.translated || line.plainText?.translated,
              )
              .join(", ")}
          </p>
        )}
        <div className="flex items-center gap-2">
          {item.quantity} x {item.price?.formattedConvertedAmount}
          {item.fullPrice && item.fullPrice.amount !== item.price?.amount && (
            <span className="text-muted-foreground line-through">
              {item.fullPrice.formattedConvertedAmount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            disabled={item.quantity === 1}
            onClick={() =>
              updateQuantityMutation.mutate({
                productId,
                newQuantity: !item.quantity ? 0 : item.quantity - 1,
              })
            }
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={quantityLimitReached}
            onClick={() =>
              updateQuantityMutation.mutate({
                productId,
                newQuantity: !item.quantity ? 1 : item.quantity + 1,
              })
            }
          >
            +
          </Button>
          {quantityLimitReached && <span>Quantity limit reached</span>}
        </div>
      </div>
    </li>
  );
}
