// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SectionList,
//   Dimensions,
//   Image,
//   FlatList,
// } from 'react-native';
// import FooterBtn from '../../../components/shared/FooterBtn';
// import images from '../../../assets/images';
// import screens from '../../../constants/screens';
// import BottomSheet from '../../../components/shared/BottomSheet';
// import {ScrollView} from 'react-native-gesture-handler';
// import {primary} from '../../../assets/theme/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useRoute} from '@react-navigation/native';

// const generalServices = [
//   {
//     title: 'Sick pet care and Diagnostics',
//     data: [
//       {id: '1', name: 'Vet Visit', image: images.vetvisitIcon, price: 1500},
//       {
//         id: '2',
//         name: 'Lab Diagnostic',
//         image: images.labdiagonisticIcon,
//         price: 1200,
//       },
//       {id: '3', name: 'IV Therapy', image: images.ivIcon, price: 1500},
//     ],
//   },
//   {
//     title: 'Wellness and Preventative ',
//     data: [
//       {
//         id: '5',
//         name: 'Microchipping',
//         image: images.Microchipping,
//         price: 1500,
//       },
//       {
//         id: '6',
//         name: 'Vaccination',
//         image: images.vaccinationIcon,
//         price: 1500,
//       },
//       {
//         id: '7',
//         name: 'Deworming',
//         image: images.tabletIcon,
//         price: 1500,
//       },
//     ],
//   },
// ];

// const specialistServices = [
//   {
//     title: '',
//     data: [
//       {
//         id: '8',
//         name: 'Ophthalmologist',
//         image: images.ophthalmologistIcon,
//         price: 1500,
//       },
//       {
//         id: '9',
//         name: 'Dermatologist',
//         image: images.dermatologistIcon,
//         price: 1500,
//       },
//       {id: '10', name: 'Oncologist', image: images.oncologistIcon, price: 1500},
//       {
//         id: '11',
//         name: 'Neurology',
//         image: images.neurologyIcon,
//         price: 1500,
//       },
//       {
//         id: '12',
//         name: 'Cardiologist',
//         image: images.cardiologistIcon,
//         price: 1500,
//       },

//       {
//         id: '13',
//         name: 'Orthopedic',
//         image: images.orthopedicIcon,
//         price: 1500,
//       },
//       {
//         id: '14',
//         name: 'Soft Tissue Surgeon',
//         image: images.softtissueIcon,
//         price: 1500,
//       },
//       {
//         id: '15',
//         name: 'Chronic Ailments & Pain Medicine',
//         image: images.painmedicineIcon,
//         price: 1500,
//       },
//       {
//         id: '16',
//         name: 'Physiotherapist',
//         image: images.PhysiotherapistIcon,
//         price: 1500,
//       },
//       {
//         id: '17',
//         name: 'Homeopathy & Alternative Medicine',
//         image: images.homeopathyIcon,
//         price: 1500,
//       },
//     ],
//   },
// ];

// const data = [
//   {
//     id: '1',
//     name: 'Puppies',
//     ageRange: '(Little Paws Starter Pack - Dog)',
//     subtitle: 'Distemper, Parvo Virus, DHPPiL, Corona',
//     price: 7499,
//   },
//   {
//     id: '2',
//     name: 'Annual Boosters',
//     ageRange: '(Good Boy Shots )',
//     subtitle: 'Anti-Rabies + Corona + DHPPiL',
//     price: 3099,
//   },
//   {
//     id: '3',
//     name: 'DHPPiL',
//     ageRange: '(Adult - Dog)',
//     subtitle: 'DHPPiL',
//     price: 1499,
//   },
//   {
//     id: '4',
//     name: 'Coronavirus',
//     ageRange: '(Puppies - Dog)',
//     subtitle: 'Coronavirus Vaccine',
//     price: 1399,
//   },
//   {
//     id: '5',
//     name: 'Kennel Cough',
//     ageRange: '(Little Paws Starter Pack - Dog)',
//     subtitle: 'Kennel Cough',
//     price: 1699,
//   },
// ];

// const ServiceSelection = ({navigation}) => {
//   const {params} = useRoute();

//   const [responseData, setResponseData] = useState(null);
//   const [selectedSCT, setSelectSCT] = useState(null);
//   const [selectedSC, setSelectSC] = useState(null);

//   const windowWidth = Dimensions.get('window').width;

//   const bottomSheetRef = useRef(null);
//   const vaccineBottomSheetRef = useRef(null);
//   const priceBottomSheetRef = useRef(null);

//   // const [selectedTab, setSelectedTab] = useState('General');
//   const [selectedTab, setSelectedTab] = useState(null);
//   const [selectedVaccines, setSelectedVaccines] = useState([]);
//   const [selectedGeneralServices, setSelectedGeneralServices] = useState({});
//   const [selectedSpecialistService, setSelectedSpecialistService] =
//     useState(null);
//   const [sctButtons, setSctButtons] = useState([]);
//   const [petDetails, setPetDetails] = useState(null);

//   useEffect(() => {
//     if (params) {
//       console.log(params);

//       fetchServiceData();
//     }
//   }, [params]);

//   const fetchServiceData = async () => {
//     try {
//       const token = await AsyncStorage.getItem('auth_token');
//       const consultationUuid = params.consultationTypeUUID;
//       const serviceGroupUuid = params.serviceGroupUUID;
//       const response = await fetch(
//         `https://demoapi.zumigo.pet/api/Service/GetServiceMdl/${serviceGroupUuid}/${consultationUuid}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         },
//       );
//       const data = await response.json();

//       console.log(data);

//       setResponseData(data);
//       console.log(data?.SCT);
//       setSelectSCT(data?.SCT[0]);

//       console.log('Original Service Data:', data);

//       if (Array.isArray(data.SCT)) {
//         const filteredSCTNames = data.SCT.map(item => item.SCTName);

//         setSctButtons(filteredSCTNames);
//         setSelectedTab(filteredSCTNames[0]); // optionally select the first by default
//       }
//     } catch (error) {
//       console.error('Error fetching service data:', error);
//     }
//   };

//   const isGeneral = selectedSCT?.UUID === responseData?.SCT[0]?.UUID;
//   const services = isGeneral ? generalServices : specialistServices;

//   useEffect(() => {
//     const fetchPetDetails = async () => {
//       try {
//         const jsonValue = await AsyncStorage.getItem('last_added_pet');
//         if (jsonValue != null) {
//           const pet = JSON.parse(jsonValue);
//           setPetDetails(pet);
//           console.log('Fetched pet:', pet);
//         }
//       } catch (e) {
//         console.error('Error fetching pet details from AsyncStorage:', e);
//       }
//     };

//     fetchPetDetails();
//   }, []);

//   const handleVaccineClosePress = () => vaccineBottomSheetRef.current?.close();
//   const handleVaccineOpenPress = () => vaccineBottomSheetRef.current?.present();
//   const handlePriceClosePress = () => priceBottomSheetRef.current?.close();

//   const handleSelection = () => {
//     // this is when vaccination add btn is pressed
//     const totalPrice = selectedVaccines.reduce(
//       (sum, item) => sum + item.price,
//       0,
//     );

//     setSelectedGeneralServices(prev => {
//       const newServices = {...prev};
//       if (totalPrice == 0) {
//         delete newServices['6'];
//       } else {
//         newServices['6'] = {
//           id: '6',
//           name: 'Vaccination',
//           price: totalPrice,
//         };
//       }
//       return newServices;
//     });
//     handleVaccineClosePress();
//     console.log('Selected Vaccines:', selectedVaccines);
//     console.log('Total Price:', totalPrice);
//   };

//   const toggleSelection = item => {
//     console.log(item);
//     setSelectedSpecialistService(null);

//     setSelectedVaccines(prevSelected => {
//       const isSelected = prevSelected.some(
//         vaccine => vaccine.UUID === item.UUID,
//       );

