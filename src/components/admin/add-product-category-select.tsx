import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn-ui/select";

import { type StoreConfig } from "../yns/store.config";

interface Props {
  categories: StoreConfig["categories"];
  value: Category["name"];
  onChange: (_value: Category["name"]) => void;
}

export function AddProductCategorySelect({ value, onChange, categories }: Props) {
  return (
    <div className="space-y-1.5 ">
      <label htmlFor="category">Category</label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(({ slug }) => (
            <SelectItem key={slug} value={slug}>
              {slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
