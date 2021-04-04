import React from "react";
import {createStackNavigator} from '@react-navigation/stack';

import Med from "../components/Med";
import AuthorSearchScreen from "../old/AuthorSearchScreen";
import MedListScreen from "../screens/MedListScreen";
import HomeScreen from "../screens/HomeScreen"

const StackNavigator = createStackNavigator();

const SearchStackNavigator = () => (
    <StackNavigator.Navigator initialRouteName="HomeScreen">
        <StackNavigator.Screen component={HomeScreen} name="HomeScreen" />
        <StackNavigator.Screen component={MedListScreen} name="MedListScreen" />
        <StackNavigator.Screen component={Med} name="Med" />
        {/*<StackNavigator.Screen component={AuthorSearchScreen} name="AuthorSearchScreen" />*/}
        {/*<StackNavigator.Screen compontnet={MedScreen} name="MedScreen"/>*/}
    </StackNavigator.Navigator>
);

export { SearchStackNavigator };


