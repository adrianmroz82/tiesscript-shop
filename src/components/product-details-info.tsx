import Image from "next/image";
import { Product } from "../../app/models/product.model";
import { Button } from "./shadcn-ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./shadcn-ui/card";
import ShoppingCartIcon from "../assets/cart-icon.svg";

interface Props {
  product: Product;
}

export function ProductDetailsInfo({ product }: Props) {
  const { name, price, length, width } = product;

  return (
    <>
      <Card className="shadow-lg m-6 p-8 w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl">{name}</CardTitle>
          <CardDescription className="text-xl text-gray-500">This is a short description</CardDescription>
        </CardHeader>
        <CardContent className="my-4">
          <h4 className="font-semibold text-2xl">Price: {price} zł</h4>
          <p className="text-md text-gray-500 mt-2">Length: {length} cm</p>
          <p className="text-md text-gray-500 mt-2">Width: {width} cm</p>
          <div className="flex flex-col space-y-1.5">
            <Button className="mt-8 w-1/4 bg-[#5009DC] text-md font-bold">
              Add to cart
              <Image className="fill-white" src={ShoppingCartIcon} alt="Add to cart" width={24} height={24} />
            </Button>
            <Button variant="secondary" className="mt-8 w-1/4  text-md font-bold">
              Dodaj do ulubionych
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
