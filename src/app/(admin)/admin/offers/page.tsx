"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { DataTable } from "../../components/DataTable/DataTable";
import { offerTableColumns } from "./offer-columns";

export default async function OffersPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*");

  if (!products?.length) {
    return <div className="w-full py-8 text-center">No products found</div>;
  }

  return (
    <div className="w-[90%] mx-auto my-8">
      <h1 className="text-3xl font-bold text-center">{products.length}</h1>
      <DataTable columns={offerTableColumns} data={products} isPaginated />
    </div>
  );
}
