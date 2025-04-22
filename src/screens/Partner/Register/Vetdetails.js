// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import TextInputs from '../../../components/vetRegistrationComponents/TextInputs';
// import {useNavigation} from '@react-navigation/native';
// import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
// import FooterBtn from '../../../components/shared/FooterBtn';
// import screens from '../../../constants/screens';
// import {KeyboardAvoidingView, Platform} from 'react-native';
// import {Keyboard} from 'react-native';
// import {primary} from '../../../assets/theme/colors';
// import DocumentPicker from 'react-native-document-picker';
// import images from '../../../assets/images';
// // import {XCircleIcon} from 'react-native-heroicons/solid';
// const Vetdetails = () => {
//   const [Firstname, setFirstName] = useState('');
//   const [Lastname, setLastName] = useState('');
//   const [phoneNo, setPhoneNo] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [vetLicense, setVetLicense] = useState('');
//   const [gstin, setGstIn] = useState('');
//   const [selectedFiles, setSelectedFiles] = useState({
//     photo: null,
//     aadhaar: null,
//     panId: null,
//     vetLicense: null,
//     companyLogo: null,
//   });
//   const navigation = useNavigation();
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
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

//   const selectFile = async fileType => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
//       });

//       setSelectedFiles(prevFiles => ({
//         ...prevFiles,
//         [fileType]: res[0],
//       }));

//       console.log('Selected file:', res[0]);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User canceled the picker');
//       } else {
//         console.error('Error picking file:', err);
//       }
//     }
//   };

//   const removeFile = fileType => {
//     setSelectedFiles(prevFiles => ({
//       ...prevFiles,
//       [fileType]: null,
//     }));
//   };
//   const renderFileUpload = (fileType, label) => (
//     <View className="mt-4 flex flex-col bg-pastelGrey rounded-[20px]">
//       {/* Always display the label and the upload button */}
//       <TouchableOpacity onPress={() => selectFile(fileType)}>
//         <View className="h-[60px] flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[20px]">
//           <Text className="text-[16px] ml-[15px] text-[#000000] font-Nunito-Regular">
//             {label}
//           </Text>
//           <Image
//             source={images.uploadIcon}
//             className="h-[25px] w-[25px] mr-[21.1px]"
//             // style={{tintColor: primary}}
//             style={{resizeMode: 'contain'}}
//           />
//         </View>
//       </TouchableOpacity>
//       <View>
//         {selectedFiles[fileType] && (
//           <View className="mt-4 flex flex-row items-center gap-3 ml-[20px] mb-[15px] ">
//             {selectedFiles[fileType].type.includes('image') ? (
//               <Image
//                 source={{uri: selectedFiles[fileType].uri}}
//                 className="w-[100px] h-[100px] rounded-lg"
//                 resizeMode="contain"
//               />
//             ) : (
//               <View className="bg-gray-200 p-2 rounded-md">
//                 <Text className="text-black">
//                   {selectedFiles[fileType].name}
//                 </Text>
//               </View>
//             )}

//             {/* Cross button to delete the selected file */}
//             <TouchableOpacity
//               className="bg-primary top-[-45] left-[-20px] rounded-full h-[25px] w-[25px] flex justify-center items-center"
//               onPress={() => removeFile(fileType)}>
//               {/* <XCircleIcon size={24} color="white" /> */}
//               <Text className="text-white ">X</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* If a file is selected, display the image preview and cross button */}
//     </View>
//   );

//   return (
//     <>
//       <View className="flex-1 bg-white px-6">
//         <View className="flex-1">
//           <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             className="flex-1">
//             <ScrollView
//               contentContainerStyle={{flexGrow: 1}}
//               showsVerticalScrollIndicator={false}>
//               <View className="mt-[15px] mb-2">
//                 <RegistrationProgressBar screenNo={1} />
//               </View>
//               <View className="mb-[100px]">
//                 <Text className="text-[24px] text-[#000000] font-Nunito-Bold mt-[16px] mb-[16px]">
//                   About Yourself
//                 </Text>

