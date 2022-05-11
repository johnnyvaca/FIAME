import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import SaleItem from './SaleItem';
import {useFetchSales} from '../../api/UseFetchSales';
import {useSelector} from 'react-redux';
import {getSalesList} from '../../redux/selectors';
import axios from 'axios';
import {URL} from '../../../env';

const getAllSales2 = async () => {
  try {
    const response = await axios.get(URL + '/api/products');
    return response.data;
  } catch (e) {
    console.error('Error in getAllSales', e);
  }
};
console.log('liste complete: ', getAllSales2);

export default function SalesScreen({navigation}) {
  const allSales = useSelector(getSalesList);
  const {getAllSales} = useFetchSales();

  function getDonnees() {
    return axios.get(URL + '/api/products').then(reponse => reponse.data);
  }

  async function chose() {
    navigation.addListener('focus', async () => {
      await axios
        .get(URL + '/api/products')
        .then(response => {
          console.log('responseTOTALES: ', response.data);
        })
        .catch(e => alert(e.message));
    });
  }

  console.log('chose', chose);
  useEffect(() => {
    getAllSales();
  }, []);

  console.log('getDONNES', getDonnees());
  const renderItem = ({item}) => {
    return <SaleItem sale={item} navigation={navigation} />;
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddProduct', []);
          }}
          style={styles.btnAdd}>
          <Text style={{color: '#fff'}}>Ajouter un produit</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={allSales}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  btnAdd: {
    backgroundColor: '#084572',
    flexDirection: 'row',
    width: '98%',
    borderWidth: 2,
    borderColor: '#084572',
    borderRadius: 20,
    justifyContent: 'center',
  },
});
