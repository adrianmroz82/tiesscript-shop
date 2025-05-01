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
    <Card className="shadow-xl lg:m-6 lg:p-8 sm:w-full lg:w-[600px] border-none">
      <CardHeader className="pb-4">
        <CardTitle className="sm:text-2xl md:text-3xl lg:text-4xl font-medium">{name}</CardTitle>
        <CardDescription className="text-xl text-gray-500">{description}</CardDescription>
      </CardHeader>
      <CardContent className="my-4 px-6">
        <h4 className="font-medium text-xl">Price: {price} zł</h4>
        <p className="text-lg mt-2">Length: {length} cm</p>
        <p className="text-lg">Width: {width} cm</p>
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
