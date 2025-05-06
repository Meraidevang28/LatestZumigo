// import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
// import React, {useState, useLayoutEffect} from 'react';
// import FooterBtn from '../../../components/shared/FooterBtn';
// import images from '../../../assets/images';
// import screens from '../../../constants/screens';
// import {useNavigation} from '@react-navigation/native';
// import {primary} from '../../../assets/theme/colors';
// import {API_BASE_URL, SERVICE_GROUP_CONSULTATION} from '@env';
// const services = [
//   {
//     id: '1',
//     name: 'Veterinary',
//     icon: images.vetIcon,
//     // selectedIcon: images.vetIcon,
//   },
//   {
//     id: '2',
//     name: 'Grooming',
//     icon: images.groomingImageIcon,
//     // selectedIcon: images.vetIcon,
//   },
//   {id: '3', name: 'Food', icon: images.nutriIcon},
//   {
//     id: '4',
//     name: 'Radiology',
//     icon: images.radiologyDogImage,
//     // selectedIcon: images.vetIcon,
//   },
// ];

// const {width} = Dimensions.get('window');
// const NUM_COLUMNS = 2;
// const ITEM_SIZE = (width - 74) / NUM_COLUMNS; // Ensures square shape

// const SelectServices = () => {
//   const navigation = useNavigation();
//   const [selectedServices, setSelectedServices] = useState(null);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.goBack(screens.VerifyOTP)}>
//           <Image
//             source={images.BackBtn} // Add your back arrow image here
//             className="w-[7.51px] h-[14.51px] ml-[14px] mr-[14px] "
//             style={{tintColor: primary}}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   const toggleService = id => {
//     setSelectedServices(id);
//   };

//   return (
//     <>
//       <View className="flex-1 bg-white px-6">
//         <View className="flex-1">
//           <Text
//             className=" mt-5 mb-2 text-[26px]"
//             style={{fontFamily: 'PTSans-Bold'}}>
//             Select Your Service
//           </Text>

//           <View className="flex-row flex-wrap justify-between mt-[20px]">
//             {services.map(item => {
//               const isSelected = selectedServices == item.id;
//               return (
//                 <View
//                   key={item.id}
//                   style={{
//                     width: (width - 60) / NUM_COLUMNS, // Padding safe
//                     marginBottom: 20,
//                     alignItems: 'center',
//                   }}>
//                   <TouchableOpacity
//                     className={`border justify-center items-center rounded-2xl ${
//                       !isSelected
//                         ? 'bg-[#ffffff] border border-[#e8e9eb] shadow-md-light '
//                         : 'border border-[#fcd4f1] bg-[#ffdef6] shadow-md-light'
//                     }`}
//                     style={{
//                       width: 120,
//                       height: 120,
//                     }}
//                     onPress={() => toggleService(item.id)}>
//                     <Image
//                       source={item.icon}
//                       className="h-[80px] w-[72px]"
//                       style={{
//                         tintColor: isSelected ? '#d75880' : '#BBBCB7',
//                       }}
//                       resizeMode="contain"
//                     />
//                   </TouchableOpacity>
//                   <Text
//                     style={{fontFamily: 'Nunito-Regular', fontWeight: '700'}}
//                     className={`text-[15px] text-center mt-[10px] ${
//                       isSelected ? 'text-[#000000]' : 'text-[#838999]'
//                     }`}>
//                     {item.name}
//                   </Text>
//                 </View>
//               );
//             })}
//           </View>
//         </View>
//         <Image
//           source={images.catdogIcon}
//           className="w-full h-[200px] bottom-28"
//           style={{resizeMode: 'contain'}}
//         />
//       </View>
//       <FooterBtn
//         title="Continue"
//         onClick={() => {
//           if (selectedServices === '2') {
//             navigation.navigate(screens.GroomerDetails);
//           } else {
//             navigation.navigate(screens.Vetdetails);
//           }
//         }}
//       />
//     </>
//   );
// };

