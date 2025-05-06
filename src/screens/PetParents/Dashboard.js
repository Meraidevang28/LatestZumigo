import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import screens from '../../constants/screens';
import images from '../../assets/images';
import CTACarousel from '../../components/PetParentDashboard/Carousel/CTACarousel';
import TopSpecialistsCard from '../../components/PetParentDashboard/TopSpecialistsCard';
import ImageCarousel from '../../components/PetParentDashboard/Carousel/ImageCarousel';
import HowItworkCarousel from '../../components/PetParentDashboard/Carousel/HowItworkCarousel';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {primary} from '../../assets/theme/colors';
import {getFontSize} from '../../../font';
import {NetworkInfo} from 'react-native-network-info';
const doctors = [
  {
    id: '1',
    name: 'Dr. Manisha',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 134,
    image: images.VetImage2,
  },
  {
    id: '2',
    name: 'Dr. Esha Singh',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 114,
    image: images.VetImage2,
  },
  {
    id: '3',
    name: 'Dr. Preeti Jain',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 134,
    image: images.VetImage2,
  },
  {
    id: '4',
    name: 'Dr. Sunil Krishna',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 142,
    image: images.VetImage2,
  },
];

const advTwoData = [
  {
    image: images.AD2,
  },
  {
    image: images.AD2,
  },
  {
    image: images.AD2,
  },
  {
    image: images.AD2,
  },
];

const advOneData = [
  {
    image: images.DashboardCatIcon,
    title: 'Pick a Service',
    descriptionPrefix: 'Book an appointment ',
    descriptionBold: 'through our app.',
  },
  {
    image: images.DashboardCatCalenderIcon,
    title: 'Select a Preferred Date and Time',
    descriptionPrefix: 'We prioritize your ',
    descriptionBold: 'comfort and convenience',
    descriptionSuffix:
      '. Select services for the same day or schedule a future appointment.',
  },
  {
    image: images.DashboardCarIcon,
    title: 'Experience At-Home Veterinary Care',
    descriptionPrefix: 'Providing healthcare services to your pet right ',
    descriptionBold: 'at your doorstep ',
  },
];

const categories = [
  {id: '1', name: 'Veterinarians', icon: images.vaccinationImageIcon},
  {id: '2', name: 'Groomers', icon: images.groomersIcon},
  {id: '3', name: 'Food & Nutrition', icon: images.foodnutritionIcon},
  {id: '4', name: 'Radiology', icon: images.radiologyImage},
];

