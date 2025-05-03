"use client";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { PrefetchLink } from "@/components/prefetch-link";
import { Button } from "@/components/shadcn-ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn-ui/carousel";
import { ThumbnailList } from "@/components/thumbnail-list";
import { useBreakpoint } from "@/lib/hooks/use-mobile";

interface Props {
  productImages: ResourceImageUrl[];
}

export function ProductImagesCarousel({ productImages }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isMobile, isTablet } = useBreakpoint();

  const showHorizontalThumbnails = !isMobile && !isTablet;
  const showVerticalThumbnails = isMobile || isTablet;

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
    <Carousel className="flex flex-col lg:flex-row gap-4" setApi={setApi}>
      {showHorizontalThumbnails && (
        <ThumbnailList productImages={productImages} api={api} currentIndex={currentIndex} />
      )}

      <div className="max-w-xl flex items-center relative">
        <CarouselContent>
          {productImages.map((productImage, index) => (
            <CarouselItem key={index} tabIndex={2}>
              <div className="flex relative aspect-square justify-center">
                <Image
                  priority={index === 0}
                  src={productImage}
                  alt={`Product Image ${index + 1}`}
                  width={560}
                  height={560}
                  className="w-full rounded-lg bg-neutral-100 object-cover object-center group-hover:opacity-80 transition-opacity"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1920px) 33vw, 560px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/80 hover:bg-white backdrop-blur shadow">
          <PrefetchLink href={`?image=0`} scroll={false}>
            <Button variant="outline" className="h-12 w-12 rounded-full">
              <Maximize2 className="h-4 w-4" />
              <span className="sr-only">Fullscreen</span>
            </Button>
          </PrefetchLink>
        </div>

        <div className="absolute right-72 bottom-10 rounded-full bg-white/80 hover:bg-white backdrop-blur shadow">
          <CarouselPrevious />
        </div>
        <div className="absolute right-20 bottom-10 rounded-full bg-white/80 hover:bg-white backdrop-blur shadow">
          <CarouselNext />
        </div>
      </div>

      {showVerticalThumbnails && <ThumbnailList productImages={productImages} api={api} currentIndex={currentIndex} />}
    </Carousel>
  );
}