// export default SelectServices;
// import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
// import React, {useState, useLayoutEffect, useEffect} from 'react';
// import FooterBtn from '../../../components/shared/FooterBtn';
// import images from '../../../assets/images';
// import screens from '../../../constants/screens';
// import {useNavigation} from '@react-navigation/native';
// import {primary} from '../../../assets/theme/colors';
// import {API_BASE_URL, SERVICE_GROUP_CONSULTATION} from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const services = [
//   {
//     id: '1',
//     name: 'Veterinary',
//     icon: images.vetIcon,
//   },
//   {
//     id: '2',
//     name: 'Grooming',
//     icon: images.groomingImageIcon,
//   },
//   {id: '3', name: 'Food', icon: images.nutriIcon},
//   {
//     id: '4',
//     name: 'Radiology',
//     icon: images.radiologyDogImage,
//   },
// ];

// const {width} = Dimensions.get('window');
// const NUM_COLUMNS = 2;

// const SelectServices = () => {
//   const navigation = useNavigation();
//   const [selectedServices, setSelectedServices] = useState(null);
//   const [consultationData, setConsultationData] = useState([]); // optional if you want to use response data

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.goBack(screens.VerifyOTP)}>
//           <Image
//             source={images.BackBtn}
//             className="w-[7.51px] h-[14.51px] ml-[14px] mr-[14px]"
//             style={{tintColor: primary}}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   useEffect(() => {
//     const fetchConsultationServices = async () => {
//       try {
//         const token = await AsyncStorage.getItem('auth_token');
//         const response = await fetch(`${API_BASE_URL}${SERVICE_GROUP_CONSULTATION}`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setConsultationData(data); // If needed for filtering
//           console.log('Consultation Services:', data);
//         } else {
//           console.warn('Failed to fetch consultation services');
//         }
//       } catch (error) {
//         console.error('Error fetching consultation services:', error);
//       }
//     };

//     fetchConsultationServices();
//   }, []);

//   const toggleService = id => {
//     setSelectedServices(id);
//   };

//   return (
//     <>
//       <View className="flex-1 bg-white px-6">
//         <View className="flex-1">
//           <Text className="mt-5 mb-2 text-[26px]" style={{fontFamily: 'PTSans-Bold'}}>
//             Select Your Service
//           </Text>

//           <View className="flex-row flex-wrap justify-between mt-[20px]">
//             {services.map(item => {
//               const isSelected = selectedServices == item.id;
//               return (
//                 <View
//                   key={item.id}
//                   style={{
//                     width: (width - 60) / NUM_COLUMNS,
//                     marginBottom: 20,
//                     alignItems: 'center',
//                   }}>
//                   <TouchableOpacity
//                     className={`border justify-center items-center rounded-2xl ${
//                       !isSelected
//                         ? 'bg-[#ffffff] border border-[#e8e9eb] shadow-md-light'
//                         : 'border border-[#fcd4f1] bg-[#ffdef6] shadow-md-light'
//                     }`}
//                     style={{width: 120, height: 120}}
//                     onPress={() => toggleService(item.id)}>
//                     <Image
//                       source={item.icon}
//                       className="h-[80px] w-[72px]"
//                       style={{
//                         tintColor: isSelected ? '#d75880' : '#BBBCB7',
//                       }}
//                       resizeMode="contain"
//                     />
//                   </TouchableOpacity>
//                   <Text
//                     style={{fontFamily: 'Nunito-Regular', fontWeight: '700'}}
//                     className={`text-[15px] text-center mt-[10px] ${
//                       isSelected ? 'text-[#000000]' : 'text-[#838999]'
//                     }`}>
//                     {item.name}
//                   </Text>
//                 </View>
//               );
//             })}
//           </View>
//         </View>
//         <Image
//           source={images.catdogIcon}
//           className="w-full h-[200px] bottom-28"
//           style={{resizeMode: 'contain'}}
//         />
//       </View>
//       <FooterBtn
//         title="Continue"
//         onClick={() => {
//           if (selectedServices === '2') {
//             navigation.navigate(screens.GroomerDetails);
//           } else {
//             navigation.navigate(screens.Vetdetails);
//           }
//         }}
//       />
//     </>
//   );
// };

