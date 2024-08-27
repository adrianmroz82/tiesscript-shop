import { OrderByDirection } from "firebase/firestore";

export interface OrderByField {
  field: string;
  direction: OrderByDirection;
}