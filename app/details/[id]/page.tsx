"use client";

import { useParams } from "next/navigation";
import { ProductImagesCarousel } from "@/components/product-images-carousel";
import { ProductThumbnail } from "@/components/thumbnail";
import { useProductImages } from "../../hooks/useProductImages";
import { Card, CardContent } from "@/components/shadcn-ui/card";
import { getProduct } from "../../utils/getProduct";
import { useEffect } from "react";
import { useFetchProduct } from "../../hooks/useFetchProduct";
import { ProductDetailsInfo } from "@/components/product-details-info";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function DetailsPage() {
  const params = useParams<{ id: string }>();
  const productImages = useProductImages(params!.id);
  const { product, isLoading } = useFetchProduct(params!.id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <CardContent className="shadow-lg">
      <p>ID: {params?.id} </p>
      <div className="flex" style={{ border: "1px solid red" }}>
        <ProductImagesCarousel productImages={productImages!} />
        {/* <ProductImageThumbnail productImages={productImages!} /> */}
        <ProductDetailsInfo product={product} />
      </div>
    </CardContent>
  );
}
