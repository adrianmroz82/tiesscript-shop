import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getProducts() {
  const productsRef = collection(db, "items");
  const productsSnapshot = await getDocs(productsRef);

  const products = productsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return products;
}
