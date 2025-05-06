// import {View, Text, Image, TouchableOpacity} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import images from '../../assets/images';
// import Slider from '@react-native-community/slider';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const apiKey = 'AIzaSyAzaFHvZmHZxgM3uIhNKC0XuageLFjIooI';

// const SelectServiceArea = () => {
//   const [radius, setRadius] = useState(5);
//   const [selectedAreas, setSelectedAreas] = useState([]);
//   const [location, setLocation] = useState({lat: null, lng: null});
//   // const [areas, setAreas] = useState([]);
//   const [areaNames, setAreaNames] = useState([]);
//   const [loadingNearby, setLoadingNearby] = useState(false);

//   useEffect(() => {
//     const fetchStoredLocation = async () => {
//       try {
//         const storedLocation = await AsyncStorage.getItem(
//           'finalAddressLocation',
//         );
//         if (storedLocation !== null) {
//           const parsedLocation = JSON.parse(storedLocation);
//           console.log('Fetched Address Location:', parsedLocation);
//           setLocation({
//             lat: parsedLocation.latitude,
//             lng: parsedLocation.longitude,
//           });
//         }
//       } catch (error) {
//         console.log('Error retrieving location from storage:', error);
//       }
//     };

//     fetchStoredLocation();
//   }, []);

//   useEffect(() => {
//     if (!location.lat || !location.lng) return;

//     const timeout = setTimeout(() => {
//       fetchNearbyPlaces(location.lat, location.lng, radius * 1000);
//     }, 500); // wait 500ms after slider stops changing

//     return () => clearTimeout(timeout); // clear timeout if radius changes again quickly
//   }, [radius, location]);

//   const fetchNearbyPlaces = async (lat, lng, radiusMeters) => {
//     if (loadingNearby) return;

//     setLoadingNearby(true);
//     try {
//       const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radiusMeters}&key=${apiKey}`;
//       const response = await fetch(nearbyUrl);
//       const data = await response.json();

//       const newAreas = data.results
//         .map(place => place.vicinity || place.name)
//         .filter(Boolean);

//       // const uniqueAreas = [...new Set([...areas, ...newAreas])];
//       const uniqueAreas = [...new Set(newAreas)];

//       const enriched = [];

//       for (const address of uniqueAreas) {
//         const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//           address,
//         )}&key=${apiKey}`;
//         const geoResponse = await fetch(geocodeUrl);
//         const geoData = await geoResponse.json();
//         const components = geoData.results[0]?.address_components || [];

//         const getComponent = types =>
//           components.find(c => types.every(type => c.types.includes(type)))
//             ?.long_name;

//         const area =
//           getComponent(['sublocality']) ||
//           getComponent(['route']) ||
//           getComponent(['neighborhood']);
//         const city =
//           getComponent(['locality']) ||
//           getComponent(['administrative_area_level_2']);
//         const state = getComponent(['administrative_area_level_1']);
//         const pincode = getComponent(['postal_code']);
//         const country = getComponent(['country']);

//         const details = [];
//         if (area) details.push({name: 'area', value: area});
//         if (city) details.push({name: 'city', value: city});
//         if (state) details.push({name: 'state', value: state});
//         if (pincode) details.push({name: 'pincode', value: pincode});
//         if (country) details.push({name: 'country', value: country});

//         enriched.push(details);
//       }

//       const extractedAreaNames = enriched
//         .map(detailArr => detailArr.find(d => d.name === 'area')?.value)
//         .filter(Boolean);

//       setAreaNames(extractedAreaNames);
//       console.log('All Area Names:', extractedAreaNames);
//     } catch (err) {
//       console.error('Failed to fetch nearby places:', err);
//     } finally {
//       setLoadingNearby(false);
//     }
//   };

//   // const toggleAreaSelection = (area) => {
//   //   setSelectedAreas(prevSelected => {
//   //     if (prevSelected.includes(area)) {
//   //       return prevSelected.filter(item => item !== area);
//   //     } else {
//   //       return [...prevSelected, area];
//   //     }
//   //   });
//   // };

//   const toggleAreaSelection = async area => {
//     setSelectedAreas(prevSelected => {
//       const updatedSelected = prevSelected.includes(area)
//         ? prevSelected.filter(item => item !== area)
//         : [...prevSelected, area];

//       // Save the updated selected areas to local storage
//       AsyncStorage.setItem('selectedAreas', JSON.stringify(updatedSelected))
//         .then(() => {
//           console.log('Selected Areas saved to AsyncStorage:', updatedSelected);
//         })
//         .catch(error => {
//           console.log('Error saving selected areas:', error);
//         });

//       return updatedSelected;
//     });
//   };

