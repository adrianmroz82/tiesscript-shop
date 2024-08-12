import { useEffect, useState } from "react";
import { getProduct } from "../lib/api/getProduct";
import { Product } from "../models/product.model";

export function useFetchProduct(productId: string) {
  // TODO check loadign state
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    length: 0,
    width: 0,
    createdAt: new Date(),
    category: "ties",
    images: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(productId);

      if (product) {
        setProduct(product);
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  return { product, isLoading };
}
