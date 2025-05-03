import Image from "next/image";

import { CarouselApi } from "@/components/shadcn-ui/carousel";

interface Props {
  productImage: ResourceImageUrl;
  api: CarouselApi | undefined;
  currentIndex: number | undefined;
  index: number;
}

export function ProductThumbnail({ productImage, api, currentIndex, index }: Props) {
  return (
    <div
      className={`w-20 h-20 lg:w-24 lg:h-24 flex m-1 border rounded-md
        ${index + 1 === currentIndex && "border-2 border-slate-400"}`}>
      <div className="w-full h-full relative cursor:pointer">
        <Image
          src={productImage}
          alt="Product Image Thumbnail"
          layout="fill"
          onClick={() => api && api.scrollTo(index)}
          className="border rounded object-cover "
          sizes="95px"
        />
      </div>
    </div>
  );
}
