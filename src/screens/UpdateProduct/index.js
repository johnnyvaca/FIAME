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
import {URL} from '../../../environment';
import {useSelector} from 'react-redux';
import {getSelectedSale} from '../../redux/selectors';
import {useFetchSales} from '../../api/UseFetchSales';
import DateField from 'react-native-datefield';
import axios from 'axios';

export default function UpdateProductScreen({navigation, route}) {
  const {getSaleById} = useFetchSales();
  const sale = useSelector(getSelectedSale);
  const [name, setName] = useState(sale.name);
  const [description, setDescription] = useState();
  const [image, setImage] = useState(sale.img);
  const [imageUri, setImageUri] = useState();
  const [source, setSource] = useState();
  console.log('sale', sale.name);

  const [price, setPrice] = useState(sale.price);
  const [condition, setCondition] = useState(true);
  const {id} = route.params;

  console.log(id);
  useEffect(() => {
    getSaleById(id);
    if (
      image === sale.img &&
      name === sale.name &&
      price === sale.price.toString()
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
  const putSale = async () => {
    try {
      const response = await axios.put(URL + '/api/products/' + id, {
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
    putSale();
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
        value={name}
      />
      <TextInput
        onChangeText={price => setPrice(price)}
        keyboardType="numeric"
        style={styles.inputText}
        value={price.toString()}
      />

      <Image source={{uri: image}} style={{height: '40%', width: '90%'}} />

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
            {backgroundColor: '#2bce90', width: '48%'},
          ]}>
          <Text>Prendre une photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            chooseImage();
          }}
          style={[
            styles.inputText,
            {backgroundColor: '#2bce90', width: '48%'},
          ]}>
          <Text>Rechercher dans la galerie</Text>
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
