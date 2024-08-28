import Image from "next/image";

import { CarouselApi } from "@/components/shadcn-ui/carousel";
import { ProductImageUrl } from "@/models/product.model";

interface Props {
  productImage: ProductImageUrl;
  api: CarouselApi | undefined;
  currentIndex: number | undefined;
  index: number;
}

export function ProductThumbnail({ productImage, api, currentIndex, index }: Props) {
  return (
    <div className="w-32 flex p-2">
      <Image
        src={productImage}
        alt="Product Image Thumbnail"
        style={{ objectFit: "contain" }}
        width={500}
        height={500}
        onClick={() => api && api.scrollTo(index)}
        className={`${index + 1 === currentIndex && "border-2 border-slate-500"}`}
      />
    </div>
  );
}
