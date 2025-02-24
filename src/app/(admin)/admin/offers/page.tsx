import {} from "@tanstack/react-table";
import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/firebase";
import { getAllCategories } from "@/lib/api/getAllCategories";
import { Category } from "@/models/product.model";

import { DataTable } from "../../components/DataTable/DataTable";
import { offerTableColumns } from "./offer-columns";

async function getOffers(categories: Category[]) {
  // TODO: convert to client component and use onSnapshot to get real-time updates?
  const data = [];

  for (const category of categories) {
    const categoryRef = collection(db, category);
    const categorySnapshot = await getDocs(categoryRef);

    const categoryData = categorySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      category,
    }));

    data.push(...categoryData);
  }

  return data;
}

export default async function OffersPage() {
  const categories = await getAllCategories();
  const offers = await getOffers(categories);

  return (
    <div className="w-[90%] mx-auto my-8">
      <DataTable columns={offerTableColumns} data={offers} isPaginated />
    </div>
  );
}
