import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import screens from '../../../constants/screens';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {darkGrey} from '../../../assets/theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapViewScreenVet = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [search, setSearch] = useState('');
  const [addressDetails, setAddressDetails] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const mapRef = useRef(null);

  const defaultLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const getFormattedAddress = async (latitude, longitude) => {
    try {
      const apiKey = 'AIzaSyAzaFHvZmHZxgM3uIhNKC0XuageLFjIooI'; // Replace with your real API key
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const addressStr = data.results[0].formatted_address;
        setAddress(addressStr);

        const components = data.results[0].address_components;
        const details = [];

        const getComponent = types =>
          components.find(c => types.every(type => c.types.includes(type)))
            ?.long_name;

        const area =
          getComponent(['sublocality']) ||
          getComponent(['route']) ||
          getComponent(['neighborhood']);
        const city =
          getComponent(['locality']) ||
          getComponent(['administrative_area_level_2']);
        const state = getComponent(['administrative_area_level_1']);
        const pincode = getComponent(['postal_code']);
        const country = getComponent(['country']);

        // Extracting flat number and apartment/society from formatted_address (first part)
        let flatNumber = null;
        let apartmentName = null;

        if (data.results[0]?.formatted_address) {
          const parts = data.results[0].formatted_address.split(',');
          if (parts.length >= 2) {
            flatNumber = parts[0].trim(); // First line often contains flat number
            apartmentName = parts[1].trim(); // Second line might contain society name
          }
        }

        // const details = [];

        if (flatNumber) details.push({name: 'flatNumber', value: flatNumber});
        if (apartmentName)
          details.push({name: 'apartmentName', value: apartmentName});
        if (area) details.push({name: 'area', value: area});
        if (city) details.push({name: 'city', value: city});
        if (state) details.push({name: 'state', value: state});
        if (pincode) details.push({name: 'pincode', value: pincode});
        if (country) details.push({name: 'country', value: country});

        details.push({name: 'latitude', value: latitude});
        details.push({name: 'longitude', value: longitude});

        setAddressDetails(details);
        await AsyncStorage.setItem('addressDetails', JSON.stringify(details));
        console.log('Structured Address:', details);
        // ✅ Save final address coordinates separately
        const finalCoords = {latitude, longitude};
        await AsyncStorage.setItem(
          'finalAddressLocation',
          JSON.stringify(finalCoords),
        );
        console.log('Final Displayed Address Location:', finalCoords);
      } else {
        setAddress('Address not found');
        setAddressDetails([]);
        await AsyncStorage.removeItem('addressDetails');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
      setAddressDetails([]);
      await AsyncStorage.removeItem('addressDetails');
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        const coords = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setLocation(coords);
        await AsyncStorage.setItem(
          'currentLocation',
          JSON.stringify({latitude, longitude}),
        );
        console.log('Stored current location:', {latitude, longitude});

        getFormattedAddress(latitude, longitude);
        setLoading(false);
      },
      error => {
        Alert.alert(
          'Error',
          `Failed to get your location: ${error.message}` +
            ' Make sure your location is enabled.',
        );
        setLocation(defaultLocation);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert(
              'Permission Denied',
              'Location permission is required to show your current location on the map.',
            );
            setLocation(defaultLocation);
            setLoading(false);
          }
        } catch (err) {
          console.warn(err);
          setLocation(defaultLocation);
          setLoading(false);
        }
      } else {
        getCurrentLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const fetchAddressSuggestions = async input => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const apiKey = 'AIzaSyAzaFHvZmHZxgM3uIhNKC0XuageLFjIooI';
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input,
    )}&key=${apiKey}`;

    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.status === 'OK') {
        setSuggestions(json.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Autocomplete error:', error);
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = async placeId => {
    const apiKey = 'AIzaSyAzaFHvZmHZxgM3uIhNKC0XuageLFjIooI';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.status === 'OK') {
        const {lat, lng} = json.result.geometry.location;
        const coords = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        // setLocation(coords);
        // setSearch(json.result.formatted_address);
        // setAddress(json.result.formatted_address);
        // getFormattedAddress(lat, lng);
        // setSuggestions([]);
        // mapRef.current?.animateToRegion(coords, 1000);
        setLocation(coords);
        mapRef.current?.animateToRegion(coords, 1000);
        setSuggestions([]);

        const fullAddress = await getFormattedAddress(lat, lng);
        setSearch(fullAddress);

        await AsyncStorage.setItem(
          'searchedCoords',
          JSON.stringify({latitude: lat, longitude: lng}),
        );
        console.log('Stored searched location:', {
          latitude: lat,
          longitude: lng,
        });
      }
    } catch (error) {
      console.error('Place details error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        region={location}
        onPress={e => {
          const {latitude, longitude} = e.nativeEvent.coordinate;
          const coords = {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setLocation(coords);
          getFormattedAddress(latitude, longitude);
          mapRef.current?.animateToRegion(coords, 1000);
        }}>
        {location && <Marker coordinate={location} />}
      </MapView>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="🔍︎ Find a place"
          placeholderTextColor={darkGrey}
          value={search}
          onChangeText={text => {
            setSearch(text);
            fetchAddressSuggestions(text);
          }}
          onSubmitEditing={() => fetchAddressSuggestions(search)}
          returnKeyType="search"
        />

        {suggestions.length > 0 && (
          <ScrollView style={styles.suggestionsContainer}>
            {suggestions.map(item => (
              <TouchableOpacity
                key={item.place_id}
                onPress={() => handleSuggestionPress(item.place_id)}
                style={styles.suggestionItem}>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.box}>
        <Text style={styles.boxText}>{address || 'Fetching address...'}</Text>

        <TouchableOpacity
          style={styles.bt}
          onPress={() => navigation.navigate(screens.FillAddressDetailsVet)}>
          <Text style={styles.btText}>✓ Select place</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapViewScreenVet;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 999,
  },
  input: {
    fontSize: 16,
  },
  box: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 500,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 150,
    width: 250,
  },
  boxText: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 14,
    color: '#333',
    paddingVertical: 2,
  },
  bt: {
    top: 10,
    alignItems: 'center',
  },
  btText: {
    color: 'green',
    fontSize: 16,
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    // borderRadius: 10,
    marginTop: 8,
    maxHeight: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});
