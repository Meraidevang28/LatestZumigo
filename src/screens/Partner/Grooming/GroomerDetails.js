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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import screens from '../../../constants/screens';
import {primary} from '../../../assets/theme/colors';
import DocumentPicker from 'react-native-document-picker';
import images from '../../../assets/images';
import {API_BASE_URL, UPLOAD} from '@env';

const GroomerDetails = ({navigation}) => {
  const [Firstname, setFirstName] = useState('');
  const [Lastname, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [gstin, setGstIn] = useState('');
  const [selectedFiles, setSelectedFiles] = useState({
    photo: null,
    aadhaar: null,
    panId: null,
    vetLicense: null,
    companyLogo: null,
  });
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('groomerData');
        const savedMobile = await AsyncStorage.getItem('mobile_number');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setFirstName(parsed.Firstname || '');
          setLastName(parsed.Lastname || '');
          setPhoneNo(parsed.phoneNo || '');
          setEmail(parsed.email || '');
          setAddress(parsed.address || '');
          setCity(parsed.city || '');
          setPincode(parsed.pincode || '');
          setcompanyName(parsed.companyName || '');
          setGstIn(parsed.gstin || '');
          setSelectedFiles(parsed.selectedFiles || {});
        } else if (savedMobile) {
          setPhoneNo(savedMobile); // if only mobile number is available
        }
      } catch (err) {
        console.error('Failed to load data', err);
      }
    };
    loadData();
  }, []);

  const storeGroomerData = async () => {
    try {
      const groomerData = {
        Firstname,
        Lastname,
        phoneNo,
        email,
        companyName,
        gstin,
        selectedFiles,
      };
      await AsyncStorage.setItem('groomerData', JSON.stringify(groomerData));
      console.log('Groomer data saved:', groomerData);
    } catch (error) {
      console.error('Error saving groomer data', error);
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
      return responseJson;
    } catch (error) {
      console.error(`Upload failed for ${fileType}:`, error);
      return null;
    }
  };

  const selectFile = async fileType => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      const file = res[0];

      setSelectedFiles(prev => ({
        ...prev,
        [fileType]: file,
      }));

      const response = await uploadDocument(file, fileType);
      console.log(`Upload response for ${fileType}:`, response);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled file picker');
      } else {
        console.error('File picker error:', err);
      }
    }
  };

  const removeFile = fileType => {
    setSelectedFiles(prev => ({
      ...prev,
      [fileType]: null,
    }));
  };

  const renderFileUpload = (fileType, label) => (
    <View className="mt-4 flex flex-col bg-pastelGrey rounded-[20px]">
      <TouchableOpacity onPress={() => selectFile(fileType)}>
        <View className="h-[60px] flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[20px]">
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

      {selectedFiles[fileType] && (
        <View className="mt-4 flex flex-row items-center gap-3 ml-[20px] mb-[15px] ">
          {selectedFiles[fileType].type?.includes('image') ? (
            <Image
              source={{uri: selectedFiles[fileType].uri}}
              className="w-[100px] h-[100px] rounded-lg"
              resizeMode="contain"
            />
          ) : (
            <View className="bg-gray-200 p-2 rounded-md">
              <Text className="text-black">{selectedFiles[fileType].name}</Text>
            </View>
          )}
          <TouchableOpacity
            className="bg-primary top-[-45] left-[-20px] rounded-full h-[25px] w-[25px] flex justify-center items-center"
            onPress={() => removeFile(fileType)}>
            <Text className="text-white">X</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <>
      <View className="flex-1 bg-white px-6">
        <View className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1">
            <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
              <View className="mt-[15px] mb-2">
                <RegistrationProgressBar screenNo={1} />
              </View>

              <View className="mb-[100px]">
                <Text className="text-[24px] text-[#000000] font-Nunito-Bold mt-[16px] mb-[16px]">
                  About Yourself
                </Text>
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor="#00000080"
                  value={Firstname}
                  onChangeText={setFirstName}
                  className="flex-1 p-3 px-4 text-[16px] font-Nunito-Regular  text-[#000000] h-[55px] bg-white border border-pastelgreyBorder rounded-[20px]"
                  style={{lineHeight: 22}}
                />
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor="#00000080"
                  value={Lastname}
                  onChangeText={setLastName}
                  className="flex-1 text-[#000000] text-[16px] font-Nunito-Regular p-3 px-4 h-[55px] bg-white border border-pastelgreyBorder rounded-[20px] mt-[10px]"
                  style={{lineHeight: 22}}
                />
                <TextInput
                  placeholder="Phone no"
                  placeholderTextColor="#00000080"
                  value={phoneNo}
                  onChangeText={setPhoneNo}
                  className="text-[#000000] mt-[15px] pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px] text-[16px] font-Nunito-Regular bg-white border border-pastelgreyBorder rounded-[20px]"
                  style={{lineHeight: 22}}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#00000080"
                  value={email}
                  onChangeText={setEmail}
                  className="text-[#000000] mt-[15px] pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px] text-[16px] font-Nunito-Regular bg-white border border-pastelgreyBorder rounded-[20px]"
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

                <Text className="text-[24px] text-[#000000] font-PTSans-Bold mt-[29.9px] mb-[14.1px]">
                  Business Details
                </Text>
                <TextInput
                  placeholder="Company Name"
                  placeholderTextColor="#BBBCB7"
                  value={companyName}
                  onChangeText={setcompanyName}
                  className="mt-[20px] bg-white border font-Nunito-Regular border-pastelgreyBorder text-[#000000] text-[16px] h-[60px] pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px] rounded-[20px] mb-[15px]"
                  style={{lineHeight: 22}}
                />
                <TextInput
                  placeholder="GSTIN"
                  placeholderTextColor="#BBBCB7"
                  value={gstin}
                  onChangeText={setGstIn}
                  className="bg-white border font-Nunito-Regular border-pastelgreyBorder text-[#000000] text-[15px] h-[60px] pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px] rounded-[20px]"
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
              await storeGroomerData();
              navigation.navigate(screens.AddGrommerAddress);
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

export default GroomerDetails;