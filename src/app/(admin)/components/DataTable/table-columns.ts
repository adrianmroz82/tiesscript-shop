import { ColumnDef } from "@tanstack/react-table";

export const orderTableColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Product Id",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "paymentAmount",
    header: "Payment Amount",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
];
