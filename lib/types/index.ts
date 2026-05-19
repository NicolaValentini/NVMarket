import { CartItem, Product, Supermarket, Tag } from './dao';

export * from './dao';

export type ProductWithQuantity = Product & Pick<CartItem, 'quantity'>;

export type ProductWithTag = Product & {
  tags: Tag[];
};

export type SupermarketErrors = Partial<Record<keyof Supermarket, string>> & {
  result?: string;
};

export type TagErrors = Partial<Record<keyof Tag, string>> & {
  result?: string;
};

export type ProductErrors = Partial<Record<keyof ProductWithTag, string>> & {
  result?: string;
};

export type Result<T = unknown> = {
  isError: boolean;
  data?: T;
  message?: string;
};
