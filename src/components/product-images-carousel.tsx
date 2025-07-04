'use client';

import { Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { PrefetchLink } from '@/components/prefetch-link';
import { Button } from '@/components/shadcn-ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn-ui/carousel';
import { ThumbnailList } from '@/components/thumbnail-list';

interface Props {
  productImages: ResourceImageUrl[];
}

export function ProductImagesCarousel({ productImages }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentIndex(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel className="flex flex-col gap-4 lg:flex-row" setApi={setApi}>
      <div className="hidden lg:block">
        <ThumbnailList productImages={productImages} api={api} currentIndex={currentIndex} />
      </div>

      <div className="relative flex w-full items-center md:max-w-xl">
        <CarouselContent>
          {productImages.map((productImage, index) => (
            <CarouselItem key={index} tabIndex={2}>
              <div className="relative mx-auto aspect-square xs:w-[250px] sm:w-[400px] md:w-[576px]">
                <Image
                  src={productImage}
                  alt={`Product Image ${index + 1}`}
                  fill
                  className="w-full rounded-lg bg-neutral-100 object-cover object-center"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/80 shadow backdrop-blur hover:bg-white">
          <PrefetchLink href={`?image=${currentIndex - 1}`} scroll={false}>
            <Button variant="outline" className="h-12 w-12 rounded-full">
              <Maximize2 className="h-4 w-4" />
              <span className="sr-only">Fullscreen</span>
            </Button>
          </PrefetchLink>
        </div>

        <div className="absolute bottom-10 right-72 rounded-full bg-white/80 shadow backdrop-blur hover:bg-white">
          <CarouselPrevious />
        </div>
        <div className="absolute bottom-10 right-20 rounded-full bg-white/80 shadow backdrop-blur hover:bg-white">
          <CarouselNext />
        </div>
      </div>

      <div className="block lg:hidden">
        <ThumbnailList productImages={productImages} api={api} currentIndex={currentIndex} />
      </div>
    </Carousel>
  );
}