//       return isSelected
//         ? prevSelected.filter(vaccine => vaccine.UUID !== item.UUID) // Remove if already selected
//         : [...prevSelected, item]; // Add if not selected
//     });
//   };

//   const toggleService = item => {
//     if (isGeneral) {
//       if (item.name === 'Vaccination') {
//         handleVaccineOpenPress();
//         return;
//       }
//       setSelectedSpecialistService(null);
//       setSelectedGeneralServices(prev => {
//         const newServices = {...prev};
//         if (newServices[item.id]) {
//           delete newServices[item.id];
//         } else {
//           newServices[item.id] = item;
//         }
//         return newServices;
//       });
//     } else {
//       setSelectedGeneralServices({});
//       setSelectedVaccines([]);
//       setSelectedSpecialistService(prev =>
//         prev === item?.id ? null : item?.id,
//       );
//     }
//   };

//   const getTotalPrice = () => {
//     if (isGeneral) {
//       return Object.values(selectedGeneralServices).reduce(
//         (sum, service) => sum + (service.price || 0),
//         0,
//       );
//     } else {
//       return 1500;
//     }
//   };

//   console.log('getTotalPrice', getTotalPrice());

//   return (
//     <View className="flex-1 bg-white px-6">
//       {/* Header */}

//       {/* Tabs */}
//       {selectedTab === 'Specialist' ? (
//         <View>
//           <Text className="font-Nunito-Bold text-[24px] text-[#333333]">
//             Select Your Specialist
//           </Text>
//         </View>
//       ) : (
//         <View>
//           <Text className="font-Nunito-Bold text-[24px] text-[#333333]">
//             Select Your Services
//           </Text>
//           <Text className="font-Nunito-Regular text-[14px] text-[#838999] mt-[5px]">
//             You can choose multiple services
//           </Text>
//         </View>
//       )}

//       <View className="my-5 flex-row bg-pastelGrey rounded-2xl overflow-hidden ">
//         {responseData?.SCT?.map(tab => (
//           <TouchableOpacity
//             key={tab.UUID}
//             className={`flex-1 p-[15px] items-center rounded-2xl ${
//               selectedTab === tab.SCTName ? 'bg-primary' : ''
//             }`}
//             onPress={() => {
//               setSelectSCT(tab);
//               setSelectedTab(tab.SCTName);
//               setSelectedGeneralServices({});
//               setSelectedVaccines([]);
//               setSelectedSpecialistService(null);
//             }}>
//             <Text
//               className={`text-[13px] leading-[22px] ${
//                 selectedTab === tab.SCTName
//                   ? 'text-white font-Nunito-Bold'
//                   : 'text-[#969492] font-Nunito-Regular'
//               }`}>
//               {tab.SCTName}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {false && (
//         <SectionList
//           sections={services}
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={item => item.id}
//           renderItem={() => null} // Prevents the "no renderItem!" error
//           renderSectionHeader={({section: {title, data}}) => (
//             <View>
//               <Text
//                 className=" mb-[18px] font-Nunito-Regular text-[19px]"
//                 style={{fontWeight: 500}}>
//                 {title}
//               </Text>

//               <View className=" flex-1 flex-row flex-wrap  ">
//                 {data.map((item, index) => {
//                   const isSelected = isGeneral
//                     ? !!selectedGeneralServices[item.id]
//                     : selectedSpecialistService === item.id;
//                   return (
//                     <View
//                       key={item.id}
//                       style={{width: (windowWidth - 78) / 3}}
//                       className={`${(index - 1) % 3 == 0 && ' mx-[15px]'}`}>
//                       <TouchableOpacity
//                         key={item.id}
//                         onPress={() => toggleService(item)}
//                         className={`py-[14px] h-[100px] w-[100px]  rounded-xl border items-center  ${
//                           isSelected
//                             ? 'border-[#D7588033] bg-[#ffdef6]'
//                             : ' bg-white  border-[#BBBCB7]'
//                         }`}>
//                         <Image
//                           source={item.image}
//                           className=" h-[70px] w-[70px] "
//                           resizeMode="contain"
//                           style={{
//                             tintColor: isSelected ? '#FFEDF9' : '#FFEDF9',

//                             tintColor: isSelected ? '#D75880' : '#838999',
//                           }}
//                         />
//                         {item.name === 'Vaccination' &&
//                           selectedVaccines.length != 1 &&
//                           selectedVaccines.length && (
//                             <View className=" absolute bg-pastelGrey py-[3px] px-[8px] rounded-full top-[6px] right-[6px]">
//                               <Text className=" text-[14px] font-Nunito-Bold text-primary">
//                                 {selectedVaccines.length}
//                               </Text>
//                             </View>
//                           )}
//                       </TouchableOpacity>
//                       <Text
//                         className={`mt-[6px] mb-[18px] font-Nunito-Bold text-center text-[11.5px] ${
//                           isSelected ? 'text-[#000000]' : 'text-[#838999]'
//                         }`}>
//                         {item.name}
//                       </Text>
//                     </View>
//                   );
//                 })}
//               </View>
//             </View>
//           )}
//           ListFooterComponent={() => <View className="mt-10 " />}
//           showsVerticalScrollIndicator={false}
//         />
//       )}

//       {/* {selectedSCT?.IsSCGroupApplicable &&
//         responseData &&
//         responseData?.SCG?.map(scg => (
//           <>
//             <View>
//               <Text
//                 className=" mb-[18px] font-Nunito-Regular text-[21px]"
//                 style={{fontWeight: 500}}>
//                 {scg?.SCGName}
//               </Text>

//               <View>
//                 <ScrollView horizontal>
//                   {responseData?.SC?.filter(
//                     item => item.SCGUUID === scg?.UUID,
//                   )?.map((sc, index) => {
//                     const isSelected = !!selectedGeneralServices[sc.UUID];

//                     return (
//                       <>
//                         <View
//                           key={sc.UUID}
//                           style={{width: (windowWidth - 78) / 3}}
//                           className={`${(index - 1) % 3 == 0 && ' mx-[15px]'}`}>
//                           <TouchableOpacity
//                             onPress={() => {
//                               if (sc.HasSubServices) {
//                                 setSelectSC(sc);
//                                 handleVaccineOpenPress();
//                               } else {
//                                 setSelectedGeneralServices(prev => {
//                                   const newServices = {...prev};
//                                   if (newServices[sc.UUID]) {
//                                     delete newServices[sc.UUID];
//                                   } else {
//                                     newServices[sc.UUID] = sc;
//                                   }
//                                   return newServices;
//                                 });
//                               }
//                             }}
//                             className={`py-[14px] h-[100px] w-[100px]  rounded-xl border items-center  ${
//                               isSelected
//                                 ? 'border-[#D7588033] bg-[#ffdef6]'
//                                 : ' bg-white  border-[#BBBCB7]'
//                             }`}>
//                             <Image
//                               source={{
//                                 uri: isSelected
//                                   ? `https://democms.zumigo.pet${
//                                       sc?.Color_Icon ?? ''
//                                     }`
//                                   : `https://democms.zumigo.pet${
//                                       sc?.SCIcon ?? ''
//                                     }`,
//                               }}
//                               className=" h-[70px] w-[70px] "
//                               resizeMode="contain"
//                             />

