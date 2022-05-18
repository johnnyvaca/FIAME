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
import SaleItem from './SaleItem';
import {useFetchSales} from '../../api/UseFetchSales';
import {useSelector} from 'react-redux';
import {getSalesList} from '../../redux/selectors';
import axios from 'axios';
import {URL} from '../../../environment';

export default function SalesScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);
  const allSales = useSelector(getSalesList);
  const {getAllSales} = useFetchSales();

  function fetchData() {
    fetch(URL + '/api/products')
      .then(res => res.json())
      .then(results => {
        console.log(results);
        setData(results);
        setLoading(false);
      });
    //   return axios.get(URL + '/api/products').then(reponse => reponse.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
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
