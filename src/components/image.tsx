import Image from "next/image";

import { Card } from "@/components/shadcn-ui/card";

interface Props {
  url: string;
}

export function ImageCard({ url }: Props) {
  return (
    <Card className="p-2">
      <Image
        className="object-cover justify-center align-middle cursor-pointer h-80"
        src={url}
        alt="Product Image"
        width={320}
        height={320}
      />
    </Card>
  );
}
