import Image from "next/image";

interface Props {
  products: Product[] | null;
}

export function SimilarProducts({ products }: Props) {
  if (!products || products.length === 0) {
    return <></>;
  }

  return (
    <section className="py-12 mx-auto">
      <h2 className="text-2xl font-bold tracking-tight mt-16 mb-8">Similar products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map(({ id, main_image, name, price }) => {
          return (
            <div key={id} className="bg-card rounded overflow-hidden shadow-sm group">
              {main_image && (
                // <PrefetchLink href={`${publicUrl}${product.link}`} className="block" prefetch={false}>
                <Image
                  className={
                    "w-full rounded-lg bg-neutral-100 object-cover object-center group-hover:opacity-80 transition-opacity"
                  }
                  src={main_image}
                  width={300}
                  height={300}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                  alt=""
                />
                // </PrefetchLink>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{name}</h3>
                <div className="flex items-center justify-between">
                  <span>{price} currency</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
