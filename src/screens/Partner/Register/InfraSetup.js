// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
// import images from '../../../assets/images';
// import screens from '../../../constants/screens';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const InfraSetup = ({navigation, route}) => {
//   const {infraUuid} = route.params || {};
//   const [selectedinfrastructure, setSelectedInfrastructure] = useState([]);
//   const [infrastructureData, setInfrastructureData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const Infrastructure = [
//     'In-house Lab',
//     'In-house Pharmacy',
//     'Portable eye checkup equipment',
//   ];
//   const {width, height} = Dimensions.get('window');
//   const imageHeight = height * 0.4;
//   const toggleInfraSelection = Infrastructure => {
//     setSelectedInfrastructure(prev =>
//       prev.includes(Infrastructure)
//         ? prev.filter(a => a !== Infrastructure)
//         : [...prev, Infrastructure],
//     );
//   };
//   console.log('Passed UUID:', infraUuid);
//   const fetchInfrastructureData = async () => {
//     try {
//       const token = await AsyncStorage.getItem('auth_token');
//       const response = await fetch(
//         `https://demoapi.zumigo.pet/api/Service/GetServiceInfraStructure/${infraUuid}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         },
//       );

//       const text = await response.text(); // get raw text safely first

//       if (!text) {
//         console.error('Empty response from server');
//         setInfrastructureData(null); // set null if empty response
//         return;
//       }

//       const json = JSON.parse(text);
//       console.log('Fetched Infrastructure Data:', json);
//       setInfrastructureData(json); // set infrastructure data
//     } catch (error) {
//       console.error('Error fetching infrastructure data:', error);
//     } finally {
//       setLoading(false); // stop loading after fetching
//     }
//   };
//   useEffect(() => {
//     if (infraUuid) {
//       fetchInfrastructureData();
//     }
//   }, [infraUuid]);
//   // console.log('selectedinfrastructure', selectedInfraDetails);

//   return (
//     <View className="flex-1 bg-white">
//       <View className="mt-[15px] mb-2 px-6">
//         <RegistrationProgressBar screenNo={4} />
//       </View>
//       <View className="flex-1 bg-white px-6">
//         <Text className="text-[24px] font-Nunito-Bold mb-[15px] mt-[10px]">
//           Provide Your Infrastructure Setup
//         </Text>
//         <ScrollView className=" bg-white " showsVerticalScrollIndicator={false}>
//           <View className="flex-row flex-wrap gap-2">
//             {Infrastructure.map((infrastructure, index) => (
//               <TouchableOpacity
//                 key={index}
//                 className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
//                   selectedinfrastructure.includes(infrastructure)
//                     ? 'border border-primaryBorder bg-[#d75880] shadow-md-light'
//                     : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
//                 }`}
//                 onPress={() => toggleInfraSelection(infrastructure)}>
//                 <Text
//                   className={` text-[16px] font-Nunito-Bold leading-6 ${
//                     !selectedinfrastructure.includes(infrastructure)
//                       ? ' text-[#838999]'
//                       : ' text-white'
//                   }`}>
//                   {infrastructure}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>
//       </View>
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 50, // adjust if you have a footer
//           left: 25,
//           right: 0,
//           alignItems: 'center',
//           backgroundColor: 'white',
//         }}>
//         <Image
//           source={images.infraIcon}
//           style={{
//             width: width * 1.99, // responsive width
//             height: imageHeight * 0.9, // responsive height
//             resizeMode: 'contain',
//           }}
//         />
//       </View>
//       <View
//         className="bg-white flex px-6 justify-center h-[100px] w-full"
//         style={{
//           shadowColor: '#000',
//           shadowOffset: {width: 50, height: 60}, // Adjust as needed
//           shadowOpacity: 50, // Lower for subtle shadows
//           shadowRadius: 10,
//           elevation: 18, // Android shadow
//         }}>
//         <TouchableOpacity
//           className="h-[60px] bg-primary items-center justify-center rounded-full"
//           onPress={() => {
//             navigation.navigate(screens.VetAssistantDetails);
//           }}>
//           <Text className="text-[20px] text-white font-Nunito-Bold text-center">
//             Continue
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default InfraSetup;

// const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import images from '../../../assets/images';
import screens from '../../../constants/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InfraSetup = ({navigation, route}) => {
  const {infraUuid} = route.params || {};
  const [selectedInfrastructure, setSelectedInfrastructure] = useState([]);
  const [infrastructureData, setInfrastructureData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {width, height} = Dimensions.get('window');
  const imageHeight = height * 0.4;

  const toggleInfraSelection = infrastructure => {
    setSelectedInfrastructure(prev =>
      prev.includes(infrastructure)
        ? prev.filter(a => a !== infrastructure)
        : [...prev, infrastructure],
    );
  };

  const fetchInfrastructureData = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await fetch(
        `https://demoapi.zumigo.pet/api/Service/GetServiceInfraStructure/${infraUuid}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      const text = await response.text();

      if (!text) {
        console.error('Empty response from server');
        setInfrastructureData([]);
        return;
      }

      const json = JSON.parse(text);
      console.log('Fetched Infrastructure Data:', json);

      // Set the infrastructure data
      setInfrastructureData(json);
    } catch (error) {
      console.error('Error fetching infrastructure data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (infraUuid) {
      fetchInfrastructureData();
    }
  }, [infraUuid]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="mt-[15px] mb-2 px-6">
        <RegistrationProgressBar screenNo={4} />
      </View>

      <View className="flex-1 bg-white px-6">
        <Text className="text-[24px] font-Nunito-Bold mb-[15px] mt-[10px]">
          Provide Your Infrastructure Setup
        </Text>

        <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap gap-2">
            {infrastructureData && infrastructureData.length > 0 ? (
              infrastructureData.map((infrastructure, index) => (
                <TouchableOpacity
                  key={index}
                  className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                    selectedInfrastructure.includes(infrastructure.Title)
                      ? 'border border-primaryBorder bg-[#d75880] shadow-md-light'
                      : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
                  }`}
                  onPress={() => toggleInfraSelection(infrastructure.Title)}>
                  <Text
                    className={`text-[16px] font-Nunito-Bold leading-6 ${
                      !selectedInfrastructure.includes(infrastructure.Title)
                        ? ' text-[#838999]'
                        : ' text-white'
                    }`}>
                    {infrastructure.Title}{' '}
                    {/* Display the Title from the API */}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No infrastructure data available</Text>
            )}
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 25,
          right: 0,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          source={images.infraIcon}
          style={{
            width: width * 1.99,
            height: imageHeight * 0.9,
            resizeMode: 'contain',
          }}
        />
      </View>

      <View
        className="bg-white flex px-6 justify-center h-[100px] w-full"
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 50, height: 60},
          shadowOpacity: 50,
          shadowRadius: 10,
          elevation: 18,
        }}>
        <TouchableOpacity
          className="h-[60px] bg-primary items-center justify-center rounded-full"
          onPress={() => {
            navigation.navigate(screens.VetAssistantDetails);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InfraSetup;

const styles = StyleSheet.create({});
