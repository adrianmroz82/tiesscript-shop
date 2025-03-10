export interface OrderByField {
  field: string;
  direction: any; // TODO: replace any
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
