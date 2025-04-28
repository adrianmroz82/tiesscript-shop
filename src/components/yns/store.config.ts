import Accesories from "@/images/accesories2.png";
import Blazers1 from "@/images/blazers3.png";
import Shirts1 from "@/images/shirts2.png";
import Shoes from "@/images/shoes.png";
import Ties1 from "@/images/tiee5.png";

export const storeConfig = {
  categories: [
    { name: "Ties", slug: "ties", image: Ties1 },
    { name: "Blazers", slug: "blazers", image: Blazers1 },
    { name: "Shirts", slug: "shirts", image: Shirts1 },
    { name: "Accesories", slug: "accesories", image: Accesories },
    { name: "Shoes", slug: "shoes", image: Shoes },
  ],
};

export type StoreConfig = typeof storeConfig;
