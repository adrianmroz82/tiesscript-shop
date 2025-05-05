'use client';

import { ProductCard } from '@/components/product-card';
import { QueryPagination } from '@/components/query-pagination';

interface Props {
  products: Product[];
  count: number;
  category: Category['name'];
}

export function PaginatedProductList({ products, count, category }: Props) {
  const TOTAL_PAGES = Math.ceil(count / 8);

  return (
    <>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} category={category} />
        ))}
      </ul>
      <div className="mt-16 flex-shrink-0">{TOTAL_PAGES > 1 && <QueryPagination totalPages={TOTAL_PAGES} />}</div>
    </>
  );
}
