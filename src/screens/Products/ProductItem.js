import React from 'react';
import {Text, Image, StyleSheet, View, TouchableOpacity} from 'react-native';

export default function ProductItem({product, navigation}) {
  function onPress() {
    navigation.navigate('Details', {id: product.id});
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={{
          flexDirection: 'row',
          width: '98%',
          borderWidth: 2,
          borderColor: '#084572',
          borderRadius: 20,
          alignItems: 'center',
        }}>
        <View style={styles.viewImage}>
          <Image source={{uri: product.img}} style={styles.image} />
        </View>
        <View>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.title}>{product.selling_date}</Text>
          <Text style={styles.title}>{product.user_id}</Text>
        </View>
        <Text style={{fontSize: 30, position: 'absolute', right: 10}}>
          {product.price}.-
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
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  viewImage: {
    width: 150,
    height: 100,
    marginRight: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
