"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./shadcn-ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function OrderBySelect() {

  const router = useRouter();
  const searchParams = useSearchParams()
  const pathName = usePathname();

  const options = [
    {
      displayName: 'Newest',
      field: 'createdAtDesc',
    },
    {
      displayName: 'Oldest',
      field: 'createdAt',
    },
    {
      displayName: 'Name',
      field: 'name',
    },
    {
      displayName: 'Name z-a',
      field: 'nameDesc',
    }
  ];

  const orderChange = (fieldName: string) => {
    const page = searchParams.get('page') ?? '1';
    router.push(`${pathName}?page=${page}&orderBy=${fieldName}`);
  };

  return (
    <>
      <Select onValueChange={orderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Order By" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.field} value={o.field}>
              {o.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}