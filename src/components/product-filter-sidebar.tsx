import { Button } from '@/components/shadcn-ui/button';
import { Checkbox } from '@/components/shadcn-ui/checkbox';

export function ProductFilterSidebar() {
  return (
    <div className="w-1/6 bg-gray-100 p-4">
      <h2 className="mb-4 text-lg font-semibold">Filters</h2>
      <div className="mb-4">
        <label htmlFor="price-range" className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <input type="range" id="price-range" className="w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
          Categories
        </label>
        <Checkbox />
        <select id="categories" className="w-full rounded-md border-gray-300">
          <option>All Categories</option>
        </select>
      </div>
      <Button className="w-full">Apply Filters</Button>
    </div>
  );
}
