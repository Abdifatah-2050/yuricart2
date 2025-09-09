// import { useAddItemToCart } from "@/hooks/cart";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { ShoppingCartIcon } from "lucide-react";
// import LoadingButton from "./LoadingButton";
import { Button, ButtonProps } from "./ui/button";
import { addToCart } from "@/wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import LoadingButton from "./LoadingButton";
import { useAddItemToCart } from "@/hooks/cart";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const mutation = useAddItemToCart();

  return (
    <LoadingButton
      onClick={() =>
        mutation.mutate({
          product,
          selectedOptions,
          quantity,
        })
      }
      loading={mutation.isPending}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <ShoppingCartIcon />
      Add to cart
    </LoadingButton>
  );

  // ////TEMP////
  // return (
  //     <LoadingButton
  //     onClick={() =>
  //         addToCart( wixBrowserClient,{
  //      product,
  //     selectedOptions,
  //     quantity,
  //         })}
  // loading={true}
  //     {...props}
  // >
  //     Add to cart
  //     </LoadingButton>
  // )
}
//   return (
//     <LoadingButton
//       onClick={() =>
//         mutation.mutate({
//           product,
//           selectedOptions,
//           quantity,
//         })
//       }
//       loading={mutation.isPending}
//       className={cn("flex gap-3", className)}
//       {...props}
//     >
//       <ShoppingCartIcon />
//       Add to cart
//     </LoadingButton>
//   );
// }
