"use client";

import { capitalize } from "@/lib/utils/capitalize";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CategoryMenuItems({ categories }: { categories: string[] }) {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/${category}`);
  };

  return (
    <>
      {categories.map((category) => (
        <div
          onClick={() => handleCategoryClick(category)}
          key={category}
          className="hover:bg-muted cursor-pointer flex items-center rounded-lg h-12">
          <Image src={`/sidebar-menu-${category}.svg`} className="mx-4" alt={category} width={32} height={32} />
          <p>{capitalize(category)}</p>
        </div>
      ))}
    </>
  );
}
