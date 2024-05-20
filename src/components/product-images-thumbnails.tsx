import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./shadcn-ui/carousel";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductThumbnail } from "./thumbnail";

interface Props {
  productImages: { url: string }[]; // TODO: extract here and in Thumbnail
}

export function ProductImagesThumbnails({ productImages }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // TODO: extract to custom hook
    if (!api) {
      return;
    }

    setCurrentIndex(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex p-5 flex-col">
      {productImages?.map((productImage, index) => (
        <div key={index} className="h-[150px] w-auto ">
          <ProductThumbnail
            key={index}
            productImage={productImage}
            api={api}
            currentIndex={currentIndex}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
