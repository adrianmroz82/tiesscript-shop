export interface OrderByField {
  field: string;
  ascending: boolean;
}

export const sortOptions: Record<'displayName' | 'field', string>[] = [
  {
    displayName: 'Latest',
    field: 'created_at_desc',
  },
  {
    displayName: 'Oldest',
    field: 'created_at',
  },
  {
    displayName: 'Highest price',
    field: 'price_desc',
  },
  {
    displayName: 'Lowest price',
    field: 'price',
  },
];
