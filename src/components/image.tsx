import Image from "next/image";

import { Card } from "@/components/shadcn-ui/card";

interface Props {
  url: string;
}

export function ImageCard({ url }: Props) {
  return (
    <Card className="p-2">
      <Image
        className="object-contain justify-center align-middle cursor-pointer"
        src={url}
        alt="Product Image"
        width={350}
        height={350}
      />
    </Card>
  );
}
