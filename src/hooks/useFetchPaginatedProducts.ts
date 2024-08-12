import { useEffect, useState } from "react";
import { getProductImages } from "../lib/api/getProductImages";
import { getPaginatedProducts } from "../lib/api/getPaginatedProducts";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export function useFetchPaginatedProducts(currentPage: number, category: string) {
  const [products, setProducts] = useState<any[]>([]); // TODO adjust type
  const [isLoading, setIsLoading] = useState(true);
  const [lastVisibleDocs, setLastVisibleDocs] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([]); // To track lastVisible for each page

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        // Get the last visible document for the current page
        const lastVisible = currentPage > 1 ? lastVisibleDocs[currentPage - 2] : null;

        const { products, lastVisible: newLastVisible } = await getPaginatedProducts(
          currentPage,
          lastVisible,
          category
        );

        const productPromises = products.map(async (product) => {
          const images = await getProductImages(product.id);
          return { ...product, images };
        });

        const productsWithImages = await Promise.all(productPromises);
        setProducts(productsWithImages);

        // Update the lastVisibleDocs array with the new last visible document
        if (currentPage > lastVisibleDocs.length) {
          setLastVisibleDocs([...lastVisibleDocs, newLastVisible]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, currentPage, lastVisibleDocs]);

  return { products, isLoading };
}
