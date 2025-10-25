import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

let raw: SQLite.SQLiteDatabase;
if (Platform.OS === "web") {
  console.warn("[DB] Web fallback");
  raw = SQLite.openDatabaseSync("web-fallback");
} else {
  raw = SQLite.openDatabaseSync("shopping.db");
}

export async function run(sql: string, params: any[] = []) {
  try {
    await raw.runAsync(sql, params);
    return { error: null };
  } catch (e: any) {
    console.error("[SQL ERROR]", sql, e?.message);
    return { error: String(e?.message) };
  }
}

export async function queryAll<T = any>(sql: string, params: any[] = []) {
  try {
    const rows = await raw.getAllAsync<T>(sql, params);
    return rows;
  } catch (e: any) {
    console.error("[SQL SELECT ERROR]", sql, e?.message);
    return [];
  }
}

export async function queryOne<T = any>(sql: string, params: any[] = []) {
  const rows = await queryAll<T>(sql, params);
  return rows[0] ?? null;
}

export async function initDb() {
  console.log("== DB INIT ==");

  await run(`PRAGMA foreign_keys = ON`);

  await run(`
    CREATE TABLE IF NOT EXISTS products(
      product_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price>=0),
      stock INTEGER NOT NULL CHECK(stock>=0)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS cart_items(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      qty INTEGER NOT NULL CHECK(qty>0),
      UNIQUE(product_id),
      FOREIGN KEY(product_id) REFERENCES products(product_id)
    )
  `);

  const c = await queryOne<{ c: number }>(`SELECT COUNT(*) AS c FROM products`);
  console.log("== COUNT BEFORE SEED ==", c);

  if (c && c.c > 0) return console.log("== SKIP SEED ==");

  console.log("== SEEDING ==");
  await run(`
    INSERT INTO products(product_id,name,price,stock) VALUES
    ('P001','Tai nghe Bluetooth',299000,10),
    ('P002','Sạc nhanh 20W',159000,15),
    ('P003','Bình giữ nhiệt',99000,8),
    ('P004','Cáp Type-C 1m',69000,20),
    ('P005','Dầu gội Head&Shoulders',119000,12),
    ('P006','Sữa tắm Dove 900ml',145000,6),
    ('P007','Bút bi Thiên Long',5000,40),
    ('P008','Tập 200 trang',17000,30),
    ('P009','USB 32GB SanDisk',129000,10),
    ('P010','Đèn bàn LED',189000,7)
  `);
  console.log("== SEED DONE ==");
}

export const db = { raw, run, queryAll, queryOne };
