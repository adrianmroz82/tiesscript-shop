import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { Product } from "../models/product.model";

export async function getProduct(productId: string): Promise<Product | null> {
  const productRef = doc(db, "items", productId);
  const productSnapshot = await getDoc(productRef);

  if (productSnapshot.exists()) {
    return { ...(productSnapshot.data() as Product), id: productSnapshot.id };
  }

  return null;
}
