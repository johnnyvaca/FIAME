import React from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addProducts, selectedProduct} from '../redux/actions';
import {URL} from '../../environment';

export const useFetchProducts = () => {
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    try {
      const response = await axios.get(URL + '/products');
      dispatch(addProducts(response.data));
    } catch (e) {
      console.error('Error in getAllProducts', e);
    }
  };
  const getProductById = async id => {
    try {
      const response = await axios.get(URL + '/products/' + id);
      dispatch(selectedProduct(response.data));
    } catch (e) {
      console.error('Error', e);
    }
  };

  return {
    getAllProducts,
    getProductById,
  };
};