//                 {/* <View className="flex flex-row items-center gap-[10px]">
//               <View className="flex-1 h-[60px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
//                 <TextInput
//                   placeholder="First Name"
//                   placeholderTextColor="#00000080"
//                   onChangeText={text => setFirstName(text)}
//                   className="flex-1 p-3 px-4 text-[16px] font-Nunito-Regular  text-[#000000] min-h-[40px] "
//                   style={{lineHeight: 22}}></TextInput>
//               </View>
//               <View className="w-[165px] h-[60px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
//                 <TextInput
//                   placeholder="Last Name"
//                   placeholderTextColor="#00000080"
//                   onChangeText={text => setLastName(text)}
//                   className="flex-1 text-[#000000] text-[16px] font-Nunito-Regular p-3 px-4 "
//                   style={{lineHeight: 22}}></TextInput>
//               </View>
//               </View> */}
//                 <TextInput
//                   placeholder="First Name"
//                   placeholderTextColor="#00000080"
//                   onChangeText={text => setFirstName(text)}
//                   className="flex-1 p-3 px-4 text-[16px] font-Nunito-Regular  text-[#000000] h-[55px] bg-white border border-pastelgreyBorder rounded-[20px] "
//                   style={{lineHeight: 22}}></TextInput>
//                 <TextInput
//                   placeholder="Last Name"
//                   placeholderTextColor="#00000080"
//                   onChangeText={text => setLastName(text)}
//                   className="flex-1 text-[#000000] text-[16px] font-Nunito-Regular p-3 px-4 h-[55px] bg-white border border-pastelgreyBorder rounded-[20px] mt-[10px]"
//                   style={{lineHeight: 22}}></TextInput>
//                 <View className=" h-[60px] mt-[15px] bg-white border border-pastelgreyBorder rounded-[20px]">
//                   <TextInput
//                     placeholder="Phone no"
//                     placeholderTextColor="#00000080"
//                     onChangeText={text => setPhoneNo(text)}
//                     className=" text-[#000000]  pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px] text-[16px] font-Nunito-Regular "
//                     style={{lineHeight: 22}}></TextInput>
//                 </View>
//                 <View className="h-[60px] mt-[15px] bg-white border border-pastelgreyBorder rounded-[20px]">
//                   <TextInput
//                     placeholder="Email"
//                     placeholderTextColor="#00000080"
//                     onChangeText={text => setEmail(text)}
//                     className=" text-[#000000]  pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px]  text-[16px] font-Nunito-Regular"
//                     style={{lineHeight: 22}}></TextInput>
//                 </View>
//                 {/* <TextInput
//                 placeholder="Address"
//                 placeholderTextColor="#00000080"
//                 multiline
//                 textAlignVertical="top"
//                 onChangeText={text => setAddress(text)}
//                 className="bg-white text-[16px] font-Nunito-Regular  border border-pastelgreyBorder text-[#000000] mt-[15px] h-[90px] rounded-2xl pl-[19.3px]"
//                 style={{lineHeight: 22}}
//               /> */}

//                 {/* <View className="flex flex-row items-center gap-[10px] mt-[15px]">
//                 <View className="flex-1 h-[60px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
//                   <TextInput
//                     placeholder="City"
//                     placeholderTextColor="#00000080"
//                     onChangeText={text => setCity(text)}
//                     className="flex-1 p-3 px-4  text-[#000000] min-h-[40px] text-[16px] font-Nunito-Regular"
//                     style={{lineHeight: 22}}></TextInput>
//                 </View>
//                 <View className="w-[165px] h-[60px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
//                   <TextInput
//                     placeholder="Pincode"
//                     placeholderTextColor="#00000080"
//                     onChangeText={text => setPincode(text)}
//                     className="flex-1 text-[#000000]  p-3 px-4 text-[16px] font-Nunito-Regular"
//                     style={{lineHeight: 22}}></TextInput>
//                 </View>
//               </View> */}
//                 <Text className="text-[22px] font-Nunito-Bold mt-[15px]">
//                   Identity Proof and Vet License
//                 </Text>
//                 <Text className="text-[18px] font-Nunito-Regular mt-[8px] text-[#BBBCB7]">
//                   Upload required documents
//                 </Text>
//                 {renderFileUpload('photo', 'Upload Photo')}
//                 {renderFileUpload('aadhaar', 'Upload Aadhaar')}
//                 {renderFileUpload('panId', 'Upload PAN ID')}
//                 {renderFileUpload('vetLicense', 'Upload Vet License')}

//                 <TextInput
//                   placeholder="Enter vet license no*"
//                   placeholderTextColor="#00000080"
//                   textAlignVertical="top"
//                   onChangeText={text => setVetLicense(text)}
//                   className="mt-[20px] bg-white border font-Nunito-Regular border-pastelgreyBorder text-[#000000] text-[16px] h-[60px] pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px] rounded-[20px]"
//                   style={{lineHeight: 22}}></TextInput>

//                 <Text className="text-[24px] text-[#000000] font-PTSans-Bold mt-[29.9px] mb-[14.1px]">
//                   Business Details
//                 </Text>
//                 <TextInput
//                   placeholder="GSTIN(Optional)"
//                   placeholderTextColor="#BBBCB7"
//                   multiline
//                   textAlignVertical="top"
//                   onChangeText={text => setGstIn(text)}
//                   className="bg-white border font-Nunito-Regular border-pastelgreyBorder text-[#000000] text-[15px] h-[60px] pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px] rounded-[20px] "
//                   style={{lineHeight: 22}}></TextInput>
//                 {renderFileUpload('companyLogo', 'Upload Company Logo')}
//               </View>
//             </ScrollView>
//           </KeyboardAvoidingView>
//         </View>
//       </View>

