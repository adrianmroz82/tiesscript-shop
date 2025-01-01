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
    <div className={`w-32 h-32 flex p-2 ${index + 1 === currentIndex ? "border-2 border-slate-200" : ""}`}>
      <div className="w-full h-full relative">
        <Image
          src={productImage}
          alt="Product Image Thumbnail"
          layout="fill"
          objectFit="cover"
          onClick={() => api && api.scrollTo(index)}
        />
      </div>
    </div>
  );
}
