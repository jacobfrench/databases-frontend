import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, YellowBox } from 'react-native';
import { Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import '../g.js'

// api key
// AIzaSyDVs4XJbEc4SXZykpAeDSqPfZMFntmP4lE

export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {},
            pins: [],
            contracts: [],
            addresses: []
        }

    }

    componentDidMount() {
        this.loadAddresses();
        let addresses = this.state.addresses;
        for(i=0; i < addresses.length; i++){
            this.loadPins(addresses[i]);
            
        }

        for(i=0; i < this.state.addresses.length; i++){
            this.loadPins(this.state.addresses[i]);
        }

    }

    loadAddresses(){
        return fetch(global.baseIp + '/opencontracts')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    contracts: responseJson

                }, function () {
                    for(i=0; i < this.state.contracts.length; i++){
                        let c = this.state.contracts[i];
                        let address = c.property.streetAddress + ' ' +
                                      c.property.city + ' ' +
                                      c.property.state + ' ' +
                                      c.property.zipCode;
                        this.state.addresses.push(address);

                    }

                });

            })
            .catch((error) => {
                console.error(error);
            });

    }

    loadPins(address) {
        return fetch('http://maps.google.com/maps/api/geocode/json?address=' + address)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    region: responseJson

                }, function () {
                    let pin = this.state.region.results[0].geometry.location;
                    this.state.pins.push(pin);

                });

            })
            .catch((error) => {
                console.error(error);
            });
          
    }

    test(){
        for(i=0; i < this.state.addresses.length; i++){
            this.loadPins(this.state.addresses[i]);
        }
        console.log(this.state.pins);
    }

    render() {
        
        let addresses = this.state.addresses;
            
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    region={{
                        latitude: 35.3733,
                        longitude: -119.0187,
                        latitudeDelta: 0.3,
                        longitudeDelta: 0.3
                    }}>

                    {
                    this.state.pins.map((p, i) => (
                            <MapView.Marker
                                key={'pin_'+i}
                                coordinate={{
                                    latitude: p.lat,
                                    longitude: p.lng,
                                }}
                                title={'CSUB'}
                                description={'3:00 PM'}
                            />
                        ))
                    }

                </MapView>
                <Button
                    onPress={this.test.bind(this) }
                    buttonStyle={styles.button}
                    title={'Show Pins'}
                />


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    button:{
        backgroundColor: global.colors.primary,
        marginBottom: 5
    }
});