"use client";

import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/shadcn-ui/card";
import { useFetchProducts } from "./hooks/useFetchProducts";
import { ImageCard } from "@/components/image";
import { ImagePlaceholder } from "@/components/image-placeholder";

export default function ProductsView() {
  const { products, isLoading } = useFetchProducts();

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
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
    </main>
  );
}
