import { createClient } from "@/utils/supabase/client";

export async function createOrder(order: Order) {
  const supabase = await createClient();
  return supabase.from("orders").insert(order);
}
