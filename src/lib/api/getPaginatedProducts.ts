import { collection, getDocs, query, limit, where, orderBy, startAfter, DocumentData, Query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Category, Product } from "@/models/product.model";
import { getProductImages } from "@/lib/api/getProductImages";

export async function getPaginatedProducts(currentPage: number, category: Category, lastVisibleDoc = null) {
  const PAGE_SIZE = 4;

  const productsRef = collection(db, "items");

  let productsQuery;

  if (currentPage === 1) {
    // First page query
    productsQuery = query(productsRef, where("category", "==", category), orderBy("name"), limit(PAGE_SIZE));
  } else {
    // For pages greater than 1, calculate the starting point by fetching all previous pages
    let previousSnapshot = null;
    let lastVisible = null;

    for (let i = 1; i < currentPage; i++) {
      const tempQuery: Query<DocumentData> = lastVisible
        ? query(
            productsRef,
            where("category", "==", category),
            orderBy("name"),
            startAfter(lastVisible),
            limit(PAGE_SIZE)
          )
        : query(productsRef, where("category", "==", category), orderBy("name"), limit(PAGE_SIZE));

      previousSnapshot = await getDocs(tempQuery);
      lastVisible = previousSnapshot.docs[previousSnapshot.docs.length - 1];
    }

    productsQuery = query(
      productsRef,
      where("category", "==", category),
      orderBy("name"),
      startAfter(lastVisible),
      limit(PAGE_SIZE)
    );
  }

  const snapshot = await getDocs(productsQuery);

  const products = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Product[];

  const productPromises = products.map(async (product) => {
    const images = await getProductImages(product.id);
    return { ...product, images };
  });

  const productsWithImages = await Promise.all(productPromises);

  return productsWithImages;
}
