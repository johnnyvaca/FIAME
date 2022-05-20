import {GET_PRODUCTS, GET_PRODUCT_ID} from './actionsTypes';

export const addProducts = data => ({
  type: GET_PRODUCTS,
  payload: {
    data,
  },
});

export const selectedProduct = data => ({
  type: GET_PRODUCT_ID,
  payload: {
    data,
  },
});
