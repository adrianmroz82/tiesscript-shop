"use client";

import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/shadcn-ui/card";
import { useFetchProducts } from "./hooks/useFetchProducts";
import { Images } from "@/components/images";

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
      <h1>Products</h1>
      {products?.map(({ id, name, width, length, price, images }) => (
        <Card key={id} onClick={goToDetailsPage(id)}>
          <CardContent className="flex items-center justify-center p-2">
            <div>
              <h2>{name}</h2>
              <p>{width}</p>
              <p>{length}</p>
              <p>{price}</p>
            </div>
            <Images images={images} />
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
