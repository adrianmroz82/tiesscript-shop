import { PaginatedProductList } from "@/components/paginated-product-list";
import { getCollectionCount } from "@/lib/api/getCollectionCount";
import { getPaginatedProducts } from "@/lib/api/getPaginatedProducts";
import { OrderByField } from "@/models/order-by-field.model";
import { Category } from "@/models/product.model";
import { createClient } from "@/utils/supabase/server";

interface Props {
  params: { category: string };
  searchParams: { page: string; orderBy: string };
}

export default async function CategoryProducts({ params, searchParams }: Props) {
  // const getOrderByField = (): OrderByField => {
  //   const field = searchParams["orderBy"] ?? "createdAtDesc";
  //   return {
  //     field: field.replace("Desc", ""),
  //     direction: field.includes("Desc") ? "desc" : "asc",
  //   };
  // };

  const category = params.category as Category;
  // const orderByField = getOrderByField();
  const page = Number(searchParams["page"] ?? "1");

  async function getProducts() {
    const supabase = await createClient();

    const { data: products } = await supabase.from("products").select("*");
    // where images[]
    // .order(orderByField.field, { ascending: orderByField.direction === "asc" })
    // .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    console.log(products, "products");

    return products;
  }

  const products = await getProducts();
  // const products = await getPaginatedProducts(page, category, orderByField);
  // const count = await getCollectionCount();
  const count = 100;

  return <PaginatedProductList products={products} count={count} category={category} />;
}
