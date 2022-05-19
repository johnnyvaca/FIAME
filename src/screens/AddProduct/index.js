import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {URL} from '../../../environment';
import axios from 'axios';

export default function AddProductScreen({navigation}) {
  const [name, setName] = useState();
  const [image, setImage] = useState();

  const [price, setPrice] = useState();
  const [condition, setCondition] = useState(true);

  useEffect(() => {
    if (
      name === undefined ||
      name === '' ||
      price === undefined ||
      price === '' ||
      image === undefined ||
      image === ''
    ) {
      setCondition(true);
      console.log('condition désactivée', condition);
      console.log('name', name);
      console.log('price', price);
    } else {
      setCondition(false);
      console.log('condition', condition);
      console.log('name', name);
      console.log('price', price);
    }
  }, [name, price, image, condition]);
  const postSale2 = async () => {
    try {
      const response = await axios.post(URL + '/api/products/', {
        name: name,
        img: image,
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

  const openCamera = () => {
    let options = {
      path: 'images',
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('Cancel upload image');
      } else if (response.errorCode === 'permission') {
        console.log('Not permission');
      } else if (response.errorCode === 'other') {
        console.log('other error');
      } else if (response.assets[0].fileSize > 8000000) {
        console.log('max 8MB', response.assets[0].fileSize);
      } else {
        setImage(
          'data:' +
            response.assets[0].type +
            ';base64,' +
            response.assets[0].base64,
        );
      }
    });
  };

  const chooseImage = () => {
    let options = {
      path: 'images',
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Cancel upload image');
      } else if (response.errorCode === 'permission') {
        console.log('Not permission');
      } else if (response.errorCode === 'other') {
        console.log('other error');
      } else if (response.assets[0].fileSize > 8000000) {
        console.log('max 8MB', response.assets[0].fileSize);
      } else {
        setImage(
          'data:' +
            response.assets[0].type +
            ';base64,' +
            response.assets[0].base64,
        );
      }
    });
  };

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
      <Image
        source={
          image === undefined
            ? require('../../../assets/icons/add_image.jpg')
            : {uri: image}
        }
        style={
          image === undefined
            ? {height: '40%', width: '90%'}
            : {height: '40%', width: '90%'}
        }
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginLeft: 0,
        }}>
        <TouchableOpacity
          onPress={() => {
            openCamera();
            //    alert('presed');
          }}
          style={[
            styles.inputText,
            {backgroundColor: '#4d9898', width: '48%'},
          ]}>
          <Text>Open camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            chooseImage();
            //    alert('presed');
          }}
          style={[
            styles.inputText,
            {backgroundColor: '#448888', width: '48%'},
          ]}>
          <Text>Choisir une image</Text>
        </TouchableOpacity>
      </View>

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
  coucou: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
});
