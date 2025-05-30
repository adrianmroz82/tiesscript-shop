import { OrderByField } from '@/models/order-by-field.model';
import { createClient } from '@/utils/supabase/server';

const PAGE_SIZE = 8;

export async function getPaginatedProducts(category: Category['name'], page: number, orderByField: OrderByField) {
  const supabase = await createClient();

  const { data: products, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .eq('category', category.toLowerCase())
    .order(orderByField.field, { ascending: orderByField.ascending })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  return { products, count };
}
