
import React from 'react';
import {
  StyleSheet,
  View,
  Text,

} from 'react-native';
import {Card, Button} from 'react-native-elements';

import '../g.js'

export default class PropertyDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: '',
      customer: ''
    };

  }

  componentDidMount() {
    let propId = this.props.navigation.state.params;
        // get route info.
        return fetch(global.baseIp + '/properties/' + propId)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            property: responseJson,
            customer: responseJson.customer
        }, function(){
        });
    
      })
      .catch((error) =>{
        console.error(error);
      });


}

  formattedPhone(phone){
    if(phone.length == 10){
      for(i=0; i<3; i++){
        console.log(phone[i])
      }
    }
    return ''
  }
  

  render() {
    const p = this.state.property;
    const c = this.state.customer;
    return (
      <View style={styles.container}>
      <Card
        image={require('../images/house.jpg')}>
        <Text style={styles.text}>
          {p.propertyType}
        </Text>
        <Text style={styles.text}>
          Address: {p.streetAddress}
        </Text>
        <Text style={styles.text}>
          City: {p.city}
        </Text>
        <Text style={styles.text}>
          State: {p.state}
        </Text>
        <Text style={styles.text}>
          Zip: {p.zipCode}
        </Text>
        <Text style={styles.text}>
          Service Frequency: {p.serviceFrequency}
        </Text>
        <Text style={styles.text}>
          Customer Info:
        </Text>
        <Text style={styles.text}>
          Name: {c.name}
        </Text>
        <Text style={styles.text}>
          Email: {c.email}
        </Text>
        <Text style={styles.text}>
          Phone: {c.phoneNum}
        </Text>
        <Button
          backgroundColor={global.colors.primary}
          fontFamily='Roboto'
          buttonStyle={{borderRadius: 100, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Create Invoice'
         />
        </Card>

     
      </View>
    );
  }

  func(){}




}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: global.colors.background,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  card:{
    width: global.width*.95,
  },
  text:{
    marginBottom: 10
  }
});