//   return (
//     <View>
//       <Text className="text-gray-900 mb-5 text-[24px] font-Nunito-Bold mt-[10px]">
//         Select Your Service Area
//       </Text>

//       <Text className=" text-[#333333] text-[13px] mb-5 font-Nunito-Regular">
//         Based on the address provided, we have populated the neighbourhood that
//         you may prefer to serve.
//       </Text>

//       {/* radius  */}
//       <View className="p-[15px] bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light rounded-2xl flex-row items-center">
//         <View className="items-center">
//           <Image
//             source={images.trackIcon}
//             className="h-[18px] mb-[5px] w-[18px]"
//             resizeMode="contain"
//             style={{tintColor: '#838999'}}
//           />
//           <Text className=" text-darkGunmetal text-[16px] font-[Nunito-Regular]">
//             Radius
//           </Text>
//         </View>
//         <View className="flex-1">
//           <Slider
//             style={{
//               width: 190,
//               height: 40,
//               marginLeft: 10,
//             }}
//             minimumValue={5} // Minimum value of 5 km
//             maximumValue={50} // Maximum value (e.g., 50 km)
//             value={radius} // Default value: 5 km
//             step={1} // Steps in whole kilometers
//             onValueChange={val => setRadius(val)} // Update range on slider change
//             minimumTrackTintColor="#d75880" // Red color for the active track
//             maximumTrackTintColor="#000000" // Grey color for the inactive track
//             thumbTintColor="#d75880" // Red thumb color
//             thumbImage={images.draggerIcon}
//           />
//         </View>
//         <Text className=" text-[16px] text-primary font-[Nunito-Bold]">
//           {radius} km
//         </Text>
//       </View>

//       <Text
//         className=" mt-2 mb-[30px] text-[#BBBCB7] text-[12px]"
//         style={{fontFamily: 'Nunito-Regular'}}>
//         The areas shown below are within the specified radius.
//       </Text>

//       <Text className="text-[#838999] mb-[15px] font-[Nunito-Regular]">
//         Below are your selected areas
//       </Text>

//       {loadingNearby ? (
//         <Text className="text-center text-gray-600 mb-4 font-[Nunito-Regular]">
//           Loading nearby areas...
//         </Text>
//       ) : (
//         <View className="flex-row flex-wrap gap-2">
//           {areaNames
//             .filter((value, index, self) => self.indexOf(value) === index)
//             .map((area, index) => (
//               <TouchableOpacity
//                 key={index}
//                 className={`rounded-[16px] py-[14px] px-[15px] mb-2 border ${
//                   selectedAreas.includes(area)
//                     ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
//                     : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
//                 }`}
//                 onPress={() => toggleAreaSelection(area)}>
//                 <Text
//                   className={` text-[16px] leading-6  ${
//                     !selectedAreas.includes(area)
//                       ? ' text-[#838999] font-Nunito-Regular'
//                       : ' text-white font-Nunito-Bold'
//                   }`}>
//                   {area}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//         </View>
//       )}
//       <Image
//         source={images.petLocationIcon}
//         style={{resizeMode: 'contain'}}
//         className="w-full h-[200px] mt-[20px] mb-[200px] left-[100px]"
//       />
//     </View>
//   );
// };

// export default SelectServiceArea;
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import images from '../../assets/images';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiKey = 'AIzaSyAzaFHvZmHZxgM3uIhNKC0XuageLFjIooI';

