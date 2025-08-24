import { Product } from "./bai8";

export class Order {
  constructor(public products: Product[] = []) {}

  totalPrice(): number {
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }
}
