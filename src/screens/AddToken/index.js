import React, {useEffect, useState} from 'react';
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
import axios from 'axios';
import {URL} from '../../../environment';
export default function AddTokenScreen({navigation}) {
  const isFocused = useIsFocused();
  const product = useSelector(getSelectedProduct);
  const [key, setKey] = useState();
  const [validation, setValidation] = useState();
  const [disabled, setDisabled] = useState(false);

  const getAllProducts = async key => {
    AsyncStorage.getItem('key').then(res => {
      setKey(res);
    });
    try {
      const response = await axios.get(URL + '/mypurchases', {
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + key,
        },
      });
      setValidation(true);
      console.log('true val444', validation);
    } catch (e) {
      setValidation(false);
      console.log('false val4444', validation);

      //Alert.alert('mauvaise authentification');
      //console.error('Error2 in getAllProducts', e.error);
    }
  };

  useEffect(() => {
    getAllProducts(key);
    if (!validation) {
      navigation.navigate('AddTokenInit2');
    }

    // key;
    // AsyncStorage.getItem('key').then(res => {
    //   setKey(res);
    // });
  }, [isFocused]);

  function Save() {
    AsyncStorage.setItem('key', key);
    //getAllProducts(key);
    if (validation) {
      navigation.navigate('mes achats');
    } else {
      navigation.navigate('AddTokenInit2');
      //Alert.alert('mauvaise authentification');
    }
  }
  function Cancel() {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      {/*
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
          onPress={() => Cancel()}
          style={[
            styles.inputText,
            {backgroundColor: '#c40e0e', width: '48%'},
          ]}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            Save();
          }}
          style={
            disabled
              ? [styles.disabled, {backgroundColor: '#848f98', width: '48%'}]
              : [styles.inputText, {backgroundColor: '#084572', width: '48%'}]
          }>
          <Text style={{color: '#fff', textAlign: 'center'}}>Modifier</Text>
        </TouchableOpacity>
      </View>
      */}
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
