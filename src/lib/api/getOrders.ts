import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { Order } from "@/models/order.model";

export async function getOrders() {
  const ordersRef = collection(db, "orders");
  const snapshot = await getDocs(ordersRef);

  const orders = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Order[];

  return orders;
}
