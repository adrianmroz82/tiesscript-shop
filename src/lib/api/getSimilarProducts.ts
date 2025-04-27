import { createClient } from "@/utils/supabase/server";

export async function getSimilarProducts(category: string, limit: number = 5) {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .limit(limit)
    .order("created_at", { ascending: true });

  return products;
}
