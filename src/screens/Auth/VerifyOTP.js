import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Toast from 'react-native-toast-message';
import FooterBtn from '../../components/shared/FooterBtn';
import {user_type} from '../../constants/constants';
import {login} from '../../state/redux/slice/authSlice';
import {useDispatch} from 'react-redux';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL, AUTH_SENDOTP} from '@env';
import screens from '../../constants/screens';

const VerifyOTP = ({navigation, route}) => {
  const {isPartner, fetchedOtp} = route?.params;
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTime, setResendTime] = useState(90); // Countdown in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [currentOtp, setCurrentOtp] = useState(
    fetchedOtp?.toString().substring(0, 4).trim() || '',
  );
  const inputRefs = useRef([]);

  useEffect(() => {
    const getMobileNumber = async () => {
      try {
        const number = await AsyncStorage.getItem('mobile_number');
        if (number) setMobileNumber(number);
      } catch (error) {
        console.error('Failed to fetch mobile number from storage', error);
      }
    };

    getMobileNumber();
  }, []);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardVisible(true),
    );
    const hideListener = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardVisible(false),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  // Countdown effect
  useEffect(() => {
    if (resendTime === 0) {
      setIsResendDisabled(false);
      return;
    }

    const interval = setInterval(() => {
      setResendTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTime]);

  useEffect(() => {
    if (fetchedOtp) {
      const otpArray = fetchedOtp.toString().substring(0, 4).split('');
      setOtp(otpArray);
      setCurrentOtp(fetchedOtp.toString().substring(0, 4).trim());

      Toast.show({
        type: 'info',
        text1: 'Your OTP',
        text2: ` Use OTP: ${fetchedOtp}`,
        position: 'top',
        visibilityTime: 5000,
      });

      setTimeout(() => {
        const lastIndex = otpArray.length - 1;
        if (inputRefs.current[lastIndex]) {
          inputRefs.current[lastIndex].focus();
        }
      }, 500);
    }
  }, [fetchedOtp]);

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // const handleResend = () => {
  //   setResendTime(90);
  //   setIsResendDisabled(true);
  //   // You can also re-trigger OTP API here if needed
  // };

  const handleResend = async () => {
    setResendTime(90);
    setIsResendDisabled(true);

    try {
      const mobile = await AsyncStorage.getItem('mobile_number');
      const userTypeUuid = await AsyncStorage.getItem('user_type_uuid');
      const deviceIp = await AsyncStorage.getItem('device_Ip');
      const authToken = await AsyncStorage.getItem('auth_token');

      const response = await axios.get(`${API_BASE_URL}${AUTH_SENDOTP}`, {
        params: {
          MobileNumber: mobile,
          DeviceIp: deviceIp,
          UserTypeUuid: userTypeUuid,
        },
        headers: {Authorization: `Bearer ${authToken}`},
      });

      console.log('Full Response:', response.data);
      const otp = response.data?.[0]?.OTP;
      console.log('Fetched OTP:', otp);

      if (otp) {
        const trimmedOtp = otp.toString().substring(0, 4).trim('');
        setCurrentOtp(trimmedOtp);
        setOtp(trimmedOtp.split(''));

        Toast.show({
          type: 'info',
          text1: 'OTP Resent',
          text2: `New OTP: ${trimmedOtp}`,
          position: 'top',
          visibilityTime: 6000,
        });

        // Autofocus last input
        setTimeout(() => {
          // const lastIndex = otpArray.length - 1;/
          const lastIndex = 3;
          if (inputRefs.current[lastIndex]) {
            inputRefs.current[lastIndex].focus();
          }
        }, 500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to fetch OTP',
          text2: 'Please try again.',
        });
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong while resending OTP.',
      });
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('').trim();
    // const apiOtp = fetchedOtp ? fetchedOtp.toString().substring(0, 4).trim() : '';

    if (!currentOtp) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No OTP received. Please try again.',
      });
      return;
    }

    if (enteredOtp === currentOtp) {
      if (isPartner) {
        dispatch(login(user_type.VET));
        navigation.navigate('PartnerDashboard');
      } else {
        dispatch(login(user_type.PET_PARENT));
        navigation.navigate(screens.Dashboard);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter the correct OTP.',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white">
      <View className="flex-1">
        <Text className="mt-[21px] mb-2 text-[26px] font-Nunito-Bold px-6">
          Verification OTP
        </Text>
        <Text className="text-[#848A9A] mb-[30px] px-6 font-Nunito-Regular">
          Enter the OTP sent to{' '}
          {mobileNumber ? `+91 ${mobileNumber}` : 'your number'}
        </Text>

        {/* OTP Input */}
        <View className="flex-row items-center mb-5 px-6">
          <View className="flex-row">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                className="h-[44px] w-[44px] border border-[#BBBCB7] mr-[10px] rounded-2xl text-[17px] bg-white text-black font-Nunito-Bold"
                style={{textAlign: 'center'}}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
              />
            ))}
          </View>

          <Image
            source={require('../../assets/images/DummyImages/Paw1.png')}
            style={{
              height: 28,
              width: 28,
              tintColor: otp.join('').length === 4 ? '#d75880' : '#BBBCB7',
            }}
          />
        </View>

        <View className="px-6">
          {isResendDisabled ? (
            <Text className="text-[#BBBCB7] font-Nunito-Regular">
              Resend OTP in{' '}
              <Text className="text-black font-Nunito-Regular">
                {`0${Math.floor(resendTime / 60)}:${(resendTime % 60)
                  .toString()
                  .padStart(2, '0')}`}
              </Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text className="text-[#d75880] font-Nunito-Bold">
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* OTP Image Positioned Right with Dynamic Height */}
        <View className="flex-1 items-end top-[-80px]">
          <Image
            source={require('../../assets/images/DummyImages/otpImage.png')}
            style={{
              width: isKeyboardVisible ? 109 : 226,
              height: isKeyboardVisible ? 380 : 598,
              position: 'relative',
              marginBottom: 30,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Verify Button */}
        <View className="bottom-0  items-center mb-[10px] w-full">
          <TouchableOpacity
            style={{
              width: '90%',
              height: 60,
              backgroundColor:
                otp.join('').length === 4 ? '#d75880' : '#BBBCB7',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="rounded-full "
            onPress={handleVerifyOtp}>
            <Text className="text-center text-[21px] font-Nunito-Bold text-white">
              Verify OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyOTP;
// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';

// import Toast from 'react-native-toast-message';
// import FooterBtn from '../../components/shared/FooterBtn';
// import {user_type} from '../../constants/constants';
// import {login} from '../../state/redux/slice/authSlice';
// import {useDispatch} from 'react-redux';
// import axios from 'react-native-axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API_BASE_URL, AUTH_SENDOTP} from '@env';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Geolocation from 'react-native-geolocation-service';
// import screens from '../../constants/screens';

// const VerifyOTP = ({navigation, route}) => {
//   const {isPartner, fetchedOtp} = route?.params;
//   const dispatch = useDispatch();

//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [resendTime, setResendTime] = useState(90);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [currentOtp, setCurrentOtp] = useState(
//     fetchedOtp?.toString().substring(0, 4).trim() || '',
//   );
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     const getMobileNumber = async () => {
//       try {
//         const number = await AsyncStorage.getItem('mobile_number');
//         if (number) setMobileNumber(number);
//       } catch (error) {
//         console.error('Failed to fetch mobile number from storage', error);
//       }
//     };

//     getMobileNumber();
//   }, []);

//   useEffect(() => {
//     const showListener = Keyboard.addListener('keyboardDidShow', () =>
//       setIsKeyboardVisible(true),
//     );
//     const hideListener = Keyboard.addListener('keyboardDidHide', () =>
//       setIsKeyboardVisible(false),
//     );

//     return () => {
//       showListener.remove();
//       hideListener.remove();
//     };
//   }, []);

//   useEffect(() => {
//     if (resendTime === 0) {
//       setIsResendDisabled(false);
//       return;
//     }

//     const interval = setInterval(() => {
//       setResendTime(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [resendTime]);

//   useEffect(() => {
//     if (fetchedOtp) {
//       const otpArray = fetchedOtp.toString().substring(0, 4).split('');
//       setOtp(otpArray);
//       setCurrentOtp(fetchedOtp.toString().substring(0, 4).trim());

//       Toast.show({
//         type: 'info',
//         text1: 'Your OTP',
//         text2: ` Use OTP: ${fetchedOtp}`,
//         position: 'top',
//         visibilityTime: 5000,
//       });

//       setTimeout(() => {
//         const lastIndex = otpArray.length - 1;
//         if (inputRefs.current[lastIndex]) {
//           inputRefs.current[lastIndex].focus();
//         }
//       }, 500);
//     }
//   }, [fetchedOtp]);

//   const handleOtpChange = (value, index) => {
//     if (isNaN(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleResend = async () => {
//     setResendTime(90);
//     setIsResendDisabled(true);

//     try {
//       const mobile = await AsyncStorage.getItem('mobile_number');
//       const userTypeUuid = await AsyncStorage.getItem('user_type_uuid');
//       const deviceIp = await AsyncStorage.getItem('device_Ip');
//       const authToken = await AsyncStorage.getItem('auth_token');

//       const response = await axios.get(`${API_BASE_URL}${AUTH_SENDOTP}`, {
//         params: {
//           MobileNumber: mobile,
//           DeviceIp: deviceIp,
//           UserTypeUuid: userTypeUuid,
//         },
//         headers: {Authorization: `Bearer ${authToken} `},
//       });

//       const otp = response.data?.[0]?.OTP;

//       if (otp) {
//         const trimmedOtp = otp.toString().substring(0, 4).trim('');
//         setCurrentOtp(trimmedOtp);
//         setOtp(trimmedOtp.split(''));

//         Toast.show({
//           type: 'info',
//           text1: 'OTP Resent',
//           text2: `New OTP: ${trimmedOtp}`,
//           position: 'top',
//           visibilityTime: 6000,
//         });

//         setTimeout(() => {
//           const lastIndex = 3;
//           if (inputRefs.current[lastIndex]) {
//             inputRefs.current[lastIndex].focus();
//           }
//         }, 500);
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Failed to fetch OTP',
//           text2: 'Please try again.',
//         });
//       }
//     } catch (error) {
//       console.error('Resend OTP error:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Something went wrong while resending OTP.',
//       });
//     }
//   };

//   const handleVerifyOtp = async () => {
//     const enteredOtp = otp.join('').trim();

//     if (!currentOtp) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'No OTP received. Please try again.',
//       });
//       return;
//     }

//     if (enteredOtp === currentOtp) {
//       const permission = await request(
//         Platform.OS === 'android'
//           ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//           : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//       );

//       if (permission === RESULTS.GRANTED) {
//         Geolocation.getCurrentPosition(
//           position => {
//             console.log('User location:', position);

//             if (isPartner) {
//               dispatch(login(user_type.VET));
//               navigation.navigate('PartnerDashboard');
//             } else {
//               dispatch(login(user_type.PET_PARENT));
//               navigation.navigate(screens.Dashboard);
//             }
//           },
//           error => {
//             console.error('Location Error:', error);
//             Toast.show({
//               type: 'error',
//               text1: 'Location Error',
//               text2: 'Unable to fetch your location.',
//             });

//             if (isPartner) {
//               dispatch(login(user_type.VET));
//               navigation.navigate('PartnerDashboard');
//             } else {
//               dispatch(login(user_type.PET_PARENT));
//               navigation.navigate(screens.Dashboard);
//             }
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 15000,
//             maximumAge: 10000,
//           },
//         );
//       } else {
//         Toast.show({
//           type: 'error',
//           text1: 'Permission Denied',
//           text2: 'Location permission is required.',
//         });
//       }
//     } else {
//       Toast.show({
//         type: 'error',
//         text1: 'Invalid OTP',
//         text2: 'Please enter the correct OTP.',
//       });
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       className="flex-1 bg-white">
//       <View className="flex-1">
//         <Text className="mt-[21px] mb-2 text-[26px] font-semibold px-6">
//           Verification OTP
//         </Text>
//         <Text className="text-[#848A9A] mb-[30px] px-6">
//           Enter the OTP sent to{' '}
//           {mobileNumber ? +`91 ${mobileNumber}` : 'your number'}
//         </Text>

//         <View className="flex-row items-center mb-5 px-6">
//           <View className="flex-row">
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 ref={ref => (inputRefs.current[index] = ref)}
//                 className="h-[44px] w-[44px] border border-[#BBBCB7] mr-[10px] rounded-2xl text-[17px] bg-white text-black font-Nunito-Regular"
//                 style={{textAlign: 'center'}}
//                 keyboardType="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChangeText={value => handleOtpChange(value, index)}
//               />
//             ))}
//           </View>

//           <Image
//             source={require('../../assets/images/footPrint.png')}
//             style={{
//               height: 28.64,
//               width: 32.64,
//               tintColor: otp.join('').length === 4 ? '#d75880' : '#BBBCB7',
//             }}
//           />
//         </View>

//         <View className="px-6">
//           {isResendDisabled ? (
//             <Text className="text-[#BBBCB7] font-Nunito-Regular">
//               Resend OTP in{' '}
//               <Text className="text-black font-Nunito-Regular">
//                 {`0${Math.floor(resendTime / 60)}:${(resendTime % 60)
//                   .toString()
//                   .padStart(2, '0')}`}
//               </Text>
//             </Text>
//           ) : (
//             <TouchableOpacity onPress={handleResend}>
//               <Text className="text-[#d75880] font-Nunito-Bold">
//                 Resend OTP
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         <View className="flex-1 items-end top-[-80px]">
//           <Image
//             source={require('../../assets/images/DummyImages/otpImage.png')}
//             style={{
//               width: isKeyboardVisible ? 109 : 226,
//               height: isKeyboardVisible ? 380 : 598,
//               position: 'relative',
//               marginBottom: 30,
//             }}
//             resizeMode="contain"
//           />
//         </View>

//         <View className="bottom-0 left-0 right-0 items-center mb-[10px]">
//           <TouchableOpacity
//             style={{
//               width: 250,
//               height: 60,
//               backgroundColor:
//                 otp.join('').length === 4 ? '#d75880' : '#BBBCB7',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//             className="rounded-full"
//             onPress={handleVerifyOtp}>
//             <Text className="text-center text-[24px] font-bold text-white">
//               Verify OTP
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default VerifyOTP;
