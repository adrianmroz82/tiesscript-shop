"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

// function Block() {
//   return (
//     <div className="bg-gray-200 shadow-lg w-[250px] h-[8rem]">
//       <Link className="hover:underline" href="/">
//         Home
//       </Link>
//     </div>
//   );
// }

export function Header() {
  return (
    <header className="bg-dark-500 p-6 shadow-lg rounded-lg h-[6rem]">
      <nav className="flex items-center justify-between">
        <Link className="font-bold text-xl" href="/">
          Logo
        </Link>
        <div className="flex space-x-16 text-xl font-bold justify-between">
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
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
