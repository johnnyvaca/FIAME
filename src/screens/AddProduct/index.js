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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {URL} from '../../../env';
import {useSelector} from 'react-redux';
import {postSale} from '../../redux/selectors';
import {useFetchSales} from '../../api/UseFetchSales';
import DateField from 'react-native-datefield';
import axios from 'axios';

export default function AddProductScreen({navigation}) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [imageUri, setImageUri] = useState();
  const [source, setSource] = useState();

  const [price, setPrice] = useState();
  const [condition, setCondition] = useState(true);

  useEffect(() => {
    if (
      name === undefined ||
      name === '' ||
      price === undefined ||
      price === ''
    ) {
      setCondition(true);
      console.log('condition désactivée', condition);
      console.log('name', name);
      console.log('name', image);
      console.log('name', price);
    } else {
      setCondition(false);
      console.log('condition', condition);
      console.log('name', name);
      console.log('name', image);
      console.log('name', price);
    }
  }, [name, price]);
  const postSale2 = async () => {
    try {
      const response = await axios.post(URL + '/api/products/', {
        name: name,
        //      description: description,
        img: image,
        //quantity: quantity,
        //    selling_date: year + '-' + month + '-' + day,
        price: price,
        user_id: 1,
      });
    } catch (e) {
      console.error('Error', e);
    }
  };

  function test() {
    postSale2();
    navigation.navigate('Home');
  }

  function test2() {
    navigation.navigate('Home');
  }

  const [options, setOptions] = useState();
  const openCamara = () => {
    const options2 = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    setOptions(options2);
  };
  launchCamera(options, response => {
    if (response.didCancel) {
      console.log('User canceled image picker');
    } else if (response.error) {
    } else if (response.customButton) {
    } else {
      const source2 = {uri: 'data:image/jpeg;base64,' + response.base64};
      setSource(source2);
      setImage(source2);
      setImageUri(source);
    }
  });
  console.log('image', image);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={name => setName(name)}
        style={styles.inputText}
        placeholder="Choisir un nom"
      />
      <TextInput
        onChangeText={price => setPrice(price)}
        keyboardType="numeric"
        style={styles.inputText}
        placeholder="Choisir un prix"
      />
      <Button
        title="Open camera"
        onPress={() => {
          openCamara();
          //    alert('presed');
        }}
        style={styles.inputText}
      />

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginLeft: 0,
        }}>
        <TouchableOpacity
          onPress={() => test2()}
          style={[
            styles.inputText,
            {backgroundColor: '#c40e0e', width: '48%'},
          ]}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={condition}
          onPress={() => {
            test();
          }}
          style={
            condition
              ? [styles.disabled, {backgroundColor: '#848f98', width: '48%'}]
              : [styles.inputText, {backgroundColor: '#084572', width: '48%'}]
          }>
          <Text style={{color: '#fff', textAlign: 'center'}}>Ajouter</Text>
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
