import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./shadcn-ui/carousel";
import { Card, CardContent } from "./shadcn-ui/card";

import { useProductImages } from "../../app/hooks/useProductImages";
import Image from "next/image";

interface Props {
  productId: string;
}

export function ProductImages({ productId }: Props) {
  const productImages = useProductImages(productId);

  return (
    <Carousel className="w-full max-w-xl">
      <CarouselContent>
        {productImages?.map(({ url }, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    style={{ objectFit: "contain" }}
                    key={index}
                    src={url}
                    alt={`Product Image ${index + 1}`}
                    width={500}
                    height={500}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
