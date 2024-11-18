"use client";

import localFont from "next/font/local";
import Link from "next/link";

import { ShoppingCart } from "@/components/cart/shopping-cart";
import { CategoryMenuDrawer } from "@/components/category-drawer";
import { ThemeSwitcher } from "@/components/theme-switcher";

const spaceGroteskFont = localFont({ src: "../../public/fonts/space-grotesk-medium.ttf" });

export function Header() {
  return (
    <header className="fixed bg-white top p-6 shadow-lg rounded-lg h-[5rem] w-full">
      <nav>
        <div className="flex items-center justify-between">
          <CategoryMenuDrawer />
          <div className={`${spaceGroteskFont.className} flex space-x-16 text-xl justify-between`}>
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <Link className="hover:underline" href="/add-product-form">
              Add new product
            </Link>
            <Link className="hover:underline" href="/contact">
              Contact
            </Link>
          </div>
          <div className="flex space-x-8">
            <ShoppingCart />
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
