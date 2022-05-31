import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductScreen from '../screens/Products';
import PurchaseScreen from '../screens/Purchases';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="futur" component={ProductScreen} />
      <TopTab.Screen name="mes achats" component={PurchaseScreen} />
    </TopTab.Navigator>
  );
}
