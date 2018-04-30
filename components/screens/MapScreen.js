import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, YellowBox } from 'react-native';
import {Button} from 'react-native-elements';
import MapView from 'react-native-maps';

// api key
// AIzaSyDVs4XJbEc4SXZykpAeDSqPfZMFntmP4lE


export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {},
            loc: []

        }

    }

    componentDidMount() {
        this.test();
    }

    test(){
        this.getLatLong('CSUB%20Stockdale%20Hwy,%20Bakersfield,%20CA%2093311');
        this.getLatLong('300%20Galaxy%20Ave,%20Bakersfield,%20CA%2093308');

    }

    getLatLong(address){
        return fetch('http://maps.google.com/maps/api/geocode/json?address=' + address)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    region: responseJson

                }, function () {
                    let location = this.state.region.results[0].geometry.location;
                    this.state.loc.push(location);
                    this.setState({loc: this.state.loc})

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        let loc = this.state.loc;
        console.log(this.state);
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
                    loc.map((l, i) => (
                    <MapView.Marker
                        key={i}
                        coordinate={{
                            latitude:  l.lat,
                            longitude: l.lng,
                        }}
                        title={'CSUB Stockdale Hwy, Bakersfield, CA 93311'}
                        description={'3:00 PM'}
                    />
                    ))
                    }
                </MapView>
                <Button
                    onPress={this.test.bind(this)}
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
    }
});