import { useEffect, useState } from 'react';

import { CarouselApi, CarouselDown, CarouselUp } from '@/components/shadcn-ui/carousel';
import { ProductThumbnail } from '@/components/thumbnail';
import { useBreakpoint } from '@/lib/hooks/use-mobile';

interface Props {
  api: CarouselApi | undefined;
  currentIndex: number | undefined;
  productImages: Resource['images'];
}

export function ThumbnailList({ productImages, api, currentIndex }: Props) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const { isMobile } = useBreakpoint();

  const visibleCount = isMobile ? 2 : 4;
  const visibleImages = productImages.slice(scrollIndex, scrollIndex + visibleCount);

  useEffect(() => {
    if (typeof currentIndex !== 'number') {
      return;
    }

    const idealScrollStart = currentIndex - Math.floor(visibleCount / 2);
    const boundedScrollStart = Math.max(0, Math.min(idealScrollStart, productImages.length - visibleCount));

    if (scrollIndex !== boundedScrollStart) {
      setScrollIndex(boundedScrollStart);
    }
  }, [currentIndex, visibleCount, scrollIndex, productImages.length]);

  return (
    <div className="flex items-center justify-center gap-2 xs:flex-row lg:flex-col">
      <CarouselUp className="lg:hidden" orientation="horizontal" />
      <CarouselUp className="xs:hidden lg:flex" orientation="vertical" />
      <div className="flex gap-2 overflow-hidden transition-transform duration-300 ease-in-out xs:flex-row lg:flex-col">
        {visibleImages.map((productImage, index) => {
          const realIndex = scrollIndex + index;
          return (
            <ProductThumbnail
              key={realIndex}
              productImage={productImage}
              api={api}
              currentIndex={currentIndex}
              index={realIndex}
            />
          );
        })}
      </div>
      <CarouselDown className="lg:hidden" orientation="horizontal" />
      <CarouselDown className="xs:hidden lg:flex" orientation="vertical" />
    </div>
  );
}
