import { useEffect, useState } from "react";
import { getProduct } from "../utils/getProduct";
import { Product } from "../models/product.model";

interface Props {
  productId: string;
}

export function useFetchProduct({ productId }: Props) {
  // TODO check loadign state
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    length: 0,
    width: 0,
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
