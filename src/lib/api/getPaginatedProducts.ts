import { OrderByField } from "@/models/order-by-field.model";
import { createClient } from "@/utils/supabase/server";

const PAGE_SIZE = 8;

export async function getPaginatedProducts(category: any, page: number, _orderByField: OrderByField) {
  const supabase = await createClient();

  const { data: products, count } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("category", category)
    .order(_orderByField.field, { ascending: _orderByField.ascending })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  return { products, count };
}
