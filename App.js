import * as React from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./src/screens/Home"
import MedList from "./src/components/MedList"
import SensitivitiesList from "./src/components/SensitivitiesList";
import Med from "./src/components/Med"

const Stack = createStackNavigator();

function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="List" component={MedList}/>
                    <Stack.Screen name="Medicine Info" component={Med}/>
                    <Stack.Screen name="Sensitivities List" component={SensitivitiesList} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App;