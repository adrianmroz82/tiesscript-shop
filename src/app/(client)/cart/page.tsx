"use client";

import { CartItem } from "@/components/cart-item";
import { EmptyCart } from "@/components/empty-cart";
import { Button } from "@/components/shadcn-ui/button";
import { createOrder } from "@/lib/api/createOrder";
import { PaymentMethod } from "@/models/order.model";
import { useAppSelector } from "@/store/utils/redux-hooks";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCreateOrder = async () => {
    const paymentMethod: PaymentMethod = "PayPal";
    const paymentAmount = totalPrice;

    // TODO: handle plural number of products

    await createOrder({
      created_at: new Date().toISOString(),
      id: cart[0].id,
      productName: cart[0].name,
      paymentAmount,
      paymentMethod,
    });
  };

  return (
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
      <Button className="mt-8" variant="outline" onClick={handleCreateOrder}>
        Trigger Mock Order
      </Button>
    </div>
  );
}
