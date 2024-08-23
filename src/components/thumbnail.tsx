import { ProductImage } from "@/models/product.model";
import Image from "next/image";

interface Props {
  productImage: ProductImage;
  api: any | undefined;
  currentIndex: number | undefined;
  index: number;
}

export function ProductThumbnail({ productImage, api, currentIndex, index }: Props) {
  return (
    <div className="w-32 flex p-2">
      <Image
        src={productImage.url}
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
