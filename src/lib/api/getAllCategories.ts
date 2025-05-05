import { createClient } from '@/utils/supabase/server';

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select();

  return categories || [];
}
