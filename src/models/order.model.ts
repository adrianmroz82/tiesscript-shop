export type PaymentMethod = "PayU" | "PayPal" | "Przelewy24";

export interface Order {
  id: string;
  productName: string;
  paymentMethod: PaymentMethod;
  paymentAmount: number;
}
