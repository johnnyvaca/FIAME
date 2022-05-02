import React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import File from "../components/Header/file";
import SalesScreen from "../screens/Sales";
const TopTab = createMaterialTopTabNavigator();

export default function TopTabs(){
    return(
        <TopTab.Navigator >
            <TopTab.Screen name="prochaines2" component={SalesScreen} />
            <TopTab.Screen name="anterieurs" component={File} />
            <TopTab.Screen name="mes achats" component={File} />
        </TopTab.Navigator>
    )

}
