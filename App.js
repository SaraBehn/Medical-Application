import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import MainScreen from "./screens/Main"
import MedScreen from "./screens/Med"


export default class App extends React.Component {
    render() {
    return (
        <AppContainer />
    );
  }
}

const AppNavigator = createStackNavigator({
    Main: {
      screen: MainScreen
    },
    Med: MedScreen
  });

const AppContainer = createAppContainer(AppNavigator);