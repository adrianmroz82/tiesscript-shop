import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function useCollectionCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCollectionCount = async () => {
      const collectionRef = collection(db, "items");
      const snapshot = await getCountFromServer(collectionRef);
      const count = snapshot.data().count;

      setCount(count);
    };

    fetchCollectionCount();
  }, []);

  return { count };
}
