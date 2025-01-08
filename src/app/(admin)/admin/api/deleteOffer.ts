import { deleteDoc, doc } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { Category } from "@/models/product.model";

export async function deleteOffer(id: string, category: Category) {
  const productRef = doc(db, category, id);

  await deleteDoc(productRef);
}
