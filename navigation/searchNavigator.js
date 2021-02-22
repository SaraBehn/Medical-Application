import React from "react";
import {createStackNavigator} from '@react-navigation/stack';

import MedSearchScreen from "../screens/MedsSearchScreen";
import AuthorSearchScreen from "../screens/AuthorSearchScreen";

const StackNavigator = createStackNavigator();

const SearchStackNavigator = () => (
    <StackNavigator.Navigator initialRouteName="MedsSearchScreen">
        <StackNavigator.Screen component={MedSearchScreen} name="MedsSearchScreen" />
        <StackNavigator.Screen component={AuthorSearchScreen} name="AuthorSearchScreen" />
    </StackNavigator.Navigator>
);

export { SearchStackNavigator };


