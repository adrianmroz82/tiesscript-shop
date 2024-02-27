"use client";

import { collection, doc, getDoc, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { Input } from "@/components/ui/input";

import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

interface Item {
  name: string;
  price: number;
  length: number;
  width: number;
  src: string;
}
export default function About() {
  const [formData, setFormData] = useState<Item>({
    name: "",
    price: 0,
    length: 0,
    width: 0,
    src: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name);

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const citiesRef = collection(db, "items") as any;
  const [snapshot, loading, error] = useCollectionData<Item>(citiesRef);

  const handleAddDoc = async () => {
    try {
      const docRef = await addDoc(collection(db, "items"), formData);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <button onClick={handleAddDoc}>add doc</button>
      <form>
        <Input type="name" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <Input type="length" name="length" placeholder="Length" value={formData.length} onChange={handleInputChange} />
        <Input type="width" name="width" placeholder="Width" value={formData.width} onChange={handleInputChange} />
      </form>
      <h1>About</h1>
    </main>
  );
}
