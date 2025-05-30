export type Category = 'electronics' | 'jewelery' | "men's clothing" | "women's clothing";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  main_image: string;
}
