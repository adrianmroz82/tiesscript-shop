import { createClient } from '@/utils/supabase/client';

export async function deleteOffer(id: number) {
  const supabase = await createClient();

  return supabase.from('products').delete().eq('id', id);
}
