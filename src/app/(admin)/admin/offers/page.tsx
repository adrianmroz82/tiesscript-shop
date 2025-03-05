import { createClient } from "@/utils/supabase/client";

import { DataTable } from "../../components/DataTable/DataTable";
import { offerTableColumns } from "./offer-columns";

export default async function OffersPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*");

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <div className="w-[90%] mx-auto my-8">
      <DataTable columns={offerTableColumns} data={products} isPaginated />
    </div>
  );
}
