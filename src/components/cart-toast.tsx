'use client';

import { X as CloseIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/shadcn-ui/button';
import { useAppSelector } from '@/store/utils/redux-hooks';

export function CartToast() {
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);

  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

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
    router.push('/cart');
  };

  const handleVisibility = () => {
    setVisible((visible) => !visible);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed right-8 top-16 z-50 flex w-96 flex-col items-start gap-4 rounded-lg border border-secondary bg-white p-4 shadow-lg">
      <div className="flex w-full items-center gap-2">
        <span data-testid="top-section-title">Item has been added to cart</span>
      </div>
      {cart.map(({ id, name, main_image, price }) => (
        <div className="flex w-11/12 items-center gap-4 rounded-lg border border-secondary p-2" key={id}>
          <Image src={main_image} alt={name} width={60} height={60} />
          <div className="flex-1">
            <div className="font-bold">{name}</div>
            <p>${price}</p>
          </div>
        </div>
      ))}
      <CloseIcon
        data-testid="close-icon"
        className="absolute right-4 top-4 cursor-pointer"
        size={20}
        onClick={handleVisibility}
      />
      <Button onClick={handleRedirect}>View cart ({quantity})</Button>
    </div>
  );
}