// export default SelectServices;

// import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
// import React, {useState, useLayoutEffect, useEffect} from 'react';
// import FooterBtn from '../../../components/shared/FooterBtn';
// import images from '../../../assets/images';
// import screens from '../../../constants/screens';
// import {useNavigation} from '@react-navigation/native';
// import {primary} from '../../../assets/theme/colors';
// import {API_BASE_URL, SERVICE_GROUP_CONSULTATION} from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const {width} = Dimensions.get('window');
// const NUM_COLUMNS = 2;

// const SelectServices = () => {
//   const navigation = useNavigation();
//   const [selectedServices, setSelectedServices] = useState(null);
//   const [services, setServices] = useState([]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity
//           onPress={() => navigation.goBack(screens.LoginWithOTP)}>
//           <Image
//             source={images.BackBtn}
//             className="w-[7.51px] h-[14.51px] ml-[14px] mr-[14px]"
//             style={{tintColor: primary}}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);
//   const [selectedGeneralServices, setSelectedGeneralServices] = useState([]);
//   const [selectedSpecialistService, setSelectedSpecialistService] =
//     useState(null);
//   const [selectedVaccines, setSelectedVaccines] = useState([]);

//   useEffect(() => {
//     const fetchConsultationServices = async () => {
//       try {
//         const token = await AsyncStorage.getItem('auth_token');
//         const response = await fetch(
//           `${API_BASE_URL}${SERVICE_GROUP_CONSULTATION}`,
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: 'application/json',
//             },
//           },
//         );

//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);

//           const formattedServices = data.ServiceGroup.filter(
//             service => service.IsDisplay && service.IsActive,
//           ).map(service => ({
//             id: String(service.Id),
//             name: service.GroupName,
//             icon: service.Icon
//               ? {uri: `https://democms.zumigo.pet${service.Icon}`}
//               : images.defaultServiceIcon, // fallback if needed
//           }));

//           setServices(formattedServices);
//           console.log('Formatted Services:', formattedServices);
//         } else {
//           console.warn('Failed to fetch consultation services');
//         }
//       } catch (error) {
//         console.error('Error fetching consultation services:', error);
//       }
//     };

//     fetchConsultationServices();
//   }, []);

//   // const toggleService = id => {
//   //   setSelectedServices(id);
//   // };
//   const toggleService = item => {
//     if (isGeneral) {
//       if (item.name === 'Vaccination') {
//         handleVaccineOpenPress();
//         return;
//       }

//       setSelectedSpecialistService(null);

//       setSelectedGeneralServices(prev => {
//         let newSelection;
//         if (prev.includes(item.id)) {
//           newSelection = prev.filter(serviceId => serviceId !== item.id);
//         } else {
//           newSelection = [...prev, item.id];
//         }

//         // Store updated general services
//         AsyncStorage.setItem(
//           'selectedGeneralServices',
//           JSON.stringify(newSelection),
//         );

//         return newSelection;
//       });
//     } else {
//       setSelectedGeneralServices([]);
//       setSelectedVaccines([]);

//       setSelectedSpecialistService(prev => {
//         const newSelection = prev === item.id ? null : item.id;

//         // Store updated specialist service
//         AsyncStorage.setItem(
//           'selectedSpecialistService',
//           JSON.stringify(newSelection),
//         );

//         return newSelection;
//       });
//     }
//   };
//   const logStoredServices = async () => {
//     try {
//       const general = await AsyncStorage.getItem('selectedGeneralServices');
//       const specialist = await AsyncStorage.getItem(
//         'selectedSpecialistService',
//       );

//       console.log(
//         'Stored General Services:',
//         general ? JSON.parse(general) : [],
//       );
//       console.log(
//         'Stored Specialist Service:',
//         specialist ? JSON.parse(specialist) : null,
//       );
//     } catch (error) {
//       console.error('Error reading stored services:', error);
//     }
//   };
//   return (
//     <>
//       <View className="flex-1 bg-white px-6">
//         <View className="flex-1">
//           <Text
//             className="mt-5 mb-2 text-[26px]"
//             style={{fontFamily: 'PTSans-Bold'}}>
//             Select Your Service
//           </Text>

