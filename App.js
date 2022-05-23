/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import TopTabs from './src/navigation/TopTabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/Details';
import AddProductScreen from './src/screens/AddProduct';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import UpdateProductScreen from './src/screens/UpdateProduct';

const Stack = createNativeStackNavigator();

const Header = () => {
  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>Fiame</Text>
      <TouchableOpacity style={{backgroundColor:'blue'}}>

      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
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
