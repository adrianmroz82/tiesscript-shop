import { PaginatedProductList } from "@/components/paginated-product-list";
import { Category } from "@/models/product.model";
import { getPaginatedProducts } from "@/lib/api/getPaginatedProducts";
import { getCollectionCount } from "@/lib/api/getCollectionCount";

interface Props {
  params: { category: string };
  searchParams: { page: string };
}

export default async function CategoryProducts({ params, searchParams }: Props) {
  const category = params.category as Category;
  const page = Number(searchParams.page) || 1;

  const products = await getPaginatedProducts(page, category);
  const count = await getCollectionCount();

  return <PaginatedProductList products={products} count={count} />;
}
