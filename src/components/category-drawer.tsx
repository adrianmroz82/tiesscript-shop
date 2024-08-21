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
import { Button } from "./shadcn-ui/button";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import * as React from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function CategoryMenuDrawer() {
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
            <DrawerTitle>Theme Color Options</DrawerTitle>
            <DrawerDescription>
              * Selected option will be applied to all layout elements (navbar, toolbar, etc.). You can also create your
              own theme options and color schemes.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-2 py-2 pb-2 mb-2">
            <div className="hover:bg-muted cursor-pointer flex items-center justify-center rounded-lg h-16">
              <Image src="/sidebar-menu-ties.svg" alt="Ties" width={32} height={32} />
              <p>Image 1</p>
            </div>
            <div className="hover:bg-muted cursor-pointer flex items-center justify-center rounded-lg h-16">
              <Image src="/sidebar-menu-blazer.svg" alt="Ties" width={32} height={32} />
              <p>Image 2</p>
            </div>
            <div className="hover:bg-muted cursor-pointer flex items-center justify-center rounded-lg h-16">
              <p>Image 3</p>
            </div>

            <div className="hover:bg-muted cursor-pointer flex items-center justify-center rounded-lg h-16">
              <p>FAQ</p>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <Button>Log in</Button>
          <DrawerDescription>
            Selected option will be applied to all layout elements (navbar, toolbar, etc.). You can also create your own
            theme options and color schemes.
          </DrawerDescription>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
