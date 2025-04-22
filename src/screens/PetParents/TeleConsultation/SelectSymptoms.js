// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   PermissionsAndroid,
//   Platform,
//   Alert,
//   Linking,
// } from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import images from '../../../assets/images';
// import BottomSheet from '../../../components/shared/BottomSheet';
// import FooterBtn from '../../../components/shared/FooterBtn';
// import {ScrollView, TextInput} from 'react-native-gesture-handler';
// import screens from '../../../constants/screens';
// import {Dimensions} from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL, SYMPTOM_LIST , UPLOAD } from '@env';

// const SelectSymptoms = ({navigation, route}) => {
//   const windowHeight = Dimensions.get('window').height;
//   const [SymptomsList, setSymptomsList] = useState([]);
//   const isHomeVisit = route?.params?.isHomeVisit;
//   const isEdit = route?.params?.isEdit;

//   const [selectedSymptoms, setSelectedSymptoms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [description, setDescription] = useState('');
//   const [attachments, setAttachments] = useState([]);
//   const [uploadedImages, setUploadedImages] = useState([]);

//   const bottomSheetRef = useRef(null);
//   const descBottomSheetRef = useRef(null);

//   useEffect(() => {
//     if (isHomeVisit) {
//       navigation.setOptions({title: 'Home Visit'});
//     }
//   }, []);

//   // Store selected symptoms in AsyncStorage
//   const storeSymptomsInStorage = async updatedSymptoms => {
//     try {
//       await AsyncStorage.setItem('selected_symptoms', JSON.stringify(updatedSymptoms));
//       console.log('Stored symptoms:', updatedSymptoms);
//     } catch (e) {
//       console.error('Error storing symptoms:', e);
//     }
//   };

//   // Load selected symptoms from AsyncStorage
//   useEffect(() => {
//     const loadStoredSymptoms = async () => {
//       try {
//         const stored = await AsyncStorage.getItem('selected_symptoms');
//         if (stored) {
//           const parsed = JSON.parse(stored);
//           setSelectedSymptoms(parsed);
//           console.log('Loaded stored symptoms:', parsed);
//         }
//       } catch (e) {
//         console.error('Error loading stored symptoms:', e);
//       }
//     };

//     loadStoredSymptoms();
//   }, []);

//   const toggleSymptom = symptom => {
//     const symptomName = symptom.Symptom_Name;
//     const updatedSymptoms = selectedSymptoms.includes(symptomName)
//       ? selectedSymptoms.filter(s => s !== symptomName)
//       : [...selectedSymptoms, symptomName];

//     setSelectedSymptoms(updatedSymptoms);
//     storeSymptomsInStorage(updatedSymptoms);
//   };

//   useEffect(() => {
//     bottomSheetRef.current?.present();
//   }, []);

//   const removeSymptom = index => {
//     const updated = selectedSymptoms.filter((_, i) => i !== index);
//     setSelectedSymptoms(updated);
//     storeSymptomsInStorage(updated);
//   };

//   const uploadPetImage = async image => {
//     if (!image?.uri) return null;

//     try {
//       const token = await AsyncStorage.getItem('auth_token');
//       const formData = new FormData();

//       formData.append('files', {
//         uri: image.uri,
//         name: image.fileName || 'photo.jpg',
//         type: image.type || 'image/jpeg',
//       });

//       const uploadUrl = `${API_BASE_URL}${UPLOAD}?filepath=/Petimg/`;

//       const response = await fetch(uploadUrl, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const result = await response.json();
//       console.log('Upload Response:', result);
//       return result;
//     } catch (error) {
//       console.error('Image Upload Error:', error);
//       return null;
//     }
//   };

//   const addImage = asset => {
//     setUploadedImages(prev => [...prev, asset]);
//   };

//   const removeImage = index => {
//     setUploadedImages(prev => prev.filter((_, i) => i !== index));
//   };

//   const addAttachment = () => {
//     setAttachments([...attachments, {id: Date.now()}]);
//   };

//   const removeAttachment = id => {
//     setAttachments(attachments.filter(item => item.id !== id));
//   };

//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'App needs camera access to take pictures',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } else {
//       return true;
//     }
//   };

