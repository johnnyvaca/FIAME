import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductScreen from '../screens/Products';
import AddTokenScreen from '../screens/AddToken';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabs() {
  useEffect(() => {}, []);
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="futur" component={ProductScreen} />
      <TopTab.Screen name="avant" component={ProductScreen} />
      <TopTab.Screen name="mes achats" component={ProductScreen} />
      <TopTab.Screen name="clef" component={AddTokenScreen} />
    </TopTab.Navigator>
  );
}
