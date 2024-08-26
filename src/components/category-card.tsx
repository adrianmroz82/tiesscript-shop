"use client";

import localFont from "next/font/local";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/shadcn-ui/card";
import { Category } from "@/models/product.model";

interface Props {
  category: Category;
}

// todo: absolute path
const spaceGroteskFont = localFont({ src: "../../public/fonts/space-grotesk-medium.ttf" });

export function CategoryCard({ category }: Props) {
  const router = useRouter();

  const goToCategory = (category: Category) => {
    router.push(`/${category}`);
  };

  return (
    <Card
      onClick={() => goToCategory(category)}
      className="flex min-w-[20rem] h-[30rem] rounded-none bg-stone-800 hover:bg-stone-700 text-white cursor-pointer items-center justify-center">
      <CardContent className={`${spaceGroteskFont.className} text-center text-xl`}>
        {category.toUpperCase()}
      </CardContent>
    </Card>
  );
}
