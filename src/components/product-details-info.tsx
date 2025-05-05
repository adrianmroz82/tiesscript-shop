'use client';

import { Heart } from 'lucide-react';

import { Button } from '@/components/shadcn-ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { addToCart } from '@/store/features/cartSlice';
import { useAppDispatch } from '@/store/utils/redux-hooks';

interface Props {
  product: Product;
}

export function ProductDetailsInfo({ product }: Props) {
  const dispatch = useAppDispatch();

  const { name, description, price, length, width } = product;

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="border-none shadow-transparent sm:w-full lg:m-6 lg:mx-auto xl:w-[600px] xl:p-8">
      <CardHeader className="pb-4">
        <CardTitle className="font-medium sm:text-xl md:text-2xl lg:text-3xl">{name}</CardTitle>
        <p className="text-lg font-medium lg:text-xl">Price: {price} zł</p>
      </CardHeader>
      <CardContent className="my-4 px-6">
        <CardDescription className="text-xl text-gray-500">{description}</CardDescription>
        <p className="lg:text-lg">Length: {length} cm</p>
        <p className="lg:text-lg">Width: {width} cm</p>
        <div className="mt-8 flex flex-col gap-2 space-y-1.5">
          <Button className="w-full rounded-[30px] p-[30px] text-lg lg:w-3/5" onClick={() => handleAddToCart(product)}>
            Add to cart
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-[30px] p-[30px] text-lg lg:w-3/5"
            onClick={() => handleAddToCart(product)}
          >
            Favorite
            <Heart className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
