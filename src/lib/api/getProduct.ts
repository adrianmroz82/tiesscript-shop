import { createClient } from "@/utils/supabase/server";

export async function getProduct(productId: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data: product, error } = await supabase.from("products").select("*").eq("id", Number(productId)).single();
  console.log(product, "product");

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return product;
}
