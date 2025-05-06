// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';

// import FooterBtn from '../../../components/shared/FooterBtn';
// import CustomTextInput from '../../../components/shared/CustomTextInput';
// import screens from '../../../constants/screens';
// import images from '../../../assets/images';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API_BASE_URL, UPDATE_USER} from '@env';

// const ParentDetailsTele = ({navigation, route}) => {
//   const isHomeVisit = route?.params?.isHomeVisit;

//   const [authToken, setAuthToken] = useState(null);
//   const [userUuid, setUserUuid] = useState(null);
//   const [userTypeUuid, setUserTypeUuid] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('auth_token');
//         const uuid = await AsyncStorage.getItem('userUUID');
//         const userType = await AsyncStorage.getItem('user_type_uuid');
//         const mobileNumber = await AsyncStorage.getItem('mobile_number');

//         if (token) setAuthToken(token);
//         if (uuid) setUserUuid(uuid);
//         if (userType) setUserTypeUuid(userType);

//         if (mobileNumber) {
//           setForm(prev => ({...prev, phone: mobileNumber}));
//           console.log('Loaded mobile number:', mobileNumber);
//         }

//         console.log('auth_token:', token);
//         console.log('userUUID:', uuid);
//         console.log('user_type_uuid:', userType);
//       } catch (error) {
//         console.error('Error fetching data from storage:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (isHomeVisit) {
//       navigation.setOptions({title: 'Home Visit'});
//     }
//   }, []);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   useEffect(() => {
//     if (isHomeVisit) {
//       navigation.setOptions({title: 'Home Visit'});
//     }

//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => setKeyboardVisible(true),
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => setKeyboardVisible(false),
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//   });

//   const handleChange = (name, value) => {
//     setForm({...form, [name]: value});
//   };

//   const handleSubmit = async () => {
//     if (!authToken || !userUuid || !userTypeUuid) {
//       console.warn('Missing required authentication or UUID data');
//       return;
//     }

//     const payload = {
//       UUID: userUuid,
//       UserTypeUUID: userTypeUuid,
//       FName: form.firstName,
//       LName: form.lastName,
//       Email: form.email,
//       Mobile: form.phone,
//       IsDefault: true,
//       Is_Display: true,
//       IsActive: true,
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}${UPDATE_USER}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${authToken}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log('User updated:', data);

//         // 📝 Save first name to AsyncStorage
//         await AsyncStorage.setItem('first_name', form.firstName);
//         console.log('First name saved to AsyncStorage:', form.firstName);
//         await AsyncStorage.setItem('is_profile_complete', 'true');

//         navigation.navigate(screens.SelectVeterinarian, {
//           isTeleConsult: !Boolean(isHomeVisit),
//         });
//       } else {
//         console.error('Failed to update user:', data);
//       }
//     } catch (error) {
//       console.error('Error posting data:', error);
//     }
//   };
//   return (
//     <KeyboardAvoidingView
//       className="flex-1 bg-white "
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       <View className="flex-1 bg-white px-6">
//         <ScrollView keyboardShouldPersistTaps="handled">
//           <Text className="mb-[15px] text-[26px] font-Nunito-Bold">
//             Parent details
//           </Text>

//           <CustomTextInput
//             value={form.firstName}
//             placeholder="First name*"
//             onChangeText={text => handleChange('firstName', text)}
//           />

//           <CustomTextInput
//             placeholder="Last name*"
//             value={form.lastName}
//             onChangeText={text => handleChange('lastName', text)}
//           />

//           <CustomTextInput
//             value={form.phone}
//             placeholder="Mobile No.*"
//             onChangeText={text => handleChange('phone', text)}
//           />

//           <CustomTextInput
//             placeholder="Email*"
//             keyboardType="email-address"
//             value={form.email}
//             onChangeText={text => handleChange('email', text)}
//           />
//         </ScrollView>

//         {!isKeyboardVisible && (
//           <>
//             <View className="absolute bottom-20 left-0 right-0 items-center pb-4">
//               <Image
//                 source={images.parentaddressIcon}
//                 className="w-[357px] h-[228px]"
//               />
//             </View>
//             <FooterBtn title="Continue" onClick={handleSubmit} />
//           </>
//         )}
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default ParentDetailsTele;
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import FooterBtn from '../../../components/shared/FooterBtn';
import CustomTextInput from '../../../components/shared/CustomTextInput';
import screens from '../../../constants/screens';
import images from '../../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL, UPDATE_USER} from '@env';
import Toast from 'react-native-toast-message';

