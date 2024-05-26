import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getPaginatedProducts(currentPage: number, lastVisible: any) {
  const pageSize = 8;
  let productsQuery;

  if (currentPage === 1 || !lastVisible) {
    productsQuery = query(collection(db, "items"), orderBy("name"), limit(pageSize));
  } else {
    productsQuery = query(collection(db, "items"), orderBy("name"), startAfter(lastVisible), limit(pageSize));
  }

  const documentSnapshots = await getDocs(productsQuery);
  const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  const products = documentSnapshots.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return { products, lastVisible: newLastVisible };
}
