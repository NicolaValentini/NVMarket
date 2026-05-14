import { Result } from '../types';

export const errorResult = <T = unknown>(data?: T) =>
  ({ isError: true, data }) as Result<T>;
export const successResult = <T = unknown>(data?: T) =>
  ({ isError: false, data }) as Result<T>;
