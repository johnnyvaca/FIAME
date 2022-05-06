/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer, useRoute} from "@react-navigation/native";
import TopTabs from "./src/navigation/TopTabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DetailsScreen from "./src/screens/Details";
import AddProductScreen from "./src/screens/AddProduct";
import {Provider} from "react-redux";
import {store} from "./src/redux/store";

const Stack = createNativeStackNavigator()


const Header = () => {
    return (
        <View style={{flex: 1, paddingTop: 10}}>
            <Text style={{fontSize: 30, fontWeight: 'bold',}}>Fiame</Text>
            <Image
                source={require('./assets/icons/user.png')}
                style={styles.a}
            />
        </View>
    )
}

function Head() {
    <View style={{flex: 1, paddingTop: 10}}>
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            flexDirection: 'row',
            width: 100,
            marginHorizontal: 140
        }}>Fiame</Text>
        <Image
            source={require('./assets/icons/user.png')}
            style={styles.a}
        />
    </View>
}

const App = () => {
    return (<Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={TopTabs} options={{
                        headerTitle: () => {
                            Head
                        }
                    }}/>
                    <Stack.Screen name="Details" component={DetailsScreen} options={({route}) => ({
                        title: route.params.name
                    })}/>
                    <Stack.Screen name="AddProduct" component={AddProductScreen}
                                  options={{title: "Ajouter un produit"}}/>

                </Stack.Navigator>
            </NavigationContainer>

        </Provider>
    );
};

const styles = StyleSheet.create({
    a: {width: 45, height: 45, position: 'absolute', right: 10, marginTop: 5, marginRight: 20},
});

export default App;
