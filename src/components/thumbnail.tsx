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
    <div
      className={`w-20 h-20 lg:w-28 lg:h-28 flex m-1 border rounded-md
        ${index + 1 === currentIndex && "border-2 border-slate-400"}`}>
      <div className="w-full h-full relative">
        <Image
          src={productImage}
          alt="Product Image Thumbnail"
          layout="fill"
          objectFit="cover"
          onClick={() => api && api.scrollTo(index)}
          className="border rounded"
          sizes="112px"
        />
      </div>
    </div>
  );
}