//   const selectImage = () => {
//     Alert.alert('Select Option', 'Choose an image source', [
//       {
//         text: 'Camera',
//         onPress: async () => {
//           const granted = await requestCameraPermission();
//           if (granted)
//             launchCamera(
//               {
//                 mediaType: 'photo',
//                 quality: 0.7,
//                 cameraType: 'back',
//               },
//               res => {
//                 if (!res.didCancel && !res.errorCode && res.assets?.[0]) {
//                   addImage(res.assets[0]);
//                 }
//               },
//             );
//           else {
//             Alert.alert('Permission Denied', 'Camera access was denied');
//           }
//         },
//       },
//       {
//         text: 'Gallery',
//         onPress: () => {
//           launchImageLibrary(
//             {
//               mediaType: 'photo',
//               quality: 0.7,
//             },
//             res => {
//               if (!res.didCancel && !res.errorCode && res.assets?.[0]) {
//                 addImage(res.assets[0]);
//               }
//             },
//           );
//         },
//       },
//       {
//         text: 'Cancel',
//         style: 'cancel',
//       },
//     ]);
//   };

//   const fetchSymptoms = async () => {
//     try {
//       const token = await AsyncStorage.getItem('auth_token');
//       console.log('Token:', token);

//       const response = await fetch(
//         `${API_BASE_URL}${SYMPTOM_LIST}?PageIndex=1&PageCount=10`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//           },
//         },
//       );

//       const data = await response.json();
//       console.log('Response:', data);

//       if (Array.isArray(data)) {
//         setSymptomsList(data);
//         console.log('Symptoms List set directly:', data);
//       } else if (data?.Result && Array.isArray(data.Result)) {
//         setSymptomsList(data.Result);
//         console.log('Symptoms List set from Result:', data.Result);
//       } else {
//         console.log('No symptoms found or unexpected data format:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching symptoms:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSymptoms();
//   }, []);

//   return (
//     <View className="flex-1 bg-white px-6">
//       <Text className="  mb-3 text-[26px] font-PTSans-Bold">
//         Select the Symptoms
//       </Text>
//       <ScrollView>
//         <View className="flex-1 mb-[50px]">
//           {/* Symptoms List */}
//           <View className="flex-1 py-5 px-[14px] bg-pastelGrey border-pastelgreyBorder border rounded-2xl">
//             <View className=" flex-row justify-between items-center">
//               <View className=" flex-row gap-[15px] ">
//                 <Image source={images.Symptoms} className=" w-[22px] h-[22px]" />
//                 <Text className=" text-[16px] font-Nunito-Bold  text-darkGunmetal ">
//                   Symptoms
//                 </Text>
//               </View>
//               {selectedSymptoms.length == 0 && (
//                 <TouchableOpacity
//                   onPress={() => {
//                     bottomSheetRef.current?.present();
//                   }}>
//                   <Image
//                     source={images.secondaryAdd}
//                     className=" w-[22px] h-[22px]"
//                   />
//                 </TouchableOpacity>
//               )}
//             </View>
//             {selectedSymptoms.length > 0 && <View className=" mt-6" />}
//             <View className=" flex-row flex-wrap gap-[10px] ">
//               {selectedSymptoms.map((item, index) => (
//                 <View
//                   key={index.toString()}
//                   className=" py-[10px] px-[14px] bg-pastelPrimary border border-primaryBorder rounded-2xl">
//                   <Text className=" text-[#333333] text-[14px] font-Nunito-Regular leading-[15px]">
//                     {item}
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() => removeSymptom(index)}
//                     className=" absolute right-[-2px] top-[-3px]">
//                     <Image
//                       source={images.primaryClose}
//                       className=" h-[14px] w-[14px]"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>
//           </View>

