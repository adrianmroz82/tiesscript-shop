import Image from "next/image";
import { Card, CardContent } from "./shadcn-ui/card";

interface Props {
  images: { url: string }[];
}

export function Images({ images }: Props) {
  return (
    <>
      {images?.map(({ url }, index) => (
        <Card className="p-2" key={url}>
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
      ))}
    </>
  );
}
