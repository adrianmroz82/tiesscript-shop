import { PaginatedProductList } from "@/components/paginated-product-list";
import { getPaginatedProducts } from "@/lib/api/getPaginatedProducts";
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

  const category = params.category as Category["name"];
  const orderByField = getOrderByField();
  const page = Number(searchParams["page"] ?? "1");

  const { products, count } = await getPaginatedProducts(category, page, orderByField);

  if (!products || products.length === 0) {
    return (
      <div className="flex h-2/3 items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">No products related to {category} category have been found</h1>
      </div>
    );
  }

  return <PaginatedProductList products={products} count={count ?? 0} category={category} />;
}
