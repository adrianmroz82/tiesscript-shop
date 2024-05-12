import Image from "next/image";
import { Card, CardContent } from "./shadcn-ui/card";

export function ProductThumbnail({ productImage }: { productImage: any }) {
  console.log(productImage);

  const IMG_SRC = "/no-image-placeholder.svg";

  return (
    <Card className="w-32 flex">
      <CardContent>
        <Image style={{ objectFit: "contain" }} src={productImage.url} alt="Product Image" width={500} height={500} />
      </CardContent>
    </Card>
  );
}
