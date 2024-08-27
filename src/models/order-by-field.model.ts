import { OrderByDirection } from "firebase/firestore";

export interface OrderByField {
  field: string;
  direction: OrderByDirection;
}

export const sortOptions: Record<"displayName" | "field", string>[] = [
  {
    displayName: "Latest",
    field: "createdAtDesc",
  },
  {
    displayName: "Oldest",
    field: "createdAt",
  },
  {
    displayName: "Highest price",
    field: "priceDesc",
  },
  {
    displayName: "Lowest price",
    field: "price",
  },
];
