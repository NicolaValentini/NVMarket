'use server';

import { errorResult, validateId } from '../utils';
import { CartItemUpdate, EmptyCart } from '../types';
import {
  decreaseCartItem,
  deleteCartItemByProductId,
  getCartItemsGroupedBySupermarketIdAndProductId,
  getCartItemsProducts,
  getPricesBySupermarketId,
  increaseCartItem,
} from '../db';

export async function getCartItemsGroupedBySupermarketAction(
  productId?: string,
  supermarketId?: string,
) {
  const result = getCartItemsGroupedBySupermarketIdAndProductId(
    productId,
    supermarketId,
  );

  if (result.isError) {
    return errorResult('Something went wrong during cart items fetching', []);
  }

  return result;
}

export async function getCartItemsProductsAction() {
  const result = getCartItemsProducts();

  if (result.isError) {
    return errorResult('Something went wrong during cart items fetching', []);
  }

  return result;
}

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
      message: 'Something went wrong during cart item updating',
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

export async function emptyCartItemByProductIdAction(state: EmptyCart) {
  const productId = 'productId' in state ? state.productId : '';
  const errors = validateId(productId);

  if (Object.keys(errors).length) {
    return {
      isError: true,
      message: 'Missing product id',
      productId,
    } as EmptyCart;
  }

  const result = await deleteCartItemByProductId(productId);

  if (result.isError) {
    return {
      isError: true,
      message: 'Something went wrong during cart item updating',
      productId,
    } as EmptyCart;
  }

  return { productId } as EmptyCart;
}

export async function emptyCartItemsBySupermarketAction(state: EmptyCart) {
  const supermarketId = 'supermarketId' in state ? state.supermarketId : '';
  const errors = validateId(supermarketId);

  if (Object.keys(errors).length) {
    return {
      isError: true,
      message: 'Missing supermarket id',
      supermarketId,
    } as EmptyCart;
  }

  const prices = await getPricesBySupermarketId(supermarketId);

  if (prices.isError || !prices.data) {
    return {
      isError: true,
      message: 'Something went wrong during prices fetching',
      supermarketId,
    } as EmptyCart;
  }

  let isError = false;

  for (const { product_id } of prices.data) {
    const _delete = await deleteCartItemByProductId(product_id);

    if (_delete.isError) {
      isError = true;
    }
  }

  if (isError) {
    return {
      isError: true,
      message: 'Something went wrong during cart item updating',
      supermarketId,
    } as EmptyCart;
  }

  return { supermarketId } as EmptyCart;
}
