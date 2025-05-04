"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn-ui/card";
import { addToCart } from "@/store/features/cartSlice";
import { useAppDispatch } from "@/store/utils/redux-hooks";

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
    <Card className="lg:m-6 xl:p-8 sm:w-full xl:w-[600px] border-none lg:mx-auto shadow-transparent">
      <CardHeader className="pb-4">
        <CardTitle className="sm:text-xl md:text-2xl lg:text-3xl font-medium">{name}</CardTitle>
        <p className="font-medium text-lg lg:text-xl">Price: {price} zł</p>
      </CardHeader>
      <CardContent className="my-4 px-6">
        <CardDescription className="text-xl text-gray-500">{description}</CardDescription>
        <p className="lg:text-lg">Length: {length} cm</p>
        <p className="lg:text-lg">Width: {width} cm</p>
        <div className="flex flex-col space-y-1.5 mt-8 gap-2">
          <Button className="w-full lg:w-3/5 p-[30px] text-lg rounded-[30px]" onClick={() => handleAddToCart(product)}>
            Add to cart
          </Button>
          <Button
            variant="outline"
            className="w-full lg:w-3/5 p-[30px] text-lg rounded-[30px]"
            onClick={() => handleAddToCart(product)}>
            Favorite
            <Heart className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
