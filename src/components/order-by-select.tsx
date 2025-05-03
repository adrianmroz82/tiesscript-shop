"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";
import { sortOptions } from "@/models/order-by-field.model";

export function OrderBySelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const defaultOrderBy = searchParams.get("orderBy") ?? "created_at_desc";

  const handleOrderChange = (fieldName: string) => {
    const page = searchParams.get("page") ?? "1";
    router.push(`${pathName}?page=${page}&orderBy=${fieldName}`);
  };

  return (
    <>
      <Select onValueChange={handleOrderChange} defaultValue={defaultOrderBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Order By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order By</SelectLabel>
            {sortOptions.map((o) => (
              <SelectItem key={o.field} value={o.field}>
                {o.displayName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
