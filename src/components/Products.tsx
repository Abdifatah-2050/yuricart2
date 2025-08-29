
// eslint-disable-next-line @next/next/no-img-element


import { products } from "@wix/stores";
import Link from "next/link";
import { media as wixMedia } from "@wix/sdk";
import WixImage from "./WixImage";

import DiscountBadge from "./DiscountBadge";
import { formatCurrency } from "@/lib/utils";
import Badge from "./ui/badge";
// import DiscountBadge from "./DiscountBadge";




interface ProductProps {
  product: products.Product;
}


export default function Product({ product }: ProductProps) {
    const mainImage = product.media?.mainMedia?.image;
    
    // TEMP
    // const resizedImageUrl = mainImage?.url
    // ? wixMedia.getScaledToFillImageUrl(mainImage.url, 700, 700,{})
    // : null
    
  return (
    <Link href={`/products/${product.slug}`} className="h-full border bg-card">
          <div className="relative overflow-hidden">

              {/* TEMP
              <img
                  src={resizedImageUrl || "/placeholder.png"}
                  alt={mainImage?.altText || ''}
                  className="transition-transform duration-300 hover:scale-105"
              /> */}
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          width={700}
          height={700}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
          {product.ribbon && <Badge>{product.ribbon}</Badge>}
          <Badge className="bg-secondary font-semibold text-secondary-foreground">
            {getFormattedPrice(product)}
          </Badge>
          {product.discount && <DiscountBadge data={product.discount} />}
        </div>
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
      </div>
    </Link>
  );
}

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
}



