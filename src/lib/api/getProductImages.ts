import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

export async function getProductImages(productId: string) {
  const storage = getStorage();
  const path = `products/${productId}/`;
  const listResult = await listAll(ref(storage, path));

  const imageUrls = await Promise.all(
    listResult.items.map(async (imgRef) => {
      return getDownloadURL(imgRef);
    })
  );

  return imageUrls;
}
