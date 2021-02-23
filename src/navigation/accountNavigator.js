import React from "react";
import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from "../screens/AccountScreen";
import SensitivitiesScreen from "../screens/SensitivitiesScreen";

const StackNavigator = createStackNavigator();

const AccountStackNavigator = () => (
    <StackNavigator.Navigator initialRouteName="AccountScreen">
        <StackNavigator.Screen component={AccountScreen} name="AccountScreen" />
        <StackNavigator.Screen component={SensitivitiesScreen} name="SensitivitiesScreen" />
    </StackNavigator.Navigator>
);

export { AccountStackNavigator };


