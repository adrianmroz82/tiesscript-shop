import Image from 'next/image';

import { PrefetchLink } from '@/components/prefetch-link';

interface Props {
  products: Product[] | null;
  category: Category['name'];
}

export function SimilarProducts({ products, category }: Props) {
  if (!products || products.length === 0) {
    return <></>;
  }

  return (
    <section className="mx-auto py-12">
      <h2 className="mb-8 mt-16 text-2xl font-bold tracking-tight">Similar products</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products.map(({ id, main_image, name, price }) => {
          return (
            <PrefetchLink
              href={`/category/${category}/${id}`}
              key={id}
              className="group overflow-hidden rounded bg-card shadow-sm"
            >
              {main_image && (
                <Image
                  className={
                    'w-full rounded-lg bg-neutral-100 object-cover object-center transition-opacity group-hover:opacity-80'
                  }
                  src={main_image}
                  width={300}
                  height={300}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                  alt="Product image"
                />
              )}
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold">{name}</h3>
                <div className="flex items-center justify-between">
                  <span>{price} currency</span>
                </div>
              </div>
            </PrefetchLink>
          );
        })}
      </div>
    </section>
  );
}
