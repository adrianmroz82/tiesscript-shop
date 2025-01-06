import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

export async function getProductImages(productId: string, limit?: number) {
  const storage = getStorage();
  const path = `products/${productId}/`;
  const listResult = await listAll(ref(storage, path));

  // Limit the number of items processed to the specified limit
  const imageUrls = await Promise.all(
    listResult.items.slice(0, limit).map(async (imgRef) => {
      return getDownloadURL(imgRef);
    })
  );

  return imageUrls;
}
