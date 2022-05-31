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
import UserItem from './UserItem';
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

  const fetchData2 = async () => {
    try {
      console.log('token', token);
      const response = await axios.get(URL + '/mypurchases', {
        methode: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + token,
        },
      });
      setData(response.data);
      console.log('data23333', response.data);
      setLoading(false);
    } catch (e) {
      console.error('Error in getAllProducts', e);
    }
  };

  const fetchData = async () => {
    console.log('token', token);
    if (token === '48TtL8VT2mSest9DBQoLse6MnEZMTU') {
      const response = await axios.get(URL + '/users', {
        headers: {
          methode: 'GET',
          accept: 'application/json',
          authorization: 'Bearer ' + token,
        },
      });
      setData(response.data);
      console.log('data3', response.data);
      setLoading(false);
    } else {
      const response = await axios.get(URL + '/mypurchases', {
        methode: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + token,
        },
      });
      setData(response.data);
      console.log('data23', response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
    fetchData2()
  }, [isFocused, loading]);
  const renderItem = ({item}) => {
    return <PurchaseItem product={item} navigation={navigation} />;
  };
  const renderUsers = ({item}) => {
    return <UserItem user={item} navigation={navigation} />;
  };

  return (
    <>
      <View style={styles.container} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          token === '48TtL8VT2mSest9DBQoLse6MnEZMTU' ? renderUsers : renderItem
        }
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
