import { CartItem, Price, Product, Supermarket, Tag } from './dao';

export * from './dao';

export type ProductWithQuantity = Product & Pick<CartItem, 'quantity'>;

export type ProductWithQuantityAndTags = ProductWithQuantity & {
  tags: Tag[];
};

export type ProductWithTag = Product & {
  tags: Tag[];
};

export type IdErrors = Partial<{
  id: string;
}>;

export type SupermarketErrors = Partial<Record<keyof Supermarket, string>> & {
  result?: string;
};

export type TagErrors = Partial<Record<keyof Tag, string>> & {
  result?: string;
};

export type ProductErrors = Partial<Record<keyof ProductWithTag, string>> & {
  result?: string;
};

export type PriceErrors = Partial<Record<keyof Price, string>> & {
  result?: string;
};

export type CartItemUpdate = {
  count: number;
  productId: string;
  message?: string;
  isError?: boolean;
};

export type FavoriteUpdate = {
  id: string;
  favorite: boolean;
  message?: string;
  isError?: boolean;
};

export type Result<T = unknown> = {
  isError: boolean;
  data?: T;
  message?: string;
};
