import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import File from '../components/Header/file';
import SalesScreen from '../screens/Sales';
import AddTokenScreen from "../screens/AddToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TopTab = createMaterialTopTabNavigator();


export default function TopTabs() {
    const [condition,setCondition] = useState('false')


    useEffect(() => {
        AsyncStorage.getItem('condition').then((res) => {setCondition(res)
        console.log('condition:', condition)})
    }, []);
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="futur" component={SalesScreen} />
      <TopTab.Screen name="avant" component={File} />
      <TopTab.Screen name="mes achats" component={File} />
      <TopTab.Screen name="clef" component={AddTokenScreen} />
    </TopTab.Navigator>
  );
}