//           {/* Upload Image Button */}
//           <View className="flex-col gap-[10px] mb-[15px] flex-wrap">
//             <TouchableOpacity
//               className="w-[141px] h-[50px] mt-[10px] flex flex-row gap-[10px] bg-pastelGrey border border-pastelgreyBorder rounded-[20px] items-center justify-center"
//               onPress={selectImage}>
//               <Image
//                 source={images.secondaryAdd}
//                 className="h-5 w-5"
//                 resizeMode="contain"
//                 style={{tintColor: 'grey'}}
//               />
//               <Text className="font-Nunito-Bold text-[14px] opacity-50">
//                 Upload Image
//               </Text>
//             </TouchableOpacity>
//             <View className="flex-row gap-[10px] flex-wrap">
//               {uploadedImages.map((image, index) => (
//                 <View
//                   key={index}
//                   className="w-[121px] h-[107px] mt-[10px] flex flex-row bg-pastelGrey border border-pastelgreyBorder rounded-2xl items-center justify-center static overflow-hidden">
//                   <Image
//                     source={{uri: image.uri}}
//                     className="h-full w-full rounded-2xl"
//                     resizeMode="cover"
//                   />
//                   <TouchableOpacity
//                     onPress={() => removeImage(index)}
//                     className="absolute top-1 right-1 bg-primary p-1 rounded-full z-10">
//                     <Text className="text-white text-xs">✕</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>
//           </View>

//           {attachments.length > 0 && (
//             <View className="flex-row gap-3 flex-wrap bg-pastelGrey border border-pastelgreyBorder rounded-2xl  p-[15px] mt-[15px]">
//               {attachments.map(item => (
//                 <View key={item.id}>
//                   <Image
//                     source={images.dog4}
//                     className="relative w-[80px] h-[80px] rounded-lg"
//                     resizeMode="contain"
//                   />
//                   <TouchableOpacity
//                     onPress={() => removeAttachment(item.id)}
//                     className="absolute -top-1 -right-1 bg-red-500 rounded-full">
//                     <Image
//                       source={images.primaryClose}
//                       className=" h-[16px] w-[16px]"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View>
//           )}

//           <View className="left-[50px] items-center mb-[200px]">
//             <Image
//               source={images.sleepingcatIcon}
//               style={{
//                 width:
//                   uploadedImages.length > 0 || attachments.length > 0
//                     ? 120
//                     : 259,
//                 height:
//                   uploadedImages.length > 0 || attachments.length > 0
//                     ? 120
//                     : 259,
//                 left:
//                   uploadedImages.length > 0 || attachments.length > 0 ? 50 : 15,
//                 top:
//                   uploadedImages.length > 0 || attachments.length > 0
//                     ? 100
//                     : 160,
//               }}
//               resizeMode="contain"
//             />
//           </View>
//         </View>
//       </ScrollView>

//       <FooterBtn
//         title="Continue"
//         onClick={() => {
//           if (isEdit) {
//             navigation.goBack();
//             return;
//           }

//           if (isHomeVisit) {
//             navigation.navigate(screens.AddYourAddress);
//           } else {
//             navigation.navigate(screens.ParentDetails);
//           }
//         }}
//       />

//       <BottomSheet ref={bottomSheetRef}>
//         <View className=" px-6">
//           <Text className="mt-5 font-Nunito-Bold text-[24px]">Symptoms</Text>
//           <Text className=" mt-2 mb-[30px] font-Nunito-Regular text-gray-800 text-[15px]">
//             Choose the symptoms Max is experiencing
//           </Text>
//           <ScrollView
//             style={{height: windowHeight * 0.65}}
//             showsVerticalScrollIndicator={false}>
//             <View className="flex-row flex-wrap gap-[10px] mb-[100px]">
//               {SymptomsList && SymptomsList.length > 0 ? (
//                 SymptomsList.map((item, index) => {
//                   const isSelected = selectedSymptoms.includes(item.Symptom_Name);
//                   return (
//                     <TouchableOpacity
//                       key={index}
//                       className={`p-[14px] rounded-[15px] border flex-row items-center justify-between w-full ${
//                         isSelected
//                           ? 'bg-[#ffdef6] border-primaryBorder'
//                           : 'bg-white border-[#BBBCB7]'
//                       }`}
//                       onPress={() => toggleSymptom(item)}>
//                       <Text
//                         className={`font-Nunito-Regular text-[16px] leading-6 flex-shrink ${
//                           isSelected ? 'text-[#000000]' : 'text-[#838999]'
//                         }`}>
//                         {item.Symptom_Name}
//                       </Text>
//                       {isSelected && (
//                         <Image
//                           className="w-[19px] h-4 ml-2"
//                           style={{tintColor: '#D75880'}}
//                           resizeMode="contain"
//                           source={images.footPrint}
//                         />
//                       )}
//                     </TouchableOpacity>
//                   );
//                 })
//               ) : (
//                 <Text className="text-center w-full">Loading symptoms...</Text>
//               )}
//             </View>
//           </ScrollView>
//         </View>

