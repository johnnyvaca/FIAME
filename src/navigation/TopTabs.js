import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SalesScreen from '../screens/Sales';
import AddTokenScreen from '../screens/AddToken';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabs() {

  useEffect(() => {

  }, []);
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="futur" component={SalesScreen} />
      <TopTab.Screen name="avant" component={SalesScreen} />
      <TopTab.Screen name="mes achats" component={SalesScreen} />
      <TopTab.Screen name="clef" component={AddTokenScreen} />
    </TopTab.Navigator>
  );
}
