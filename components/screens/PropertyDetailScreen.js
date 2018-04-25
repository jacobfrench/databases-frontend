
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

export default class PropertyDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: {},
      customer: {},
      modalVisible: false,
      year: '2018',
      month: '01',
      day: '01',
      problem: '',
      salesPerson: '',
      pests: [],
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      checked9: false,
      checked10: false,
    };

  }

  postNewContract(){
    let date = this.state.year + '-' + this.state.month + '-' + this.state.day
    fetch(global.baseIp + '/contracts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        salesPerson: this.state.salesPerson,
        serviceDate: date,
        price: parseFloat(this.state.price), 
        problemDesc: this.state.problem,
        property: {id:this.state.property.id},
        pests:this.state.pests
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

  addPests(){
    pestIds = []
    pestIds.push(this.state.checked1);
    pestIds.push(this.state.checked2);
    pestIds.push(this.state.checked3);
    pestIds.push(this.state.checked4);
    pestIds.push(this.state.checked5);
    pestIds.push(this.state.checked6);
    pestIds.push(this.state.checked7);
    pestIds.push(this.state.checked8);
    pestIds.push(this.state.checked9);
    pestIds.push(this.state.checked10);
    for(i=0; i < pestIds.length; i++){
      if(pestIds[i] == true){
        this.state.pests.push({id:(i+1)});
      }
    }
    
  }
  

  render() {
    const p = this.state.property;
    const c = this.state.customer;
    return (
      <ScrollView style={styles.container}>
      <Modal
          style={styles.modal}
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View style={{marginTop: 22}}>
            <View style={styles.innerView}>
              <TextInput
                style={styles.input}
                underlineColorAndroid='black'
                placeholder='Sales Person'
                onChangeText={(text) => this.setState({salesPerson: text})}
              />
              <View style={styles.pickerView}>
                <Picker
                  prompt='Month'
                  selectedValue={this.state.month}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue})}>
                  <Picker.Item label="Jan." value="01" />
                  <Picker.Item label="Feb." value="02" />
                  <Picker.Item label="Mar." value="03" />
                  <Picker.Item label="Apr." value="04" />
                  <Picker.Item label="May." value="05" />
                  <Picker.Item label="Jun." value="06" />
                  <Picker.Item label="Jul." value="07" />
                  <Picker.Item label="Aug." value="08" />
                  <Picker.Item label="Sep." value="09" />
                  <Picker.Item label="Oct." value="10" />
                  <Picker.Item label="Nov." value="11" />
                  <Picker.Item label="Dec." value="12" />
                </Picker>
                <Picker
                  prompt='Day'
                  selectedValue={this.state.day}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({day: itemValue})}>
                  <Picker.Item label="1" value="01" />
                  <Picker.Item label="2" value="02" />
                  <Picker.Item label="3" value="03" />
                  <Picker.Item label="4" value="04" />
                  <Picker.Item label="5" value="05" />
                  <Picker.Item label="6" value="06" />
                  <Picker.Item label="7" value="07" />
                  <Picker.Item label="8" value="08" />
                  <Picker.Item label="9" value="09" />
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
                  selectedValue={this.state.year}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({year: itemValue})}>
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
                  onChangeText={(text) => this.setState({price:text})}
                />
                 <TextInput
                  style={styles.input}
                  underlineColorAndroid='black'
                  placeholder='Problem Description'
                  onChangeText={(text) => this.setState({problem: text})}
                />

              <View style={styles.checkBoxView}>
                <CheckBox
                  title='Argentine Ants'
                  onPress={() => this.setState({checked1: !this.state.checked1})}
                  checked={this.state.checked1}
                />
                <CheckBox
                  title='Fire Ants'
                  onPress={() => this.setState({checked2: !this.state.checked2})}
                  checked={this.state.checked2}
                />
              </View>

              <View style={styles.checkBoxView}>
                <CheckBox
                  title='Earwigs'
                  onPress={() => this.setState({checked3: !this.state.checked3})}
                  checked={this.state.checked3}
                />
                <CheckBox
                  title='American Cockroaches'
                  onPress={() => this.setState({checked6: !this.state.checked6})}
                  checked={this.state.checked6}
                />
              </View>

              <View style={styles.checkBoxView}>
                <CheckBox
                  title='German Cockroaches'
                  onPress={() => this.setState({checked5: !this.state.checked5})}
                  checked={this.state.checked5}
                />
                <CheckBox
                  title='Brown Rat'
                  onPress={() => this.setState({checked4: !this.state.checked4})}
                  checked={this.state.checked4}
                />
              </View>

              <View style={styles.checkBoxView}>
                <CheckBox
                  title='Gray Mouse'
                  onPress={() => this.setState({checked7: !this.state.checked7})}
                  checked={this.state.checked7}
                />
                <CheckBox
                  title='Bed Bugs'
                  onPress={() => this.setState({checked8: !this.state.checked8})}
                  checked={this.state.checked8}
                />
              </View>

              <View style={styles.checkBoxView}>
                <CheckBox
                  title='Pharoh Ants'
                  onPress={() => this.setState({checked9: !this.state.checked9})}
                  checked={this.state.checked9}
                />
                <CheckBox
                  title='Indian Meal Moths'
                  onPress={() => this.setState({checked10: !this.state.checked10})}
                  checked={this.state.checked10}
                />
              </View>
            </View>
            <Button
                backgroundColor={global.colors.primary}
                fontFamily='Roboto'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='OK'
                onPress={() => {
                  this.addPests();
                  this.postNewContract();
                  this.setModalVisible(!this.state.modalVisible);

                }}>
              </Button>

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
  },
  checkBoxView:{
    flexDirection: 'row'
  },
  innerView:{
    paddingBottom: 15
  }

});