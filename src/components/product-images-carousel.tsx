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

      <div className="relative w-full max-w-xl flex items-center">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {productImages?.map((productImage, index) => (
              <CarouselItem key={index} tabIndex={2}>
                <div className="p-1">
                  <div className="flex aspect-square justify-center">
                    <Image
                      // TODO: main image does not load faster
                      priority={index === 0}
                      src={productImage}
                      alt={`Product Image ${index + 1}`}
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute left-0 top-1/2">
            <CarouselPrevious />
          </div>
          <div className="absolute right-0 top-1/2">
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </>
  );
}
