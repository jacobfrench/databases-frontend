import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, YellowBox } from 'react-native';
import LoginScreen from './components/screens/LoginScreen.js';
import HomeScreen from './components/screens/HomeScreen.js';
import RouteListScreen from './components/screens/RouteListScreen.js';

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
      headerStyle: { backgroundColor: global.colors.header },   //header background color
      headerTitleStyle: { color: '#444' },                      //header text color
      headerTintColor: '#444',                                  //header button icon color
      header: false
    },
  },
  RouteListScreen: {
    screen: RouteListScreen,
    navigationOptions: {
      title: 'Home',
      headerStyle: { backgroundColor: global.colors.header },   //header background color
      headerTitleStyle: { color: '#444' },                      //header text color
      headerTintColor: '#444',                                  //header button icon color
    },
  }

});

