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
import {URL} from '../../../env';
import {useSelector} from 'react-redux';
import {getSelectedSale} from '../../redux/selectors';
import {useFetchSales} from '../../api/UseFetchSales';
import axios from 'axios';
import {selectedSale} from '../../redux/actions';

export const DropButton = () => {
  <Button title="hello" />;
};

export default function DetailsScreen({navigation, route}) {
  const [quantity, setQuantity] = useState(route.params.quantity);
  const {id} = route.params;

  const deleteSale = async id2 => {
    try {
      const response = await axios.delete(URL + '/api/products/' + id2);
    } catch (e) {
      console.error('Error', e);
    }
  };
  const putSale = async id => {
    try {
      const response = await axios.post(URL + '/api/products/' + id, {
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
    deleteSale(id);
    navigation.navigate('Home');
  }

  const {getSaleById} = useFetchSales();
  const sale = useSelector(getSelectedSale);

  useEffect(() => {
    getSaleById(id);
  }, []);
  console.log('URL: ', URL + '/img/' + sale.img);
  console.log('sale: ', sale);

  return (
    <View style={styles.container}>
      <Text>{id}</Text>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{flex: 6}}>
        <Image source={{uri: URL + '/img/' + sale.img}} style={styles.coucou} />
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
        <Text style={styles.textes}>{sale.name}</Text>
        <Text style={styles.textes}>{sale.selling_date}</Text>
        <Text style={styles.textes}>{sale.user_id}</Text>
        <Text style={styles.textes}>{sale.price}.- CHF</Text>
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
          {sale.paid} plats
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
          {(sale.quantity - sale.paid) * sale.price}.- CHF
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
            test();
          }}>
          <Image source={require('../../../assets/icons/icon_bin.png')} />
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
  coucou: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  textes: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
