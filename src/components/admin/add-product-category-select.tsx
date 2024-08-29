import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn-ui/select";
import { Category } from "@/models/product.model";

interface Props {
  categories: Category[];
  value: Category;
  onChange: (_value: Category) => void;
}

export function AddProductCategorySelect({ categories, value, onChange }: Props) {
  return (
    <div className="space-y-1.5 ">
      <label htmlFor="category">Category</label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
