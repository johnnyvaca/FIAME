import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addSales, selectedSale} from '../redux/actions';
import {URL} from '../../env';

export const useFetchSales = () => {
  const dispatch = useDispatch();
  const getAllSales = async () => {
    try {
      const response = await axios.get(URL + '/api/products');
      dispatch(addSales(response.data));
    } catch (e) {
      console.error('Error in getAllSales', e);
    }
  };
  const getSaleById = async id => {
    try {
      const response = await axios.get(URL + '/api/products/' + id);
      dispatch(selectedSale(response.data));
    } catch (e) {
      console.error('Error', e);
    }
  };
  const postSale = async (name, date, price, user_id) => {
    try {
      const response = await axios.get(
        URL +
          '/api/products/?name=' +
          name +
          '&selling_date=' +
          date +
          '&price=' +
          price +
          '&user_id=' +
          user_id,
      );
      dispatch(postSale(response.data));
    } catch (e) {
      console.error('Error', e);
    }
  };

  return {
    getAllSales,
    getSaleById,
    postSale,
  };
};
