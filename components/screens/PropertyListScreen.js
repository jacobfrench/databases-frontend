import React from 'react';
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity,
  FlatList, ScrollView
} from 'react-native';
import '../g.js'

export default class PropertyListScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // selected: (new Map(): Map<string, boolean>),
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
          console.log(this.state.properties[0]);
    
        });
    
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  _onPressItem(){}

  _renderItem = ({item}) => (
    <PropertyItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={'selected'}
      address={'12309 Quiet Pasture Dr.'}
      zipCode={'93312'}
      style={{margin: 10, padding:10}}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <FlatList
            data={[{key:'a'}]}
            renderItem={this._renderItem}
          />
        </ScrollView>
      </View>
        
    );
  }
}


// List item Component in FlatList
class PropertyItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "white" : "white";
    return (
      <TouchableOpacity onPress={this._onPress} style={styles.listItem} shadow>
        <View>
          <Text style={styles.title}>
            {this.props.address}
          </Text>
          <Text style={styles.title}>
            {this.props.zipCode}
          </Text>
          
        </View>
      </TouchableOpacity>
    );
  }
}



// Style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer:{
      flex: 1,
      backgroundColor: global.colors.primary,
      margin:2
  },
  listItem:{
    width: global.width*.98,
    height: 65,
    backgroundColor: global.colors.glass,
    padding:5,
    margin:2,
    borderRadius: 5
  },
  title:{
    margin:0,
    color: 'white',
  }
});
