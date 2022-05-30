import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductScreen from '../screens/Products';
import AddTokenScreen from '../screens/AddToken';
import PurchaseScreen from '../screens/Purchases';
import ProductOldScreen from '../screens/ProductsOld';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="futur" component={ProductScreen} />
      <TopTab.Screen name="avant" component={ProductOldScreen} />
      <TopTab.Screen name="mes achats" component={PurchaseScreen} />
      {/*   <TopTab.Screen name="clef" component={AddTokenScreen} /> */}
    </TopTab.Navigator>
  );
}
