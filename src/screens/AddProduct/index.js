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

  const [quantity, setQuantity] = useState();
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [price, setPrice] = useState();

  const postSale2 = async () => {
    try {
      console.log('name: ', name);
      const response = await axios.post(URL + '/api/products/', {
        name: name,
        //      description: description,
        img: image,
        //quantity: quantity,
        selling_date: year + '-' + month + '-' + day,
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

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={name => setName(name)}
        style={styles.inputText}
        placeholder="Choisir un nom"
      />
      <TextInput
        onChangeText={description => setDescription(description)}
        style={styles.inputText}
        placeholder="Choisir une description"
      />
      <TextInput
        onChangeText={image => setImage(image)}
        style={styles.inputText}
        placeholder="Choisir une image"
      />

      <TextInput
        onChangeText={quantity => setQuantity(quantity)}
        style={styles.inputText}
        placeholder="Choisir la quantité disponible"
      />
      <TextInput
        onChangeText={price => setPrice(price)}
        keyboardType="numeric"
        style={styles.inputText}
        placeholder="Choisir un prix"
      />

      <View style={{flexDirection: 'row'}}>
        <TextInput
          onChangeText={day => setDay(day)}
          style={[styles.inputText, {width: '32%'}]}
          placeholder="Choisir un jour"
        />
        <TextInput
          onChangeText={month => setMonth(month)}
          style={[styles.inputText, {width: '32%'}]}
          placeholder="Choisir un mois"
        />
        <TextInput
          onChangeText={year => setYear(year)}
          keyboardType="numeric"
          style={[styles.inputText, {width: '32%'}]}
          placeholder="Choisir une année"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginLeft: 0,
        }}>
        <TouchableOpacity
          style={[
            styles.inputText,
            {backgroundColor: '#c40e0e', width: '48%'},
          ]}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            test();
          }}
          style={[
            styles.inputText,
            {backgroundColor: '#084572', width: '48%'},
          ]}>
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
});
