"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { DrawerClose } from "@/components/shadcn-ui/drawer";
import { capitalize } from "@/lib/utils/capitalize";
import { Category } from "@/models/product.model";

export function CategoryMenuItems({ categories }: { categories: Category[] }) {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  return (
    <>
      {categories.map((category) => (
        <DrawerClose key={category}>
          <div
            onClick={() => handleCategoryClick(category)}
            className="hover:bg-muted cursor-pointer flex items-center rounded-lg h-12">
            <Image src={`/sidebar-menu-${category}.svg`} className="mx-4" alt={category} width={32} height={32} />
            <p>{capitalize(category)}</p>
          </div>
        </DrawerClose>
      ))}
    </>
  );
}
