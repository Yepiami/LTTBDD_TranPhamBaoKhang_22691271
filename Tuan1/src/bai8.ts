export class Product {
  constructor(public name: string, public price: number) {}
}

export const products: Product[] = [
  new Product("Phone", 200),
  new Product("Book", 50),
  new Product("Laptop", 1200)
];

export const expensive = products.filter(p => p.price > 100);
