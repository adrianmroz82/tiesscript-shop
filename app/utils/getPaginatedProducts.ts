import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getPaginatedProducts(currentPage: number, lastVisible: any, category: string) {
  const pageSize = 8;
  let productsQuery;

  const productsRef = collection(db, "items");

  if (currentPage === 1 || !lastVisible) {
    productsQuery = query(productsRef, where("category", "==", category), orderBy("name"), limit(pageSize));
  } else {
    productsQuery = query(
      productsRef,
      where("category", "==", category),
      orderBy("name"),
      startAfter(lastVisible),
      limit(pageSize)
    );
  }

  const documentSnapshots = await getDocs(productsQuery);
  const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  const products = documentSnapshots.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return { products, lastVisible: newLastVisible };
}
