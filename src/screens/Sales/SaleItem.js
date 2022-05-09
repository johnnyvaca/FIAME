import React, {Fragment, useLayoutEffect} from 'react';
import {Text, Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {URL} from '../../../env';
import {newProduct} from '../AddProduct/index';

export default function SaleItem({sale, navigation}) {
  function test() {
    navigation.navigate('Details', {id: sale.id});
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          test();
        }}
        style={{
          flexDirection: 'row',
          width: '98%',
          borderWidth: 2,
          borderColor: '#084572',
          borderRadius: 20,
          alignItems: 'center',
        }}>
        <View style={styles.pollo2}>
          <Image
            source={{uri: URL + '/img/' + sale.img}}
            style={styles.pollo}
          />
        </View>
        <View>
          <Text style={styles.title}>{sale.name}</Text>
          <Text style={styles.title}>{sale.selling_date}</Text>
          <Text style={styles.title}>{sale.user_id}</Text>
        </View>
        <Text style={{fontSize: 30, position: 'absolute', right: 10}}>
          {sale.price}.-
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unchecked: {width: 56, height: 56, left: 1},
  bin: {width: 56, height: 56, left: 30},
  pollo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  pollo2: {
    width: 150,
    height: 100,
    marginRight: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