const Dashboard = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const {width, height} = Dimensions.get('window');
  const scale = width / 375; // 375 is the base width (iPhone 6)
  const [primaryServices, setPrimaryServices] = useState([]);
  const [serviceGroups, setServiceGroups] = useState([]);
  const [consultationTypes, setConsultationTypes] = useState([]);
  const [applicableCTUUIDs, setApplicableCTUUIDs] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  useEffect(() => {
    const fetchPrimaryServiceGroups = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const name = await AsyncStorage.getItem('first_name');
        const profileComplete = await AsyncStorage.getItem(
          'is_profile_complete',
        );
        if (name) {
          setFirstName(name);
          // console.log('First Name:', name);
        }
        if (profileComplete === 'true') {
          setIsProfileComplete(true);
        }
        const response = await fetch(
          'https://demoapi.zumigo.pet/api/Service/ServiceGroupConsultation',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('data', data);

        const groups = data.ServiceGroup;
        setServiceGroups(groups);
        setConsultationTypes(data.ConsultationType);

        const filteredPrimary = groups.filter(item => item.DisplayAsPrimary);
        setPrimaryServices(filteredPrimary);

        // Extract ApplicableCTUUIDs where IsCategoryTypeApplicable is true
        const uuids = groups
          .filter(item => item.IsCategoryTypeApplicable)
          .map(item => item.ApplicableCTUUID)
          .filter(Boolean)
          .flatMap(uuidStr =>
            uuidStr.split(',').map(uuid => uuid.trim().toLowerCase()),
          );

        // console.log('Filtered Applicable CT UUIDs:', uuids);

        setApplicableCTUUIDs(uuids);
      } catch (error) {
        console.error('Failed to fetch service groups:', error);
      }
    };

    fetchPrimaryServiceGroups();
  }, []);
  const filteredConsultations = consultationTypes.filter(ct =>
    primaryServices.some(group =>
      group.ApplicableCTUUID?.split(',')
        .map(uuid => uuid.trim().toLowerCase())
        .includes(ct.UUID.toLowerCase()),
    ),
  );
  const renderItem = ({item}) => (
    <View className="  flex flex-row items-center px-4 mb-2 mt-3">
      {/* Text Block */}
      <View className="w-[185px] md:w-[180px] lg:w-[200px]">
        <Text
          // numberOfLines={2}
          allowFontScaling={false}
          style={{
            fontFamily: 'Nunito-Bold',
            color: primary,
            fontSize: getFontSize(14),
            lineHeight: getFontSize(20),
          }}>
          {item.Title}
        </Text>

        <Text
          style={{
            width: getFontSize(139),
            fontSize: getFontSize(15),
            lineHeight: getFontSize(20),
            color: '#333333',
            fontFamily: 'Nunito-Regular',
            marginTop: getFontSize(6),
          }}>
          {item.SubTitle}
        </Text>
      </View>

      {/* Image */}
      <View className="bg-[#f2f6f7]">
        <Image
          source={{uri: `https://democms.zumigo.pet${item.Picture}`}}
          className="  bg-[#f2f6f7]"
          style={{
            width: width * 0.46,
            height: width * 0.4,
            right: width * 0.06,
            resizeMode: 'contain',
            zIndex: 1,
          }}
        />
      </View>
    </View>
  );
  const screenWidth = Dimensions.get('window').width;
  // const uuid = consultation.UUID;
  // const name = consultation.Consultaytion_Name;

  useEffect(() => {
    const checkStoredPet = async () => {
      try {
        const petData = await AsyncStorage.getItem('last_added_pet');
        if (petData) {
          const parsedPet = JSON.parse(petData);
          console.log('Pet found in storage:', parsedPet);

          // Navigate to another screen if data is present
          // navigation.navigate('ParentDetails', {isHomeVisit: true});
        }
      } catch (err) {
        console.log('Error fetching pet data from storage', err);
      }
    };

    checkStoredPet();
  }, []);
  // useEffect(() => {
  //   const checkParentDetails = async () => {
  //     const [firstName, lastName, phone, email] = await Promise.all([
  //       AsyncStorage.getItem('first_name'),
  //       AsyncStorage.getItem('last_name'),
  //       AsyncStorage.getItem('mobile_number'),
  //       AsyncStorage.getItem('email'),
  //     ]);

  //     if (firstName && lastName && phone && email) {
  //       // ✅ All parent details exist, skip this screen
  //       navigation.replace(screens.MapViewScreenParent, {
  //         isTeleConsult: !Boolean(isHomeVisit),
  //       });
  //     }
  //   };

  //   checkParentDetails();
  // }, []);
  useEffect(() => {
    const checkParentDetails = async () => {
      const [firstName, lastName, phone, email] = await Promise.all([
        AsyncStorage.getItem('first_name'),
        AsyncStorage.getItem('last_name'),
        AsyncStorage.getItem('mobile_number'),
        AsyncStorage.getItem('email'),
      ]);

      const isParentDetailsComplete = firstName && lastName && phone && email;

      // If parent details are complete, navigate based on consultation type
      if (isParentDetailsComplete) {
        if (isHomeVisit) {
          // For Home Visit consultation, navigate to MapViewScreenParent
          navigation.replace(screens.MapViewScreenParent, {
            isTeleConsult: false,
          });
        } else {
          // For Teleconsult consultation, navigate to Veterinarian Screen
          navigation.replace(screens.VaterinarianScreen, {
            isTeleConsult: true,
          });
        }
      } else {
        // If parent details are not complete, navigate to ParentDetails screen
        navigation.navigate(screens.ParentDetails, {
          isHomeVisit,
        });
      }
    };

    checkParentDetails();
  }, []);

  useEffect(() => {
    const checkStoredPet = async () => {
      try {
        const petData = await AsyncStorage.getItem('last_added_pet_tele');
        if (petData) {
          const parsedPet = JSON.parse(petData);
          console.log('Pet found in storage for Tele:', parsedPet);

          // Navigate to another screen if data is present
          // navigation.navigate('ParentDetails', {isHomeVisit: true});
        }
      } catch (err) {
        console.log('Error fetching pet data from storage', err);
      }
    };

    checkStoredPet();
  }, []);
  NetworkInfo.getIPV4Address().then(ipv4Address => {
    console.log('IPv4 Address:', ipv4Address); // e.g., 192.168.20.25
  });
  const checkIsParentDetailsComplete = async () => {
    const [firstName, lastName, phone, email] = await Promise.all([
      AsyncStorage.getItem('first_name'),
      AsyncStorage.getItem('last_name'),
      AsyncStorage.getItem('mobile_number'),
      AsyncStorage.getItem('email'),
    ]);

    return !!(firstName && lastName && phone && email);
  };

  return (
    <View className="flex-1 bg-[#f2f6f7]">
      <ScrollView
        className="flex-1  "
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {/* header section  */}
        <View className="ml-[14px] mr-[12px] mt-[7px] mb-[3px] flex-row items-center justify-between">
          {/* drawer open  user name */}
          <View className=" flex-row gap-[18px] items-center">
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={images.drawerIcon}
                className=" w-[23px] h-[23px]"
                // style={{tintColor: '#d75880'}}
              />
            </TouchableOpacity>
            <Text className="text-[25px] font-Nunito-Bold text-[#1C222F]">
              Hi,
              <Text className="font-Nunito-Bold text-[#1C222F]">
                {isProfileComplete ? ` ${firstName}` : ' Pet Parent'}
              </Text>
              <Text className="w-[20px]">!</Text>
            </Text>
          </View>

          {/* location , support and notification  */}

          <View className=" flex-row gap-[25px]">
            <Image
              source={images.contactusIcon}
              className=" w-[27px] h-[31px]"
              resizeMode="contain"
              // style={{tintColor: '#d75880'}}
            />
            <Image
              source={images.notificationIcon}
              className=" w-[31px] h-[31px]"
              resizeMode="contain"
              // style={{tintColor: '#d75880'}}
            />
          </View>
        </View>

        {/* intro section  */}
        <View className="flex flex-row items-center">
          <FlatList
            data={primaryServices}
            keyExtractor={item => item.UUID}
            renderItem={renderItem}
            contentContainerStyle={{paddingVertical: 10}}
            scrollEnabled={false}
          />
        </View>

        <View className="px-2 flex-row justify-center items-center gap-2 mb-6">
          {filteredConsultations.map(consultation => (
            // <TouchableOpacity
            //   key={consultation.UUID}
            //   className="bg-primary h-16 px-3 rounded-full flex-row items-center justify-center"
            //   style={{minWidth: screenWidth / 2.2}}

            //   onPress={async () => {
            //     console.log('Selected UUID:', consultation.UUID);

            //     await AsyncStorage.setItem(
            //       'selected_consultation_uuid',
            //       consultation.UUID,
            //     );

            //     const name = consultation.Consultaytion_Name?.toLowerCase();

            //     // Get stored pet data
            //     const storedPet = await AsyncStorage.getItem('last_added_pet');
            //     const petExists = !!storedPet;

            //     const serviceGroupUUID =
            //       serviceGroups.find(x => x.DisplayAsPrimary)?.UUID || '';
            //     const consultationTypeUUID = name.includes('tele')
            //       ? consultationTypes.find(x => !x.IsServiceBased)?.UUID || ''
            //       : consultationTypes.find(x => x.IsServiceBased)?.UUID || '';

            //     const addressData = await AsyncStorage.getItem(
            //       'saved_user_address',
            //     );
            //     const isAddressComplete = !!addressData;

            //     if (name.includes('home')) {
            //       if (petExists) {
            //         const [firstName, lastName, phone, email] =
            //           await Promise.all([
            //             AsyncStorage.getItem('first_name'),
            //             AsyncStorage.getItem('last_name'),
            //             AsyncStorage.getItem('mobile_number'),
            //             AsyncStorage.getItem('email'),
            //           ]);

            //         const isParentDetailsComplete =
            //           firstName && lastName && phone && email;

            //         if (isParentDetailsComplete) {
            //           if (isAddressComplete) {
            //             // If address is complete, navigate to ServiceSelection screen
            //             navigation.navigate(screens.ServiceSelection);
            //           } else {
            //             // If address is not complete, navigate to AddYourAddress screen
            //             navigation.navigate(screens.AddYourAddress, {
            //               isTeleConsult: false,
            //             });
            //           }
            //           // navigation.navigate(screens.AddYourAddress, {
            //           //   isTeleConsult: false,
            //           // });
            //         } else {
            //           navigation.navigate(screens.ParentDetails, {
            //             isHomeVisit: true,
            //           });
            //         }
            //       } else {
            //         navigation.navigate(screens.AddYourPetHomeVisit, {
            //           serviceGroupUUID,
            //           consultationTypeUUID,
            //         });
            //       }
            //     }

            //     else if (name.includes('tele')) {
            //       try {
            //         const petData = await AsyncStorage.getItem(
            //           'last_added_pet',
            //         );
            //         const parsedPetData = petData ? JSON.parse(petData) : null;
            //         const petsArray = parsedPetData?.pets;

            //         const parentDetails = await AsyncStorage.getItem(
            //           'parentDetails',
            //         );
            //         const hasParentDetails = Boolean(parentDetails);

            //         const serviceGroupUUID =
            //           serviceGroups.find(x => x.DisplayAsPrimary)?.UUID || '';
            //         const consultationTypeUUID =
            //           consultationTypes.find(x => !x.IsServiceBased)?.UUID ||
            //           '';

            //         if (Array.isArray(petsArray) && petsArray.length > 0) {
            //           if (hasParentDetails) {
            //             // ✅ Skip ParentDetailsTele if data exists
            //             navigation.navigate(screens.SelectVaterinarian, {
            //               isTeleConsult: true,
            //               headerTitle: 'Tele Consultation',
            //               serviceGroupUUID,
            //               consultationTypeUUID,
            //             });
            //           } else {
            //             // 🔁 Show ParentDetailsTele if parent data missing
            //             navigation.navigate(screens.ParentDetailsTele, {
            //               isHomeVisit: false,
            //               headerTitle: 'Tele Consultation',
            //               serviceGroupUUID,
            //               consultationTypeUUID,
            //             });
            //           }
            //         } else {
            //           // Navigate to AddYourPet if pets array is missing or empty
            //           navigation.navigate(screens.AddYourPet, {
            //             headerTitle: 'Tele Consultation',
            //             serviceGroupUUID,
            //             consultationTypeUUID,
            //           });
            //         }
            //       } catch (error) {
            //         console.error('Error checking pet or parent data:', error);
            //         navigation.navigate(screens.AddYourPet, {
            //           headerTitle: 'Tele Consultation',
            //           serviceGroupUUID:
            //             serviceGroups.find(x => x.DisplayAsPrimary)?.UUID || '',
            //           consultationTypeUUID:
            //             consultationTypes.find(x => !x.IsServiceBased)?.UUID ||
            //             '',
            //         });
            //       }
            //     } else {
            //       console.warn('Unhandled consultation type:', name);
            //     }
            //   }}>
            // <TouchableOpacity
            //   key={consultation.UUID}
            //   className="bg-primary h-16 px-3 rounded-full flex-row items-center justify-center"
            //   style={{minWidth: screenWidth / 2.2}}
            //   onPress={async () => {
            //     console.log('Selected UUID:', consultation.UUID);

            //     await AsyncStorage.setItem(
            //       'selected_consultation_uuid',
            //       consultation.UUID,
            //     );

            //     const name = consultation.Consultaytion_Name?.toLowerCase();

            //     // Get stored pet and address data
            //     const storedPet = await AsyncStorage.getItem('last_added_pet');
            //     const petExists = !!storedPet;
            //     const addressData = await AsyncStorage.getItem(
            //       'saved_user_address',
            //     );
            //     const isAddressComplete = !!addressData;

            //     // Get Parent Details (Common for both home and tele consultations)
            //     const [firstName, lastName, phone, email] = await Promise.all([
            //       AsyncStorage.getItem('first_name'),
            //       AsyncStorage.getItem('last_name'),
            //       AsyncStorage.getItem('mobile_number'),
            //       AsyncStorage.getItem('email'),
            //     ]);

            //     const isParentDetailsComplete =
            //       firstName && lastName && phone && email;

            //     // Determine the service UUIDs
            //     const serviceGroupUUID =
            //       serviceGroups.find(x => x.DisplayAsPrimary)?.UUID || '';
            //     const consultationTypeUUID = name.includes('tele')
            //       ? consultationTypes.find(x => !x.IsServiceBased)?.UUID || ''
            //       : consultationTypes.find(x => x.IsServiceBased)?.UUID || '';

            //     if (name.includes('home')) {
            //       if (petExists) {
            //         if (isParentDetailsComplete) {
            //           if (isAddressComplete) {
            //             // Navigate to ServiceSelection if address is complete
            //             navigation.navigate(screens.ServiceSelection);
            //           } else {
            //             // Navigate to AddYourAddress if address is not complete
            //             navigation.navigate(screens.AddYourAddress, {
            //               isTeleConsult: false,
            //             });
            //           }
            //         } else {
            //           // If parent details are not complete, navigate to ParentDetails screen
            //           navigation.navigate(screens.ParentDetails, {
            //             isHomeVisit: true,
            //           });
            //         }
            //       } else {
            //         // Navigate to AddYourPetHomeVisit if no pet exists
            //         navigation.navigate(screens.AddYourPetHomeVisit, {
            //           serviceGroupUUID,
            //           consultationTypeUUID,
            //         });
            //       }
            //     } else if (name.includes('tele')) {
            //       try {
            //         const petData = await AsyncStorage.getItem(
            //           'last_added_pet',
            //         );
            //         const parsedPetData = petData ? JSON.parse(petData) : null;
            //         const petsArray = parsedPetData?.pets;

            //         const parentDetails = await AsyncStorage.getItem(
            //           'parentDetails',
            //         );
            //         const hasParentDetails = Boolean(parentDetails);

            //         if (Array.isArray(petsArray) && petsArray.length > 0) {
            //           if (hasParentDetails) {
            //             // If parent details exist, navigate to SelectVaterinarian
            //             navigation.navigate(screens.SelectVaterinarian, {
            //               isTeleConsult: true,
            //               headerTitle: 'Tele Consultation',
            //               serviceGroupUUID,
            //               consultationTypeUUID,
            //             });
            //           } else {
            //             // If parent details do not exist, navigate to ParentDetailsTele
            //             navigation.navigate(screens.ParentDetailsTele, {
            //               isHomeVisit: false,
            //               headerTitle: 'Tele Consultation',
            //               serviceGroupUUID,
            //               consultationTypeUUID,
            //             });
            //           }
            //         } else {
            //           // If no pets, navigate to AddYourPet screen
            //           navigation.navigate(screens.AddYourPet, {
            //             headerTitle: 'Tele Consultation',
            //             serviceGroupUUID,
            //             consultationTypeUUID,
            //           });
            //         }
            //       } catch (error) {
            //         console.error('Error checking pet or parent data:', error);
            //         navigation.navigate(screens.AddYourPet, {
            //           headerTitle: 'Tele Consultation',
            //           serviceGroupUUID:
            //             serviceGroups.find(x => x.DisplayAsPrimary)?.UUID || '',
            //           consultationTypeUUID:
            //             consultationTypes.find(x => !x.IsServiceBased)?.UUID ||
            //             '',
            //         });
            //       }
            //     } else {
            //       console.warn('Unhandled consultation type:', name);
            //     }
            //   }}>

            // <TouchableOpacity
            //   key={consultation.UUID}
            //   className="bg-primary h-16 px-3 rounded-full flex-row items-center justify-center"
            //   style={{minWidth: screenWidth / 2.2}}
            //   onPress={async () => {
            //     console.log('Selected UUID:', consultation.UUID);

            //     await AsyncStorage.setItem(
            //       'selected_consultation_uuid',
            //       consultation.UUID,
            //     );

            //     const name = consultation.Consultaytion_Name?.toLowerCase();

            //     // Get stored pet and address data
            //     const storedPet = await AsyncStorage.getItem('last_added_pet');
            //     const petExists = !!storedPet;
            //     const addressData = await AsyncStorage.getItem(
            //       'saved_user_address',
            //     );
            //     const isAddressComplete = !!addressData;

            //     // Get Parent Details (Common for both home and tele consultations)
            //     const [firstName, lastName, phone, email] = await Promise.all([
            //       AsyncStorage.getItem('first_name'),
            //       AsyncStorage.getItem('last_name'),
            //       AsyncStorage.getItem('mobile_number'),
            //       AsyncStorage.getItem('email'),
            //     ]);

            //     const isParentDetailsComplete =
            //       firstName && lastName && phone && email;

            //     // Determine the service UUIDs
            //     const serviceGroupUUID =
            //       serviceGroups.find(x => x.DisplayAsPrimary)?.UUID || '';
            //     const consultationTypeUUID = name.includes('tele')
            //       ? consultationTypes.find(x => !x.IsServiceBased)?.UUID || ''
            //       : consultationTypes.find(x => x.IsServiceBased)?.UUID || '';

            //     if (name.includes('home')) {
            //       if (petExists) {
            //         if (isParentDetailsComplete) {
            //           if (isAddressComplete) {
            //             // Navigate to ServiceSelection if address is complete
            //             navigation.navigate(screens.ServiceSelection);
            //           } else {
            //             // Navigate to AddYourAddress if address is not complete
            //             navigation.navigate(screens.AddYourAddress, {
            //               isTeleConsult: false,
            //             });
            //           }
            //         } else {
            //           // If parent details are not complete, navigate to ParentDetails screen
            //           navigation.navigate(screens.ParentDetails, {
            //             isHomeVisit: true,
            //           });
            //         }
            //       } else {
            //         // Navigate to AddYourPetHomeVisit if no pet exists
            //         navigation.navigate(screens.AddYourPetHomeVisit, {
            //           serviceGroupUUID,
            //           consultationTypeUUID,
            //         });
            //       }
            //     } else if (name.includes('tele')) {
            //       try {
            //         const petData = await AsyncStorage.getItem(
            //           'last_added_pet',
            //         );
            //         const parsedPetData = petData ? JSON.parse(petData) : null;
            //         const petsArray = parsedPetData?.pets;

            //         const parentDetails = await AsyncStorage.getItem(
            //           'parentDetails',
            //         );
            //         const hasParentDetails = Boolean(parentDetails);

            //         if (Array.isArray(petsArray) && petsArray.length > 0) {
            //           if (hasParentDetails) {
            //             // If parent details exist, navigate to SelectVaterinarian
            //             navigation.navigate(screens.SelectVaterinarian, {
            //               isTeleConsult: true,
            //               headerTitle: 'Tele Consultation',
            //               serviceGroupUUID,
            //               consultationTypeUUID,
            //             });
            //           } else {
            //             // If parent details do not exist, navigate to ParentDetailsTele
            //             navigation.navigate(screens.ParentDetailsTele, {
            //               isHomeVisit: false,
            //               isTeleConsult: true,
            //               headerTitle: 'Tele Consultation',
            //               serviceGroupUUID,
            //               consultationTypeUUID,
            //             });
            //           }
            //         } else {
            //           // If no pets, navigate to AddYourPet screen
            //           navigation.navigate(screens.AddYourPet, {
            //             headerTitle: 'Tele Consultation',
            //             serviceGroupUUID,
            //             consultationTypeUUID,
            //           });
            //         }
            //       } catch (error) {
            //         console.error('Error checking pet or parent data:', error);
            //         navigation.navigate(screens.AddYourPet, {
            //           headerTitle: 'Tele Consultation',
            //           serviceGroupUUID:
            //             serviceGroups.find(x => x.DisplayAsPrimary)?.UUID || '',
            //           consultationTypeUUID:
            //             consultationTypes.find(x => !x.IsServiceBased)?.UUID ||
            //             '',
            //         });
            //       }
            //     } else {
            //       console.warn('Unhandled consultation type:', name);
            //     }
            //   }}>
            <TouchableOpacity
              key={consultation.UUID}
              className="bg-primary h-16 px-3 rounded-full flex-row items-center justify-center"
              style={{minWidth: screenWidth / 2.2}}
              onPress={async () => {
                console.log('Selected UUID:', consultation.UUID);

                await AsyncStorage.setItem(
                  'selected_consultation_uuid',
                  consultation.UUID,
                );

                const name = consultation.Consultaytion_Name?.toLowerCase();

                // Get stored pet and address data
                const storedPet = await AsyncStorage.getItem('last_added_pet');
                const storedPetTele = await AsyncStorage.getItem(
                  'last_added_pet_tele',
                );
                const storedPetGroomering = await AsyncStorage.getItem(
                  'last_added_pet_groomer',
                );
                const petExists =
                  !!storedPet || !!storedPetTele || !!storedPetGroomering;
                const addressData = await AsyncStorage.getItem(
                  'saved_user_address',
                );
                const isAddressComplete = !!addressData;

                // Check if parent details are complete
                const isParentDetailsComplete =
                  await checkIsParentDetailsComplete();

                // Determine the service UUIDs
                const serviceGroupUUID =
                  serviceGroups.find(x => x.DisplayAsPrimary)?.UUID || '';
                const consultationTypeUUID = name.includes('tele')
                  ? consultationTypes.find(x => !x.IsServiceBased)?.UUID || ''
                  : consultationTypes.find(x => x.IsServiceBased)?.UUID || '';

                if (name.includes('home')) {
                  if (petExists) {
                    if (isParentDetailsComplete) {
                      if (isAddressComplete) {
                        navigation.navigate(screens.ServiceSelection);
                      } else {
                        navigation.navigate(screens.AddYourAddress, {
                          isTeleConsult: false,
                        });
                      }
                    } else {
                      navigation.navigate(screens.ParentDetails, {
                        isHomeVisit: true,
                      });
                    }
                  } else {
                    navigation.navigate(screens.AddYourPetHomeVisit, {
                      serviceGroupUUID,
                      consultationTypeUUID,
                    });
                  }
                } else if (name.includes('tele')) {
                  try {
                    const storedPet = await AsyncStorage.getItem(
                      'last_added_pet',
                    );
                    const storedPetTele = await AsyncStorage.getItem(
                      'last_added_pet_tele',
                    );
                    const storedPetGroomer = await AsyncStorage.getItem(
                      'last_added_pet_groomer',
                    );

                    const parsedPet = storedPet ? JSON.parse(storedPet) : null;
                    const parsedPetTele = storedPetTele
                      ? JSON.parse(storedPetTele)
                      : null;
                    const parsedPetGroomer = storedPetGroomer
                      ? JSON.parse(storedPetGroomer)
                      : null;

                    const petsArray = parsedPet?.pets || [];
                    const petsArrayTele = parsedPetTele?.pets || [];
                    const petsArrayGroomer = parsedPetGroomer?.pets || [];

                    const petExists =
                      (Array.isArray(petsArray) && petsArray.length > 0) ||
                      (Array.isArray(petsArrayTele) &&
                        petsArrayTele.length > 0) ||
                      (Array.isArray(petsArrayGroomer) &&
                        petsArrayGroomer.length > 0);

                    const hasParentDetails =
                      await checkIsParentDetailsComplete();

                    if (petExists) {
                      if (hasParentDetails) {
                        navigation.navigate(screens.SelectVaterinarian, {
                          isTeleConsult: true,
                          headerTitle: 'Tele Consultation',
                          serviceGroupUUID,
                          consultationTypeUUID,
                        });
                      } else {
                        navigation.navigate(screens.ParentDetailsTele, {
                          isHomeVisit: false,
                          isTeleConsult: true,
                          headerTitle: 'Tele Consultation',
                          serviceGroupUUID,
                          consultationTypeUUID,
                        });
                      }
                    } else {
                      navigation.navigate(screens.AddYourPet, {
                        headerTitle: 'Tele Consultation',
                        serviceGroupUUID,
                        consultationTypeUUID,
                      });
                    }
                  } catch (error) {
                    console.error('Error checking pet or parent data:', error);
                    navigation.navigate(screens.AddYourPet, {
                      headerTitle: 'Tele Consultation',
                      serviceGroupUUID,
                      consultationTypeUUID,
                    });
                  }
                }
                // else if (name.includes('tele')) {
                //   try {
                //     const storedPet = await AsyncStorage.getItem(
                //       'last_added_pet',
                //     );
                //     const storedPetTele = await AsyncStorage.getItem(
                //       'last_added_pet_tele',
                //     );
                //     const storedPetGroomering = await AsyncStorage.getItem(
                //       'last_added_pet_groomer',
                //     );
                //     const parsedPet = storedPet ? JSON.parse(storedPet) : null;
                //     const parsedPetTele = storedPetTele
                //       ? JSON.parse(storedPetTele)
                //       : null;

                //     const petsArray = parsedPet?.pets || [];
                //     const petsArrayTele = parsedPetTele?.pets || [];

                //     const petExists =
                //       (Array.isArray(petsArray) && petsArray.length > 0) ||
                //       (Array.isArray(petsArrayTele) &&
                //         petsArrayTele.length > 0);

                //     const hasParentDetails =
                //       await checkIsParentDetailsComplete();

                //     if (petExists) {
                //       if (hasParentDetails) {
                //         navigation.navigate(screens.SelectVaterinarian, {
                //           isTeleConsult: true,
                //           headerTitle: 'Tele Consultation',
                //           serviceGroupUUID,
                //           consultationTypeUUID,
                //         });
                //       } else {
                //         navigation.navigate(screens.ParentDetailsTele, {
                //           isHomeVisit: false,
                //           isTeleConsult: true,
                //           headerTitle: 'Tele Consultation',
                //           serviceGroupUUID,
                //           consultationTypeUUID,
                //         });
                //       }
                //     } else {
                //       navigation.navigate(screens.AddYourPet, {
                //         headerTitle: 'Tele Consultation',
                //         serviceGroupUUID,
                //         consultationTypeUUID,
                //       });
                //     }
                //   } catch (error) {
                //     console.error('Error checking pet or parent data:', error);
                //     navigation.navigate(screens.AddYourPet, {
                //       headerTitle: 'Tele Consultation',
                //       serviceGroupUUID,
                //       consultationTypeUUID,
                //     });
                //   }
                // }

                // else if (name.includes('tele')) {
                //   try {
                //     const petData = await AsyncStorage.getItem(
                //       'last_added_pet',
                //     );
                //     const parsedPetData = petData ? JSON.parse(petData) : null;
                //     const petsArray = parsedPetData?.pets;

                //     const hasParentDetails =
                //       await checkIsParentDetailsComplete();

                //     if (Array.isArray(petsArray) && petsArray.length > 0) {
                //       if (hasParentDetails) {
                //         navigation.navigate(screens.SelectVaterinarian, {
                //           isTeleConsult: true,
                //           headerTitle: 'Tele Consultation',
                //           serviceGroupUUID,
                //           consultationTypeUUID,
                //         });
                //       } else {
                //         navigation.navigate(screens.ParentDetailsTele, {
                //           isHomeVisit: false,
                //           isTeleConsult: true,
                //           headerTitle: 'Tele Consultation',
                //           serviceGroupUUID,
                //           consultationTypeUUID,
                //         });
                //       }
                //     } else {
                //       navigation.navigate(screens.AddYourPet, {
                //         headerTitle: 'Tele Consultation',
                //         serviceGroupUUID,
                //         consultationTypeUUID,
                //       });
                //     }
                //   } catch (error) {
                //     console.error('Error checking pet or parent data:', error);
                //     navigation.navigate(screens.AddYourPet, {
                //       headerTitle: 'Tele Consultation',
                //       serviceGroupUUID,
                //       consultationTypeUUID,
                //     });
                //   }
                // }
                else {
                  console.warn('Unhandled consultation type:', name);
                }
              }}>
              <Image
                source={{
                  uri: `https://democms.zumigo.pet${consultation.Icon ?? ''}`,
                }}
                className="w-7 h-[23px] mr-2"
                resizeMode="contain"
              />
              <Text
                className="text-base font-Nunito-Bold text-white text-center"
                numberOfLines={1}
                ellipsizeMode="tail">
                {consultation.Consultaytion_Name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: -6},
              shadowOpacity: 0.15,
              shadowRadius: 50,
              elevation: 5,
            }}>
            <View
              className="rounded-t-[20px] bg-white overflow-hidden"
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 0, height: -4}, // upward shadow
                shadowOpacity: 0.1,
                shadowRadius: 20,
                elevation: 10, // Android
              }}>
              <Text className="text-[24px] font-Nunito-Bold px-6 mt-[20px]">
                Pet Services
              </Text>
              <View className="flex-row items-center px-4 gap-2 justify-between flex-wrap mt-[20px]">
                {serviceGroups
                  .filter(item => !item.DisplayAsPrimary)
                  .map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      className="items-center gap-1.5"
                      style={{width: width * 0.28}}
                      onPress={async () => {
                        console.log('Selected GroupName:', item.GroupName);

                        switch (item.GroupName) {
                          //   case 'Grooming':
                          //     navigation.navigate(screens.AddYourPetGrooming, {
                          //       groupName: item.GroupName,
                          //     });
                          //     break;
                          // case 'Grooming':
                          //   try {
                          //     const storedPet = await AsyncStorage.getItem(
                          //       'last_added_pet',
                          //     );
                          //     const storedPetTele = await AsyncStorage.getItem(
                          //       'last_added_pet_tele',
                          //     );
                          //     const storedPetGroomering =
                          //       await AsyncStorage.getItem(
                          //         'last_added_pet_groomer',
                          //       );

                          //     const petExists =
                          //       !!storedPet ||
                          //       !!storedPetTele ||
                          //       !!storedPetGroomering;

                          //     const isParentDetailsComplete =
                          //       await checkIsParentDetailsComplete();

                          //     const serviceGroupUUID = item.UUID; // Assuming Group object has UUID
                          //     const consultationTypeUUID =
                          //       consultationTypes.find(x => x.IsServiceBased)
                          //         ?.UUID || '';

                          //     if (petExists) {
                          //       if (isParentDetailsComplete) {
                          //         navigation.navigate(
                          //           screens.ChooseGroomingService,
                          //           {
                          //             isGrooming: true,
                          //             groupName: item.GroupName,
                          //             serviceGroupUUID,
                          //             consultationTypeUUID,
                          //           },
                          //         );
                          //       } else {
                          //         navigation.navigate(
                          //           screens.ParentDetailsGroomer,
                          //           {
                          //             isGrooming: true,
                          //             groupName: item.GroupName,
                          //           },
                          //         );
                          //       }
                          //     } else {
                          //       navigation.navigate(
                          //         screens.AddYourPetGrooming,
                          //         {
                          //           isGrooming: true,
                          //           headerTitle: 'Grooming',
                          //           groupName: item.GroupName,
                          //           serviceGroupUUID,
                          //           consultationTypeUUID,
                          //         },
                          //       );
                          //     }
                          //   } catch (error) {
                          //     console.error(
                          //       'Error checking grooming prerequisites:',
                          //       error,
                          //     );
                          //     navigation.navigate(screens.AddYourPetGrooming, {
                          //       isGrooming: true,
                          //       headerTitle: 'Grooming',
                          //       groupName: item.GroupName,
                          //     });
                          //   }
                          //   break;
                          case 'Grooming':
                            try {
                              // Step 1: Check if any pet exists
                              const storedPet = await AsyncStorage.getItem(
                                'last_added_pet',
                              );
                              const storedPetTele = await AsyncStorage.getItem(
                                'last_added_pet_tele',
                              );
                              const storedPetGrooming =
                                await AsyncStorage.getItem(
                                  'last_added_pet_groomer',
                                );

                              const petExists =
                                !!storedPet ||
                                !!storedPetTele ||
                                !!storedPetGrooming;

                              const serviceGroupUUID = item.UUID;
                              const consultationTypeUUID =
                                consultationTypes.find(x => x.IsServiceBased)
                                  ?.UUID || '';

                              if (!petExists) {
                                // No pet found → go to AddYourPetGrooming
                                navigation.navigate(
                                  screens.AddYourPetGrooming,
                                  {
                                    isGrooming: true,
                                    headerTitle: 'Grooming',
                                    groupName: item.GroupName,
                                    serviceGroupUUID,
                                    consultationTypeUUID,
                                  },
                                );
                                break;
                              }

                              // Step 2: Check if parent details are complete
                              const isParentDetailsComplete =
                                await checkIsParentDetailsComplete();

                              if (!isParentDetailsComplete) {
                                // Parent details not found → go to ParentDetailsGroomer
                                navigation.navigate(
                                  screens.ParentDetailsGroomer,
                                  {
                                    isGrooming: true,
                                    groupName: item.GroupName,
                                  },
                                );
                                break;
                              }

                              // Step 3: Check if address exists
                              const addressData = await AsyncStorage.getItem(
                                'saved_user_address',
                              );
                              const isAddressComplete = !!addressData;

                              if (!isAddressComplete) {
                                // Address not found → go to AddYourAddressGroomer
                                navigation.navigate(screens.GroomerAddAddress, {
                                  isGrooming: true,
                                  groupName: item.GroupName,
                                });
                                break;
                              }

                              // All details available → go to ChooseGroomingService
                              navigation.navigate(
                                screens.ChooseGroomingService,
                                {
                                  isGrooming: true,
                                  groupName: item.GroupName,
                                  serviceGroupUUID,
                                  consultationTypeUUID,
                                },
                              );
                            } catch (error) {
                              console.error(
                                'Error checking grooming prerequisites:',
                                error,
                              );
                              navigation.navigate(screens.AddYourPetGrooming, {
                                isGrooming: true,
                                headerTitle: 'Grooming',
                                groupName: item.GroupName,
                              });
                            }
                            break;

                          case 'Food':
                            navigation.navigate('FoodScreen', {
                              groupName: item.GroupName,
                            });
                            break;
                          case 'Radiology':
                            navigation.navigate('RadiologyScreen', {
                              groupName: item.GroupName,
                            });
                            break;
                          default:
                            console.warn('Unknown GroupName:', item.GroupName);
                            break;
                        }
                      }}>
                      <View
                        style={{
                          width: width * 0.28,
                          borderRadius: 50,
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.08,
                          shadowRadius: 6,
                          elevation: 4, // for Android shadow
                          backgroundColor: '#fff', // required on iOS for shadows
                        }}>
                        <View
                          style={{
                            width: width * 0.28,
                            height: width * 0.28,
                            borderRadius: 20,
                            overflow: 'hidden',
                            backgroundColor: '#f2f6f7',
                          }}>
                          <Image
                            source={{
                              uri: `https://democms.zumigo.pet${item.Picture}`,
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                              resizeMode: 'cover',
                            }}
                          />
                        </View>
                      </View>

                      {/* Group Name */}
                      <Text
                        className="text-[14px] text-center font-Nunito-Regular"
                        style={{fontSize: getFontSize(16)}}>
                        {item.GroupName}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>

              <View className=" mt-[10px] mb-[18px]">
                <CTACarousel data={[1, 2, 3]} />
              </View>

              {/* white  background  */}

              {/* Top Specialist  */}

              <View className=" px-4 mb-[12px]">
                <Text className=" mt-[9px] font-Proxima-Nova-Bold text-[24px] leading-[48px]">
                  Top Specialists
                </Text>
                {/* Category Tabs */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-3">
                  {categories.map(category => (
                    <TouchableOpacity
                      key={category.id}
                      className={`px-4 py-2 mr-2 rounded-full border flex-row items-center gap-[6.5px] ${
                        selectedCategory == category.id
                          ? 'bg-primary border-primary'
                          : 'bg-pastelGrey border-pastelgreyBorder'
                      }`}
                      onPress={() => setSelectedCategory(category.id)}>
                      <View
                        className={` h-[30px] w-[30px] rounded-full justify-center items-center  ${
                          selectedCategory == category.id
                            ? 'bg-[#ffffff1A]'
                            : 'bg-pastelPrimary'
                        }`}>
                        <Image
                          source={category.icon}
                          className=" w-[20px] h-[20px]"
                          resizeMode="contain"
                          style={{
                            tintColor:
                              selectedCategory == category.id
                                ? '#ffffff'
                                : '#d75880',
                          }}
                        />
                      </View>
                      <Text
                        className={`font-Nunito-Bold text-[] ${
                          selectedCategory == category.id
                            ? 'text-white'
                            : 'text-gray-500'
                        }`}
                        style={{fontSize: getFontSize(15)}}>
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View className=" mt-[9px]">
                  {doctors.map(doctor => (
                    <TopSpecialistsCard key={doctor.id} doctor={doctor} />
                  ))}
                </View>
              </View>

              {/* how it work  */}
              <Text className=" px-4 font-Proxima-Nova-Bold text-[20px] leading-6 text-[#4E4E4E] mb-[18px]">
                How it Works?
              </Text>
              <View className="mx-2  mb-[15px]  rounded-2xl">
                <HowItworkCarousel data={advOneData} aspectRatio={238 / 213} />
              </View>

              <View className=" mb-6 pb-36">
                <ImageCarousel data={advTwoData} aspectRatio={403 / 213} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5, // Shadow at bottom
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // Android shadow
    backgroundColor: '#fff', // Required for shadow to be visible
  },
});
