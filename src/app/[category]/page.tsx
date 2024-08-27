import { PaginatedProductList } from "@/components/paginated-product-list";
import { getCollectionCount } from "@/lib/api/getCollectionCount";
import { getPaginatedProducts } from "@/lib/api/getPaginatedProducts";
import { Category } from "@/models/product.model";
import { OrderByField } from "@/models/order-by-field.model";

interface Props {
  params: { category: string };
  searchParams: { page: string; orderBy: string };
}

export default async function CategoryProducts({ params, searchParams }: Props) {
  const getOrderByField = (): OrderByField => {
    const field = searchParams["orderBy"] ?? "createdAtDesc";
    return {
      field: field.replace("Desc", ""),
      direction: field.includes("Desc") ? "desc" : "asc",
    };
  };

  const category = params.category as Category;
  const orderByField = getOrderByField();
  const page = Number(searchParams["page"] ?? "1");

  const products = await getPaginatedProducts(page, category, orderByField);
  const count = await getCollectionCount();

  return <PaginatedProductList products={products} count={count} category={category} />;
}
