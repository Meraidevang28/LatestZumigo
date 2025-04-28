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
import {API_BASE_URL, UPLOAD} from '@env';

const RadiologistDetails = () => {
  const [Firstname, setFirstName] = useState('');
  const [Lastname, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [vetLicense, setVetLicense] = useState('');
  const [gstin, setGstIn] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState({
    photo: null, // Single file
    aadhaar: [], // Up to 2
    panId: [], // Up to 2
    vetLicense: null, // Single file
    companyLogo: null, // Single file
    degreeCertificate: [], // Up to 2
  });

  const navigation = useNavigation();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const phoneFromStorage = await AsyncStorage.getItem('mobile_number');
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
          // setPhoneNo(data.phoneNo);
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

  const uploadDocument = async (image, fileType) => {
    if (!image?.uri) return null;

    try {
      const token = await AsyncStorage.getItem('auth_token');
      const formData = new FormData();

      formData.append('files', {
        uri: image.uri,
        name: image.name || image.fileName || 'document.jpg',
        type: image.type || 'image/jpeg/pdf/docx',
      });

      const folderMap = {
        aadhaar: '/Usr/aadhar/',
        panId: '/Usr/pan/',
        photo: '/usr/photo/',
        vetLicense: '/Usr/licence/',
        companyLogo: '/Usr/logo/',
        degreeCertificate: '/Usr/degree/',
      };

      const folderPath = folderMap[fileType] || '/Usr/other/';
      const uploadUrl = `${API_BASE_URL}${UPLOAD}?filepath=${folderPath}`;

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseJson = await response.json();
      console.log('Upload response:', responseJson);
      return responseJson;
    } catch (error) {
      console.error(`Upload failed for ${fileType}:, error`);
      return null;
    }
  };

  const selectFile = async fileType => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      const isMultiUpload = ['aadhaar', 'panId', 'degreeCertificate'].includes(
        fileType,
      );

      if (isMultiUpload) {
        setSelectedFiles(prev => {
          const existing = prev[fileType] || [];
          if (existing.length >= 2) {
            Alert.alert('Upload Limit', 'You can upload up to 2 files.');
            return prev;
          }
          return {...prev, [fileType]: [...existing, result]};
        });
      } else {
        setSelectedFiles(prev => ({...prev, [fileType]: result}));
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.log('File selection error:', err);
      }
    }
  };

  const removeFile = (fileType, index = null) => {
    if (index !== null && Array.isArray(selectedFiles[fileType])) {
      setSelectedFiles(prev => {
        const updated = [...prev[fileType]];
        updated.splice(index, 1);
        return {...prev, [fileType]: updated};
      });
    } else {
      setSelectedFiles(prev => ({...prev, [fileType]: null}));
    }
  };

  const renderFileUpload = (fileType, label) => {
    const hasFile = !!selectedFiles[fileType];

    return (
      <View
        className="mt-4 bg-pastelGrey rounded-[20px]"
        style={{
          borderWidth: 1,
          borderColor: '#DBDBDB', // pastelgreyBorder fallback
          // paddingBottom: hasFile ? 0 : 0,
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
          <View className="mt-4 flex flex-row flex-wrap gap-3 ml-[20px] mr-[20px]">
            {Array.isArray(selectedFiles[fileType]) ? (
              selectedFiles[fileType].map((file, index) => (
                <View key={index} className="relative">
                  <Image
                    source={{uri: file.uri}}
                    className="w-[100px] h-[100px] rounded-lg"
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    className="absolute top-[-10px] right-[-10px] bg-primary rounded-full h-[25px] w-[25px] flex justify-center items-center"
                    onPress={() => removeFile(fileType, index)}>
                    <Text className="text-white font-Nunito-Bold">X</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View className="relative ">
                <Image
                  source={{uri: selectedFiles[fileType].uri}}
                  className="w-[100px] h-[100px] rounded-lg"
                  resizeMode="contain"
                />
                <TouchableOpacity
                  className="absolute top-[-10px] right-[-10px] bg-primary rounded-full h-[25px] w-[25px] flex justify-center items-center"
                  onPress={() => removeFile(fileType)}>
                  <Text className="text-white font-Nunito-Bold">X</Text>
                </TouchableOpacity>
              </View>
            )}
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
                <RegistrationProgressBar screenNo={1} n={6} />
              </View>
              <View className="mb-[100px]">
                <Text className="text-[24px] text-[#000000] font-Nunito-Bold mt-[16px] mb-[16px]">
                  About Yourself
                </Text>

                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="#00000080"
                  onChangeText={text => {
                    setFirstName(text);
                    console.log('First name:', text);
                  }}
                  value={Firstname}
                  className="p-3 px-4 text-[16px] font-Nunito-Regular text-[#000000] h-[55px] bg-white border border-pastelgreyBorder rounded-[20px]"
                  style={{lineHeight: 22}}
                />

                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor="#00000080"
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
                  placeholderTextColor="#00000080"
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
                  placeholderTextColor="#00000080"
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
                {/* {renderFileUpload(
                  'degreeCertificate',
                  'Upload Degree Certificate',
                )} */}
                {/* {renderFileUpload('vetLicense', 'Upload Vet License')} */}

                <TextInput
                  placeholder="Enter vet license no*"
                  placeholderTextColor="#00000080"
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
                  placeholder="Company Name"
                  placeholderTextColor="#BBBCB7"
                  onChangeText={text => {
                    setCompanyName(text);
                    console.log('GST IN:', text);
                  }}
                  value={companyName}
                  className="p-3 px-4 text-[15px] font-Nunito-Regular text-[#000000] h-[60px] bg-white border border-pastelgreyBorder rounded-[20px] mb-5"
                  style={{lineHeight: 22}}
                />

                <TextInput
                  placeholder="GST IN (Optional)"
                  placeholderTextColor="#BBBCB7"
                  onChangeText={text => {
                    setGstIn(text);
                    console.log('GST IN:', text);
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
            // onPress={async () => {
            //   await saveToStorage();
            //   navigation.navigate(screens.AddAddress);
            // }}
            onPress={async () => {
              const uploads = [];

              for (const [fileType, fileData] of Object.entries(
                selectedFiles,
              )) {
                if (!fileData) continue;

                if (Array.isArray(fileData)) {
                  for (const singleFile of fileData) {
                    uploads.push(uploadDocument(singleFile, fileType));
                  }
                } else {
                  uploads.push(uploadDocument(fileData, fileType));
                }
              }

              const results = await Promise.all(uploads);
              console.log('All upload responses:', results);

              await saveToStorage();
              navigation.navigate(screens.AddRadiologistAddress);
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

export default RadiologistDetails;
