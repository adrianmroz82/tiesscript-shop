import { useEffect, useState } from "react";

import { CarouselApi, CarouselDown, CarouselUp } from "@/components/shadcn-ui/carousel";
import { ProductThumbnail } from "@/components/thumbnail";
import { useBreakpoint } from "@/lib/hooks/use-mobile";
import { ProductImageUrl } from "@/models/product.model";

interface Props {
  api: CarouselApi | undefined;
  currentIndex: number | undefined;
  productImages: ProductImageUrl[];
}

export function ThumbnailList({ productImages, api, currentIndex }: Props) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const { isMobile, isTablet } = useBreakpoint();
  const isHorizontal = isMobile || isTablet;

  const visibleCount = isMobile ? 2 : 4;
  const visibleImages = productImages.slice(scrollIndex, scrollIndex + visibleCount);

  useEffect(() => {
    if (typeof currentIndex !== "number") {
      return;
    }

    const idealScrollStart = currentIndex - Math.floor(visibleCount / 2);
    const boundedScrollStart = Math.max(0, Math.min(idealScrollStart, productImages.length - visibleCount));

    if (scrollIndex !== boundedScrollStart) {
      setScrollIndex(boundedScrollStart);
    }
  }, [currentIndex, visibleCount, scrollIndex, productImages.length]);

  return (
    <div
      className={`flex justify-center ${isHorizontal ? "flex-row items-center gap-2" : "flex-col items-center gap-2"}`}>
      <CarouselUp orientation={isMobile || isTablet ? "horizontal" : "vertical"} />
      <div
        className={`overflow-hidden transition-transform duration-300 ease-in-out ${
          isHorizontal ? "flex flex-row gap-2" : "flex flex-col gap-2"
        }`}>
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
      <CarouselDown orientation={isHorizontal ? "horizontal" : "vertical"} />
    </div>
  );
}
