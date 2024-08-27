import { PaginatedProductList } from "@/components/paginated-product-list";
import { getCollectionCount } from "@/lib/api/getCollectionCount";
import { getPaginatedProducts } from "@/lib/api/getPaginatedProducts";
import { Category } from "@/models/product.model";

interface Props {
  params: { category: string };
  searchParams: { page: string };
}

export default async function CategoryProducts({ params, searchParams }: Props) {
  const category = params.category as Category;
  const page = Number(searchParams.page) || 1;

  const products = await getPaginatedProducts(page, category);
  const count = await getCollectionCount();

  return <PaginatedProductList products={products} count={count} category={category} />;
}
