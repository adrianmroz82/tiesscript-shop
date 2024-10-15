export type Category = "ties" | "blazers" | "shirts" | "pants" | "shoes" | "accessories";

export type ProductImageUrl = string;
export type ProductWithImages = Product & { images: ProductImageUrl[] };

export interface Product {
  id: string;
  name: string;
  price: number;
  length?: number;
  width?: number;
  createdAt?: string;
}
