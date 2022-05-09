import {GET_SALES, GET_SALE_ID} from './actionsTypes';

export const addSales = data => ({
  type: GET_SALES,
  payload: {
    data,
  },
});

export const selectedSale = data => ({
  type: GET_SALE_ID,
  payload: {
    data,
  },
});
