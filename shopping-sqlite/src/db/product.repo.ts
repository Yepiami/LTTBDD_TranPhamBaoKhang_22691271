import { db } from "./db";
import { Product } from "../models/types";

export async function getAllProducts(): Promise<Product[]> {
  return await db.queryAll<Product>(`SELECT * FROM products ORDER BY product_id`);
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return (await db.queryOne<Product>(`SELECT * FROM products WHERE product_id=?`, [id])) ?? undefined;
}

export async function reduceStock(productId: string, qty: number) {
  await db.run(
    `UPDATE products SET stock = stock - ? WHERE product_id=? AND stock >= ?`,
    [qty, productId, qty]
  );
}
