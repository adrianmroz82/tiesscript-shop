import { getOrders } from "@/lib/api/getOrders";
import { createClient } from "@/utils/supabase/server";

import { DataTable } from "../../components/DataTable/DataTable";
import { orderTableColumns } from "../../components/DataTable/table-columns";

export default async function AdminPage() {
  const orders = await getOrders();

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  if (!orders) {
    return <div>No orders found</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <div className="w-[90%] mx-auto my-8">{<DataTable columns={orderTableColumns} data={orders} />}</div>
    </div>
  );
}
