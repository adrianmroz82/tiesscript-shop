"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { DataTableRowActions } from "./offers-table-row-actions";

export const offerTableColumns: ColumnDef<Product>[] = [
  {
    id: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        width={50}
        height={50}
        src={row.original.main_image}
        alt={row.original?.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Product Id",
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
