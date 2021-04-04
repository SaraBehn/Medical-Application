import * as React from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./src/screens/HomeScreen"
import MedListScreen from "./src/screens/MedListScreen"
import SensitivitiesScreen from "./src/screens/SensitivitiesScreen"
import MedList from "./src/components/MedList"
import SensitivitiesList from "./src/components/SensitivitiesList";
import Med from "./src/components/Med"

const Stack = createStackNavigator();

function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="MedList" component={MedList}/>
                    <Stack.Screen name="Med" component={Med}/>
                    <Stack.Screen name="SensitivitiesList" component={SensitivitiesList} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App;