// export type Category = "ties" | "blazers" | "shirts" | "pants" | "shoes" | "accessories";

// TODO: remove all occurrences
export type ProductImageUrl = string;

// TODO: remove all occurrences

export interface Product {
  id: string;
  name: string;
  price: number;
  length?: number;
  width?: number;
  createdAt?: string;
}
