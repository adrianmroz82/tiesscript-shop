import { ColumnDef } from "@tanstack/react-table";

import { Order } from "@/models/order.model";

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
