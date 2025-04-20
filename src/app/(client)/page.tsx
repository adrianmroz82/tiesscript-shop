import { AdCard } from "@/components/ad-card";
import { CategoryBox } from "@/components/yns/category-box";
import { storeConfig } from "@/components/yns/store.config";

export default async function DashboardView() {
  return (
    <main>
      <AdCard />

      <section className="w-full py-8">
        <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
          {storeConfig.categories.map(({ slug, image: src }) => (
            <CategoryBox key={slug} categorySlug={slug} src={src} />
          ))}
        </div>
      </section>
    </main>
  );
}
