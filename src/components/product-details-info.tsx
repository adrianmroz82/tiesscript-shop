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
    <Card className="shadow-xl m-6 p-8 w-[600px] border-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-4xl">{name}</CardTitle>
        <CardDescription className="text-xl text-gray-500">{description}</CardDescription>
      </CardHeader>
      <CardContent className="my-4">
        <h4 className="font-semibold text-xl">Price: {price} zł</h4>
        <p className="text-lg mt-2">Length: {length} cm</p>
        <p className="text-lg">Width: {width} cm</p>
        <div className="flex flex-col space-y-1.5 mt-8 gap-2">
          <Button
            className="w-3/5 p-[30px] text-lg rounded-[30px] font-helvetica"
            onClick={() => handleAddToCart(product)}>
            Add to cart
          </Button>
          <Button
            variant="outline"
            className="w-3/5 p-[30px] text-lg rounded-[30px] font-helvetica"
            onClick={() => handleAddToCart(product)}>
            Favorite
            <Heart className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