const SelectServiceArea = () => {
  const [radius, setRadius] = useState(5);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [location, setLocation] = useState({lat: null, lng: null});
  const [areaNames, setAreaNames] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);

  useEffect(() => {
    const fetchStoredLocation = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem(
          'finalAddressLocation',
        );
        if (storedLocation !== null) {
          const parsedLocation = JSON.parse(storedLocation);
          setLocation({
            lat: parsedLocation.latitude,
            lng: parsedLocation.longitude,
          });
        }

        const storedSelectedAreas = await AsyncStorage.getItem('selectedAreas');
        if (storedSelectedAreas !== null) {
          const parsedSelectedAreas = JSON.parse(storedSelectedAreas);
          setSelectedAreas(parsedSelectedAreas);
        }
      } catch (error) {
        console.log('Error retrieving initial data from storage:', error);
      }
    };

    fetchStoredLocation();
  }, []);

  useEffect(() => {
    if (!location.lat || !location.lng) return;

    const timeout = setTimeout(() => {
      fetchNearbyPlaces(location.lat, location.lng, radius * 1000);
    }, 500);

    return () => clearTimeout(timeout);
  }, [radius, location]);

  const fetchNearbyPlaces = async (lat, lng, radiusMeters) => {
    if (loadingNearby) return;

    setLoadingNearby(true);
    try {
      const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radiusMeters}&key=${apiKey}`;
      const response = await fetch(nearbyUrl);
      const data = await response.json();

      const newAreas = data.results
        .map(place => place.vicinity || place.name)
        .filter(Boolean);

      const uniqueAreas = [...new Set(newAreas)];

      const enriched = [];

      for (const address of uniqueAreas) {
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${apiKey}`;
        const geoResponse = await fetch(geocodeUrl);
        const geoData = await geoResponse.json();
        const components = geoData.results[0]?.address_components || [];

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

        const details = [];
        if (area) details.push({name: 'area', value: area});
        if (city) details.push({name: 'city', value: city});
        if (state) details.push({name: 'state', value: state});
        if (pincode) details.push({name: 'pincode', value: pincode});
        if (country) details.push({name: 'country', value: country});

        enriched.push(details);
      }

      const extractedAreaNames = enriched
        .map(detailArr => detailArr.find(d => d.name === 'area')?.value)
        .filter(Boolean);

      setAreaNames(extractedAreaNames);
      setSelectedAreas(extractedAreaNames);

      await AsyncStorage.setItem(
        'selectedAreas',
        JSON.stringify(extractedAreaNames),
      );
      console.log('All Area Names saved and selected:', extractedAreaNames);
    } catch (err) {
      console.error('Failed to fetch nearby places:', err);
    } finally {
      setLoadingNearby(false);
    }
  };

  const toggleAreaSelection = async area => {
    setSelectedAreas(prevSelected => {
      const updatedSelected = prevSelected.includes(area)
        ? prevSelected.filter(item => item !== area)
        : [...prevSelected, area];

      AsyncStorage.setItem('selectedAreas', JSON.stringify(updatedSelected))
        .then(() => {
          console.log('Selected Areas saved to AsyncStorage:', updatedSelected);
        })
        .catch(error => {
          console.log('Error saving selected areas:', error);
        });

      return updatedSelected;
    });
  };

  return (
    <View>
      <Text className="text-gray-900 mb-5 text-[24px] font-Nunito-Bold mt-[10px]">
        Select Your Service Area
      </Text>

      <Text className=" text-[#333333] text-[14px] mb-5 font-Nunito-Regular">
        Based on the address provided, we have populated the neighbourhood that
        you may prefer to serve.
      </Text>

      <View className="p-[15px] bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light rounded-2xl flex-row items-center">
        <View className="items-center">
          <Image
            source={images.trackIcon}
            className="h-[18px] mb-[5px] w-[18px]"
            resizeMode="contain"
            style={{tintColor: '#838999'}}
          />
          <Text className=" text-darkGunmetal text-[16px] font-[Nunito-Regular]">
            Radius
          </Text>
        </View>
        <View className="flex-1">
          <Slider
            style={{width: 190, height: 40, marginLeft: 10}}
            minimumValue={5}
            maximumValue={50}
            value={radius}
            step={1}
            onValueChange={val => setRadius(val)}
            minimumTrackTintColor="#d75880"
            maximumTrackTintColor="#000000"
            thumbTintColor="#d75880"
            thumbImage={images.draggerIcon}
          />
        </View>
        <Text className=" text-[16px] text-primary font-[Nunito-Bold]">
          {radius} km
        </Text>
      </View>

      <Text
        className=" mt-2 mb-[30px] text-[#BBBCB7] text-[14px]"
        style={{fontFamily: 'Nunito-Regular'}}>
        The areas shown below are within the specified radius.
      </Text>

      <Text className="text-[#838999] mb-[15px] font-[Nunito-Regular]">
        Deselect areas to exclude from service locations
      </Text>

      {loadingNearby ? (
        <Text className="text-center text-gray-600 mb-4 font-[Nunito-Regular]">
          Loading nearby areas...
        </Text>
      ) : (
        <View className="flex-row flex-wrap gap-2">
          {areaNames
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((area, index) => (
              <TouchableOpacity
                key={index}
                className={`rounded-[20px] py-[14px] px-[15px] mb-2 border ${
                  selectedAreas.includes(area)
                    ? 'border-[#d75880] bg-[#d75880] shadow-md-light'
                    : 'bg-[#f3f6f7] border-[#e8e9eb] shadow-md-light'
                }`}
                onPress={() => toggleAreaSelection(area)}>
                <Text
                  className={` text-[16px] leading-6 ${
                    !selectedAreas.includes(area)
                      ? 'text-darkGunmetal font-Nunito-Regular'
                      : 'text-white font-Nunito-Bold'
                  }`}>
                  {area}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      )}

      <Image
        source={images.petLocationIcon}
        style={{resizeMode: 'contain'}}
        className="w-full h-[200px] mt-[20px] mb-[200px] left-[100px]"
      />
    </View>
  );
};

export default SelectServiceArea;
