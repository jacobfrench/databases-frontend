import React from 'react';
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, ImageBackground
} from 'react-native';
import '../g.js'

export default class RouteListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }


  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
