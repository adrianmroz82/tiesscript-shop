"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImageCard } from "@/components/image";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { QueryPagination } from "@/components/query-pagination";
import { ProductWithImages } from "@/models/product.model";

interface Props {
  products: ProductWithImages[];
  count: number;
}

export function PaginatedProductList({ products, count }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const TOTAL_PAGES = Math.ceil(count / 10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToDetailsPage = (id: string) => () => {
    router.push(`/details/${id}`);
  };

  return (
    <>
      <div className="flex flex-wrap">
        {products?.map(({ id, images }) => (
          <div key={id} onClick={goToDetailsPage(id)} className="w-1/4 p-4 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center p-2">
              {images[0]?.url ? <ImageCard url={images[0]?.url} /> : <ImagePlaceholder />}
            </div>
          </div>
        ))}
      </div>
      <QueryPagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={TOTAL_PAGES} />
    </>
  );
}
