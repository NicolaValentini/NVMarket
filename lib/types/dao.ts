export type Product = {
  id: string;
  name: string;
};

export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type ProductTag = {
  id: string;
  product_id: string;
  tag_id: string;
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
  name: string;
  price: number;
  yuka: number;
  favorite: boolean;
};

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
};
