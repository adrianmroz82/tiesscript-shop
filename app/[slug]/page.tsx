"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { ImageCard } from "@/components/image";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { QueryPagination } from "@/components/query-pagination";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useCollectionCount } from "../hooks/useCollectionCount";
import { useFetchPaginatedProducts } from "../hooks/useFetchPaginatedProducts";

interface Props {
  params: { slug: string };
}

export default function ProductsView({ params }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const category = params.slug;

  const { products, isLoading } = useFetchPaginatedProducts(currentPage, category);


  const { count } = useCollectionCount();

  const TOTAL_PAGES = Math.ceil(count / 10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToDetailsPage = (id: string) => () => {
    router.push(`/details/${id}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
