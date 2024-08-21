export type Category = "ties" | "blazers";

export type ProductImage = { url: string };
export type ProductWithImages = Product & { images: ProductImage[] };

export interface Product {
  id: string;
  name: string;
  price: number;
  length: number;
  width: number;
  // images: string[]; // TODO: check { url: string }[];
  createdAt: Date;
  category: Category;
}