//           <View className="flex-row flex-wrap justify-between mt-[20px]">
//             {services.map(item => {
//               const isSelected = selectedServices === item.id;
//               return (
//                 <View
//                   key={item.id}
//                   style={{
//                     width: (width - 60) / NUM_COLUMNS,
//                     marginBottom: 20,
//                     alignItems: 'center',
//                   }}>
//                   <TouchableOpacity
//                     className={`border justify-center items-center rounded-2xl ${
//                       !isSelected
//                         ? 'bg-[#ffffff] border border-[#e8e9eb] shadow-md-light'
//                         : 'border border-[#fcd4f1] bg-[#ffdef6] shadow-md-light'
//                     }`}
//                     style={{width: 120, height: 120}}
//                     onPress={() => toggleService(item.id)}>
//                     <Image
//                       source={item.icon}
//                       className="h-[80px] w-[72px]"
//                       style={{
//                         tintColor: isSelected ? '#d75880' : '#BBBCB7',
//                       }}
//                       resizeMode="contain"
//                     />
//                   </TouchableOpacity>
//                   <Text
//                     style={{fontFamily: 'Nunito-Regular', fontWeight: 700}}
//                     className={`text-[15px] text-center mt-[10px] ${
//                       isSelected ? 'text-[#000000]' : 'text-[#838999]'
//                     }`}>
//                     {item.name}
//                   </Text>
//                 </View>
//               );
//             })}
//           </View>
//         </View>
//         <Image
//           source={images.catdogIcon}
//           className="w-full h-[200px] bottom-28"
//           style={{resizeMode: 'contain'}}
//         />
//       </View>

//       <FooterBtn
//         title="Continue"
//         onClick={() => {
//           if (selectedServices === '2') {
//             navigation.navigate(screens.GroomerDetails);
//           } else if (selectedServices === '4') {
//             navigation.navigate(screens.RadiologistDetails);
//           } else {
//             navigation.navigate(screens.Vetdetails);
//             logStoredServices();
//           }
//         }}
//       />
//     </>
//   );
// };

// export default SelectServices;
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import images from '../../../assets/images';
import screens from '../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import {primary} from '../../../assets/theme/colors';
import {API_BASE_URL, SERVICE_GROUP_CONSULTATION} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');
const NUM_COLUMNS = 2;

