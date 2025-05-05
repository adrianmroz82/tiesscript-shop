import { createClient } from '@/utils/supabase/server';

export async function getOrders() {
  // TODO: should it be clinet or server?

  const supabase = await createClient();
  const { data: orders } = await supabase.from('orders').select();

  return orders;
}
