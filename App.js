/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import TopTabs from './src/navigation/TopTabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/Details';
import AddProductScreen from './src/screens/AddProduct';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import UpdateProductScreen from './src/screens/UpdateProduct';
import AddTokenScreen from './src/screens/AddToken';
import AddTokenInitScreen from './src/screens/AddToken/init';
import PurchaseScreen from './src/screens/Purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {URL} from './environment';

const Stack = createNativeStackNavigator();

const Header = () => {
  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>Fiame</Text>
      <TouchableOpacity style={{backgroundColor: 'blue'}} />
    </View>
  );
};

const App = () => {
  const [token, setToken] = useState();
  const [validation, setValidation] = useState();

  const getAllProducts = async key => {
    AsyncStorage.getItem('key').then(res => {
      key = res;
    });
    try {
      const response = await axios.get(URL + '/mypurchases', {
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + key,
        },
      });
      setValidation(true);
      console.log('true val', validation);
    } catch (e) {
      setValidation(false);
      console.log('false val', validation);

      //Alert.alert('mauvaise authentification');
      //console.error('Error2 in getAllProducts', e.error);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('key').then(res => {
      getAllProducts(res);
      console.log('validation', validation);
      setToken(res);
    });
  }, []);
  //

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {(validation === false || validation === undefined) && (
            <Stack.Screen
              name="AddTokenInit"
              component={AddTokenInitScreen}
              options={{title: 'Insérer le token'}}
            />
          )}
          <Stack.Screen
            name="Home"
            component={TopTabs}
            options={{
              headerTitle: Header,
            }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{title: 'Ajouter un produit'}}
          />
          <Stack.Screen
            name="UpdateProduct"
            component={UpdateProductScreen}
            options={{title: 'Mettre à jour un produit'}}
          />
          <Stack.Screen
            name="Purchase"
            component={PurchaseScreen}
            options={{title: 'Mettre à jour un produit'}}
          />
          <Stack.Screen
            name="AddToken"
            component={AddTokenScreen}
            options={{title: 'Insérer le token'}}
          />
          <Stack.Screen
            name="AddTokenInit2"
            component={AddTokenInitScreen}
            options={{title: 'Insérer le token'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 45,
    height: 45,
    position: 'absolute',
    right: 10,
    marginTop: 5,
    marginRight: 20,
  },
});

export default App;
