// import * as React from 'react';
// import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
//
// // import 'react-native-gesture-handler';
// import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
// import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//
// import MedSearch from "./old/MedSearch"
// import AuthorSearch from "./old/AuthorSearch"
// import Profile from "./old/Profile"
// import MyMeds from "./old/MyMeds"
// import Sensitivities from "./old/Sensitivities"
//
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
//
// async function saveState(state){
//     try {
//         const jsonValue = JSON.stringify(state)
//         await AsyncStorage.setItem('@state', jsonValue)
//     } catch (e) {
//         console.log("Could not save state")
//     }
// }
//
// async function loadState() {
//     let state = {sensitivities:{"Lactose":false,
//         "Corn starch":false,
//         "PEG":false,
//         "Povidone":false,
//         "Carboxymethylcellulose":false,
//         "Gelatin":false,
//         "Brilliant blue dye":false,
//         "Sunset Yellow FCF":false,
//         "Allura red":false,
//         "Propylene":false,
//         "Indigo carmine":false,
//         "Mannitol":false,
//         "Sucrose":false,
//         "Sodium benzoate":false,
//         "Parabens":false,
//         "Aspartame":false,
//         "Erythrosine":false,
//         "Tartrazine":false,
//         "Saccharin":false,
//         "Poloxamer":false,
//         "Soybean oil":false,
//         "Benzyl alcohol":false,
//         "Vanilla":false,
//         "Castor oil":false,
//         "Cetyl alcohol":false,
//         "Sulfite":false,
//         "PEG castor oils":false,
//         "Peanut oil":false,
//         "Benzoic acid":false,
//         "Corn syrup":false,
//         "Sesame Oil":false,
//         "Starch wheat":false,
//         "Casein food":false,
//         "Banana essence":false,
//         "Milk":false,
//         "Glucosamine":false,
//         "New coccine":false,
//         "Stearyl alcohol":false,
//     }}
//     try {
//         const jsonValue = await AsyncStorage.getItem('@state')
//         return jsonValue != null ? JSON.parse(jsonValue) : state;
//     } catch(e) {
//         return state;
//     }
// }
//
// function SensitivitiesScreen({ navigation }) {
//     return <Sensitivities sens= {this.state.sensitivities}/>;
// }
//
// function storeSensitivities(sens){
//     this.setState({sensitivities:sens})
// }
//
// function Prof(){
//     return (
//             <Stack.Navigator>
//                 <Stack.Screen name="Profile" component={Profile}/>
//                 <Stack.Screen name="MyMeds" component={MyMeds}/>
//                 <Stack.Screen name="Sensitivities" component={SensitivitiesScreen}/>
//             </Stack.Navigator>);
// }
//
// function App() {
//     this.state = {sensitivities:{"Lactose":false,
//             "Corn starch":false,
//             "PEG":false,
//             "Povidone":false,
//             "Carboxymethylcellulose":false,
//             "Gelatin":false,
//             "Brilliant blue dye":false,
//             "Sunset Yellow FCF":false,
//             "Allura red":false,
//             "Propylene":false,
//             "Indigo carmine":false,
//             "Mannitol":false,
//             "Sucrose":false,
//             "Sodium benzoate":false,
//             "Parabens":false,
//             "Aspartame":false,
//             "Erythrosine":false,
//             "Tartrazine":false,
//             "Saccharin":false,
//             "Poloxamer":false,
//             "Soybean oil":false,
//             "Benzyl alcohol":false,
//             "Vanilla":false,
//             "Castor oil":false,
//             "Cetyl alcohol":false,
//             "Sulfite":false,
//             "PEG castor oils":false,
//             "Peanut oil":false,
//             "Benzoic acid":false,
//             "Corn syrup":false,
//             "Sesame Oil":false,
//             "Starch wheat":false,
//             "Casein food":false,
//             "Banana essence":false,
//             "Milk":false,
//             "Glucosamine":false,
//             "New coccine":false,
//             "Stearyl alcohol":false,
//         }}
//         this.storeSensitivities = this.storeSensitivities.bind(this)
//     return (
//         <NavigationContainer>
//             <Tab.Navigator>
//                 <Tab.Screen name="Profile" component={Prof} />
//                 <Tab.Screen name="MedSearch" component={MedSearch} />
//                 {/*<Stack.Screen name="AuthorSearch" component={AuthorSearch} />*/}
//
//             </Tab.Navigator>
//         </NavigationContainer>
//     );
// }
//
//
// export default App;

import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { RootNavigator } from "./src/navigation/mainNavigator";
import {NavigationContainer} from "@react-navigation/native";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {SearchStackNavigator} from "./src/navigation/searchNavigator";
import HomeScreen from "./src/screens/HomeScreen";


// const initialState = {
//     indexes:[]
// };

// function reducer(state = initialState, action) {
//     let new_indexes = state.indexes ? state.indexes : []
//
//     switch(action.type) {
//         case 'ADD_SENS':
//             new_indexes.push(action.index)
//             return {
//                 indexes: new_indexes
//             };
//         case 'REMOVE_SENS':
//             new_indexes.splice(new_indexes.indexOf(action.index), 1)
//             return {
//                 indexes: new_indexes
//             };
//         default:
//             return state;
//     }
// }

// const store = createStore(reducer);


// export default function App() {
//     return (
//             <NavigationContainer>
//                 <HomeScreen />
//             </NavigationContainer>
//     );
// }

import MainScreen from "./screens/Main"
import MedScreen from "./screens/Med"
import {createStackNavigator} from "@react-navigation/stack";


export default class OldApp extends React.Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

const AppNavigator = createStackNavigator();



const AppContainer = createAppContainer(AppNavigator);