//                             {sc.HasSubServices &&
//                               selectedVaccines.length != 1 &&
//                               selectedVaccines.length && (
//                                 <View className="absolute top-[6px] right-[6px] bg-pastelGrey py-[3px] px-[8px] rounded-full z-10">
//                                   <Text className="text-[14px] font-Nunito-Bold text-primary">
//                                     {selectedVaccines.length}
//                                   </Text>
//                                 </View>
//                               )}
//                           </TouchableOpacity>
//                           <View className=" mt-[6px] mb-[18px] font-Nunito-Bold text-center text-[11.5px]">
//                             <Text
//                               className="text-[13px] font-Nunito-Bold text-[#838999] font-[700] text-center"
//                               style={{
//                                 color: isSelected ? 'black' : '#838999',
//                               }}>
//                               {sc?.SCTitle}
//                             </Text>
//                           </View>
//                         </View>
//                       </>
//                     );
//                   })}
//                 </ScrollView>
//               </View>
//             </View>
//           </>
//         ))} */}
//       {selectedSCT?.IsSCGroupApplicable &&
//         responseData &&
//         responseData?.SCG?.map(scg => (
//           <>
//             <View>
//               <Text
//                 className="mb-[18px] font-Nunito-Regular text-[21px]"
//                 style={{fontWeight: 500}}>
//                 {scg?.SCGName}
//               </Text>

//               <View>
//                 <ScrollView horizontal>
//                   {responseData?.SC?.filter(
//                     item => item.SCGUUID === scg?.UUID,
//                   )?.map((sc, index) => {
//                     const isSelected = !!selectedGeneralServices[sc.UUID];

//                     return (
//                       <View
//                         key={sc.UUID}
//                         style={{width: (windowWidth - 78) / 3}}
//                         className={`${(index - 1) % 3 == 0 && ' mx-[15px] '}`}>
//                         <TouchableOpacity
//                           onPress={() => {
//                             if (sc.HasSubServices) {
//                               setSelectSC(sc);
//                               handleVaccineOpenPress();
//                             } else {
//                               setSelectedGeneralServices(prev => {
//                                 const newServices = {...prev};
//                                 if (newServices[sc.UUID]) {
//                                   delete newServices[sc.UUID];
//                                 } else {
//                                   newServices[sc.UUID] = sc;
//                                 }
//                                 return newServices;
//                               });
//                             }
//                           }}
//                           // className={`py-[14px] h-[101px] w-[100px] rounded-xl border items-center relative ${
//                           //   isSelected
//                           //     ? 'border-[#D7588033] bg-[#ffdef6]'
//                           //     : 'bg-white border-[#BBBCB7]'
//                           // }`}
//                           className={`py-[14px] h-[101px] w-[100px] rounded-xl border items-center relative ${
//                             sc.HasSubServices && selectedVaccines.length > 0
//                               ? 'bg-[#ffdef6] border-[#D7588033]' // Pink for vaccination selected
//                               : isSelected
//                               ? 'border-[#D7588033] bg-[#ffdef6]' // Pink for selected service
//                               : 'bg-white border-[#BBBCB7]' // Default
//                           }`}>
//                           {/* <Image
//                             source={{
//                               uri: isSelected
//                                 ? `https://democms.zumigo.pet${
//                                     sc?.Color_Icon ?? ''
//                                   }`
//                                 : `https://democms.zumigo.pet${
//                                     sc?.SCIcon ?? ''
//                                   }`,
//                             }}
//                             className="h-[70px] w-[70px]"
//                             resizeMode="contain"
//                           /> */}
//                           <Image
//                             source={{
//                               uri: `https://democms.zumigo.pet${
//                                 isSelected ||
//                                 (sc.HasSubServices &&
//                                   selectedVaccines.length > 0)
//                                   ? sc?.Color_Icon ?? ''
//                                   : sc?.SCIcon ?? ''
//                               }`,
//                             }}
//                             className="h-[70px] w-[70px]"
//                             resizeMode="contain"
//                             style={{
//                               tintColor:
//                                 isSelected ||
//                                 (sc.HasSubServices &&
//                                   selectedVaccines.length > 0)
//                                   ? '#D75880' // or any highlight color
//                                   : undefined,
//                             }}
//                           />

//                           {sc.HasSubServices &&
//                             selectedVaccines.length !== 1 &&
//                             selectedVaccines.length > 0 && (
//                               <View className="absolute top-[-2px] right-[-6px] bg-pastelGrey py-[3px] px-[8px] rounded-full z-10">
//                                 <Text className="text-[14px] font-Nunito-Bold text-primary">
//                                   {selectedVaccines.length}
//                                 </Text>
//                               </View>
//                             )}
//                         </TouchableOpacity>
//                         <View className="mt-[6px] mb-[18px] font-Nunito-Bold text-center text-[11.5px]">
//                           <Text
//                             className="text-[11px] font-Nunito-Bold text-center"
//                             style={{
//                               color:
//                                 (sc.HasSubServices &&
//                                   selectedVaccines.length > 0) ||
//                                 isSelected
//                                   ? 'black'
//                                   : '#838999',
//                             }}>
//                             {sc?.SCTitle}
//                           </Text>
//                         </View>
//                       </View>
//                     );
//                   })}
//                 </ScrollView>
//               </View>
//             </View>
//           </>
//         ))}

//       {!selectedSCT?.IsSCGroupApplicable && (
//         <FlatList
//           data={responseData?.SC?.filter(
//             item => item.ServiceCategoryType_UUID === selectedSCT?.UUID,
//           )}
//           renderItem={({index, item}) => {
//             const isSelected = selectedSpecialistService === item.UUID;

//             return (
//               <>
//                 <View
//                   key={item.UUID}
//                   style={{width: (windowWidth - 78) / 3}}
//                   className={`${(index - 1) % 3 == 0 && ' mx-[15px]'}`}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       setSelectedGeneralServices({});
//                       setSelectedVaccines([]);
//                       setSelectedSpecialistService(prev =>
//                         prev === item?.UUID ? null : item?.UUID,
//                       );
//                     }}
//                     className={`py-[14px] h-[100px] w-[100px]  rounded-xl border items-center  ${
//                       isSelected
//                         ? 'border-[#D7588033] bg-[#ffdef6]'
//                         : ' bg-white  border-[#BBBCB7]'
//                     }`}>
//                     <Image
//                       source={{
//                         uri: isSelected
//                           ? `https://democms.zumigo.pet${
//                               item?.Color_Icon ?? ''
//                             }`
//                           : `https://democms.zumigo.pet${item?.SCIcon ?? ''}`,
//                       }}
//                       className=" h-[70px] w-[70px] "
//                       resizeMode="contain"
//                     />
//                   </TouchableOpacity>
//                   <View className=" mt-[6px] mb-[18px] font-Nunito-Bold text-center text-[11.5px] flex items-center justify-center">
//                     <Text
//                       className="text-[11px] font-Nunito-Bold text-[#838999]  text-center"
//                       style={{
//                         color: isSelected ? 'black' : '#838999',
//                       }}>
//                       {item?.SCTitle}
//                     </Text>
//                   </View>
//                 </View>
//               </>
//             );
//           }}
//           numColumns={3}
//         />
//       )}

//       {/* Section List with Grid Layout */}
//       {false && (
//         <SectionList
//           sections={services}
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={item => item.id}
//           renderItem={() => null} // Prevents the "no renderItem!" error
//           renderSectionHeader={({section: {title, data}}) => (
//             <View>
//               <Text
//                 className=" mb-[18px] font-Nunito-Regular text-[19px]"
//                 style={{fontWeight: 500}}>
//                 {title}
//               </Text>

//               <View className=" flex-1 flex-row flex-wrap  ">
//                 {data.map((item, index) => {
//                   const isSelected = isGeneral
//                     ? !!selectedGeneralServices[item.id]
//                     : selectedSpecialistService === item.id;
//                   return (
//                     <View
//                       key={item.id}
//                       style={{width: (windowWidth - 78) / 3}}
//                       className={`${(index - 1) % 3 == 0 && ' mx-[15px]'}`}>
//                       <TouchableOpacity
//                         key={item.id}
//                         onPress={() => toggleService(item)}
//                         className={`py-[14px] h-[100px] w-[100px]  rounded-xl border items-center  ${
//                           isSelected
//                             ? 'border-[#D7588033] bg-[#ffdef6]'
//                             : ' bg-white  border-[#BBBCB7]'
//                         }`}>
//                         <Image
//                           source={item.image}
//                           className=" h-[70px] w-[70px] "
//                           resizeMode="contain"
//                           style={{
//                             tintColor: isSelected ? '#FFEDF9' : '#FFEDF9',

