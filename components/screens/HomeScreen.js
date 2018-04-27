import React from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  KeyboardAvoidingView,
  Image,
  TextStyle,
  Text,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import '../g.js'



export default class HomeScreen extends React.Component {


  constructor(props) {
    super(props);
    Keyboard.dismiss();
    this.state = {
      'techId': '',
      'techName': ''
    };


  }

  componentDidMount() {
    // get technician info.
    let techId = this.props.navigation.state.params.techId;
    return fetch(global.baseIp + '/techs/' + techId)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        techId: techId,
        techName: responseJson.name,
        licenseType: responseJson.licenseType

    }, function(){
      console.log(responseJson)

    });

  })
  .catch((error) =>{
    console.error(error);
  });

}

  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.avatarBox}>
          <Image source={require('../images/avatar.png')}/>
          <Text style={styles.techName}>{this.state.techName}</Text>
          <View style={styles.techInfo}>
          <Text style={styles.smallTextBlue}> ID: </Text>
          <Text style={styles.smallText}>{this.state.techId}</Text>
          </View>
          <View style={styles.techInfo}>
            <Text style={styles.smallTextBlue}>License: </Text>
            <Text style={styles.smallText}>{this.state.licenseType}</Text>
          </View>
        </View>

        <ScrollView horizontal style={styles.scrollView}>
          <View style={styles.mainscreen}>
            <TouchableOpacity
              style={styles.box}
              onPress={this.showPropertyListScreen.bind(this)}>
              <Image source={require('../images/route.png')} />
              <Text style={styles.boxtext}>
                Route
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              onPress={this.showContractListScreen.bind(this)}>
              <Image source={require('../images/contract.png')} />
              <Text style={styles.boxtext}>
                Schedule
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              onPress={this.func.bind(this)}>
              <Text style={styles.boxtext}>
                ???
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.box}
              onPress={this.func.bind(this)}>
              <Text style={styles.boxtext}>
                ???
                </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  showPropertyListScreen() {
    this.props.navigation.navigate('PropertyListScreen', this.state.techId);
  }

  showContractListScreen() {
    this.props.navigation.navigate('ContractListScreen');
  }

  func(){}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2980b9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 1
  },
  box: {
    height: 80,
    width: global.width * .23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: global.colors.glass,
    borderColor: 'transparent',
    borderRadius: 0,
    margin: 1
  },
  boxtext: {
    color: '#fff',
    alignItems: 'center'
  },
  mainscreen: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'transparent'
  },
  avatarBox:{
    flex: 6,
    backgroundColor: 'transparent',
    width: global.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  techName: {
    fontSize: 35,
    color: '#fff',
    marginLeft: 5,
    marginTop: 10
  },
  smallText:{
    color: '#fff',
  },
  smallTextGreen:{
    color: '#2ecc71',
  },
  smallTextBlue:{
    color: '#66BB6A',
  },
  techInfo:{
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  }
});