import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn-ui/drawer";
import { Button } from "@/components/shadcn-ui/button";

import { Menu, X } from "lucide-react";
import { getAllCategories } from "@/lib/api/getAllCategories";
import { CategoryMenuItems } from "@/components/category-menu-items";

export async function CategoryMenuDrawer() {
  const categories = await getAllCategories();

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
            <CategoryMenuItems categories={categories} />
          </div>
        </div>

        <DrawerFooter>
          <Button>Log in</Button>
          <DrawerDescription>
            <span>
              {`Don't have an account?`} <a href="/sign-up">Sign up</a>
            </span>
          </DrawerDescription>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
