"use client";

import { useEffect, useState } from "react";
import { db } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent } from "@/components/shadcn-ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProductImages } from "./utils/getProductImages";

async function getProducts() {
  const productsRef = collection(db, "items");
  const productsSnapshot = await getDocs(productsRef);

  const products = productsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return products;
}

export default function ProductsView() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const productIds = await getProducts();
      const productPromises = productIds.map(async (productId) => {
        const images = await getProductImages(productId.id);
        return { ...productId, images };
      });

      try {
        const productsWithImages = await Promise.all(productPromises);
        setProducts(productsWithImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product images:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function Images({ images }: { images: { url: string }[] }) {
    return (
      <>
        {images?.map((image, index) => (
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <Image
                  style={{ objectFit: "contain" }}
                  key={index}
                  src={image.url}
                  alt={`Product Image ${index + 1}`}
                  width={500}
                  height={500}
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </>
    );
  }

  const handleClick = (id: string) => () => {
    router.push(`/details/${id}`);
  };

  return (
    <main>
      <h1>Products</h1>
      {products?.map(({ id, name, width, length, price, images }) => (
        <Card key={id} onClick={handleClick(id)}>
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
