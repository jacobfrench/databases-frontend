import React from 'react';
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, ImageBackground, ToastAndroid
} from 'react-native';
import '../g.js'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      techId: ''
    };
  }

  navigateHomeScreen() {
    if(this.state.techId != '')
        this.props.navigation.navigate('HomeScreen', { techId: this.state.techId });
    else
      ToastAndroid.show('Sign in failed.', ToastAndroid.SHORT);
      
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo.png')} />
        <KeyboardAvoidingView style={styles.formContainer} behavior='padding'>
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
            selectionColor='#fff'
            placeholder='Tech ID'
            placeholderTextColor='#fff'
            onChangeText={(text) => this.setState({ techId: text })}
            value={this.state.text}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
            selectionColor='#fff'
            placeholder='Password'
            placeholderTextColor='#fff'
            secureTextEntry={true}
          />
        </KeyboardAvoidingView>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.loginButton}
            onPress={this.navigateHomeScreen.bind(this)}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Forgot your password? Tap Here.</Text>
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
  formContainer: {
    padding: 5,
    width: global.width * 0.85
  },
  input: {
    height: 45,
    backgroundColor: global.colors.glass,
    marginBottom: 20,
    color: '#fff',
    borderRadius: 100,
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  loginButton: {
    justifyContent: 'center',
    backgroundColor: global.colors.glass,
    alignItems: 'center',
    height: 45,
    borderRadius: 100,
    width: global.dim.width * 0.4,
    margin: 5
  },
  signupButton: {
    justifyContent: 'center',
    backgroundColor: global.colors.lightbutton,
    alignItems: 'center',
    height: 45,
    borderRadius: 100,
    width: global.dim.width * 0.4,
    margin: 5
  },
  text: {
    color: '#fff'
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
