import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, YellowBox } from 'react-native';
import LoginScreen from './components/screens/LoginScreen.js';
import HomeScreen from './components/screens/HomeScreen.js';
import PropertyListScreen from './components/screens/PropertyListScreen.js';

//ignore component deprication warnings
YellowBox.ignoreWarnings(['Warning: component']);

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppNavigator = StackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: false,
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',                             
      header: false
    },
  },
  PropertyListScreen: {
    screen: PropertyListScreen,
    navigationOptions: {
      title: 'My Route',
      headerStyle: { backgroundColor: global.colors.header },   //header background color
      headerTitleStyle: { color: '#fff' },                      //header text color
      headerTintColor: '#fff',                                  //header button icon color
    },
  }

});
