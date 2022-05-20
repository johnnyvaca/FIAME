import {GET_PRODUCTS, GET_PRODUCT_ID} from '../actions/actionsTypes';

const initialState = {
  list: [],
  selectedProduct: {},
  postProduct: {},
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        list: [...state.list, ...action.payload.data],
        selectedProduct: state.selectedProduct,
      };
    case GET_PRODUCT_ID:
      return {
        list: state.list,
        selectedProduct: action.payload.data,
      };
    default:
      return state;
  }
};