const ParentDetailsTele = ({navigation, route}) => {
  const isHomeVisit = route?.params?.isHomeVisit;
  const [serviceGroups, setServiceGroups] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const [userUuid, setUserUuid] = useState(null);
  const [userTypeUuid, setUserTypeUuid] = useState(null);
  const [primaryServices, setPrimaryServices] = useState([]);
  const [applicableCTUUIDs, setApplicableCTUUIDs] = useState([]);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [consultationTypes, setConsultationTypes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const uuid = await AsyncStorage.getItem('userUUID');
        const userType = await AsyncStorage.getItem('user_type_uuid');
        const mobileNumber = await AsyncStorage.getItem('mobile_number');

        if (token) setAuthToken(token);
        if (uuid) setUserUuid(uuid);
        if (userType) setUserTypeUuid(userType);

        if (mobileNumber) {
          setForm(prev => ({...prev, phone: mobileNumber}));
          console.log('Loaded mobile number:', mobileNumber);
        }

        console.log('auth_token:', token);
        console.log('userUUID:', uuid);
        console.log('user_type_uuid:', userType);
      } catch (error) {
        console.error('Error fetching data from storage:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isHomeVisit) {
      navigation.setOptions({title: 'Home Visit'});
    }
  }, []);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    if (isHomeVisit) {
      navigation.setOptions({title: 'Home Visit'});
    }

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
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

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };
  const handleSubmit = async () => {
    if (!authToken || !userUuid || !userTypeUuid) {
      console.warn('Missing required authentication or UUID data');
      return;
    }

    const {firstName, lastName, phone, email} = form;

    // ✅ Check if any field is empty
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !email.trim()
    ) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Details',
        text2: 'Please fill all the details',
      });
      return;
    }

    // ✅ Validate that email contains both "@" and ".com"
    if (!(email.includes('@') && email.includes('.com'))) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email',
      });
      return;
    }

    const payload = {
      UUID: userUuid,
      UserTypeUUID: userTypeUuid,
      FName: firstName,
      LName: lastName,
      Email: email.trim(),
      Mobile: phone,
      IsDefault: true,
      Is_Display: true,
      IsActive: true,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${UPDATE_USER}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User updated:', data);
        // await AsyncStorage.setItem('first_name', firstName);
        // await AsyncStorage.setItem('is_profile_complete', 'true');
        await AsyncStorage.multiSet([
          ['first_name', firstName],
          ['last_name', lastName],
          ['email', email],
          ['mobile_number', phone],
          ['is_profile_complete', 'true'],
        ]);
        await AsyncStorage.setItem('parentDetails', JSON.stringify(payload));
        navigation.navigate(screens.SelectVaterinarian, {
          isTeleConsult: !Boolean(isHomeVisit),
          headerTitle: 'Tele Consultation',
          serviceGroupUUID: '3f930321-a4c7-4768-a018-c95278c0',
          consultationTypeUUID: '720dac47-9101-45c3-b0e0-afb7db3e',
        });
      } else {
        console.error('Failed to update user:', data);
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white "
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View className="flex-1 bg-white px-6">
        <ScrollView keyboardShouldPersistTaps="handled">
          <Text className="mb-[15px] text-[26px] font-Nunito-Bold">
            Parent details
          </Text>

          <CustomTextInput
            value={form.firstName}
            placeholder="First name*"
            onChangeText={text => handleChange('firstName', text)}
          />

          <CustomTextInput
            placeholder="Last name*"
            value={form.lastName}
            onChangeText={text => handleChange('lastName', text)}
          />

          <CustomTextInput
            value={form.phone}
            placeholder="Mobile No.*"
            onChangeText={text => handleChange('phone', text)}
          />

          <CustomTextInput
            placeholder="Email*"
            keyboardType="email-address"
            value={form.email}
            onChangeText={text => handleChange('email', text)}
          />
        </ScrollView>

        {!isKeyboardVisible && (
          <>
            <View className="absolute bottom-20 left-0 right-0 items-center pb-4">
              <Image
                source={images.parentaddressIcon}
                className="w-[357px] h-[228px]"
              />
            </View>
            <FooterBtn title="Continue" onClick={handleSubmit} />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ParentDetailsTele;
