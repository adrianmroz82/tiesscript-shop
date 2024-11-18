"use client";

import { X as CloseIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/shadcn-ui/button";
import { useAppSelector } from "@/store/utils/redux-hooks";

export function CartToast() {
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);

  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  console.log(quantity);

  useEffect(() => {
    if (quantity > 0) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [quantity]);

  const handleRedirect = () => {
    router.push("/cart");
  };

  const handleVisibility = () => {
    setVisible((visible) => !visible);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed top-16 right-8 bg-white border border-secondary rounded-lg shadow-lg p-4 flex flex-col items-start z-50 gap-4 w-96">
      <div className="flex w-full items-center gap-2">
        <span data-testid="top-section-title">Item has been added to cart</span>
      </div>
      {cart.map(({ id, name, images, price }) => (
        <div className="flex items-center gap-4 w-11/12 border border-secondary p-2 rounded-lg" key={id}>
          <Image src={images[0]} alt={name} width={60} height={60} />
          <div className="flex-1">
            <div className="font-bold">{name}</div>
            <p>${price}</p>
          </div>
        </div>
      ))}
      <CloseIcon
        data-testid="close-icon"
        className="cursor-pointer absolute top-4 right-4"
        size={20}
        onClick={handleVisibility}
      />
      <Button onClick={handleRedirect}>View cart ({quantity})</Button>
    </div>
  );
}
