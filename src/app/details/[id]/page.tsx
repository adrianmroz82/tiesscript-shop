"use client";

import { useParams } from "next/navigation";
import { ProductImagesCarousel } from "@/components/product-images-carousel";
import { useProductImages } from "@/hooks/useProductImages";
import { CardContent } from "@/components/shadcn-ui/card";
import { ProductDetailsInfo } from "@/components/product-details-info";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useFetchProduct } from "@/hooks/useFetchProduct";

export default function DetailsPage() {
  const params = useParams<{ id: string }>();
  const productImages = useProductImages(params!.id);
  const { product, isLoading } = useFetchProduct(params!.id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <CardContent className="shadow-lg">
      <div className="flex" style={{ border: "1px solid red" }}>
        <ProductImagesCarousel productImages={productImages!} />
        <ProductDetailsInfo product={product} />
      </div>
    </CardContent>
  );
}
