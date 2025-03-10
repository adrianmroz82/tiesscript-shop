"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { DrawerClose } from "@/components/shadcn-ui/drawer";
import { capitalize } from "@/lib/utils/capitalize";

export function CategoryMenuItems({ categories }: { categories: Category[] }) {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  return (
    <>
      {categories.map(({ name, id }) => (
        <DrawerClose key={id}>
          <div
            onClick={() => handleCategoryClick(name)}
            className="hover:bg-muted cursor-pointer flex items-center rounded-lg h-12">
            <Image src={`/sidebar-menu-${name}.svg`} className="mx-4" alt={name} width={32} height={32} />
            <p>{capitalize(name)}</p>
          </div>
        </DrawerClose>
      ))}
    </>
  );
}
