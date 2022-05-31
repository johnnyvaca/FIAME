import React from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addProducts, selectedProduct} from '../redux/actions';
import {URL} from '../../environment';
import {useState} from '.';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFetchProducts = () => {
  const [token, setToken] = useState();

  AsyncStorage.getItem('key').then(res => {
    setToken(res);
  });
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    try {
      const response = await axios.get(URL + '/products', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(addProducts(response.data));
    } catch (e) {
      console.error('Error in getAllProducts', e);
    }
  };
  const getProductById = async id => {
    try {
      const response = await axios.get(URL + '/products/' + id, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
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
