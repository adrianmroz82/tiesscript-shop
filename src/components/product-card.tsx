import Image from 'next/image';

import { PrefetchLink } from '@/components/prefetch-link';
import { Button } from '@/components/shadcn-ui/button';
import { addToCart } from '@/store/features/cartSlice';
import { useAppDispatch } from '@/store/utils/redux-hooks';

interface Props {
  product: Product;
  category: Category['name'];
  index: number;
}

export function ProductCard({ product, category, index }: Props) {
  const { main_image, id, name, price } = product;
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <li key={id}>
      <article className="flex h-full flex-col rounded border bg-white">
        <PrefetchLink className="group" href={`/category/${category}/${id}`}>
          {main_image && (
            <Image
              className="group-hover:rotate hover-perspective w-full bg-neutral-100 object-contain transition-opacity group-hover:opacity-75"
              src={main_image}
              width={300}
              height={450}
              loading={index < 3 ? 'eager' : 'lazy'}
              priority={index < 3}
              sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 300px"
              alt=""
            />
          )}
          <div className="min-h-28 p-4">
            <h2 className="font-medium text-neutral-700 md:text-sm lg:text-base">{name}</h2>
            <p className="mt-1 text-sm text-neutral-700">{price}</p>
          </div>
        </PrefetchLink>
        <Button className="mt-4" onClick={() => handleAddToCart(product)}>
          Add to cart
        </Button>
      </article>
    </li>
  );
}
