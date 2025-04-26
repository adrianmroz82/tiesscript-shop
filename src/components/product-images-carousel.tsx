"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn-ui/carousel";
import { ProductThumbnail } from "@/components/thumbnail";
import { ProductImageUrl } from "@/models/product.model";

interface Props {
  productImages: ProductImageUrl[];
}

export function ProductImagesCarousel({ productImages }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentIndex(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div className="flex flex-col">
        {productImages?.map((productImage, index) => (
          <div key={index} className=" w-auto ">
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

      <div className="max-w-xl flex items-center">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {productImages?.map((productImage, index) => (
              <CarouselItem key={index} tabIndex={2}>
                <div className="p-2">
                  <div className="flex relative aspect-square justify-center">
                    <Image
                      // TODO: RWD design
                      // TODO: apply proper img sizes
                      priority={index === 0}
                      src={productImage}
                      alt={`Product Image ${index + 1}`}
                      width={560}
                      height={560}
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1920px) 33vw, 560px"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute right-72 bottom-10 rounded-full bg-white/80 hover:bg-white backdrop-blur shadow">
            <CarouselPrevious />
          </div>
          <div className="absolute right-20 bottom-10 rounded-full bg-white/80 hover:bg-white backdrop-blur shadow">
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </>
  );
}
