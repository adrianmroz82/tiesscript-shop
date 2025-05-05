import { createClient } from '@/utils/supabase/server';

import { DataTable } from '../../components/DataTable/DataTable';
import { offerTableColumns } from './offer-columns';

export default async function OffersPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('*');

  if (!products?.length) {
    return <div className="w-full py-8 text-center">No products found</div>;
  }

  return (
    <div className="mx-auto my-8 w-[90%]">
      <h1 className="text-center text-3xl font-bold">{products.length}</h1>
      <DataTable columns={offerTableColumns} data={products} isPaginated />
    </div>
  );
}
