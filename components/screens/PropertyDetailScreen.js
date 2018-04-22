
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
import {Card, Button} from 'react-native-elements';

import '../g.js'

export default class PropertyDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {},
      customer: {},
      contract:{},
      modalVisible: false,
      year: '',
      month: '',
      day: ''
    };

  }

  postNewContract(){
    fetch(global.baseIp + '/contracts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        salesPerson: 'name',
        serviceDate: '2018-04-22',
        price: 50.55,
        problemDesc: 'Ants in kitchen',
        property: {id:this.state.property.id},
        pests:[{id:1}, {id:2}]
      }),
    });
    try {
      ToastAndroid.show('Contract Created.', ToastAndroid.LONG);
    }
  catch(err) {
      
  }

  }

  setModalVisible(visible){
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    let propId = this.props.navigation.state.params;
        // get route info.
        return fetch(global.baseIp + '/properties/' + propId)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            property: responseJson,
            customer: responseJson.customer,
        }, function(){
        });
    
      })
      .catch((error) =>{
        console.error(error);
      });


}
formatPhoneNumber(s) {
  var s2 = (""+s).replace(/\D/g, '');
  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}
  

  render() {
    const p = this.state.property;
    const c = this.state.customer;
    return (
      <ScrollView style={styles.container}>
      <Modal
          style={styles.modal}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <TextInput
                style={styles.input}
                underlineColorAndroid='black'
                placeholder='Sales Person'
              />
              <View style={styles.pickerView}>
                <Picker
                  prompt='Month'
                  selectedValue={this.state.language}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                  <Picker.Item label="Jan." value="1" />
                  <Picker.Item label="Feb." value="2" />
                  <Picker.Item label="Mar." value="3" />
                  <Picker.Item label="Apr." value="4" />
                  <Picker.Item label="May." value="5" />
                  <Picker.Item label="Jun." value="6" />
                  <Picker.Item label="Jul." value="7" />
                  <Picker.Item label="Aug." value="8" />
                  <Picker.Item label="Sep." value="9" />
                  <Picker.Item label="Oct." value="10" />
                  <Picker.Item label="Nov." value="11" />
                  <Picker.Item label="Dec." value="12" />
                </Picker>
                <Picker
                  prompt='Day'
                  selectedValue={this.state.language}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="6" value="6" />
                  <Picker.Item label="7" value="7" />
                  <Picker.Item label="8" value="8" />
                  <Picker.Item label="9" value="9" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="11" value="11" />
                  <Picker.Item label="12" value="12" />
                  <Picker.Item label="13" value="13" />
                  <Picker.Item label="14" value="14" />
                  <Picker.Item label="15" value="15" />
                  <Picker.Item label="16" value="16" />
                  <Picker.Item label="17" value="17" />
                  <Picker.Item label="18" value="18" />
                  <Picker.Item label="19" value="19" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="21" value="21" />
                  <Picker.Item label="22" value="22" />
                  <Picker.Item label="23" value="23" />
                  <Picker.Item label="24" value="24" />
                  <Picker.Item label="25" value="25" />
                  <Picker.Item label="26" value="26" />
                  <Picker.Item label="27" value="27" />
                  <Picker.Item label="28" value="28" />
                  <Picker.Item label="29" value="29" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="31" value="31" />
                </Picker>
                <Picker
                  prompt='Year'
                  selectedValue={this.state.language}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                  <Picker.Item label="2018" value="2018" />
                  <Picker.Item label="2019" value="2019" />
                  <Picker.Item label="2020" value="2020" />
                </Picker>
              </View>
              <TextInput
                  style={styles.input}
                  underlineColorAndroid='black'
                  keyboardType='numeric'
                  placeholder='$0.00'
                />
                 <TextInput
                  style={styles.input}
                  underlineColorAndroid='black'
                  placeholder='Problem Description'
                />

              <Button
                backgroundColor={global.colors.primary}
                fontFamily='Roboto'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='OK'
                onPress={() => {
                  this.postNewContract();
                  this.setModalVisible(!this.state.modalVisible);
                }}>
              </Button>
            </View>
          </View>
        </Modal>

        <Card
          image={require('../images/house.jpg')}>
          <Text style={styles.headerText}>
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
          <Text style={styles.headerText}>
            Customer Info:
          </Text>
          <Text style={styles.text}>
            Name: {c.name}
          </Text>
          <Text style={styles.text}>
            Email: {c.email}
          </Text>
          <Text style={styles.text}>
            Phone: {this.formatPhoneNumber(c.phoneNum)}
          </Text>
          <Button
              backgroundColor={global.colors.primary}
              fontFamily='Roboto'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Create Contract'
              onPress={this.setModalVisible.bind(this, true)}
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
  card:{
    width: global.width*.98,
  },
  text:{
    marginBottom: 10
  },
  buttonView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText:{
    fontWeight: 'bold',
    marginBottom: 10
  },
  modal:{
    margin:5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    padding: 10,
    margin: 10,
    borderColor: 'black'
  },
  pickerView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }

});