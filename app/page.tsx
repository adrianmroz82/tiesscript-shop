"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ImageCard } from "@/components/image";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { QueryPagination } from "@/components/query-pagination";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useCollectionCount } from "./hooks/useCollectionCount";
import { useFetchPaginatedProducts } from "./hooks/useFetchPaginatedProducts";

export default function ProductsView() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { products, isLoading } = useFetchPaginatedProducts(currentPage);

  const { count } = useCollectionCount();

  const TOTAL_PAGES = Math.ceil(count / 10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const goToDetailsPage = (id: string) => () => {
    router.push(`/details/${id}`);
  };

  return (
    <main>
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
    </main>
  );
}
