import { X as RemoveIcon } from "lucide-react";
import Image from "next/image";

import { useCartActions } from "@/lib/hooks/useCartActions";
import { CartItem as CartItemProps } from "@/store/models/cart.model";

interface Props {
  cartItem: CartItemProps;
}

export function CartItem({ cartItem }: Props) {
  const { handleIncrementQuantity, handleDecrementQuantity, handleRemoveItem } = useCartActions();
  const { id, name, main_image, price, quantity } = cartItem;

  return (
    <li className="flex items-center mb-5 pb-5">
      <div className="w-20 h-20 flex m-1 border rounded">
        <div className="w-full h-full relative">
          <Image priority src={main_image} alt="Product Image Thumbnail" layout="fill" objectFit="cover" sizes="80px" />
        </div>
      </div>
      <div className="flex-1 ml-8">
        <h3 className="mb-2.5">{name}</h3>
        <div className="flex items-center">
          <span>Quantity:</span>
          <button
            data-testid="cart-item-decrement-button"
            className="mx-2 cursor-pointer border-none bg-slate-200 py-1 px-2"
            onClick={() => handleDecrementQuantity(id)}>
            -
          </button>
          <span>{quantity}</span>
          <button
            data-testid="cart-item-increment-button"
            className="mx-2 cursor-pointer border-none bg-slate-200 py-1 px-2"
            onClick={() => handleIncrementQuantity(id)}>
            +
          </button>
        </div>
      </div>
      <div className="ml-5 flex flex-col items-end">
        <RemoveIcon
          data-testid="remove-icon"
          className="cursor-pointer"
          size={24}
          onClick={() => handleRemoveItem(id)}
        />
        <p>${price} each</p>
        <p>Total: ${(price * quantity).toFixed(2)}</p>
      </div>
    </li>
  );
}
