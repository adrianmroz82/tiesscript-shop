"use client";

import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CartToast } from "@/components/cart-toast";
import { ImageCard } from "@/components/image";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { OrderBySelect } from "@/components/order-by-select";
// import { ProductFilterSidebar } from "@/components/product-filter-sidebar";
import { QueryPagination } from "@/components/query-pagination";
import { Button } from "@/components/shadcn-ui/button";
import { addToCart } from "@/store/features/cartSlice";
import { useAppDispatch } from "@/store/utils/redux-hooks";

interface Props {
  products: Product[];
  count: number;
  category: Category["name"];
}

const font = localFont({
  src: "../../public/fonts/CooperLtBT-Bold.ttf",
});

export function PaginatedProductList({ products, count, category }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const TOTAL_PAGES = Math.ceil(count / 10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToDetailsPage = (id: string) => {
    router.push(`/${category}/${id}`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      {/* <ProductFilterSidebar /> */}
      <div className="flex-1 flex flex-col items-center">
        <div className="flex-grow w-full">
          <OrderBySelect />
          <div className="flex flex-wrap">
            {products?.map((product) => (
              <div key={product.id} className="w-1/4 p-12 flex flex-col items-center justify-between">
                <div
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => goToDetailsPage(String(product.id))}>
                  {product.main_image ? <ImageCard url={product.main_image} /> : <ImagePlaceholder />}
                </div>
                <div className="flex flex-col items-center mt-2">
                  {/* TODO: extract font */}
                  <div className={`${font.className} text-xl`}>{product.name}</div>
                  <div className="text-xl">${product.price}</div>
                  <Button className="mt-4" onClick={() => handleAddToCart(product)}>
                    Add to cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0">
          <QueryPagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={TOTAL_PAGES} />
        </div>
      </div>
      <CartToast />
    </div>
  );
}
