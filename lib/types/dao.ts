export type Product = {
  id: string;
  name: string;
};

export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type Supermarket = {
  id: string;
  name: string;
  color: string;
};

export type Price = {
  id: string;
  product_id: string;
  supermarket_id: string;
  brand: string | null;
  price: number;
  updated_at: string;
  favorite: boolean;
};

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
};
