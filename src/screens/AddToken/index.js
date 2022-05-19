import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getSelectedSale} from '../../redux/selectors';
import {useFetchSales} from '../../api/UseFetchSales';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function AddTokenScreen({navigation}) {
  const {getSaleById} = useFetchSales();
  const sale = useSelector(getSelectedSale);
  const [name, setName] = useState();

  const [price, setPrice] = useState();
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('key').then(res => {
      setName(res);
    });
  }, []);

  function test2() {
    AsyncStorage.setItem('key', name);
    AsyncStorage.setItem('condition', 'true');
    navigation.navigate('mes achats');
  }
  function test() {
    navigation.dispatch;
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={name => setName(name)}
        style={styles.inputText}
        value={name}
      />

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginLeft: 0,
        }}>
        <TouchableOpacity
          onPress={() => test()}
          style={[
            styles.inputText,
            {backgroundColor: '#c40e0e', width: '48%'},
          ]}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={condition}
          onPress={() => {
            test2();
          }}
          style={
            condition
              ? [styles.disabled, {backgroundColor: '#848f98', width: '48%'}]
              : [styles.inputText, {backgroundColor: '#084572', width: '48%'}]
          }>
          <Text style={{color: '#fff', textAlign: 'center'}}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  inputText: {
    width: '98%',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  disabled: {
    width: '98%',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  coucou: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
});
