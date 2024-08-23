export type Category = "ties" | "blazers" | "shirts" | "pants" | "shoes" | "accessories";

export type ProductImage = { url: string };
export type ProductWithImages = Product & { images: ProductImage[] };

export interface Product {
  id: string;
  name: string;
  price: number;
  length: number;
  width: number;
  createdAt: string;
  category: Category;
}
