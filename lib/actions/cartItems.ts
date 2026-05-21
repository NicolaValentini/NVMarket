'use server';

import { validateId } from '../utils';
import { CartItemUpdate } from '../types';
import { decreaseCartItem, increaseCartItem } from '../db';

export async function updateCartItemAction(
  prevState: CartItemUpdate,
  actionType: 'INCREASE' | 'DECREASE',
) {
  const errors = validateId(prevState.productId);

  if (Object.keys(errors).length) {
    return {
      isError: true,
      message: 'Missing product id',
      count: prevState.count,
      productId: prevState.productId,
    } as CartItemUpdate;
  }

  let result;

  if (actionType === 'INCREASE') result = increaseCartItem(prevState.productId);
  else result = decreaseCartItem(prevState.productId);

  if (result.isError) {
    return {
      isError: true,
      message: 'Something went wrong during cartItem updating',
      count: prevState.count,
      productId: prevState.productId,
    } as CartItemUpdate;
  }

  return {
    count:
      actionType === 'INCREASE' ? prevState.count + 1 : prevState.count - 1,
    productId: prevState.productId,
  } as CartItemUpdate;
}
