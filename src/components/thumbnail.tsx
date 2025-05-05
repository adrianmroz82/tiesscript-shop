import Image from 'next/image';

import { CarouselApi } from '@/components/shadcn-ui/carousel';

interface Props {
  productImage: ResourceImageUrl;
  api: CarouselApi | undefined;
  currentIndex: number | undefined;
  index: number;
}

export function ProductThumbnail({ productImage, api, currentIndex, index }: Props) {
  return (
    <div
      className={`m-1 flex h-20 w-20 rounded-md border lg:h-24 lg:w-24 ${index + 1 === currentIndex && 'border-2 border-slate-400'}`}
    >
      <div className="cursor:pointer relative h-full w-full">
        <Image
          src={productImage}
          alt="Product Image Thumbnail"
          layout="fill"
          onClick={() => api && api.scrollTo(index)}
          className="rounded border object-cover"
          sizes="95px"
        />
      </div>
    </div>
  );
}
