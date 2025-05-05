import { AdCard } from '@/components/ad-card';
import { CategoryCard } from '@/components/category-card';
import { storeConfig } from '@/components/yns/store.config';

export default async function DashboardView() {
  return (
    <main className="mx-auto max-w-7xl">
      <AdCard />
      <section className="w-full py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {storeConfig.categories.map(({ slug, image: src }) => (
            <CategoryCard key={slug} slug={slug} src={src} />
          ))}
        </div>
      </section>
    </main>
  );
}
