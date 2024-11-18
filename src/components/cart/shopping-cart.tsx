"use client";

import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/store/utils/redux-hooks";

export function ShoppingCart() {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);

  const numOfProductsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleRedirect = () => {
    router.push("/cart");
  };

  return (
    <div data-testid="shopping-cart" onClick={handleRedirect} className="relative inline-block cursor-pointer">
      <ShoppingCartIcon size={32} className="cursor-pointer" />
      {numOfProductsInCart > 0 && (
        <div className="absolute -top-2 -right-2 rounded-full py-1 px-2 text-xs bg-blue-600 text-white">
          {numOfProductsInCart}
        </div>
      )}
    </div>
  );
}
