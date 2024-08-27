"use client";

import { ShoppingCart } from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";

import { CategoryMenuDrawer } from "./category-drawer";
import { ThemeSwitcher } from "./theme-switcher";

const spaceGroteskFont = localFont({ src: "../../public/fonts/space-grotesk-medium.ttf" });

export function Header() {
  return (
    <header className="bg-dark-500 p-6 shadow-lg rounded-lg h-[5rem]">
      <nav>
        <div className="flex items-center justify-between">
          <CategoryMenuDrawer />
          <div className={`${spaceGroteskFont.className} flex space-x-16 text-xl justify-between`}>
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <Link className="hover:underline" href="/product-form">
              Add new item
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
