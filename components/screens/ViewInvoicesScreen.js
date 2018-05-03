import React from 'react';
import {
    StyleSheet, Text, View,
    TextInput, TouchableOpacity,
    ListView, FlatList, ScrollView,
    Modal, Image
  } from 'react-native';
import { ListItem, Button, Divider} from 'react-native-elements'

import '../g.js'

export default class ViewInvoicesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        invoices:[],
        filteredInvoices: []

    };
  }

  componentWillMount(){
    // get route info.
    return fetch(global.baseIp + '/invoices')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
        invoices:responseJson
    
    }, function(){
        let invoices = this.state.invoices;
        for(i=0; i < invoices.length; i++){
            if(!Number.isInteger(invoices[i].contract)){
                this.state.filteredInvoices.push(invoices[i]);
            }
        }

        this.setState({filteredInvoices: this.state.filteredInvoices});
    
    });
    
    })
    .catch((error) =>{
    console.error(error);
    });
  }

  render() {
    return (
        <View style={styles.container}>
       

          <ScrollView style={styles.scrollContainer}>
            {
              this.state.filteredInvoices.map((v, i) => (
                <ListItem
                  key={i}
                  title={v.contract.property.streetAddress}
                  subtitle={v.contract.serviceDate}
                  onPress={this.showModal.bind(this, v)}
                />
              ))
            }
          </ScrollView>
        </View>
    );
  }

  showModal(v){
    this.props.navigation.navigate('InvoiceDetailScreen', v);

  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2980b9',
        justifyContent: 'center',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 2
    },
    listItem: {
        width: global.width * .98,
        height: 65,
        backgroundColor: global.colors.glass,
        padding: 5,
        margin: 2,
        borderRadius: 5
    },
    title: {
        margin: 10,
        padding: 10
    },
    header: {
        fontSize: 32,
        margin: 5,
        // fontWeight: 'bold'
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
        height: global.height*.9,
        width: global.width*.9,
        borderRadius: 5
    },
    button:{
        padding: 5,
        margin: 5,
        width: global.width*.65
    },
    innerheader:{
        backgroundColor: '#2980b9',
        justifyContent: 'center',
        alignItems: 'center',

    }
});
