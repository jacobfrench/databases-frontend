import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  Picker,
  ToastAndroid

} from 'react-native';
import {Card, Button, CheckBox} from 'react-native-elements';

import '../g.js'

export default class CreateInvoiceSccreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      chemicalsUsed: this.getChemcialsUsed(),
      amounts: []
    };



  }
  

  getChemcialsUsed(){
    let contract = this.props.navigation.state.params;
    let pests = contract.pests;
    let chemicals = []
    for(i= 0; i < pests.length; i++){
      for(j=0; j < pests[i].effectiveChemicals.length; j++){
        chemicals.push(pests[i].effectiveChemicals[j].name);
      }
    }

    return Array.from(new Set(chemicals));

  }

  formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  renderChemicalList(pests){
    let chemicals = this.state.chemicalsUsed;
    const {checked} = this.state;
    views = []
    for(i= 0; i < chemicals.length; i++){
        views.push(
          <View key={'chemview_' + String(i)} style={styles.chemView}>
            <CheckBox
              key={'checkbox_' + String(i)}
              title={chemicals[i]}
              containerStyle={styles.chemBox}
              onPress={this.checked.bind(this, i)}
              checked={this.state.checked[i]} />
            <TextInput
              key={'text_' + String(i)}
              style={styles.input}
              underlineColorAndroid='black'
              placeholder='0'
              keyboardType='numeric'
              onChangeText={(text) => this.setState({ problem: text })}
            />
            <Picker
              key={'picker_' + String(i)}
              prompt='Amount'
              selectedValue={this.state.month}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ month: itemValue })}>
              <Picker.Item key={'gal_' + String(i)} label="gal." value="gal." />
              <Picker.Item key={'oz_' + String(i)} label="oz." value="oz." />
              <Picker.Item key={'lbs_' + String(i)} label="lbs." value="lbs." />
            </Picker>
          </View>
        );
    }

    return views;
    
  }

  checked(i){
    let arr = this.state.checked;
    arr[i] = !arr[i]
    this.setState({checked:arr})
  }

  getTargetPests(pests){
    console.log(pests)
    p = [];
    for(i=0; i < pests.length; i++)
      p.push(<Text key={'p_'+i}>{pests[i].commonName}</Text>);
    return p
  }

  render() {
    let contract = this.props.navigation.state.params;
    let property = contract.property;
    let customer = property.customer;
    let pests = contract.pests;
    let chemicalList = this.renderChemicalList(pests);
    let pestNames = this.getTargetPests(pests);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <Card>
            <Text style={styles.bold}>Property</Text>
            <Text>{property.propertyType}</Text>
            <Text>Address: {property.streetAddress}</Text>
            <Text>City: {property.city}</Text>
            <Text>State: {property.state}</Text>
            <Text>Zip: {property.zipCode}</Text>
            <Text style={styles.bold}>Customer</Text>
            <Text>Name: {customer.name}</Text>
            <Text>Email: {customer.email}</Text>
            <Text>Phone: {this.formatPhoneNumber(customer.phoneNum)}</Text>
          </Card>

          <Card>
            <Text style={styles.header}>Service Information:</Text>
            <Text style={styles.bold}>Description</Text>
            <Text>{contract.problemDesc}</Text>
            <Text style={styles.bold}>Target Pests</Text>
            {pestNames}

            <Text style={styles.bold}>Chemicals Used:</Text>
            {chemicalList}
          </Card>
        </ScrollView>
        <Button
            backgroundColor={global.colors.primary}
            fontFamily='Roboto'
            buttonStyle={styles.button}
            title='Create Invoice'
          //   onPress={}
          />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: global.colors.background,
  },
  bold:{
      fontWeight: 'bold',
      paddingTop: 10,
      paddingBottom: 5,
      fontSize: 18
  },
  button:{
    borderRadius: 0,
    marginTop: 5,
    marginLeft: 0, 
    marginRight: 0, 
    marginBottom: 5
  },
  chemView:{
    flex: 1,
    flexDirection: 'row'
  },
  chemBox:{
    width: global.width*.5
  },
  input:{
    width: global.width*.15
  },
  header:{
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 22
},
});