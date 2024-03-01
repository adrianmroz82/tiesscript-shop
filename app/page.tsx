"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "./firebase/firebase";

import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent } from "@/components/shadcn-ui/card";
import Image from "next/image";

async function getProducts() {
  const productsRef = collection(db, "items");
  const productsSnapshot = await getDocs(productsRef);

  const products = productsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return products;
}

export default function ProductsView() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productIds = await getProducts();
      console.log("🚀 ~ fetchProducts ~ productIds:", productIds);
      setProducts(productIds);
    };

    fetchProducts();
  }, []);

  console.log("🚀 ~ products", products);

  return (
    <main>
      <h1>Products</h1>
      {products.map((product, index) => (
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            {/* <Image
              style={{ objectFit: "contain" }}
              key={index}
              src={product.}
              alt={`Product Image ${index + 1}`}
              width={500}
              height={500}
            /> */}
          </CardContent>
        </Card>
        // <div key={product.id}>
        //   <p>{product.name}</p>
        // </div>
      ))}
    </main>
  );
}
