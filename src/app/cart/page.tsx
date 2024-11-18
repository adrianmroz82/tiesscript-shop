"use client";

import { CartItem } from "@/components/cart-item";
import { EmptyCart } from "@/components/empty-cart";
import { useAppSelector } from "@/store/utils/redux-hooks";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto bg-white mt-8 rounded-xl">
        <h3>Cart</h3>
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <ul className="list-none p-0">
            {cart.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <div className="text-right font-bold mt-8">Total Price: ${totalPrice.toFixed(2)}</div>
          </ul>
        )}
      </div>
    </>
  );
}
