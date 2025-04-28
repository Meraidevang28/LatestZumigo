import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import {Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const VetAssistantDetails = ({navigation}) => {
  // const {height, width} = Dimensions.get('window');
  const [hasAssistant, setHasAssistant] = useState(false);
  const [assistants, setAssistants] = useState([{name: '', mobile: ''}]);
  const {width, height} = Dimensions.get('window');
  const imageHeight = height * 0.34;
  const toggleSwitch = () => setHasAssistant(prev => !prev);

  const addAssistant = () => {
    const newAssistants = [...assistants, {name: '', mobile: ''}];
    saveAssistants(newAssistants);
  };
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const saveAssistants = async newAssistants => {
    try {
      await AsyncStorage.setItem('assistants', JSON.stringify(newAssistants));
      setAssistants(newAssistants);
    } catch (error) {
      console.error('Error saving assistants:', error);
    }
  };
  const updateAssistant = (index, field, value) => {
    const newAssistants = [...assistants];
    newAssistants[index][field] = value;
    saveAssistants(newAssistants);
  };
  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('assistants', JSON.stringify(assistants));
      navigation.navigate(screens.ScheduleWeek);
    } catch (error) {
      console.error('Error saving and navigating:', error);
    }
  };
  return (
    <>
      <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
        <View className=" bg-white px-6">
          {/* Progress bar */}
          <View className="mt-[15px] mb-2">
            <RegistrationProgressBar screenNo={5} />
          </View>
          <Text className="text-gray-900 mb-[10px] text-[24px] font-Nunito-Bold mt-[10px]">
            Your Assistant Details
          </Text>

          {/* Toggle Switch */}
          <View className="flex-row justify-between items-center bg-[#F2F6F733] border border-[#BBBCB733] px-[19px] py-[5px] mt-[20px] rounded-2xl mb-[15px] h-[58px]">
            <Text className="text-[16px] text-darkGunmetal leading-10 font-Nunito-Regular">
              Do you have an assistant?
            </Text>
            <Switch
              value={hasAssistant}
              onValueChange={toggleSwitch}
              trackColor={{false: '#E7ECF7', true: '#d75880'}}
              thumbColor={'#fff'}
            />
          </View>

          {/* Assistant Fields */}
          {hasAssistant && (
            <View>
              {assistants.map((assistant, index) => (
                <View key={index}>
                  <TextInput
                    className="bg-white text-[#000000] h-[60px] text-[16px] border border-[#BBBCB733] rounded-2xl mb-[15px] p-[19px] font-Nunito-Regular"
                    placeholder="Name"
                    placeholderTextColor="#00000080"
                    value={assistant.name}
                    onChangeText={text => updateAssistant(index, 'name', text)}
                  />
                  <TextInput
                    className="bg-white text-[#000000] h-[60px] text-[16px] border border-[#BBBCB733] rounded-2xl mb-[15px] p-[19px] font-Nunito-Regular"
                    placeholder="Mobile number"
                    placeholderTextColor="#00000080"
                    keyboardType="phone-pad"
                    value={assistant.mobile}
                    onChangeText={text =>
                      updateAssistant(index, 'mobile', text)
                    }
                  />
                </View>
              ))}
              <TouchableOpacity onPress={addAssistant}>
                <Text className="text-[16px] text-primary font-Nunito-Regular">
                  + Add more
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              // position: 'absolute',
              bottom: -190,
              right: -140,
              paddingRight: 16,
              // zIndex: -1,
              marginBottom: 200,
            }}>
            <Image
              source={images.Assistant}
              style={{
                width: width * 0.5,
                height: height * 0.3,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </ScrollView>
      {!isKeyboardVisible && (
        <View
          className="bg-white flex px-6 justify-center h-[100px] w-full"
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 50, height: 60}, // Adjust as needed
            shadowOpacity: 50, // Lower for subtle shadows
            shadowRadius: 10,
            elevation: 18, // Android shadow
          }}>
          <TouchableOpacity
            className="h-[60px] bg-primary items-center justify-center rounded-full"
            onPress={handleContinue}>
            <Text className="text-[20px] text-white font-Nunito-Bold text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default VetAssistantDetails;
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Switch,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Alert,
// } from 'react-native';
// import axios from 'react-native-axios';
// import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
// import images from '../../../assets/images';
// import screens from '../../../constants/screens';
// import {Keyboard} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API_BASE_URL, ADD_USER_ASSISTANT} from '@env';

// const VetAssistantDetails = ({navigation}) => {
//   const [hasAssistant, setHasAssistant] = useState(false);
//   const [assistants, setAssistants] = useState([{name: '', mobile: ''}]);
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
//   const toggleSwitch = () => setHasAssistant(prev => !prev);
//   const addAssistant = () => {
//     setAssistants([...assistants, {name: '', mobile: ''}]);
//   };

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         setIsKeyboardVisible(true);
//       },
//     );

//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         setIsKeyboardVisible(false);
//       },
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   // const handleSubmit = async () => {
//   //   try {
//   //     // Retrieve token
//   //     const storedToken = await AsyncStorage.getItem('auth_token');

//   //     if (!storedToken) {
//   //       console.log('No token found in AsyncStorage');
//   //       Alert.alert('Error', 'No token found');
//   //       return;
//   //     }
//   //     const payload = {
//   //       Assistantaccounts_id: 0, // Default value, assuming it's auto-incremented
//   //       Uuid: null, // Can be null
//   //       UserUUID: null, // Assign actual UserUUID if required
//   //       Master_Company_UUID: null, // Assign valid UUID if required
//   //       Master_Environment_UUID: null, // Assign valid UUID if required
//   //       Assistant_Name: 'Kalp Shah', // Example name
//   //       Assistant_MobileNumber: '9909270383', // Example mobile number
//   //       Assistant_EmailID: null, // Can be null if not required
//   //       IsDisplay: true, // Default value
//   //       IsActive: true, // Default value
//   //       IsAddedOn: new Date().toISOString(), // Current timestamp
//   //       IsAddedBy: null, // Assign actual user ID if required
//   //       IsUpdatedOn: null, // No updates yet
//   //       IsUpdateBy: null,
//   //       IsDeleteOn: null,
//   //       IsDeletedBy: null,
//   //       AddedIP: null, // If IP tracking is required, fetch dynamically
//   //       UpdatedIP: null,
//   //       DeletedIP: null,
//   //       RecordNo: 0, // Default value
//   //     };
//   //     console.log('Stored Token:', storedToken); // Print token to console
//   //     console.log('API URL:', `${API_BASE_URL}${ADD_USER_ASSISTANT}`); // Log API URL
//   //     console.log('Final Payload:', JSON.stringify(payload, null, 2)); // Log data being sent

//   //     // Make API request
//   //     // const response = await axios.post(
//   //     //   `${API_BASE_URL}${ADD_USER_ASSISTANT}`, // ✅ Corrected template literal
//   //     //   payload,
//   //     //   {
//   //     //     headers: {
//   //     //       'Content-Type': 'application/json',
//   //     //       Authorization: `Bearer ${storedToken}`, // ✅ Fixed syntax
//   //     //     },
//   //     //   },
//   //     // );

//   //     const response = await axios
//   //       .post('http://localhost:3000/addAssistant')
//   //       .then(response => {
//   //         console.log(response);
//   //       })
//   //       .catch(error => {
//   //         console.error('Error:', error);
//   //         Alert.alert('Error', 'Failed to add assistant');
//   //       });

//   //     if (response.status === 200) {
//   //       Alert.alert('Success', 'Assistant added successfully');
//   //       navigation.navigate(screens.VetRegisterAgreement);
//   //     } else {
//   //       Alert.alert('Error', 'Failed to add assistant');
//   //     }
//   //   } catch (error) {
//   //     console.error(
//   //       'Error Response:',
//   //       error.response ? error.response.data : error.message,
//   //     );
//   //     Alert.alert(
//   //       'Error',
//   //       error.response?.data?.message || 'Something went wrong',
//   //     );
//   //   }
//   // };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post('http://10.0.2.2:3000/addAssistant', {
//         assistantName: assistants[0].name,
//         assistantMobileNo: assistants[0].mobile,
//       });

//       console.log('Response:', response.data);
//       alert('Assistant added successfully!');
//     } catch (error) {
//       console.error('Error adding assistant:', error);
//       alert('Failed to add assistant');
//     }
//   };

//   return (
//     <>
//       <View className="flex-1 bg-white px-6 ">
//         <View className="flex-1">
//           {/* Progress bar  */}
//           <View className="mt-[15px] mb-2">
//             <RegistrationProgressBar screenNo={8} />
//           </View>
//           <Text className="text-gray-900 mb-[10px] font-[Nunito-Regular]">
//             Add assistant details
//           </Text>
//           <ScrollView
//             className="flex-1 bg-white mb-[100px]"
//             showsVerticalScrollIndicator={false}>
//             {/* Toggle Switch */}

//             <View className="flex-row justify-between items-center bg-pastelGrey  border border-pastelgreyBorder px-[19px] py-[5px] mt-[20px] rounded-2xl mb-[15px] h-[58px]">
//               <Text className="text-[16px] text-darkGunmetal leading-5 font-[Nunito-Bold]">
//                 Do you have an assistant?
//               </Text>
//               <Switch
//                 value={hasAssistant}
//                 onValueChange={toggleSwitch}
//                 trackColor={{false: '#E7ECF7', true: '#d75880'}}
//                 thumbColor={true ? '#fff' : '#fff'}
//               />
//             </View>
//             {/* Assistant Fields */}
//             {hasAssistant ? (
//               <View>
//                 {assistants.map((assistant, index) => (
//                   <View key={index}>
//                     <TextInput
//                       className="bg-pastelGrey text-[#000000]  border border-pastelgreyBorder rounded-2xl mb-[15px] p-[19px]"
//                       placeholder="Name"
//                       placeholderTextColor="#00000080"
//                       value={assistant.name}
//                       onChangeText={text => {
//                         let newAssistants = [...assistants];
//                         newAssistants[index].name = text;
//                         setAssistants(newAssistants);
//                       }}
//                     />
//                     <TextInput
//                       className="bg-pastelGrey text-[#000000]  border border-pastelgreyBorder rounded-2xl mb-[15px] p-[19px]"
//                       placeholder="Mobile number"
//                       placeholderTextColor="#00000080"
//                       keyboardType="phone-pad"
//                       value={assistant.mobile}
//                       onChangeText={text => {
//                         let newAssistants = [...assistants];
//                         newAssistants[index].mobile = text;
//                         setAssistants(newAssistants);
//                       }}
//                     />
//                   </View>
//                 ))}
//                 <TouchableOpacity onPress={addAssistant}>
//                   <Text className="text-[16px] text-primary font-Nunito-Regular">
//                     + Add assistant
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <View className=" mt-20 items-center">
//                 <Image source={images.Assistant} />
//               </View>
//             )}
//           </ScrollView>
//           {/* <FooterBtn
//             title="Continue"
//             onClick={() => navigation.navigate(screens.VetRegisterAgreement)}
//           /> */}
//         </View>
//       </View>
//       {!isKeyboardVisible && (
//         <View
//           className="bg-white flex px-6 justify-center h-[100px] w-full"
//           style={{
//             shadowColor: '#000',
//             shadowOffset: {width: 50, height: 60}, // Adjust as needed
//             shadowOpacity: 50, // Lower for subtle shadows
//             shadowRadius: 10,
//             elevation: 18, // Android shadow
//           }}>
//           <TouchableOpacity
//             className="h-[60px] bg-primary items-center justify-center rounded-2xl"
//             onPress={handleSubmit}>
//             <Text className="text-[20px] text-white font-Nunito-Bold text-center">
//               Continue
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </>
//   );
// };
// export default VetAssistantDetails;
