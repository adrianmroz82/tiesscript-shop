import Image, { type ImageProps } from 'next/image';

import { PrefetchLink } from '@/components/prefetch-link';
import { capitalize } from '@/lib/utils/capitalize';

interface Props {
  slug: string;
  src: ImageProps['src'];
}

export function CategoryCard({ slug, src }: Props) {
  return (
    <PrefetchLink href={`/category/${slug}`} className="group relative">
      <div className="relative overflow-hidden rounded-lg bg-neutral-50/50 p-4">
        <Image
          alt="Cover image"
          className="scale-105 object-cover transition-all group-hover:scale-100 group-hover:opacity-75"
          sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 392px"
          src={src}
        />
      </div>
      <div className="justify-end gap-4 p-4 text-center text-neutral-600">
        <h3 className="text-xl font-semibold tracking-tight">{capitalize(slug)}</h3>
        <p>Shop Now</p>
      </div>
    </PrefetchLink>
  );
}
