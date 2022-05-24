import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';

import {useFetchProducts} from '../../api/UseFetchProducts';
import {useSelector} from 'react-redux';
import {getProductsList} from '../../redux/selectors';
import axios from 'axios';
import {URL} from '../../../environment';

import {useIsFocused} from '@react-navigation/native';
import PurchaseItem from './PurchaseItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PurchaseScreen({navigation}) {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(true);
  const [oldData, setOldData] = useState(true);
  const allProducts = useSelector(getProductsList);
  const {getAllProducts} = useFetchProducts();
  const isFocused = useIsFocused();
  const [token, setToken] = useState(true);
  AsyncStorage.getItem('key').then(res => {
    setToken(res);
  });

  function fetchData() {
    fetch(URL + '/mypurchases', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(results => {
        setData(results);
        console.log('data', data);
        setLoading(false);
      })
      .catch(function (error) {
        Alert.alert(error); // Using this line
      });
  }
  useEffect(() => {
    fetchData();

  }, [isFocused, loading]);
  const renderItem = ({item}) => {
    return <PurchaseItem product={item} navigation={navigation} />;
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