//                             tintColor: isSelected ? '#D75880' : '#838999',
//                           }}
//                         />
//                         {item.name === 'Vaccination' &&
//                           selectedVaccines.length != 1 &&
//                           selectedVaccines.length && (
//                             <View className=" absolute bg-pastelGrey py-[3px] px-[8px] rounded-full top-[6px] right-[6px]">
//                               <Text className=" text-[14px] font-Nunito-Bold text-primary">
//                                 {selectedVaccines.length}
//                               </Text>
//                             </View>
//                           )}
//                       </TouchableOpacity>
//                       <Text
//                         className={`mt-[6px] mb-[18px] font-Nunito-Bold text-center text-[11.5px] ${
//                           isSelected ? 'text-[#000000]' : 'text-[#838999]'
//                         }`}>
//                         {item.name}
//                       </Text>
//                     </View>
//                   );
//                 })}
//               </View>
//             </View>
//           )}
//           ListFooterComponent={() => <View className="mt-10 " />}
//           showsVerticalScrollIndicator={false}
//         />
//       )}

//       {/* Continue Button */}
//       <View className=" mt-24"></View>

//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate(screens.AddYourPet, {
//             isHomeVisit: true,
//             title: 'Home Visit',
//           })
//         }
//         // onPress={() => navigation.navigate(screens.AddYourPetHomeVisit)}
//         className="absolute px-6 bottom-0"
//         style={{
//           width: windowWidth,
//           boxShadow: '0 -3px 12px #0000000F',
//         }}>
//         <View className="py-4 bg-white">
//           <View className="rounded-full bg-[#d75880] w-full items-center py-5 px-5 flex-col">
//             {/* Continue Button First */}
//             {/* <TouchableOpacity> */}
//             <Text
//               className="text-white font-semibold text-[20px]"
//               style={{fontFamily: 'Nunito-Bold'}}>
//               Continue
//             </Text>
//             {/* </TouchableOpacity> */}

//             {/* Total Services Below */}
//             {(Object.keys(selectedGeneralServices).length !== 0 ||
//               selectedSpecialistService) && (
//               <TouchableOpacity
//                 className="items-center "
//                 // onPress={handlePriceOpenPress}
//               >
//                 <Text className="text-white font-Nunito-Regular">
//                   {isGeneral ? (
//                     <>
//                       {Object.keys(selectedGeneralServices).length > 0 &&
//                         `${Object.keys(selectedGeneralServices).length} ${
//                           Object.keys(selectedGeneralServices).length > 1
//                             ? ''
//                             : ''
//                         }`}
//                       {/* { selectedVaccines.length > 0 &&
//                         `${
//                           Object.keys(selectedGeneralServices).length > 0
//                             ? ' + '
//                             : ''
//                         }Vaccination Selected`} */}
//                     </>
//                   ) : (
//                     '1 '
//                   )}
//                   Services
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </TouchableOpacity>

//       <BottomSheet ref={vaccineBottomSheetRef}>
//         <View className="flex-1 px-6 pt-6 bg-white">
//           <Text className=" font-PTSans-Bold text-[18px]">Vaccination</Text>
//           <Text className="font-Nunito-Regular opacity-50 mt-2">
//             You can choose multiple Vaccines
//           </Text>
//           <ScrollView
//             className="mt-[30px]"
//             showsVerticalScrollIndicator={false}>
//             {responseData?.S?.filter(
//               item => item.SCUUID === selectedSC?.UUID,
//             ).map(item => {
//               const isSelected = selectedVaccines.some(
//                 vaccine => vaccine.UUID === item.UUID,
//               );

//               return (
//                 <>
//                   <TouchableOpacity
//                     key={item.id}
//                     onPress={() => toggleSelection(item)}
//                     className={`p-4 rounded-2xl mb-5 border flex-row  items-start  gap-5 ${
//                       isSelected
//                         ? ' bg-primaryOpacity-10 border-[#ffdef6]'
//                         : ' bg-[#F2F6F733] border-pastelgreyBorder'
//                     }`}>
//                     <View className=" flex-row gap-[8px]">
//                       <Image
//                         source={{
//                           uri: `https://democms.zumigo.pet${
//                             item?.ServiceIcon ?? ''
//                           }`,
//                         }}
//                         className="h-[25px] w-[25px]"
//                         style={{tintColor: isSelected ? primary : 'grey'}}
//                       />
//                       <View>
//                         <Text
//                           className=" font-Nunito-Bold text-[17px] w-[200px]"
//                           ellipsizeMode="tail"
//                           numberOfLines={1}>
//                           {item.ServiceTitle}{' '}
//                         </Text>
//                         <Text className=" font-Nunito-Regular text-[12px] text-black opacity-50">
//                           {item?.Tagline}
//                         </Text>
//                         <Text className=" font-Nunito-Regular text-[12px] mt-[5px] mb-[10px] w-[250px]">
//                           {item.Description?.substring(0, 85)}...
//                         </Text>
//                         <View className="flex flex-row  justify-between items-end">
//                           <Text
//                             style={{
//                               // fontWeight: 700,
//                               fontFamily: 'Nunito-Bold',
//                               fontSize: 15,
//                             }}>
//                             {'₹ 1500'}
//                           </Text>
//                           {isSelected && (
//                             <Image
//                               source={images.footPrint}
//                               className="h-[23px] w-full right-3"
//                               resizeMode="contain"
//                               style={{tintColor: primary}}
//                             />
//                           )}
//                           {/* {isSelected && (
//                         <Image
//                           source={images.footPrint}
//                           className="h-[23px] w-full right-14"
//                           resizeMode="contain"
//                           style={{ tintColor: primary }}
//                         />
//                       )} */}
//                         </View>
//                       </View>
//                     </View>
//                   </TouchableOpacity>
//                 </>
//               );
//             })}

//             {/* {data.map(item => {
//               const isSelected = selectedVaccines.some(
//                 vaccine => vaccine.name === item.name,
//               );
//               return (
//                 <TouchableOpacity
//                   key={item.id}
//                   onPress={() => toggleSelection(item)}
//                   className={`p-4 rounded-2xl mt-[10px] border flex-row  items-start  gap-5 ${isSelected
//                     ? ' bg-primaryOpacity-10 border-[#ffdef6]'
//                     : ' bg-[#F2F6F733] border-pastelgreyBorder'
//                     }`}>
//                   <View className=" flex-row gap-5">
//                     <Image
//                       source={images.bottomSheetVaccinationIcon}
//                       className="h-[30px] w-[30px]"
//                       style={{ tintColor: isSelected ? primary : 'grey' }}
//                     />
//                     <View>
//                       <Text
//                         className=" font-Nunito-Bold text-[17px] w-[250px]"
//                         ellipsizeMode="tail"
//                         numberOfLines={1}>
//                         {item.name}{' '}
//                         <Text className=" font-Nunito-Regular text-[12px] text-black opacity-50">
//                           {item?.ageRange}
//                         </Text>
//                       </Text>
//                       <Text className=" font-Nunito-Regular text-[12px] mt-[5px] mb-[10px]">
//                         {item.subtitle}
//                       </Text>
//                       <View className="flex flex-row justify-between items-center">
//                         <Text className="font-Nunito-Bold text-[18px]">
//                           ₹ {item.price}
//                         </Text>
//                         {isSelected && (
//                           <Image
//                             source={images.footPrint}
//                             className="h-[23px] w-full right-14"
//                             resizeMode="contain"
//                             style={{ tintColor: primary }}
//                           />
//                         )}
//                       </View>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               );
//             })} */}
//           </ScrollView>
//         </View>
//         <FooterBtn
//           title="Add"
//           position="relative"
//           onClick={() => {
//             handleSelection();
//           }}
//         />
//       </BottomSheet>

