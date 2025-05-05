import { createClient } from '@/utils/supabase/server';

export async function getProductImages(productId: string) {
  const supabase = await createClient();
  const { data: resources } = await supabase.from('resources').select('*').eq('id', Number(productId)).single();

  return resources?.images;
}
