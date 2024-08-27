"use client";

import { sortOptions } from "@/models/order-by-field.model";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn-ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function OrderBySelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const defaultOrderBy = searchParams.get("orderBy") ?? "createdAtDesc";

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
          {sortOptions.map((o) => (
            <SelectItem key={o.field} value={o.field}>
              {o.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
