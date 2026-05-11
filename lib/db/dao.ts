export type Product = {
  id: number;
  name: string;
  notes: string | null;
};

export type Tag = {
  id: number;
  name: string;
  color: string;
};

export type Supermarket = {
  id: number;
  name: string;
};

export type Price = {
  id: number;
  product_id: number;
  supermarket_id: number;
  brand: string | null;
  price: number;
  notes: string | null;
  updated_at: string;
};

export type CartItem = {
  id: number;
  product_id: number;
  quantity: number;
};

// Tipi estesi per le view
export type ProductWithTags = Product & {
  tags: Tag[];
};

export type PriceWithDetails = Price & {
  product_name: string;
  supermarket_name: string;
};

export type CartItemWithDetails = CartItem & {
  product_name: string;
  best_price: number | null;
  best_supermarket: string | null;
};
