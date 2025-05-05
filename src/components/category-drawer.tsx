import { Menu, X } from 'lucide-react';

import { CategoryMenuItems } from '@/components/category-menu-items';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn-ui/drawer';
import { storeConfig } from '@/components/yns/store.config';

export function CategoryMenuDrawer() {
  const { categories } = storeConfig;

  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu className="cursor-pointer" size={28} />
      </DrawerTrigger>
      <DrawerContent className="left-0 right-auto top-0 mt-0 h-screen w-[500px] rounded-none">
        <DrawerClose className="px-5">
          <X size={28} />
        </DrawerClose>
        <div className="mx-auto w-full py-5">
          <DrawerHeader>
            <DrawerTitle>Categories</DrawerTitle>
          </DrawerHeader>
          <div className="mb-2 flex flex-col gap-2 py-2 pb-2">
            {categories && <CategoryMenuItems categories={categories} />}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