//       {!isKeyboardVisible && (
//         <View
//           className="bg-white flex px-6 justify-center h-[100px] w-full "
//           style={{
//             shadowColor: '#000',
//             shadowOffset: {width: 50, height: 60}, // Adjust as needed
//             shadowOpacity: 50, // Lower for subtle shadows
//             shadowRadius: 10,
//             elevation: 18, // Android shadow
//           }}>
//           <TouchableOpacity
//             className="h-[60px] bg-primary items-center justify-center rounded-full"
//             onPress={() => {
//               navigation.navigate(screens.AddAddress);
//             }}>
//             <Text className="text-[20px] text-white font-Nunito-Bold text-center">
//               Continue
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </>
//   );
// };

// export default Vetdetails;

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TextInputs from '../../../components/vetRegistrationComponents/TextInputs';
import {useNavigation} from '@react-navigation/native';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import screens from '../../../constants/screens';
import DocumentPicker from 'react-native-document-picker';
import images from '../../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {primary} from '../../../assets/theme/colors';

const Vetdetails = () => {
  const [Firstname, setFirstName] = useState('');
  const [Lastname, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [vetLicense, setVetLicense] = useState('');
  const [gstin, setGstIn] = useState('');
  const [selectedFiles, setSelectedFiles] = useState({
    photo: null,
    aadhaar: null,
    panId: null,
    vetLicense: null,
    companyLogo: null,
    degreeCertificate: null,
  });

  const navigation = useNavigation();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const phoneFromStorage = await AsyncStorage.getItem('phoneNumber');
        if (phoneFromStorage) {
          setPhoneNo(phoneFromStorage);
          console.log('Phone number from AsyncStorage:', phoneFromStorage);
        }

        const savedDetails = await AsyncStorage.getItem('vetDetails');
        if (savedDetails) {
          const data = JSON.parse(savedDetails);
          console.log('Loaded vet details from AsyncStorage:', data);
          setFirstName(data.Firstname);
          setLastName(data.Lastname);
          setPhoneNo(data.phoneNo);
          setEmail(data.email);
          setAddress(data.address);
          setCity(data.city);
          setPincode(data.pincode);
          setVetLicense(data.vetLicense);
          setGstIn(data.gstin);
          setSelectedFiles(data.selectedFiles);
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
      }
    };

    fetchStoredData();

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const saveToStorage = async () => {
    const data = {
      Firstname,
      Lastname,
      phoneNo,
      email,
      address,
      city,
      pincode,
      vetLicense,
      gstin,
      selectedFiles,
    };

    console.log('Saving vet details:', data);

    try {
      await AsyncStorage.setItem('vetDetails', JSON.stringify(data));
      console.log('Vet details saved successfully.');
    } catch (error) {
      console.error('Error saving vet details:', error);
    }
  };

  const selectFile = async fileType => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      setSelectedFiles(prevFiles => {
        const updated = {
          ...prevFiles,
          [fileType]: res[0],
        };
        console.log(`Selected file for ${fileType}:, res[0]`);
        return updated;
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('File selection canceled');
      } else {
        console.error('File selection error:', err);
      }
    }
  };

  const removeFile = fileType => {
    setSelectedFiles(prev => {
      const updated = {
        ...prev,
        [fileType]: null,
      };
      console.log(`Removed file for ${fileType}`);
      return updated;
    });
  };

  const renderFileUpload = (fileType, label) => {
    const hasFile = !!selectedFiles[fileType];

    return (
      <View
        className="mt-4 bg-pastelGrey rounded-[20px]"
        style={{
          borderWidth: 1,
          borderColor: '#DBDBDB', // pastelgreyBorder fallback
          paddingBottom: hasFile ? 15 : 0,
        }}>
        <TouchableOpacity onPress={() => selectFile(fileType)}>
          <View className="h-[60px] flex flex-row items-center justify-between rounded-[20px] bg-pastelGrey">
            <Text className="text-[16px] ml-[15px] text-[#000000] font-Nunito-Regular">
              {label}
            </Text>
            <Image
              source={images.uploadIcon}
              className="h-[25px] w-[25px] mr-[21.1px]"
              style={{resizeMode: 'contain'}}
            />
          </View>
        </TouchableOpacity>

        {hasFile && (
          <View className="mt-4 flex flex-row items-center gap-3 ml-[20px] mr-[20px]">
            {selectedFiles[fileType].type.includes('image') ? (
              <Image
                source={{uri: selectedFiles[fileType].uri}}
                className="w-[100px] h-[100px] rounded-lg"
                resizeMode="contain"
              />
            ) : (
              <View className="bg-gray-200 p-2 rounded-md">
                <Text className="text-black">
                  {selectedFiles[fileType].name}
                </Text>
              </View>
            )}

            <TouchableOpacity
              className="bg-primary top-[-45px] left-[-20px] rounded-full h-[25px] w-[25px] flex justify-center items-center"
              onPress={() => removeFile(fileType)}>
              <Text className="text-white">X</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <View className="flex-1 bg-white px-6">
        <View className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1">
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <View className="mt-[15px] mb-2">
                <RegistrationProgressBar screenNo={1} />
              </View>
              <View className="mb-[100px]">
                <Text className="text-[24px] text-[#000000] font-Nunito-Bold mt-[16px] mb-[16px]">
                  About Yourself
                </Text>

                <TextInput
                  placeholder="First Name *"
                  placeholderTextColor="#BBBCB7"
                  onChangeText={text => {
                    setFirstName(text);
                    console.log('First name:', text);
                  }}
                  value={Firstname}
                  className="p-3 px-4 text-[16px] font-Nunito-Regular text-[#000000] h-[55px] bg-white border border-pastelgreyBorder rounded-[20px]"
                  style={{lineHeight: 22}}
                />

                <TextInput
                  placeholder="Last Name *"
                  placeholderTextColor="#BBBCB7"
                  onChangeText={text => {
                    setLastName(text);
                    console.log('Last name:', text);
                  }}
                  value={Lastname}
                  className="mt-[10px] p-3 px-4 text-[16px] font-Nunito-Regular text-[#000000] h-[55px] bg-white border border-pastelgreyBorder rounded-[20px]"
                  style={{lineHeight: 22}}
                />

                <TextInput
                  placeholder="Phone no"
                  placeholderTextColor="#BBBCB7"
                  onChangeText={text => {
                    setPhoneNo(text);
                    console.log('Phone no:', text);
                  }}
                  value={phoneNo}
                  className="mt-[15px] p-3 px-4 text-[16px] font-Nunito-Regular text-[#000000] h-[55px] bg-white border border-pastelgreyBorder rounded-[20px]"
                  style={{lineHeight: 22}}
                />

                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#BBBCB7"
                  onChangeText={text => {
                    setEmail(text);
                    console.log('Email:', text);
                  }}
                  value={email}
                  className="mt-[15px] p-3 px-4 text-[16px] font-Nunito-Regular text-[#000000] h-[55px] bg-white border border-pastelgreyBorder rounded-[20px]"
                  style={{lineHeight: 22}}
                />

                <Text className="text-[22px] font-Nunito-Bold mt-[15px]">
                  Identity Proof and Vet License
                </Text>
                <Text className="text-[18px] font-Nunito-Regular mt-[8px] text-[#BBBCB7]">
                  Upload required documents
                </Text>

                {renderFileUpload('photo', 'Upload Photo')}
                {renderFileUpload('aadhaar', 'Upload Aadhaar')}
                {renderFileUpload('panId', 'Upload PAN ID')}
                {renderFileUpload(
                  'degreeCertificate',
                  'Upload Degree Certificate',
                )}
                {renderFileUpload('vetLicense', 'Upload Vet License')}

                <TextInput
                  placeholder="Enter Vet License No *"
                  placeholderTextColor="#BBBCB7"
                  onChangeText={text => {
                    setVetLicense(text);
                    console.log('Vet License No:', text);
                  }}
                  value={vetLicense}
                  className="mt-[20px] p-3 px-4 text-[16px] font-Nunito-Regular text-[#000000] h-[60px] bg-white border border-pastelgreyBorder rounded-[20px]"
                  style={{lineHeight: 22}}
                />

                <Text className="text-[24px] text-[#000000] font-PTSans-Bold mt-[29.9px] mb-[14.1px]">
                  Business Details
                </Text>

                <TextInput
                  placeholder="GST IN (Optional)"
                  placeholderTextColor="#BBBCB7"
                  onChangeText={text => {
                    setGstIn(text);
                    console.log('GSTIN:', text);
                  }}
                  value={gstin}
                  className="p-3 px-4 text-[15px] font-Nunito-Regular text-[#000000] h-[60px] bg-white border border-pastelgreyBorder rounded-[20px]"
                  style={{lineHeight: 22}}
                />

                {renderFileUpload('companyLogo', 'Upload Company Logo')}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>

      {!isKeyboardVisible && (
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
            onPress={async () => {
              await saveToStorage();
              navigation.navigate(screens.AddAddress);
            }}>
            <Text className="text-[20px] text-white font-Nunito-Bold text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Vetdetails;
