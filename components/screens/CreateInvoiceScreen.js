import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  Picker,
  ToastAndroid,

} from 'react-native';
import {Card, Button, CheckBox, Divider} from 'react-native-elements';

import '../g.js'

export default class CreateInvoiceSccreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chemicalsUsed: this.getChemcialsUsed(),
      amounts: 0,
      inputText: '',
      modalVisible: false,
      chemUsed: this.getChemcialsUsed()[0],
      amount: 0,
      unit: 'lbs',

      chems: []
      
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


  getTargetPests(pests){
    p = [];
    for(i=0; i < pests.length; i++)
      p.push(<Text key={'p_'+i}>{pests[i].commonName}</Text>);
    return p
  }

  submit(){
    console.log(this.state);
  }

  getPickerItems(){
    pickerItems = [];
    for(let i = 0; i < this.getChemcialsUsed().length; i++){
      pickerItems.push(
        <Picker.Item key={'pi_'+ String(i)} 
          label={this.getChemcialsUsed()[i]}
          value={this.getChemcialsUsed()[i]} />
      );
    }
    return pickerItems;
  }

  setModalVisible(visible){
    this.setState({modalVisible: visible});
  }

  updateChems(){
    // console.log(this.state.chemUsed);
    // console.log(this.state.amount);
    // console.log(this.state.unit)
    let a = this.state.chems;
    a.push(this.state.chemUsed);
    this.setState({chems: a})

  }



  render() {
    let contract = this.props.navigation.state.params;
    let property = contract.property;
    let customer = property.customer;
    let pests = contract.pests;
    let pestNames = this.getTargetPests(pests);
    let pickerItems = this.getPickerItems();
    let chems = this.state.chems;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <Card style={styles.card}>
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

          <Card style={styles.card}>
            <Text style={styles.header}>Service Information:</Text>
            <Text style={styles.bold}>Description</Text>
            <Text>{contract.problemDesc}</Text>
            <Text style={styles.bold}>Target Pests</Text>
            {pestNames}

            <Text style={styles.bold}>Chemicals Used:</Text>
            {chems}

            <Button
                backgroundColor={global.colors.primary}
                fontFamily='Roboto'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Add Chemical'
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);}}>
              </Button>
            
          </Card>
        </ScrollView>
        <Button
            backgroundColor={global.colors.primary}
            fontFamily='Roboto'
            buttonStyle={styles.button}
            title='Submit'
            onPress={this.submit.bind(this)}
          />

        <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                this.setState({modalVisible: false})}}>

            <View style={styles.modalInner}>
            <View style={styles.whiteBox}> 
            <Picker
                  prompt='Chemical'
                  selectedValue={this.state.chemUsed}
                  style={{ height: 50, width: global.width*.8 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({chemUsed: itemValue})}>
                  {pickerItems}
            </Picker>
            <View style={styles.rowView}>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid='black'
                  placeholder='0'
                  keyboardType='numeric'
                  onChangeText={(amt) => this.setState({amount: amt})}
                />

                <Picker
                  prompt='Unit'
                  selectedValue={this.state.unit}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({unit: itemValue})}>
                  <Picker.Item label="gal." value="gal." />
                  <Picker.Item label="lbs." value="lbs." />
                  <Picker.Item label="oz." value="oz." />
                </Picker>

                
              </View>
              <Button
                  backgroundColor={global.colors.primary}
                  fontFamily='Roboto'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='Add'
                  onPress={() => {
                    this.updateChems();
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                </Button>

                
            </View>

            </View>
          </Modal>
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
    width: global.width*.15,
    fontSize: 18,
    textAlign: 'center'
  },
  header:{
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 22,
},
  card:{
    backgroundColor: global.colors.clouds
  },
  modal:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 150

},
modalInner:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
},
whiteBox:{
  justifyContent: 'center',
  // alignItems: 'center',
  backgroundColor: global.colors.clouds,
  height: 200,
  width: global.width*.8,
  borderRadius: 5
},
input:{
  padding: 10,
  margin: 10,
  width: 50
},
rowView:{
  flexDirection: 'row'
}
});