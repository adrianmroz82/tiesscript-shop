import { ShoppingCart } from '@/components/cart/shopping-cart';
import { CategoryMenuDrawer } from '@/components/category-drawer';
import { PrefetchLink } from '@/components/prefetch-link';
// import { ThemeSwitcher } from "@/components/theme-switcher";

// TODO: move header data to storeConfig

export function Header() {
  return (
    <header className="backdrop-blur-xs nav-border-reveal sticky top-0 z-50 bg-white/90">
      <nav>
        <div className="flex items-center justify-between p-6">
          <CategoryMenuDrawer />
          <div className={'flex justify-between space-x-16 text-lg'}>
            <PrefetchLink href="/" className="hover:underline">
              Home
            </PrefetchLink>
          </div>
          <div className="flex space-x-8">
            <ShoppingCart />
            {/* <ThemeSwitcher /> */}
          </div>
        </div>
      </nav>
    </header>
  );
}
