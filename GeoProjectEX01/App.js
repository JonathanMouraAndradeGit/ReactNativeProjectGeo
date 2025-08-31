import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Component } from 'react';
import React from 'react';
import * as Location from "expo-location";
import MapView, { Marker } from 'react-native-maps';

export default class App extends Component {
  state = {
    errorMessage: null,
    loaded: false,
    location: null,
    locationAddress: null,
    street: null,
    subregion: null,
    region: null,
    country: null,
    postalCode: null,
    district: null
  };

  componentDidMount() {
    this._getLocation();
  }

  _getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permissão negada',
        loaded: true
      });
    } else {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      const { latitude, longitude } = location.coords;

      let locationAddress = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
        useGoogleMaps: true
      });

      const [{ street, subregion, region, country, postalCode, district }] = locationAddress;

      this.setState({
        location,
        loaded: true,
        errorMessage: null,
        locationAddress,
        street,
        subregion,
        region,
        country,
        postalCode,
        district
      });
    }
  };

  render() {
    if (this.state.loaded) {
      if (this.state.errorMessage) {
        return (
          <View style={styles.container}>
            <Text>{this.state.errorMessage}</Text>
          </View>
        );
      } else if (this.state.location) {
        const { latitude, longitude } = this.state.location.coords;
        console.log("Latitude:", latitude, "Longitude:", longitude);
        return (
          <View style={styles.container}>
            <StatusBar style="auto" />
            <MapView
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0142,
                longitudeDelta: 0.0231,
              }}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0142,
                longitudeDelta: 0.0231,
              }}
              style={styles.mapStyle}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
              showsPointsOfInterest={false}
              showsBuildings={true}
            >
              <Marker
                coordinate={{ latitude, longitude }}
                title="Você está aqui"
              />
            </MapView>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.container}>
          <Text>Espere...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});