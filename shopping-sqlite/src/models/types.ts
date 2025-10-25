export type Product = {
  product_id: string;
  name: string;
  price: number;
  stock: number;
};

export type CartItemRow = {
  id: number;
  product_id: string;
  qty: number;
};

export type CartItemView = {
  id: number;
  product_id: string;
  name: string;
  price: number;
  qty: number;
  stock: number;
  lineTotal: number; // qty * price
};