//       <BottomSheet ref={priceBottomSheetRef}>
//         <View className="flex-1 px-6 pt-6 bg-white">
//           <Text className=" font-PTSans-Bold text-[18px]">
//             Selected services
//           </Text>
//           <ScrollView
//             className="mb-[75px] mt-[30px]"
//             showsVerticalScrollIndicator={false}>
//             {!isGeneral && (
//               <View className="flex-row justify-between">
//                 <Text className=" font-Nunito-Bold text-[16px]">
//                   {
//                     specialistServices[0].data.find(
//                       item => item.id === selectedSpecialistService,
//                     )?.name
//                   }
//                   {/* {specialistServices[selectedSpecialistService].name} */}
//                 </Text>

//                 <Text className="font-Nunito-Bold text-[16px] opacity-50">
//                   ₹{' '}
//                   {
//                     specialistServices[0].data.find(
//                       item => item.id === selectedSpecialistService,
//                     )?.price
//                   }
//                 </Text>
//               </View>
//             )}
//             {isGeneral &&
//               Object.keys(selectedGeneralServices).map(key => (
//                 <View key={key} className="">
//                   <View className="flex-row justify-between">
//                     <Text className=" font-Nunito-Bold text-[16px]">
//                       {selectedGeneralServices[key].name}
//                     </Text>
//                     {selectedGeneralServices[key].price && key != '6' && (
//                       <Text className="font-Nunito-Bold text-[16px] opacity-50">
//                         ₹ {selectedGeneralServices[key].price}
//                       </Text>
//                     )}
//                   </View>
//                   {key === '6' && (
//                     <>
//                       {selectedVaccines.map(item => (
//                         <View
//                           key={item.id}
//                           className="mt-2 flex-row justify-between">
//                           <Text className="font-Nunito-Bold opacity-50 ">
//                             {item.name}{' '}
//                           </Text>
//                           <Text className="font-Nunito-Bold opacity-50">
//                             ₹ {item.price}
//                           </Text>
//                         </View>
//                       ))}
//                     </>
//                   )}
//                   <View className=" border-b my-4 border-[#004CF21A]"></View>
//                 </View>
//               ))}
//           </ScrollView>

