import Image from 'next/image';

import { Card } from '@/components/shadcn-ui/card';

interface Props {
  url: string;
}

export function ImageCard({ url }: Props) {
  return (
    <Card className="p-2">
      <Image
        className="h-80 cursor-pointer justify-center object-cover align-middle"
        src={url}
        alt="Product Image"
        width={320}
        height={320}
      />
    </Card>
  );
}
