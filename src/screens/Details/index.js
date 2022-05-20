import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import {URL} from '../../../environment';
import {useSelector} from 'react-redux';
import {getSelectedProduct} from '../../redux/selectors';

import axios from 'axios';
import {selectedProduct} from '../../redux/actions';
import {shouldFallbackToLegacyNativeModule} from '@react-native-async-storage/async-storage/lib/typescript/shouldFallbackToLegacyNativeModule';
import {useFetchProducts} from '../../api/UseFetchProducts';

export default function DetailsScreen({navigation, route}) {
  const [quantity, setQuantity] = useState(route.params.quantity);
  const [order, setOrder] = useState();
  const {id} = route.params;

  function updateScreen() {
    navigation.navigate('UpdateProduct', {id: id});
  }

  const deleteProduct = async idDelete => {
    try {
      const response = await axios.delete(URL + '/api/products/' + idDelete);
    } catch (e) {
      console.error('Error', e);
    }
  };

  function DeleteProduct() {
    deleteProduct(id);
    navigation.navigate('Home');
  }

  const {getProductById} = useFetchProducts();
  const product = useSelector(getSelectedProduct);

  var array = [];

  for (let prop in product.orders) {
    array.push(product.orders[prop]);
  }
  console.log(array.length);
  useEffect(() => {
    getProductById(id);
  }, []);
  // console.log('product: ', product.orders);

  return (
    <View style={styles.container}>
      <Text>{id}</Text>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{flex: 6}}>
        <Image source={{uri: product.img}} style={styles.image} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderBottomColor: 'black0',
          borderTopColor: 'black',
          borderTopWidth: 3,
          borderBottomWidth: 3,
        }}>
        <Text style={styles.textes}>{product.name}</Text>
        <Text style={styles.textes}>{product.selling_date}</Text>
        <Text style={styles.textes}>{product.user_id}</Text>
        <Text style={styles.textes}>{product.price}.- CHF</Text>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -10,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20, paddingRight: 50}}>
          Commande
        </Text>
        <NumericInput
          type={'up-down'}
          value={quantity}
          onChange={quantity => setQuantity(quantity)}
          onLimitReached={(isMax, msg) => console.log(isMax, msg)}
          totalWidth={100}
          totalHeight={70}
          iconSize={25}
          editable={false}
          step={1}
          valueType="integer"
          rounded
          textColor="black"
          iconStyle={{color: 'black'}}
          rightButtonBackgroundColor="#EA3788"
          leftButtonBackgroundColor="#E56B70"
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'grey',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20, paddingRight: 50}}>
          Payés
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 20, paddingRight: 50}}>
          {product.paid} plats
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'orange',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20, paddingRight: 50}}>
          A Payer
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            paddingRight: 50,
          }}>
          {(product.quantity - product.paid) * product.price}.- CHF
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'grey',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 70,
        }}>
        <TouchableOpacity
          onPress={() => {
            DeleteProduct();
          }}>
          <Image
            style={array.length === 0 ? {} : {width: '0%', height: '0%'}}
            source={require('../../../assets/icons/icons8-poubelle-32.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            updateScreen();
          }}>
          <Image source={require('../../../assets/icons/icons8-edit-32.png')} />
        </TouchableOpacity>
        <Button title="Annuler" color="red" />
        <Button title="Confirmer" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  textes: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
