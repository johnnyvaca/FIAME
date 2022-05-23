import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';

import {useFetchProducts} from '../../api/UseFetchProducts';
import {useSelector} from 'react-redux';
import {getProductsList} from '../../redux/selectors';
import axios from 'axios';
import {URL} from '../../../environment';
import ProductItem from './ProductItem';
import {useIsFocused} from '@react-navigation/native';

export default function PurchaseScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);
  const allProducts = useSelector(getProductsList);
  const {getAllProducts} = useFetchProducts();
  const isFocused = useIsFocused();
  function fetchData() {
    fetch(URL + '/products')
      .then(res => res.json())
      .then(results => {
        setData(results);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, [isFocused, loading, data]);
  const renderItem = ({item}) => {
    return <ProductItem product={item} navigation={navigation} />;
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
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onRefresh={() => fetchData()}
        refreshing={loading}
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
