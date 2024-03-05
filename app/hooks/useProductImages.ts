import { useState, useEffect } from "react";
import { getProductImages } from "../utils/getProductImages";

export function useProductImages(productId: string) {
  const [productImages, setProductImages] = useState<
    {
      url: string;
    }[]
  >();

  useEffect(() => {
    const fetchProductImages = async () => {
      const images = await getProductImages(productId);

      if (images) {
        setProductImages(images as any);
      }
    };

    fetchProductImages();
  }, [productId]);

  return productImages;
}
