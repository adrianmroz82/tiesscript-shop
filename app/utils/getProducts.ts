import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getProducts() {
  const productsRef = collection(db, "items");
  const productsSnapshot = await getDocs(productsRef);

  // TODO sort by date, first add Date.now() to the product object
  // const products = productsSnapshot.docs.map((doc) => ({
  // const q = query(collection(db, "items"), orderBy("date", "desc"));


  const products = productsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return products;
}
