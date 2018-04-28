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
      inputText: '',
      modalVisible: false,
      chemUsed: this.getChemcialsUsed()[0],
      amount: 0,
      unit: 'gal.',
      pestIds: [],

      chems: [],
      amounts: [],
      units:[],

      contractId: 0,
      date: '2018-27-04',
      notes: ''

      
    };

  }


  postNewInvoice(){
    fetch(global.baseIp + '/invoices', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contract: {id:this.state.contractId},
        date: this.state.date,
        notes: this.state.notes
 
      }),
    });
    try {
      ToastAndroid.show('Contract Created.', ToastAndroid.LONG);
    }
    catch(err) {
      
    }

  }
  
  updateContract(){
    fetch(global.baseIp + '/contracts/'+ this.state.contractId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

 
      }),
    });

  }

  componentDidMount(){
    let contract = this.props.navigation.state.params;
    this.setState({contractId: contract.id})
    let property = contract.property;
    let customer = property.customer;
    let pests = contract.pests;
    for(i=0; i < pests.length; i++){
      this.state.pestIds.push({id:pests[i].id});
    }
    this.setState({pestIds:this.state.pestIds})

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
    for(i=0; i < pests.length; i++){
      p.push(<Text key={'p_'+i}>{pests[i].commonName}</Text>);
    }
    return p;
  }

  submit(){
    this.updateContract();
    this.postNewInvoice();
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
    this.state.chems.push(this.state.chemUsed);
    this.state.amounts.push(this.state.amount);
    this.state.units.push(this.state.unit);
    this.setState({chems: this.state.chems})
    this.setState({amounts: this.state.amounts})
    this.setState({units: this.state.units})

  }



  render() {
    let contract = this.props.navigation.state.params;
    let property = contract.property;
    let customer = property.customer;
    let pests = contract.pests;
    let pestNames = this.getTargetPests(pests);
    let pickerItems = this.getPickerItems();
    let chems = this.state.chems;

    let cm = this.state.chems.map((c, i) => {
      return <Text key={'chem_'+i} style={styles.chemText}>{c} </Text>
    });
    let amt = this.state.amounts.map((a, i) => {
      return <Text key={'amt_'+i} >{a} </Text>
    });
    let unt = this.state.units.map((u, i) => {
      return <Text key={'unt_'+i} style={styles.chemText}>{u}</Text>
    });


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
            <View style={styles.rowView}>
              <View style={styles.colView}>
                {cm}
              </View>
              <View style={styles.colView}>
                {amt}
              </View>
              <View style={styles.colView}>
                {unt}
              </View>
            </View>


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
            <Text style={styles.bold}>   Add Chemicals</Text>
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
                  buttonStyle={{borderRadius: 0, marginLeft: 0,
                                marginRight: 0, marginBottom: 0}}
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
  height: 250,
  width: global.width*.8,
  borderRadius: 5
},
input:{
  padding: 10,
  margin: 10,
  width: 50
},
rowView:{
  flexDirection: 'row',
  padding: 10
},
colView:{
  flexDirection: 'column'
},
chemText:{
  paddingRight: 10
}
});