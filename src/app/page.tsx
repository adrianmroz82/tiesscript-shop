import { CategoryCard } from "@/components/category-card";
import { getAllCategories } from "@/lib/api/getAllCategories";

export default async function DashboardView() {
  const categories = await getAllCategories();

  return (
    <div className="flex flex-wrap items-center justify-center min-h-[50vh] gap-2 m-16">
      {categories.map((category) => (
        <CategoryCard key={category} category={category} />
      ))}
    </div>
  );
}
