import { createClient } from "@/utils/supabase/client";

export async function deleteOffer(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting offer:", error);
    return;
  }

  console.log("Offer deleted:", data);
}
