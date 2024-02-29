"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

export function Header() {
  return (
    <header className={`bg-dark-500 p-6 shadow-lg rounded-lg`}>
      <nav className="flex items-center justify-between ">
        <div className="">
          <Link className="font-bold text-m" href="/">
            Logo
          </Link>
        </div>
        <div className="flex space-x-12 text-l font-bold justify-between">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="/about">
            About
          </Link>
          <Link className="hover:underline" href="/contact">
            Contact
          </Link>
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
