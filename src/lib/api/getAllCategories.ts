import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { Category } from "@/models/product.model";

export async function getAllCategories(): Promise<Category[]> {
  // this is a workaround to list all collections.
  // Collections stores categories list
  // TODO: collections vs categories
  const collectionRef = collection(db, "collections");
  const collectionSnapshot = await getDocs(collectionRef);

  const categories = collectionSnapshot.docs.flatMap((doc) => {
    return doc.data().collections;
  }) as Category[];

  return categories;
}
