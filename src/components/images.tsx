import Image from "next/image";

import { Card, CardContent } from "@/components/shadcn-ui/card";
import { ProductImageUrl } from "@/models/product.model";

interface Props {
  images: ProductImageUrl[];
}

export function Images({ images }: Props) {
  return (
    <>
      {images?.map((imageUrl, index) => (
        <Card className="p-2" key={imageUrl}>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <Image
              className="object-contain cursor-pointer"
              key={index}
              src={imageUrl}
              alt={`Product Image ${index + 1}`}
              width={500}
              height={500}
            />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