const SelectServices = () => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [selectedGeneralServices, setSelectedGeneralServices] = useState([]);
  const [selectedSpecialistService, setSelectedSpecialistService] =
    useState(null);
  const [selectedServices, setSelectedServices] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={images.BackBtn}
            className="w-[7.51px] h-[14.51px] ml-[14px] mr-[14px]"
            style={{tintColor: primary}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchConsultationServices = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const response = await fetch(
          `${API_BASE_URL}${SERVICE_GROUP_CONSULTATION}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          },
        );

        if (response.ok) {
          const data = await response.json();

          const formattedServices = data.ServiceGroup.filter(
            service => service.IsDisplay && service.IsActive,
          ).map(service => ({
            id: String(service.Id),
            name: service.GroupName,
            isGeneral: service.GroupName !== 'Radiology',
            icon: service.Icon
              ? {uri: `https://democms.zumigo.pet${service.Icon}`}
              : images.defaultServiceIcon,
          }));

          setServices(formattedServices);
        } else {
          console.warn('Failed to fetch consultation services');
        }
      } catch (error) {
        console.error('Error fetching consultation services:', error);
      }
    };

    fetchConsultationServices();
  }, []);

  const toggleService = async item => {
    setSelectedServices(item.name);
    await AsyncStorage.setItem('selectedServices', JSON.stringify(item.name));

    if (item.isGeneral) {
      setSelectedSpecialistService(null);
      setSelectedGeneralServices(prev => {
        let newSelection;
        if (prev.includes(item.name)) {
          newSelection = prev.filter(serviceName => serviceName !== item.name);
        } else {
          newSelection = [...prev, item.name];
        }

        AsyncStorage.setItem(
          'selectedGeneralServices',
          JSON.stringify(newSelection),
        );
        return newSelection;
      });
    } else {
      setSelectedGeneralServices([]);
      setSelectedSpecialistService(prev => {
        const newSelection = prev === item.name ? null : item.name;
        AsyncStorage.setItem(
          'selectedSpecialistService',
          JSON.stringify(newSelection),
        );
        return newSelection;
      });
    }
  };

  const logStoredServices = async () => {
    try {
      const general = await AsyncStorage.getItem('selectedGeneralServices');
      const specialist = await AsyncStorage.getItem(
        'selectedSpecialistService',
      );
      const selected = await AsyncStorage.getItem('selectedServices');

      console.log(
        'Stored General Services:',
        general ? JSON.parse(general) : [],
      );
      console.log(
        'Stored Specialist Service:',
        specialist ? JSON.parse(specialist) : null,
      );
      console.log('Stored Selected Service Name:', selected);
    } catch (error) {
      console.error('Error reading stored services:', error);
    }
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white px-6">
        <Text
          className="mt-5 mb-2 text-[26px]"
          style={{fontFamily: 'PTSans-Bold'}}>
          Select Your Service
        </Text>

        <View className="flex-row flex-wrap justify-between mt-[20px]">
          {services.map(item => {
            const isSelected =
              selectedGeneralServices.includes(item.name) ||
              selectedSpecialistService === item.name;

            return (
              <View
                key={item.id}
                style={{
                  width: (width - 60) / NUM_COLUMNS,
                  marginBottom: 20,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  className={`border justify-center items-center rounded-2xl ${
                    !isSelected
                      ? 'bg-[#ffffff] border border-[#e8e9eb] shadow-md-light'
                      : 'border border-[#fcd4f1] bg-[#ffdef6] shadow-md-light'
                  }`}
                  style={{width: 120, height: 120}}
                  onPress={() => toggleService(item)}>
                  <Image
                    source={item.icon}
                    className="h-[80px] w-[72px]"
                    style={{
                      tintColor: isSelected ? '#d75880' : '#BBBCB7',
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text
                  style={{fontFamily: 'Nunito-Regular', fontWeight: '700'}}
                  className={`text-[15px] text-center mt-[10px] ${
                    isSelected ? 'text-[#000000]' : 'text-[#838999]'
                  }`}>
                  {item.name}
                </Text>
              </View>
            );
          })}
        </View>

        <Image
          source={images.catdogIcon}
          className="w-full h-[190px] bottom-14"
          style={{resizeMode: 'contain'}}
        />
      </ScrollView>

      {/* <FooterBtn
        title="Continue"
        onClick={async () => {
          await logStoredServices();

          if (selectedServices === 'Grooming') {
            navigation.navigate(screens.GroomerDetails);
          } else if (selectedServices === 'Radiology') {
            navigation.navigate(screens.RadiologistDetails);
          } else {
            navigation.navigate(screens.Vetdetails); 
          }
        }}
      /> */}
      {/* <FooterBtn
        title="Continue"
        onClick={async () => {
          await logStoredServices();

          if (selectedServices === 'Grooming') {
            navigation.navigate(screens.GroomerDetails);
          } else if (selectedServices === 'Radiology') {
            navigation.navigate(screens.RadiologistDetails);
          } else {
            // Check if vet details already exist in AsyncStorage
            try {
              const storedVetDetails = await AsyncStorage.getItem('vetDetails');
              if (storedVetDetails) {
                // Navigate to the next screen if vet details exist
                navigation.navigate(screens.AddAddress); // Replace with actual screen
              } else {
                // Navigate to Vetdetails to collect info
                navigation.navigate(screens.Vetdetails);
              }
            } catch (error) {
              console.error('Error checking vet details:', error);
              navigation.navigate(screens.Vetdetails); // Fallback in case of error
            }
          }
        }}
      /> */}
      {/* <FooterBtn
        title="Continue"
        onClick={async () => {
          await logStoredServices();

          if (selectedServices === 'Grooming') {
            navigation.navigate(screens.GroomerDetails);
          } else if (selectedServices === 'Radiology') {
            navigation.navigate(screens.RadiologistDetails);
          } else {
            try {
              const storedVetDetails = await AsyncStorage.getItem('vetDetails');
              const storedVetAddress = await AsyncStorage.getItem(
                'vetAddressDetails',
              );

              if (storedVetDetails && storedVetAddress) {
                // Navigate to the screen if both vet details and address exist
                navigation.navigate(screens.VetServiceLocation); // Replace with actual screen
              } else if (storedVetDetails) {
                // Navigate to AddAddress if only vetDetails exist
                navigation.navigate(screens.AddAddress);
              } else {
                // Navigate to Vetdetails if neither exist
                navigation.navigate(screens.Vetdetails);
              }
            } catch (error) {
              console.error('Error checking vet details or address:', error);
              navigation.navigate(screens.Vetdetails); // Fallback
            }
          }
        }}
      /> */}
      {/* <FooterBtn
        title="Continue"
        onClick={async () => {
          await logStoredServices();

          if (selectedServices === 'Grooming') {
            navigation.navigate(screens.GroomerDetails);
          } else if (selectedServices === 'Radiology') {
            navigation.navigate(screens.RadiologistDetails);
          } else {
            try {
              const storedVetDetails = await AsyncStorage.getItem('vetDetails');
              const storedVetAddress = await AsyncStorage.getItem(
                'vetAddressDetails',
              );
              const storedSelectedAreas = await AsyncStorage.getItem(
                'selectedAreas',
              );

              const hasSelectedAreas = storedSelectedAreas
                ? JSON.parse(storedSelectedAreas).length > 0
                : false;

              if (storedVetDetails && storedVetAddress && hasSelectedAreas) {
                navigation.navigate(screens.SelectTime); // ✅ all set, go to time selection
              } else if (storedVetDetails && storedVetAddress) {
                navigation.navigate(screens.AddSpecialisation); // 🟡 need areas
              } else if (storedVetDetails) {
                navigation.navigate(screens.AddAddress); // 🔵 need address
              } else {
                navigation.navigate(screens.Vetdetails); // 🔴 need vet info
              }
            } catch (error) {
              console.error('Error checking vet/address/area data:', error);
              navigation.navigate(screens.Vetdetails); // fallback
            }
          }
        }}
      /> */}
      <FooterBtn
        title="Continue"
        onClick={async () => {
          await logStoredServices();

          if (selectedServices === 'Grooming') {
            navigation.navigate(screens.GroomerDetails);
          } else if (selectedServices === 'Radiology') {
            navigation.navigate(screens.RadiologistDetails);
          } else {
            try {
              const storedVetDetails = await AsyncStorage.getItem('vetDetails');
              const storedVetAddress = await AsyncStorage.getItem(
                'vetAddressDetails',
              );
              const storedSelectedAreas = await AsyncStorage.getItem(
                'selectedAreas',
              );

              const hasSelectedAreas = storedSelectedAreas
                ? JSON.parse(storedSelectedAreas).length > 0
                : false;

              if (hasSelectedAreas) {
                // If selectedAreas exist, navigate to AddSpecialisation
                navigation.navigate(screens.AddSpecialisation);
              } else if (storedVetDetails && storedVetAddress) {
                navigation.navigate(screens.VetServiceLocation); // 🟡 need areas
              } else if (storedVetDetails) {
                navigation.navigate(screens.AddAddress); // 🔵 need address
              } else {
                navigation.navigate(screens.Vetdetails); // 🔴 need vet info
              }
            } catch (error) {
              console.error('Error checking vet/address/area data:', error);
              navigation.navigate(screens.Vetdetails); // fallback
            }
          }
        }}
      />
    </>
  );
};

export default SelectServices;
