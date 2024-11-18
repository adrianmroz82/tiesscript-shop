import { collection, DocumentData, getDocs, limit, orderBy, Query, query, startAfter, where } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { getProductImages } from "@/lib/api/getProductImages";
import { OrderByField } from "@/models/order-by-field.model";
import { Category, Product } from "@/models/product.model";

const PAGE_SIZE = 40;

export async function getPaginatedProducts(currentPage: number, category: Category, order: OrderByField) {
  const productsRef = collection(db, category);

  let productsQuery;

  if (currentPage === 1) {
    productsQuery = query(productsRef, orderBy(order.field, order.direction), limit(PAGE_SIZE));
  } else {
    // For pages greater than 1, calculate the starting point by fetching all previous pages
    let previousSnapshot = null;
    let lastVisible = null;

    for (let i = 1; i < currentPage; i++) {
      const tempQuery: Query<DocumentData> = lastVisible
        ? query(productsRef, orderBy(order.field, order.direction), startAfter(lastVisible), limit(PAGE_SIZE))
        : query(productsRef, orderBy(order.field, order.direction), limit(PAGE_SIZE));

      previousSnapshot = await getDocs(tempQuery);
      lastVisible = previousSnapshot.docs[previousSnapshot.docs.length - 1];
    }

    productsQuery = query(
      productsRef,
      where("category", "==", category),
      orderBy(order.field, order.direction),
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
