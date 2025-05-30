import Image from 'next/image';

import { Card, CardContent } from '@/components/shadcn-ui/card';

interface Props {
  images: Resource['images'];
}

export function Images({ images }: Props) {
  return (
    <>
      {images?.map((imageUrl, index) => (
        <Card className="p-2" key={imageUrl}>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <Image
              className="cursor-pointer object-contain"
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
