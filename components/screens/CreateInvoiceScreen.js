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
    this.state = {};
  }

  formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  renderChemicalList(pests){  
    let pickerItems = [];
    for(i=0; i < pests.length; i++){
      for(j=0; j < pests[i].effectiveChemicals.length; j++){
        pickerItems.push(<Picker.Item key={'pickeritems_'}
        label={pests[i].effectiveChemicals[j].name}
        value={pests[i].effectiveChemicals[j].name} />);
      }
    }
    return pickerItems;
  
  }


  render() {
    let contract = this.props.navigation.state.params;
    let property = contract.property;
    let customer = property.customer;
    let pests = contract.pests;
    
    let chemicalList = this.renderChemicalList(pests);

    return (
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
          <Text style={styles.bold}>Service Information:</Text>
          <Picker
            key={'pickers_'}
            prompt='Chemical Used'
            selectedValue={this.state.month}
            style={{ height: 50, width: 250 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ month: itemValue })}>
            {chemicalList}
          </Picker>

          <Button
            backgroundColor={global.colors.primary}
            fontFamily='Roboto'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='Create Invoice'
          //   onPress={}
          />

        </Card>
      </ScrollView>
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
  }
});