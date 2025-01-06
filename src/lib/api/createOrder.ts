import { addDoc, collection } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { Order } from "@/models/order.model";

export async function createOrder(order: Order) {
  const docRef = await addDoc(collection(db, "orders"), order);

  return docRef;
}
