import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, YellowBox } from 'react-native';
import LoginScreen from './components/screens/LoginScreen.js';
import HomeScreen from './components/screens/HomeScreen.js';
import PropertyListScreen from './components/screens/PropertyListScreen.js';
import PropertyDetailScreen from './components/screens/PropertyDetailScreen.js';
import ContractListScreen from './components/screens/ContractListScreen.js';
import CreateInvoiceScreen from './components/screens/CreateInvoiceScreen.js';

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
  },
  PropertyDetailScreen: {
    screen: PropertyDetailScreen,
    navigationOptions: {
      title: 'Property Detail',
      headerStyle: { backgroundColor: global.colors.header },   //header background color
      headerTitleStyle: { color: '#fff' },                      //header text color
      headerTintColor: '#fff',                                  //header button icon color
    },
  },
  ContractListScreen: {
    screen: ContractListScreen,
    navigationOptions: {
      title: 'Contracts',
      headerStyle: { backgroundColor: global.colors.header },   //header background color
      headerTitleStyle: { color: '#fff' },                      //header text color
      headerTintColor: '#fff',                                  //header button icon color
    },
  },
  CreateInvoiceScreen: {
    screen: CreateInvoiceScreen,
    navigationOptions: {
      title: 'Invoice',
      headerStyle: { backgroundColor: global.colors.header },   //header background color
      headerTitleStyle: { color: '#fff' },                      //header text color
      headerTintColor: '#fff',                                  //header button icon color
    },
  },

});

