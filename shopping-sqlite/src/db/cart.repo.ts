import { db } from "./db";
import { CartItemRow, CartItemView } from "../models/types";
import { getProduct } from "./product.repo";

export async function addToCart(productId: string) {
  const p = await getProduct(productId);
  if (!p) throw new Error("Sản phẩm không tồn tại");

  const existing = await db.queryOne<{ qty: number }>(
    `SELECT qty FROM cart_items WHERE product_id=?`,
    [productId]
  );
  const currentQty = existing?.qty ?? 0;
  const nextQty = currentQty + 1;
  if (nextQty > p.stock) throw new Error("Vượt quá tồn kho");

  if (currentQty === 0) {
    await db.run(`INSERT INTO cart_items(product_id,qty) VALUES(?,?)`, [productId, 1]);
  } else {
    await db.run(`UPDATE cart_items SET qty=? WHERE product_id=?`, [nextQty, productId]);
  }
}

export async function updateCartQtyById(id: number, nextQty: number) {
  if (nextQty <= 0) throw new Error("Số lượng phải > 0");

  const row = await db.queryOne<CartItemRow>(`SELECT * FROM cart_items WHERE id=?`, [id]);
  if (!row) throw new Error("Dòng giỏ không tồn tại");

  const p = await getProduct(row.product_id);
  if (!p) throw new Error("Sản phẩm không tồn tại");
  if (nextQty > p.stock) throw new Error("Vượt quá tồn kho");

  await db.run(`UPDATE cart_items SET qty=? WHERE id=?`, [nextQty, id]);
}

export async function removeCartItem(id: number) {
  await db.run(`DELETE FROM cart_items WHERE id=?`, [id]);
}

export async function clearCart() {
  await db.run(`DELETE FROM cart_items`);
}

export async function getCartView(): Promise<CartItemView[]> {
  const rows = await db.queryAll<CartItemView>(`
    SELECT 
      c.id,
      c.product_id,
      p.name,
      p.price,
      p.stock,
      c.qty,
      (c.qty * p.price) AS lineTotal
    FROM cart_items c
    JOIN products p ON p.product_id = c.product_id
    ORDER BY c.id
  `);
  return rows;
}

export async function getCartSummary() {
  const items = await getCartView();
  const subtotal = items.reduce((s, it) => s + it.lineTotal, 0);
  return { items, subtotal };
}