//         <FooterBtn
//           title="Add"
//           onClick={() => {
//             bottomSheetRef.current?.close();
//             setTimeout(() => {
//               descBottomSheetRef?.current?.present();
//             }, 500);
//           }}
//         />
//       </BottomSheet>
//     </View>
//   );
// };

// export default SelectSymptoms;

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import images from '../../../assets/images';
import BottomSheet from '../../../components/shared/BottomSheet';
import FooterBtn from '../../../components/shared/FooterBtn';
import {ScrollView} from 'react-native-gesture-handler';
import screens from '../../../constants/screens';
import {Dimensions} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL, SYMPTOM_LIST, UPLOAD} from '@env';

const SelectSymptoms = ({navigation, route}) => {
  const windowHeight = Dimensions.get('window').height;
  const [SymptomsList, setSymptomsList] = useState([]);
  const isHomeVisit = route?.params?.isHomeVisit;
  const isEdit = route?.params?.isEdit;

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImageResponses, setUploadedImageResponses] = useState([]);

  const bottomSheetRef = useRef(null);
  const descBottomSheetRef = useRef(null);

  useEffect(() => {
    if (isHomeVisit) {
      navigation.setOptions({title: 'Home Visit'});
    }
  }, []);

  // Store selected symptoms in AsyncStorage
  const storeSymptomsInStorage = async updatedSymptoms => {
    try {
      await AsyncStorage.setItem(
        'selected_symptoms',
        JSON.stringify(updatedSymptoms),
      );
      console.log('Stored symptoms:', updatedSymptoms);
    } catch (e) {
      console.error('Error storing symptoms:', e);
    }
  };

  // Load selected symptoms from AsyncStorage
  useEffect(() => {
    const loadStoredSymptoms = async () => {
      try {
        const stored = await AsyncStorage.getItem('selected_symptoms');
        if (stored) {
          const parsed = JSON.parse(stored);
          setSelectedSymptoms(parsed);
          console.log('Loaded stored symptoms:', parsed);
        }
      } catch (e) {
        console.error('Error loading stored symptoms:', e);
      }
    };

    loadStoredSymptoms();
  }, []);

  const toggleSymptom = symptom => {
    const symptomName = symptom.Symptom_Name;
    const updatedSymptoms = selectedSymptoms.includes(symptomName)
      ? selectedSymptoms.filter(s => s !== symptomName)
      : [...selectedSymptoms, symptomName];

    setSelectedSymptoms(updatedSymptoms);
    storeSymptomsInStorage(updatedSymptoms);
  };

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  const removeSymptom = index => {
    const updated = selectedSymptoms.filter((_, i) => i !== index);
    setSelectedSymptoms(updated);
    storeSymptomsInStorage(updated);
  };

  const uploadPetImage = async image => {
    if (!image?.uri) return null;

    try {
      const token = await AsyncStorage.getItem('auth_token');
      const formData = new FormData();

      formData.append('files', {
        uri: image.uri,
        name: image.fileName || 'photo.jpg',
        type: image.type || 'image/jpeg',
      });

      const uploadUrl = `${API_BASE_URL}${UPLOAD}?filepath=/Petsymptom/`;

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log('Upload Response:', result);
      return result;
    } catch (error) {
      console.error('Image Upload Error:', error);
      return null;
    }
  };

  const addImage = async asset => {
    setUploadedImages(prev => [...prev, asset]);

    const uploadResult = await uploadPetImage(asset);
    console.log('Uploaded Image Result:', uploadResult);
  };

  const removeImage = index => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const addAttachment = () => {
    setAttachments([...attachments, {id: Date.now()}]);
  };

  const removeAttachment = id => {
    setAttachments(attachments.filter(item => item.id !== id));
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access to take pictures',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return true;
    }
  };

  const selectImage = () => {
    Alert.alert('Select Option', 'Choose an image source', [
      {
        text: 'Camera',
        onPress: async () => {
          const granted = await requestCameraPermission();
          if (granted)
            launchCamera(
              {
                mediaType: 'photo',
                quality: 0.7,
                cameraType: 'back',
              },
              res => {
                if (!res.didCancel && !res.errorCode && res.assets?.[0]) {
                  addImage(res.assets[0]);
                }
              },
            );
          else {
            Alert.alert('Permission Denied', 'Camera access was denied');
          }
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              quality: 0.7,
            },
            res => {
              if (!res.didCancel && !res.errorCode && res.assets?.[0]) {
                addImage(res.assets[0]);
              }
            },
          );
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const fetchSymptoms = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await fetch(
        `${API_BASE_URL}${SYMPTOM_LIST}?PageIndex=1&PageCount=10`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      const data = await response.json();
      if (Array.isArray(data)) {
        setSymptomsList(data);
      } else if (data?.Result && Array.isArray(data.Result)) {
        setSymptomsList(data.Result);
      }
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSymptoms();
  }, []);

  return (
    <View className="flex-1 bg-white px-6">
      <Text className="mb-3 text-[26px] font-PTSans-Bold">
        Select the Symptoms
      </Text>
      <ScrollView contentContainerStyle={{paddingBottom: 250}}>
        <View className="flex-1 mb-[50px]">
          <View className="flex-1 py-5 px-[14px] bg-pastelGrey border-pastelgreyBorder border rounded-2xl">
            <View className=" flex-row justify-between items-center">
              <View className=" flex-row gap-[15px] ">
                <Image
                  source={images.Symptoms}
                  className=" w-[22px] h-[22px]"
                />
                <Text className=" text-[16px] font-Nunito-Bold  text-darkGunmetal ">
                  Symptoms
                </Text>
              </View>
              {selectedSymptoms.length == 0 && (
                <TouchableOpacity
                  onPress={() => {
                    bottomSheetRef.current?.present();
                  }}>
                  <Image
                    source={images.secondaryAdd}
                    className=" w-[22px] h-[22px]"
                  />
                </TouchableOpacity>
              )}
            </View>
            {selectedSymptoms.length > 0 && <View className=" mt-6" />}
            <View className=" flex-row flex-wrap gap-[10px] ">
              {selectedSymptoms.map((item, index) => (
                <View
                  key={index.toString()}
                  className=" py-[10px] px-[14px] bg-pastelPrimary border border-primaryBorder rounded-2xl">
                  <Text className=" text-[#333333] text-[14px] font-Nunito-Regular leading-[15px]">
                    {item}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeSymptom(index)}
                    className=" absolute right-[-2px] top-[-3px]">
                    <Image
                      source={images.primaryClose}
                      className=" h-[14px] w-[14px]"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View className="flex-col gap-[10px] mb-[15px] flex-wrap">
            <TouchableOpacity
              className="w-[141px] h-[50px] mt-[10px] flex flex-row gap-[10px] bg-pastelGrey border border-pastelgreyBorder rounded-[20px] items-center justify-center"
              onPress={selectImage}>
              <Image
                source={images.secondaryAdd}
                className="h-5 w-5"
                resizeMode="contain"
                style={{tintColor: 'grey'}}
              />
              <Text className="font-Nunito-Bold text-[14px] opacity-50">
                Upload Image
              </Text>
            </TouchableOpacity>
            {uploadedImages.length > 0 && (
              <View className="flex-row flex-wrap gap-x-[10px] gap-y-[10px] p-[10px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl mt-4">
                {uploadedImages.map((image, index) => (
                  <View
                    key={index}
                    className="relative"
                    style={{width: 90, height: 90}}>
                    {/* ❌ Close Button */}
                    <TouchableOpacity
                      onPress={() => removeImage(index)}
                      className="absolute top-[-10px] right-[-10px] bg-[#D75880] w-[24px] h-[24px] items-center justify-center rounded-full shadow-md z-10">
                      <Text className="text-white text-[16px] font-bold">
                        ✕
                      </Text>
                    </TouchableOpacity>

                    {/* Image Container */}
                    <View className="w-full h-full bg-white border border-pastelgreyBorder rounded-2xl overflow-hidden">
                      <Image
                        source={{uri: image.uri}}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {attachments.length > 0 && (
            <View className="flex-row gap-3 flex-wrap bg-pastelGrey border border-pastelgreyBorder rounded-2xl  p-[15px] mt-[15px]">
              {attachments.map(item => (
                <View key={item.id}>
                  <Image
                    source={images.dog4}
                    className="relative w-[80px] h-[80px] rounded-lg"
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    onPress={() => removeAttachment(item.id)}
                    className="absolute -top-1 -right-1 bg-red-500 rounded-full">
                    <Image
                      source={images.primaryClose}
                      className=" h-[16px] w-[16px]"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* <View className="left-[50px] items-center mb-[200px]">
            <Image
              source={images.sleepingcatIcon}
              style={{
                width:
                  uploadedImages.length > 0 || attachments.length > 0
                    ? 120
                    : 259,
                height:
                  uploadedImages.length > 0 || attachments.length > 0
                    ? 120
                    : 259,
                left:
                  uploadedImages.length > 0 || attachments.length > 0 ? 50 : 15,
                top:
                  uploadedImages.length > 0 || attachments.length > 0
                    ? 100
                    : 160,
              }}
              resizeMode="contain"
            />
          </View> */}
        </View>
      </ScrollView>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 90,
          right: 0,
          alignItems: 'center',
        }}>
        <Image
          source={images.sleepingcatIcon}
          style={{
            width:
              uploadedImages.length > 0 || attachments.length > 0 ? 160 : 229,
            height:
              uploadedImages.length > 0 || attachments.length > 0 ? 160 : 229,
            left: uploadedImages.length > 0 || attachments.length > 0 ? 50 : 15,
            // top:
            // uploadedImages.length > 0 || attachments.length > 0 ? 100 : 160,
            bottom:
              uploadedImages.length > 0 || attachments.length > 0 ? 100 : 60,
          }}
          resizeMode="contain"
        />
      </View>

      <FooterBtn
        title="Continue"
        onClick={() => {
          if (isEdit) {
            navigation.goBack();
            return;
          }

          if (isHomeVisit) {
            navigation.navigate(screens.AddYourAddress);
          } else {
            navigation.navigate(screens.ParentDetailsTele);
          }
        }}
      />

      <BottomSheet ref={bottomSheetRef}>
        <View className=" px-6">
          <Text className="mt-5 font-Nunito-Bold text-[24px]">Symptoms</Text>
          <Text className=" mt-2 mb-[30px] font-Nunito-Regular text-gray-800 text-[15px]">
            Choose the symptoms Max is experiencing
          </Text>
          <ScrollView
            style={{height: windowHeight * 0.65}}
            showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap gap-[10px] mb-[100px]">
              {SymptomsList && SymptomsList.length > 0 ? (
                SymptomsList.map((item, index) => {
                  const isSelected = selectedSymptoms.includes(
                    item.Symptom_Name,
                  );
                  return (
                    <TouchableOpacity
                      key={index}
                      className={`p-[14px] rounded-[15px] border flex-row items-center justify-between w-full ${
                        isSelected
                          ? 'bg-[#ffdef6] border-primaryBorder'
                          : 'bg-white border-[#BBBCB7]'
                      }`}
                      onPress={() => toggleSymptom(item)}>
                      <Text
                        className={`font-Nunito-Regular text-[16px] leading-6 flex-shrink ${
                          isSelected ? 'text-[#000000]' : 'text-[#838999]'
                        }`}>
                        {item.Symptom_Name}
                      </Text>
                      {isSelected && (
                        <Image
                          className="w-[19px] h-4 ml-2"
                          style={{tintColor: '#D75880'}}
                          resizeMode="contain"
                          source={images.footPrint}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text className="text-center w-full">Loading symptoms...</Text>
              )}
            </View>
          </ScrollView>
        </View>

        <FooterBtn
          title="Add"
          onClick={() => {
            bottomSheetRef.current?.close();
            setTimeout(() => {
              descBottomSheetRef?.current?.present();
            }, 500);
          }}
        />
      </BottomSheet>
    </View>
  );
};

export default SelectSymptoms;
