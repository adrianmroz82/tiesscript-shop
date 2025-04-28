"use client";

import { useState } from "react";

import { ProductCard } from "@/components/product-card";
import { QueryPagination } from "@/components/query-pagination";

interface Props {
  products: Product[];
  count: number;
  category: Category["name"];
}

export function PaginatedProductList({ products, count, category }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const TOTAL_PAGES = Math.ceil(count / 8);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} category={category} />
        ))}
      </ul>
      <div className="flex-shrink-0 mt-16">
        {TOTAL_PAGES > 1 && (
          <QueryPagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={TOTAL_PAGES} />
        )}
      </div>
    </>
  );
}
