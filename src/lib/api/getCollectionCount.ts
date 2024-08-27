import { collection, getCountFromServer } from "firebase/firestore";

import { db } from "@/firebase/firebase";

export async function getCollectionCount() {
  const collectionRef = collection(db, "items");
  const snapshot = await getCountFromServer(collectionRef);
  const count = snapshot.data().count;

  return count;
}
