import { ShoppingCart } from "@/components/cart/shopping-cart";
import { CategoryMenuDrawer } from "@/components/category-drawer";
import { ThemeSwitcher } from "@/components/theme-switcher";

import { PrefetchLink } from "./yns/prefetch-link";

// TODO: move header data to storeConfig

export function Header() {
  return (
    <header className="z-50 p-6 sticky top-0 bg-white/90 backdrop-blur-xs nav-border-reveal">
      <nav>
        <div className="flex items-center justify-between">
          <CategoryMenuDrawer />
          <div className={"flex space-x-16 text-lg justify-between"}>
            <PrefetchLink href="/" className="hover:underline">
              Home
            </PrefetchLink>
            <PrefetchLink href="/add-product-form" className="hover:underline">
              Add new product
            </PrefetchLink>
            <PrefetchLink href="/contact" className="hover:underline">
              Contact
            </PrefetchLink>
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
