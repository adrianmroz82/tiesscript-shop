import { Menu, X } from "lucide-react";

import { CategoryMenuItems } from "@/components/category-menu-items";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn-ui/drawer";
import { storeConfig } from "@/components/yns/store.config";

export async function CategoryMenuDrawer() {
  const { categories } = storeConfig;

  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu className="cursor-pointer" size={32} />
      </DrawerTrigger>
      <DrawerContent className="h-screen top-0 left-0 right-auto mt-0 w-[500px] rounded-none">
        <DrawerClose className="px-5">
          <X size={32} />
        </DrawerClose>
        <div className="mx-auto w-full py-5">
          <DrawerHeader>
            <DrawerTitle>Categories</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-2 py-2 pb-2 mb-2">
            {categories && <CategoryMenuItems categories={categories} />}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
