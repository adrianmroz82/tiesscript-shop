import { useEffect, useState } from "react";
import { getProducts } from "../utils/getProducts";
import { getProductImages } from "../utils/getProductImages";

export function useFetchProducts() {
  const [products, setProducts] = useState<any[]>([]); // TODO: adjust interface once its known
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productIds = await getProducts();
        const productPromises = productIds.map(async (productId) => {
          const images = await getProductImages(productId.id);
          return { ...productId, images };
        });

        const productsWithImages = await Promise.all(productPromises);
        setProducts(productsWithImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading };
}
