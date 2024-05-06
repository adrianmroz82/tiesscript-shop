"use client";

import { useParams } from "next/navigation";
import { ProductImages } from "@/components/product-images";

export default function DetailsPage() {
  const params = useParams<{ id: string }>();

  return (
    <>
      <h1>Details Page</h1>
      <p>ID: {params?.id} </p>
      <ProductImages productId={params!.id} />
    </>
  );
}
