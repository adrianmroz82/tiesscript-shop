import { EmptyState } from '@/components/empty-state';
import { OrderBySelect } from '@/components/order-by-select';
import { PaginatedProductList } from '@/components/paginated-product-list';
import { getPaginatedProducts } from '@/lib/api/getPaginatedProducts';
import { capitalize } from '@/lib/utils/capitalize';
import { OrderByField } from '@/models/order-by-field.model';

interface Props {
  params: { category: string };
  searchParams: { page: string; orderBy: string };
}

export default async function CategoryProducts({ params, searchParams }: Props) {
  console.log('CategoryProducts', params, searchParams);

  const getOrderByField = (): OrderByField => {
    const field = searchParams['orderBy'] ?? 'created_at_desc';
    return {
      field: field.replace('_desc', ''),
      ascending: !field.includes('desc'),
    };
  };

  const category = params.category as Category['name'];
  const orderByField = getOrderByField();
  const page = Number(searchParams['page'] ?? '1');

  const { products, count } = await getPaginatedProducts(category, page, orderByField);

  if (!products || products.length === 0) {
    return <EmptyState text={`No products related to ${category} category have been found`} />;
  }

  return (
    <main className="mx-auto max-w-7xl">
      <OrderBySelect />
      <div className="pt-8">
        <h2 className="text-2xl font-semibold">{capitalize(category)}</h2>
      </div>
      <PaginatedProductList products={products} count={count ?? 0} category={category} />
    </main>
  );
}
