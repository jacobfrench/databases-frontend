import React from 'react';
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity,
  ListView, FlatList, ScrollView
} from 'react-native';
import { ListItem } from 'react-native-elements'
import '../g.js'

export default class PropertyListScreen extends React.Component {
  constructor(){
    super();
      this.state = {
      properties: [],
      routeId: null,
      routeName: ''
    };
  }

  componentDidMount(){
    let routeId = this.props.navigation.state.params;
        // get route info.
        return fetch(global.baseIp + '/routes/' + routeId)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            routeId: routeId,
            routeName: responseJson.routeName,
            properties: responseJson.relatedProperties
    
        }, function(){

        });
    
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  showPropertyDetail(id){
    this.props.navigation.navigate('PropertyDetailScreen', id);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.state.routeName}</Text>
        <ScrollView style={styles.scrollContainer}>
          {
            this.state.properties.map((l, i) => (
              <ListItem
                key={i}
                title={l.streetAddress}
                subtitle={l.propertyType}
                onPress={this.showPropertyDetail.bind(this, l.id)}
              />
            ))
          }
        </ScrollView>
      </View>
    );
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
    backgroundColor: global.colors.clouds,
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
    margin: 0,
    color: 'white',
  },
  header: {
    color: 'white',
    fontSize: 24,
    margin: 5
  }
});
