import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn-ui/select";

import { type StoreConfig, storeConfig } from "../yns/store.config";

interface Props {
  categories: StoreConfig["categories"];
  value: Category["name"];
  onChange: (_value: Category["name"]) => void;
}

export function AddProductCategorySelect({ value, onChange }: Props) {
  const { categories } = storeConfig;

  return (
    <div className="space-y-1.5 ">
      <label htmlFor="category">Category</label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(({ name }) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