//           <View
//             className={` absolute px-6 bottom-0 `}
//             style={{
//               width: windowWidth,
//               boxShadow: '0 -3px 12px #0000000F',
//             }}>
//             <View className=" py-4 bg-white">
//               <View
//                 className={`rounded-2xl bg-[#d75880] w-full items-center   px-5  justify-between flex-row`}>
//                 <TouchableOpacity
//                   className=" flex-row items-center gap-[6px]"
//                   onPress={() => {
//                     handlePriceClosePress();
//                   }}>
//                   <Text className=" text-white font-Nunito-Regular">
//                     {isGeneral
//                       ? selectedVaccines.length
//                         ? Object.keys(selectedGeneralServices).length +
//                           selectedVaccines.length -
//                           1
//                         : Object.keys(selectedGeneralServices).length
//                       : '1'}{' '}
//                     Services | ₹ {getTotalPrice()}
//                   </Text>
//                   <Image
//                     source={images.leftWhite}
//                     className=" h-[9px] w-[5px] -rotate-90"
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => {
//                     navigation.navigate(screens.AddYourPetHomeVisit, {
//                       isHomeVisit: true,
//                       // title: 'Home Visit',
//                     });
//                   }}></TouchableOpacity>
//                 <Text
//                   className=" text-white font-semibold text-[20px] py-5 rounded-full"
//                   style={{fontFamily: 'Nunito-Bold'}}>
//                   Continue
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </BottomSheet>
//     </View>
//   );
// };

// export default ServiceSelection;
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import FooterBtn from '../../../components/shared/FooterBtn';
import images from '../../../assets/images';
import screens from '../../../constants/screens';
import BottomSheet from '../../../components/shared/BottomSheet';
import {ScrollView} from 'react-native-gesture-handler';
import {primary} from '../../../assets/theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';

const generalServices = [
  {
    title: 'Sick pet care and Diagnostics',
    data: [
      {id: '1', name: 'Vet Visit', image: images.vetvisitIcon, price: 1500},
      {
        id: '2',
        name: 'Lab Diagnostic',
        image: images.labdiagonisticIcon,
        price: 1200,
      },
      {id: '3', name: 'IV Therapy', image: images.ivIcon, price: 1500},
    ],
  },
  {
    title: 'Wellness and Preventative ',
    data: [
      {
        id: '5',
        name: 'Microchipping',
        image: images.Microchipping,
        price: 1500,
      },
      {
        id: '6',
        name: 'Vaccination',
        image: images.vaccinationIcon,
        price: 1500,
      },
      {
        id: '7',
        name: 'Deworming',
        image: images.tabletIcon,
        price: 1500,
      },
    ],
  },
];

const specialistServices = [
  {
    title: '',
    data: [
      {
        id: '8',
        name: 'Ophthalmologist',
        image: images.ophthalmologistIcon,
        price: 1500,
      },
      {
        id: '9',
        name: 'Dermatologist',
        image: images.dermatologistIcon,
        price: 1500,
      },
      {id: '10', name: 'Oncologist', image: images.oncologistIcon, price: 1500},
      {
        id: '11',
        name: 'Neurology',
        image: images.neurologyIcon,
        price: 1500,
      },
      {
        id: '12',
        name: 'Cardiologist',
        image: images.cardiologistIcon,
        price: 1500,
      },

      {
        id: '13',
        name: 'Orthopedic',
        image: images.orthopedicIcon,
        price: 1500,
      },
      {
        id: '14',
        name: 'Soft Tissue Surgeon',
        image: images.softtissueIcon,
        price: 1500,
      },
      {
        id: '15',
        name: 'Chronic Ailments & Pain Medicine',
        image: images.painmedicineIcon,
        price: 1500,
      },
      {
        id: '16',
        name: 'Physiotherapist',
        image: images.PhysiotherapistIcon,
        price: 1500,
      },
      {
        id: '17',
        name: 'Homeopathy & Alternative Medicine',
        image: images.homeopathyIcon,
        price: 1500,
      },
    ],
  },
];

const data = [
  {
    id: '1',
    name: 'Puppies',
    ageRange: '(Little Paws Starter Pack - Dog)',
    subtitle: 'Distemper, Parvo Virus, DHPPiL, Corona',
    price: 7499,
  },
  {
    id: '2',
    name: 'Annual Boosters',
    ageRange: '(Good Boy Shots )',
    subtitle: 'Anti-Rabies + Corona + DHPPiL',
    price: 3099,
  },
  {
    id: '3',
    name: 'DHPPiL',
    ageRange: '(Adult - Dog)',
    subtitle: 'DHPPiL',
    price: 1499,
  },
  {
    id: '4',
    name: 'Coronavirus',
    ageRange: '(Puppies - Dog)',
    subtitle: 'Coronavirus Vaccine',
    price: 1399,
  },
  {
    id: '5',
    name: 'Kennel Cough',
    ageRange: '(Little Paws Starter Pack - Dog)',
    subtitle: 'Kennel Cough',
    price: 1699,
  },
];

const ServiceSelection = ({navigation}) => {
  const {params} = useRoute();

  const [responseData, setResponseData] = useState(null);
  const [selectedSCT, setSelectSCT] = useState(null);
  const [selectedSC, setSelectSC] = useState(null);

  const windowWidth = Dimensions.get('window').width;

  const bottomSheetRef = useRef(null);
  const vaccineBottomSheetRef = useRef(null);
  const priceBottomSheetRef = useRef(null);

  // const [selectedTab, setSelectedTab] = useState('General');
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [selectedGeneralServices, setSelectedGeneralServices] = useState({});
  const [selectedSpecialistService, setSelectedSpecialistService] =
    useState(null);
  const [sctButtons, setSctButtons] = useState([]);
  const [petDetails, setPetDetails] = useState(null);

  useEffect(() => {
    if (params) {
      console.log(params);

      fetchServiceData();
    }
  }, [params]);

  const fetchServiceData = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const consultationUuid = params.consultationTypeUUID;
      const serviceGroupUuid = params.serviceGroupUUID;
      const response = await fetch(
        `https://demoapi.zumigo.pet/api/Service/GetServiceMdl/${serviceGroupUuid}/${consultationUuid}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
      const data = await response.json();

      console.log(data);

      setResponseData(data);
      console.log(data?.SCT);
      setSelectSCT(data?.SCT[0]);

      console.log('Original Service Data:', data);

      if (Array.isArray(data.SCT)) {
        const filteredSCTNames = data.SCT.map(item => item.SCTName);

        setSctButtons(filteredSCTNames);
        setSelectedTab(filteredSCTNames[0]); // optionally select the first by default
      }
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const isGeneral = selectedSCT?.UUID === responseData?.SCT[0]?.UUID;
  const services = isGeneral ? generalServices : specialistServices;

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('last_added_pet');
        if (jsonValue != null) {
          const pet = JSON.parse(jsonValue);
          setPetDetails(pet);
          console.log('Fetched pet:', pet);
        }
      } catch (e) {
        console.error('Error fetching pet details from AsyncStorage:', e);
      }
    };

    fetchPetDetails();
  }, []);

  const handleVaccineClosePress = () => vaccineBottomSheetRef.current?.close();
  const handleVaccineOpenPress = () => vaccineBottomSheetRef.current?.present();
  const handlePriceClosePress = () => priceBottomSheetRef.current?.close();

  const handleSelection = () => {
    // this is when vaccination add btn is pressed
    const totalPrice = selectedVaccines.reduce(
      (sum, item) => sum + item.price,
      0,
    );

    setSelectedGeneralServices(prev => {
      const newServices = {...prev};
      if (totalPrice == 0) {
        delete newServices['6'];
      } else {
        newServices['6'] = {
          id: '6',
          name: 'Vaccination',
          price: totalPrice,
        };
      }
      return newServices;
    });
    handleVaccineClosePress();
    console.log('Selected Vaccines:', selectedVaccines);
    console.log('Total Price:', totalPrice);
  };

  const toggleSelection = item => {
    console.log(item);
    setSelectedSpecialistService(null);

    setSelectedVaccines(prevSelected => {
      const isSelected = prevSelected.some(
        vaccine => vaccine.UUID === item.UUID,
      );

      return isSelected
        ? prevSelected.filter(vaccine => vaccine.UUID !== item.UUID) // Remove if already selected
        : [...prevSelected, item]; // Add if not selected
    });
  };

  const toggleService = item => {
    if (isGeneral) {
      if (item.name === 'Vaccination') {
        handleVaccineOpenPress();
        return;
      }
      setSelectedSpecialistService(null);
      setSelectedGeneralServices(prev => {
        const newServices = {...prev};
        if (newServices[item.id]) {
          delete newServices[item.id];
        } else {
          newServices[item.id] = item;
        }
        return newServices;
      });
    } else {
      setSelectedGeneralServices({});
      setSelectedVaccines([]);
      setSelectedSpecialistService(prev =>
        prev === item?.id ? null : item?.id,
      );
    }
  };

  const getTotalPrice = () => {
    if (isGeneral) {
      return Object.values(selectedGeneralServices).reduce(
        (sum, service) => sum + (service.price || 0),
        0,
      );
    } else {
      return 1500;
    }
  };

  console.log('getTotalPrice', getTotalPrice());

  return (
    <View className="flex-1 bg-white px-6">
      {/* Header */}

      {/* Tabs */}
      {selectedTab === 'Specialist' ? (
        <View>
          <Text className="font-Nunito-Bold text-[24px] text-[#333333]">
            Select Your Specialist
          </Text>
        </View>
      ) : (
        <View>
          <Text className="font-Nunito-Bold text-[24px] text-[#333333]">
            Select Your Services
          </Text>
          <Text className="font-Nunito-Regular text-[14px] text-[#838999] mt-[5px]">
            You can choose multiple services
          </Text>
        </View>
      )}

      <View className="my-5 flex-row bg-pastelGrey rounded-2xl overflow-hidden ">
        {responseData?.SCT?.map(tab => (
          <TouchableOpacity
            key={tab.UUID}
            className={`flex-1 p-[15px] items-center rounded-2xl ${
              selectedTab === tab.SCTName ? 'bg-primary' : ''
            }`}
            onPress={() => {
              setSelectSCT(tab);
              setSelectedTab(tab.SCTName);
              setSelectedGeneralServices({});
              setSelectedVaccines([]);
              setSelectedSpecialistService(null);
            }}>
            <Text
              className={`text-[12px] leading-[22px] ${
                selectedTab === tab.SCTName
                  ? 'text-white font-Nunito-Bold'
                  : 'text-[#969492] font-Nunito-Regular'
              }`}>
              {tab.SCTName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {false && (
        <SectionList
          sections={services}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={() => null} // Prevents the "no renderItem!" error
          renderSectionHeader={({section: {title, data}}) => (
            <View>
              <Text
                className=" mb-[18px] font-Nunito-Regular text-[19px]"
                style={{fontWeight: 500}}>
                {title}
              </Text>

              <View className=" flex-1 flex-row flex-wrap  ">
                {data.map((item, index) => {
                  const isSelected = isGeneral
                    ? !!selectedGeneralServices[item.id]
                    : selectedSpecialistService === item.id;
                  return (
                    <View
                      key={item.id}
                      style={{width: (windowWidth - 78) / 3}}
                      className={`${(index - 1) % 3 == 0 && ' mx-[15px]'}`}>
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => toggleService(item)}
                        className={`py-[14px] h-[100px] w-[100px]  rounded-xl border items-center  ${
                          isSelected
                            ? 'border-[#D7588033] bg-[#ffdef6]'
                            : ' bg-white  border-[#BBBCB7]'
                        }`}>
                        <Image
                          source={item.image}
                          className=" h-[70px] w-[70px] "
                          resizeMode="contain"
                          style={{
                            tintColor: isSelected ? '#FFEDF9' : '#FFEDF9',

                            tintColor: isSelected ? '#D75880' : '#838999',
                          }}
                        />
                        {item.name === 'Vaccination' &&
                          selectedVaccines.length != 1 &&
                          selectedVaccines.length && (
                            <View className=" absolute bg-pastelGrey py-[3px] px-[8px] rounded-full top-[6px] right-[6px]">
                              <Text className=" text-[14px] font-Nunito-Bold text-primary">
                                {selectedVaccines.length}
                              </Text>
                            </View>
                          )}
                      </TouchableOpacity>
                      <Text
                        className={`mt-[6px] mb-[18px] font-Nunito-Bold text-center text-[11.5px] ${
                          isSelected ? 'text-[#000000]' : 'text-[#838999]'
                        }`}>
                        {item.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
          ListFooterComponent={() => <View className="mt-10 " />}
          showsVerticalScrollIndicator={false}
        />
      )}

      {selectedSCT?.IsSCGroupApplicable &&
        responseData &&
        responseData?.SCG?.map(scg => (
          <>
            <View>
              <Text
                className=" mb-[18px] font-Nunito-Regular text-[21px]"
                style={{fontWeight: 500}}>
                {scg?.SCGName}
              </Text>

              <View>
                <ScrollView horizontal>
                  {responseData?.SC?.filter(
                    item => item.SCGUUID === scg?.UUID,
                  )?.map((sc, index) => {
                    const isSelected = !!selectedGeneralServices[sc.UUID];

                    return (
                      <>
                        <View
                          key={sc.UUID}
                          style={{width: (windowWidth - 78) / 3}}
                          className={`${(index - 1) % 3 == 0 && ' mx-[15px]'}`}>
                          <TouchableOpacity
                            onPress={() => {
                              if (sc.HasSubServices) {
                                setSelectSC(sc);
                                handleVaccineOpenPress();
                              } else {
                                setSelectedGeneralServices(prev => {
                                  const newServices = {...prev};
                                  if (newServices[sc.UUID]) {
                                    delete newServices[sc.UUID];
                                  } else {
                                    newServices[sc.UUID] = sc;
                                  }
                                  return newServices;
                                });
                              }
                            }}
                            className={`py-[14px] h-[101px] w-[100px] rounded-xl border items-center relative ${
                              sc.HasSubServices && selectedVaccines.length > 0
                                ? 'bg-[#ffdef6] border-[#D7588033]' // Pink for vaccination selected
                                : isSelected
                                ? 'border-[#D7588033] bg-[#ffdef6]' // Pink for selected service
                                : 'bg-white border-[#BBBCB7]' // Default
                            }`}>
                            <Image
                              source={{
                                uri: `https://democms.zumigo.pet${
                                  isSelected ||
                                  (sc.HasSubServices &&
                                    selectedVaccines.length > 0)
                                    ? sc?.Color_Icon ?? ''
                                    : sc?.SCIcon ?? ''
                                }`,
                              }}
                              className="h-[70px] w-[70px]"
                              resizeMode="contain"
                              style={{
                                tintColor:
                                  isSelected ||
                                  (sc.HasSubServices &&
                                    selectedVaccines.length > 0)
                                    ? '#D75880' // or any highlight color
                                    : undefined,
                              }}
                            />
                            {sc.HasSubServices &&
                              selectedVaccines.length !== 1 &&
                              selectedVaccines.length > 0 && (
                                <View className="absolute top-[-2px] right-[-6px] bg-pastelGrey py-[3px] px-[8px] rounded-full z-10">
                                  <Text className="text-[14px] font-Nunito-Bold text-primary">
                                    {selectedVaccines.length}
                                  </Text>
                                </View>
                              )}
                          </TouchableOpacity>
                          <View className="mt-[6px] mb-[18px] font-Nunito-Bold text-center text-[11.5px]">
                            <Text
                              className="text-[12px] font-Nunito-Bold text-center"
                              style={{
                                color:
                                  (sc.HasSubServices &&
                                    selectedVaccines.length > 0) ||
                                  isSelected
                                    ? 'black'
                                    : '#838999',
                              }}>
                              {sc?.SCTitle}
                            </Text>
                          </View>
                        </View>
                      </>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </>
        ))}

      {!selectedSCT?.IsSCGroupApplicable && (
        <FlatList
          data={responseData?.SC?.filter(
            item => item.ServiceCategoryType_UUID === selectedSCT?.UUID,
          )}
          renderItem={({index, item}) => {
            const isSelected = selectedSpecialistService === item.UUID;

            return (
              <>
                <View
                  key={item.UUID}
                  style={{width: (windowWidth - 78) / 3}}
                  className={`${(index - 1) % 3 == 0 && ' mx-[15px]'}`}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedGeneralServices({});
                      setSelectedVaccines([]);
                      setSelectedSpecialistService(prev =>
                        prev === item?.UUID ? null : item?.UUID,
                      );
                    }}
                    className={`py-[14px] h-[100px] w-[100px]  rounded-xl border items-center  ${
                      isSelected
                        ? 'border-[#D7588033] bg-[#ffdef6]'
                        : ' bg-white  border-[#BBBCB7]'
                    }`}>
                    <Image
                      source={{
                        uri: isSelected
                          ? `https://democms.zumigo.pet${
                              item?.Color_Icon ?? ''
                            }`
                          : `https://democms.zumigo.pet${item?.SCIcon ?? ''}`,
                      }}
                      className=" h-[70px] w-[70px] "
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View className=" mt-[6px] mb-[18px] font-Nunito-Bold text-center text-[11.5px]">
                    <Text
                      className="text-[11px] font-Nunito-Bold text-[#838999]  text-center"
                      style={{
                        color: isSelected ? 'black' : '#838999',
                      }}>
                      {item?.SCTitle}
                    </Text>
                  </View>
                </View>
              </>
            );
          }}
          numColumns={3}
        />
      )}

      {/* Section List with Grid Layout */}
      {false && (
        <SectionList
          sections={services}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={() => null} // Prevents the "no renderItem!" error
          renderSectionHeader={({section: {title, data}}) => (
            <View>
              <Text
                className=" mb-[18px] font-Nunito-Regular text-[19px]"
                style={{fontWeight: 500}}>
                {title}
              </Text>

              <View className=" flex-1 flex-row flex-wrap  ">
                {data.map((item, index) => {
                  const isSelected = isGeneral
                    ? !!selectedGeneralServices[item.id]
                    : selectedSpecialistService === item.id;
                  return (
                    <View
                      key={item.id}
                      style={{width: (windowWidth - 78) / 3}}
                      className={`${(index - 1) % 3 == 0 && ' mx-[15px]'}`}>
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => toggleService(item)}
                        className={`py-[14px] h-[100px] w-[100px]  rounded-xl border items-center  ${
                          isSelected
                            ? 'border-[#D7588033] bg-[#ffdef6]'
                            : ' bg-white  border-[#BBBCB7]'
                        }`}>
                        <Image
                          source={item.image}
                          className=" h-[70px] w-[70px] "
                          resizeMode="contain"
                          style={{
                            tintColor: isSelected ? '#FFEDF9' : '#FFEDF9',

                            tintColor: isSelected ? '#D75880' : '#838999',
                          }}
                        />
                        {item.name === 'Vaccination' &&
                          selectedVaccines.length != 1 &&
                          selectedVaccines.length && (
                            <View className=" absolute bg-pastelGrey py-[3px] px-[8px] rounded-full top-[6px] right-[6px]">
                              <Text className=" text-[14px] font-Nunito-Bold text-primary">
                                {selectedVaccines.length}
                              </Text>
                            </View>
                          )}
                      </TouchableOpacity>
                      <Text
                        className={`mt-[6px] mb-[18px] font-Nunito-Bold text-center text-[11.5px] ${
                          isSelected ? 'text-[#000000]' : 'text-[#838999]'
                        }`}>
                        {item.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
          ListFooterComponent={() => <View className="mt-10 " />}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Continue Button */}
      <View className=" mt-24"></View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(screens.AddYourPetHomeVisit, {
            isHomeVisit: true,
            title: 'Home Visit',
          })
        }
        // onPress={() => navigation.navigate(screens.AddYourPetHomeVisit)}
        className="absolute px-6 bottom-0"
        style={{
          width: windowWidth,
          boxShadow: '0 -3px 12px #0000000F',
        }}>
        <View className="py-4 bg-white">
          <View className="rounded-full bg-[#d75880] w-full items-center py-5 px-5 flex-col">
            {/* Continue Button First */}
            {/* <TouchableOpacity> */}
            <Text
              className="text-white font-semibold text-[20px]"
              style={{fontFamily: 'Nunito-Bold'}}>
              Continue
            </Text>
            {/* </TouchableOpacity> */}

            {/* Total Services Below */}
            {(Object.keys(selectedGeneralServices).length !== 0 ||
              selectedSpecialistService) && (
              <TouchableOpacity
                className="items-center "
                // onPress={handlePriceOpenPress}
              >
                <Text className="text-white font-Nunito-Regular">
                  {isGeneral ? (
                    <>
                      {Object.keys(selectedGeneralServices).length > 0 &&
                        `${Object.keys(selectedGeneralServices).length} ${
                          Object.keys(selectedGeneralServices).length > 1
                            ? ''
                            : ''
                        }`}
                      {/* { selectedVaccines.length > 0 &&
                        `${
                          Object.keys(selectedGeneralServices).length > 0
                            ? ' + '
                            : ''
                        }Vaccination Selected`} */}
                    </>
                  ) : (
                    '1 '
                  )}
                  Services
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <BottomSheet ref={vaccineBottomSheetRef}>
        <View className="flex-1 px-6 pt-6 bg-white">
          <Text className=" font-Nunito-Bold text-[24px]">Vaccination</Text>
          <Text className="font-Nunito-Regular opacity-50 mt-2">
            You can choose multiple Vaccines
          </Text>
          <ScrollView
            className="mt-[30px]"
            showsVerticalScrollIndicator={false}>
            {responseData?.S?.filter(
              item => item.SCUUID === selectedSC?.UUID,
            ).map(item => {
              const isSelected = selectedVaccines.some(
                vaccine => vaccine.UUID === item.UUID,
              );

              return (
                <>
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => toggleSelection(item)}
                    className={`p-4 rounded-2xl mt-[10px] border flex-row  items-start  gap-1 ${
                      isSelected
                        ? ' bg-primaryOpacity-10 border-[#ffdef6]'
                        : ' bg-[#F2F6F733] border-pastelgreyBorder'
                    }`}>
                    <View className=" flex-row gap-2">
                      <Image
                        source={{
                          uri: `https://democms.zumigo.pet${
                            item?.ServiceIcon ?? ''
                          }`,
                        }}
                        className="h-[25px] w-[25px]"
                        style={{tintColor: isSelected ? primary : 'grey'}}
                      />
                      <View>
                        <Text
                          className=" font-Nunito-Bold text-[17px] w-[200px]"
                          ellipsizeMode="tail"
                          numberOfLines={1}>
                          {item.ServiceTitle}{' '}
                        </Text>
                        <Text className=" font-Nunito-Regular text-[12px] text-black opacity-50">
                          {item?.Tagline}
                        </Text>
                        <Text className=" font-Nunito-Regular text-[12px] mt-[5px] mb-[10px] w-[250px]">
                          {item.Description?.substring(0, 85)}...
                        </Text>
                        <View className="flex flex-row justify-between items-end">
                          <Text
                            style={{
                              // fontWeight: 700,
                              fontSize: 15,
                              fontFamily: 'Nunito-Bold',
                            }}>
                            {'₹ 1500'}
                          </Text>
                          {isSelected && (
                            <Image
                              source={images.footPrint}
                              className="h-[23px] w-full right-3"
                              resizeMode="contain"
                              style={{tintColor: primary}}
                            />
                          )}
                          {/* {isSelected && (
                        <Image
                          source={images.footPrint}
                          className="h-[23px] w-full right-14"
                          resizeMode="contain"
                          style={{ tintColor: primary }}
                        />
                      )} */}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              );
            })}

            {/* {data.map(item => {
              const isSelected = selectedVaccines.some(
                vaccine => vaccine.name === item.name,
              );
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => toggleSelection(item)}
                  className={`p-4 rounded-2xl mt-[10px] border flex-row  items-start  gap-5 ${isSelected
                    ? ' bg-primaryOpacity-10 border-[#ffdef6]'
                    : ' bg-[#F2F6F733] border-pastelgreyBorder'
                    }`}>
                  <View className=" flex-row gap-5">
                    <Image
                      source={images.bottomSheetVaccinationIcon}
                      className="h-[30px] w-[30px]"
                      style={{ tintColor: isSelected ? primary : 'grey' }}
                    />
                    <View>
                      <Text
                        className=" font-Nunito-Bold text-[17px] w-[250px]"
                        ellipsizeMode="tail"
                        numberOfLines={1}>
                        {item.name}{' '}
                        <Text className=" font-Nunito-Regular text-[12px] text-black opacity-50">
                          {item?.ageRange}
                        </Text>
                      </Text>
                      <Text className=" font-Nunito-Regular text-[12px] mt-[5px] mb-[10px]">
                        {item.subtitle}
                      </Text>
                      <View className="flex flex-row justify-between items-center">
                        <Text className="font-Nunito-Bold text-[18px]">
                          ₹ {item.price}
                        </Text>
                        {isSelected && (
                          <Image
                            source={images.footPrint}
                            className="h-[23px] w-full right-14"
                            resizeMode="contain"
                            style={{ tintColor: primary }}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })} */}
          </ScrollView>
        </View>
        <FooterBtn
          title="Add"
          position="relative"
          onClick={() => {
            handleSelection();
          }}
        />
      </BottomSheet>

      <BottomSheet ref={priceBottomSheetRef}>
        <View className="flex-1 px-6 pt-6 bg-white">
          <Text className=" font-PTSans-Bold text-[18px]">
            Selected services
          </Text>
          <ScrollView
            className="mb-[75px] mt-[30px]"
            showsVerticalScrollIndicator={false}>
            {!isGeneral && (
              <View className="flex-row justify-between">
                <Text className=" font-Nunito-Bold text-[16px]">
                  {
                    specialistServices[0].data.find(
                      item => item.id === selectedSpecialistService,
                    )?.name
                  }
                  {/* {specialistServices[selectedSpecialistService].name} */}
                </Text>

                <Text className="font-Nunito-Bold text-[16px] opacity-50">
                  ₹{' '}
                  {
                    specialistServices[0].data.find(
                      item => item.id === selectedSpecialistService,
                    )?.price
                  }
                </Text>
              </View>
            )}
            {isGeneral &&
              Object.keys(selectedGeneralServices).map(key => (
                <View key={key} className="">
                  <View className="flex-row justify-between">
                    <Text className=" font-Nunito-Bold text-[16px]">
                      {selectedGeneralServices[key].name}
                    </Text>
                    {selectedGeneralServices[key].price && key != '6' && (
                      <Text className="font-Nunito-Bold text-[16px] opacity-50">
                        ₹ {selectedGeneralServices[key].price}
                      </Text>
                    )}
                  </View>
                  {key === '6' && (
                    <>
                      {selectedVaccines.map(item => (
                        <View
                          key={item.id}
                          className="mt-2 flex-row justify-between">
                          <Text className="font-Nunito-Bold opacity-50 ">
                            {item.name}{' '}
                          </Text>
                          <Text className="font-Nunito-Bold opacity-50">
                            ₹ {item.price}
                          </Text>
                        </View>
                      ))}
                    </>
                  )}
                  <View className=" border-b my-4 border-[#004CF21A]"></View>
                </View>
              ))}
          </ScrollView>

          <View
            className={` absolute px-6 bottom-0 `}
            style={{
              width: windowWidth,
              boxShadow: '0 -3px 12px #0000000F',
            }}>
            <View className=" py-4 bg-white">
              <View
                className={`rounded-2xl bg-[#d75880] w-full items-center   px-5  justify-between flex-row`}>
                <TouchableOpacity
                  className=" flex-row items-center gap-[6px]"
                  onPress={() => {
                    handlePriceClosePress();
                  }}>
                  <Text className=" text-white font-Nunito-Regular">
                    {isGeneral
                      ? selectedVaccines.length
                        ? Object.keys(selectedGeneralServices).length +
                          selectedVaccines.length -
                          1
                        : Object.keys(selectedGeneralServices).length
                      : '1'}{' '}
                    Services | ₹ {getTotalPrice()}
                  </Text>
                  <Image
                    source={images.leftWhite}
                    className=" h-[9px] w-[5px] -rotate-90"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(screens.AddYourPet, {
                      isHomeVisit: true,
                      // title: 'Home Visit',
                    });
                  }}>
                  <Text
                    className=" text-white font-semibold text-[20px] py-5 rounded-full"
                    style={{fontFamily: 'Nunito-Bold'}}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ServiceSelection;
