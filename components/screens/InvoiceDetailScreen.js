import React from 'react';
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, ImageBackground, ToastAndroid,
  ScrollView
} from 'react-native';
import {LinearGradient} from 'expo';
import '../g.js';

export default class InvoiceDetailScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  render() {
    let invoice = this.props.navigation.state.params;
    console.log(invoice);

      return (
          <View style={styles.container}>
              <ScrollView style={styles.scrollContainer}>

                  <LinearGradient style={styles.imageHeader} colors={['#4FC3F7', '#1565C0']}>
                      <Image source={require('../images/logo.png')} />
                  </LinearGradient>

                  <View style={styles.infoContainer}>
                    <Text style={styles.header}>Invoice</Text>
                    <Text>Date of Service: {invoice.contract.serviceDate}</Text>
                    <Text>Charge: ${invoice.contract.price}</Text>
                    <Text>Sales Person: {invoice.salesPerson}</Text>
                    <Text>Reason For Service: {invoice.contract.problemDesc}</Text>
                    <Text style={styles.indented}>Target Pests:</Text>
                    {
                        invoice.contract.pests.map((p, i) =>(
                            <Text style={styles.list} key={'pest_'+i}>{p.commonName}</Text>
                        ))

                    }
                    <Text style={styles.indented}>Chemicals Used:</Text>
                    {
                        invoice.chemicalsUsed.map((c, i) =>(
                            <View key={'li'+i} style={{flexDirection: 'row'}}>
                                <View style={styles.chemContainer}>
                                <Text style={styles.list} key={'chem_'+i}>{c.name}</Text>
                                </View>
                                <View style={styles.chemContainer}>
                                <Text style={styles.list} key={'sw_'+i}>{c.signalWord}</Text>
                                </View>
                            </View>
                        ))
                    }
                    <Text style={styles.indented}>Address</Text>
                    <Text>{invoice.contract.property.streetAddress}</Text>
                    <Text>{invoice.contract.property.city}, {invoice.contract.property.state}</Text>
                    <Text>{invoice.contract.property.zipCode}</Text>

                    <Text style={styles.indented}>Customer Info.</Text>
                    <Text>{invoice.contract.property.customer.name}</Text>
                    <Text>{invoice.contract.property.customer.email}</Text>
                    <Text>{this.formatPhoneNumber(invoice.contract.property.customer.phoneNum)}</Text>
                    








                  </View>
              </ScrollView>

          </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: global.colors.clouds,
        alignItems: 'center',
    },
    imageHeader: {
        backgroundColor: global.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: global.width,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 2
    },
    infoContainer:{
        margin:10
    },
    header:{
        fontSize: 32,
        margin: 5,
    },
    indented:{
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
    list:{
        marginLeft: 15,
        paddingRight: 35
    },
    chemContainer:{
        flex:1
    }

});
