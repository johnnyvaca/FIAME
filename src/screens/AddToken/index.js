import React, {useEffect, useState} from 'react';
import {
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
export default function AddTokenScreen({navigation}) {

  const sale = useSelector(getSelectedProduct);
  const [key, setKey] = useState();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('key').then(res => {
      setKey(res);
    });
  }, []);

  function Save() {
    AsyncStorage.setItem('key', key);
    navigation.navigate('mes achats');
  }
  function Cancel() {
    navigation.navigate('futur');
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
