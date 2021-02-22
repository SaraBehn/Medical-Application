import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {AccountStackNavigator} from "./accountNavigator"
import {SearchStackNavigator} from "./searchNavigator"

const AppBottomNavigator = createMaterialBottomTabNavigator();

const RootNavigator = () => (
    <AppBottomNavigator.Navigator
        initialRouteName="First"
        screenOptions={{
            tabBarColor: "#00009c"
        }}
    >
        <AppBottomNavigator.Screen
            name="Profile"
            children={AccountStackNavigator}
            options={{
                tabBarIcon: () => <Icon name="user" size={25} color="#fff" />
            }}
        />
        <AppBottomNavigator.Screen
            name="Search"
            children={SearchStackNavigator}
            options={{
                tabBarIcon: () => <Icon name="book-open" size={25} color="#fff" />
            }}
        />
    </AppBottomNavigator.Navigator>
);

export { RootNavigator };