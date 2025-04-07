"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { DataTable } from "../../components/DataTable/DataTable";
import { offerTableColumns } from "./offer-columns";

export default function OffersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch products
  const fetchProducts = async () => {
    setIsLoading(true);
    const supabase = await createClient();
    const { data } = await supabase.from("products").select("*");

    if (data) {
      setProducts(data);
    }
    setIsLoading(false);
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handler to be called after deletion
  const handleProductDeleted = () => {
    fetchProducts();
  };

  if (isLoading) {
    return <div className="w-full py-8 text-center">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="w-full py-8 text-center">No products found</div>;
  }

  return (
    <div className="w-[90%] mx-auto my-8">
      <DataTable columns={offerTableColumns} data={products} isPaginated onDeleteSuccess={handleProductDeleted} />
    </div>
  );
}
