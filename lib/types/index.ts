import { Supermarket } from './dao';

export * from './dao';

export type SupermarketErrors = Partial<Record<keyof Supermarket, string>> & {
  result?: string;
};

export type Result<T = unknown> = {
  isError: boolean;
  data?: T;
  message?: string;
};
