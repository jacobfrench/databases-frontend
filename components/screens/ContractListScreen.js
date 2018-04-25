import React from 'react';
import {
    StyleSheet, Text, View,
    TextInput, TouchableOpacity,
    ListView, FlatList, ScrollView,
    Modal
  } from 'react-native';
import { ListItem, Button, Divider} from 'react-native-elements'

import '../g.js'

export default class ContractListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        contracts:[],
        modalVisible: false,

    };

    

  
  }

  _onRefresh(){

  }

  componentDidMount(){
    // get route info.
    return fetch(global.baseIp + '/contracts')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
        contracts:responseJson
    
    }, function(){
        // for(i=0; i < this.state.contracts.length; i++){
        //     if(Number.isInteger(this.state.contracts[i].property)){
        //         for(j=0; j < this.state.contracts.length; j++){
        //             if(this.state.contracts[j].property.id = this.state.contracts[i].property)
        //                 this.state.contracts[i].property = this.state.contracts[j].property;
        //         }
        //     }
        //   }

        

    });
    
    })
    .catch((error) =>{
    console.error(error);
    });
  }

  render() {
    return (
        <View style={styles.container}>
         <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                this.setState({modalVisible: false})
            }}>

            <View style={styles.modalInner}>
            <View style={styles.whiteBox}>
                <Text style={styles.title}>{this.state.address}</Text>
                <Button
                    style={styles.button}
                    backgroundColor={global.colors.primary}
                    fontFamily='Roboto'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Create Invoice'
                    onPress={() => {
                        this.setState({modalVisible: false});

                    }}>
                </Button>
                <Divider style={{ backgroundColor: 'gray', margin:5 }} />
                <Button
                    style={styles.button}
                    backgroundColor={global.colors.primary}
                    fontFamily='Roboto'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Navigate'
                    onPress={() => {
                        this.setState({modalVisible: false});

                    }}>
                </Button>
              </View>

            </View>
          </Modal>

          <ScrollView style={styles.scrollContainer}>
            {
              this.state.contracts.map((c, i) => (
                <ListItem
                  key={i}
                  title={c.property.streetAddress}
                  subtitle={'Price: $' + c.price}
                  onPress={this.showModal.bind(this, c)}
                />
              ))
            }
          </ScrollView>
        </View>
    );
  }
  showModal(c){
    this.setState({modalVisible: true});
    this.setState({address: c.property.streetAddress})

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
        color: 'white',
        fontSize: 24,
        margin: 5
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        height: 200,
        width: global.width*.8,
        borderRadius: 5
    },
    button:{
        padding: 5,
        margin: 5,
        width: global.width*.65
    }
});