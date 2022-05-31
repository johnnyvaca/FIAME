import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getSelectedProduct} from '../../redux/selectors';
import {useFetchProducts} from '../../api/useFetchProducts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {URL} from '../../../environment';
import axios from 'axios';
import {addProducts} from '../../redux/actions';
export default function AddTokenInitScreen({navigation}) {
  const isFocused = useIsFocused();
  const [key, setKey] = useState();
  const [disabled, setDisabled] = useState(false);

  const [response, setResponse] = useState();

  const getAllProducts = async () => {
    try {
      const response = await axios.get(URL + '/mypurchases', {
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + key,
        },
      });
      setResponse(true);
      console.log('key333', response.data);
      navigation.navigate('Home');
    } catch (e) {
      console.log('key333', e);
      Alert.alert('mauvaise authentification');
    }
  };

  function Save() {
    AsyncStorage.setItem('key', key);
    getAllProducts();
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={key => setKey(key)}
        style={styles.inputText}
        value={key}
      />

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginLeft: 0,
        }}>
        <TouchableOpacity
          //disabled={disabled}
          onPress={() => {
            Save();
          }}
          style={
            disabled
              ? [styles.disabled, {backgroundColor: '#848f98', width: '48%'}]
              : [styles.inputText, {backgroundColor: '#084572', width: '48%'}]
          }>
          <Text style={{color: '#fff', textAlign: 'center'}}>Commencer</Text>
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
});
