import { useState, useEffect } from "react";

import { getProductImages } from "../lib/api/getProductImages";

interface ProductImages {
  url: string;
}

export function useProductImages(productId: string) {
  const [productImages, setProductImages] = useState<ProductImages[]>();

  useEffect(() => {
    const fetchProductImages = async () => {
      const images = await getProductImages(productId);

      if (images) {
        setProductImages(images);
      }
    };

    fetchProductImages();
  }, [productId]);

  return productImages;
}
