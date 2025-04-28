import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar} from 'react-native-calendars';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import BottomSheet from '../../../components/shared/BottomSheet';
import {FlatList} from 'react-native-gesture-handler';
import screens from '../../../constants/screens';
import DualOptionSelector from '../../../components/shared/DualOptionSelector';
import CustomTextInput from '../../../components/shared/CustomTextInput';
import WheelPicker from '@quidone/react-native-wheel-picker';
import Modal from 'react-native-modal';
import SearchByInput from '../../../components/shared/SearchByInput';
import {primary} from '../../../assets/theme/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, Platform} from 'react-native';
import {API_BASE_URL, PET_TYPE, PET_BREED_GENDER, ADD_PET, UPLOAD} from '@env';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import RNFS from 'react-native-fs';
const AddYourPetHomeVisit = ({navigation, route}) => {
  const isHomeVisit = route?.params?.isHomeVisit;
  const tilte = route?.params?.title || null;
  const goBack = route?.params?.goBack;

  useEffect(() => {
    if (tilte) {
      navigation.setOptions({title: route?.params?.title});
    }
  }, []);
  const environmantUUID = '9549B2F6-0350-4484-9269-58F85A4FFxx1';
  const [petType, setPetType] = useState('Dog');
  const [petTypes, setPetTypes] = useState([]);
  const [selectedPetUUID, setSelectedPetUUID] = useState(null);
  const [petName, setPetName] = useState('');
  const [gender, setGender] = useState(null);
  const [weight, setWeight] = useState('');
  const [microchip, setMicrochip] = useState('');
  const [kci, setKci] = useState(false);
  const [month, setMonth] = useState(null);
  const [age, setAge] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [search, setSearch] = useState('');
  const breedRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const closeBreedBottomSheet = () => breedRef.current?.close();
  const openBreedBottomSheet = () => breedRef.current?.present();
  const today = moment().format('YYYY-MM-DD');
  const data = [...Array(13).keys()].map(index => ({
    value: index,
    label: index < 10 ? `0${index}` : String(index),
  }));
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleKciSwitch = () => setKci(previousState => !previousState);
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
                if (!res.didCancel && !res.errorCode) {
                  setSelectedImage(res.assets[0]);
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
              if (!res.didCancel && !res.errorCode) {
                setSelectedImage(res.assets[0]);
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

  useEffect(() => {
    const fetchPetTypes = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token'); // or whatever your key is
        if (!token) throw new Error('No token found');

        const response = await fetch(
          `${API_BASE_URL}${PET_TYPE}?EnvironmentUuid=${environmantUUID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log('Raw API response:', text);
        const data = JSON.parse(text);

        setPetTypes(data);
        const defaultPet = data.find(p => p.PetType_Name === 'Dog');
        if (defaultPet) {
          setSelectedPetUUID(defaultPet.UUID);
        }
      } catch (error) {
        console.error('Error fetching pet types:', error);
      }
    };

    fetchPetTypes();
  }, []);
  const handlePetSelect = type => {
    setPetType(type);
    const selectedPet = petTypes.find(p => p.PetType_Name === type);
    if (selectedPet) {
      setSelectedPetUUID(selectedPet.UUID);
    }
  };

  const [petBreeds, setPetBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  useEffect(() => {
    const fetchBreedsAndGenders = async () => {
      if (!selectedPetUUID) return;

      try {
        const token = await AsyncStorage.getItem('auth_token');

        const response = await fetch(
          `${API_BASE_URL}${PET_BREED_GENDER}?EnvironmentUuid=${environmantUUID}&PetTypeUuid=${selectedPetUUID}`,
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

        const result = await response.json();
        setPetBreeds(result.PetBreeds || []);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreedsAndGenders();
  }, [selectedPetUUID]);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const handleCalendarToggle = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleDateSelect = date => {
    setSelectedDate(date.dateString); // Save the selected date
    setIsCalendarVisible(false); // Close the calendar
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

      // formData.append('filepath', '/Petimg/');
      const uploadUrl = `${API_BASE_URL}${UPLOAD}?filepath=/Petimg/`;

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // No need to manually set 'Content-Type'
        },
        body: formData,
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      const data = isJson
        ? await response.json()
        : JSON.parse(await response.text());

      if (response.ok && data?.Paths?.length > 0) {
        const filePath = data.Paths[0];
        console.log('Image uploaded:', filePath);
        return filePath;
      } else {
        console.error('Image upload failed:', data);
        return null;
      }
    } catch (err) {
      console.error('Upload error:', err);
      return null;
    }
  };

  const addPet = async () => {
    if (!petName || !selectedPetUUID || !age || !weight) {
      Toast.show({
        type: 'error',
        text1: 'Missing Info',
        text2: 'Please fill all required fields.',
      });
      return false;
    }
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const useruuid = await AsyncStorage.getItem('userUUID');
      // const base64Image = await convertImageToBase64(selectedImage);

      const uploadedFileName = await uploadPetImage(selectedImage);
      if (!uploadedFileName) {
        Alert.alert('Upload Failed', 'Failed to upload pet image.');
        return false;
      }

      const response = await fetch(`${API_BASE_URL}${ADD_PET}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserUUID: useruuid,
          Pet_Image: uploadedFileName,
          Pet_Name: petName,
          PetBreed_Uuid: selectedBreed,
          Age: String(age), // ✅ Correct key
          Weight: String(weight),
          MicrochipNumber: String(microchip),
          DateofMicrochipping: selectedDate,
          GenderUUID: gender, // ✅ Correct key
          PetTypeUUID: selectedPetUUID, // ✅ Needs to be added
          AddedIP: '127.0.0.1', // ✅ Mocked IP for now
          IsAddedBy: useruuid, // ✅ Assuming userUUID is the one who added
          KCI_Status: kci,
          IsDefault: true,
          IsDisplay: true,
          IsActive: true,
        }),
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      const responseBody = isJson
        ? await response.json()
        : await response.text();

      if (response.ok) {
        console.log('Pet added successfully:', responseBody);

        await AsyncStorage.setItem(
          'last_added_pet',
          JSON.stringify(responseBody),
        );

        navigation.navigate(screens.SelectSymptoms, {
          ...(isHomeVisit ? {isHomeVisit: true} : {}),
        });
        return true;
      } else {
        console.error(`Failed to add pet. Status: ${response.status}`);
        console.log('Response body:', responseBody);
        return false;
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  console.log('petName', petName);
  console.log(age, month);
  console.log(selectedBreed);
  console.log(gender);
  console.log(weight);
  console.log(microchip);
  console.log(selectedDate);
  console.log(petType);
  const inputRef = useRef(null);
  const weightInputRef = useRef(null);
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white "
        showsVerticalScrollIndicator={false}>
        <Text className=" mt-5 text-[26px] font-PTSans-Bold text-darkGunmetal">
          Add your pet!
        </Text>
        {/* Dog / Cat Toggle */}
        <View className="my-5 flex-row bg-pastelGrey rounded-2xl overflow-hidden ">
          <TouchableOpacity
            className={`flex-1 p-[15px] items-center  rounded-2xl ${
              petType === 'Dog' ? ' bg-primary' : ''
            }`}
            // onPress={() => setPetType('Dog')}>
            onPress={() => handlePetSelect('Dog')}>
            <Text
              className={` text-[16px]  leading-[22px] ${
                petType === 'Dog'
                  ? ' text-white  font-Nunito-Bold'
                  : ' text-[#969492] font-Nunito-Regular'
              }`}>
              Dog
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-[15px] items-center  rounded-2xl ${
              petType != 'Dog' ? ' bg-primary' : ''
            }`}
            // onPress={() => setPetType('Cat')}>
            onPress={() => handlePetSelect('Cat')}>
            <Text
              className={` text-[16px]   leading-[22px] ${
                petType != 'Dog'
                  ? ' text-white font-Nunito-Bold'
                  : ' text-[#969492] font-Nunito-Regular'
              }`}>
              Cat
            </Text>
          </TouchableOpacity>
        </View>

        {/* Image Upload */}
        <View className=" flex-row gap-[10px] mb-[15px]">
          <TouchableOpacity
            className="h-[100px] w-[100px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl items-center justify-center"
            onPress={selectedImage ? null : selectImage} // Disable open if image is already there
          >
            {selectedImage ? (
              <>
                <Image
                  source={{uri: selectedImage.uri}}
                  className="h-full w-full rounded-2xl"
                  resizeMode="cover"
                />
                {/* Remove Button */}
                <TouchableOpacity
                  onPress={() => setSelectedImage(null)}
                  className="absolute top-1 right-1 bg-primary p-1 rounded-full ">
                  <Text className="text-white text-xs">✕</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image
                  source={images.imagePlaceholder}
                  className=" h-5 w-5"
                  resizeMode="contain"
                />
                <Text className=" font-Nunito-Regular text-[12px] opacity-50">
                  Add image
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        {/* Input Fields */}

        <CustomTextInput
          placeholder="Enter pet name"
          value={petName}
          onChangeText={setPetName}
        />

        <TouchableOpacity
          className={`p-[19px] rounded-[20px] flex-row justify-between items-center mb-[15px] border border-[#BBBCB7] 
           
          }`}
          onPress={openBreedBottomSheet}>
          <Text
            className={`font-Nunito-Regular text-[16px] ${
              selectedBreed ? 'text-[#000000]' : 'text-[#BBBCB7]'
            }`}>
            {selectedBreed ? selectedBreed : 'Breed*'}
          </Text>
          <Image
            source={images.secondaryBack}
            resizeMode="contain"
            className="h-[14px] w-[14px] rotate-90"
            tintColor="grey"
          />
        </TouchableOpacity>
        {/* Gender Selection */}
        <View className=" mb-[15px]">
          <DualOptionSelector
            title1="Male"
            title2="Female"
            slected={gender}
            setSelected={setGender}
          />
        </View>
        {/* Age Dropdown */}
        <TouchableOpacity
          className=" bg-white border border-[#BBBCB7] p-[19px] rounded-[20px] flex-row justify-between items-center mb-[15px]"
          onPress={() => setModalVisible(true)}>
          <Text
            className={`font-Nunito-Regular ${
              age !== null ? 'text-black' : 'text-[#BBBCB7]'
            }`}>
            {age !== null
              ? month === null || month === '0'
                ? `${age} Years`
                : `${age} Years ${month} Months`
              : 'Age'}
          </Text>
          <Image
            source={images.secondaryBack}
            resizeMode="contain"
            className=" h-[14px] w-[14px] rotate-90"
            tintColor="grey"
          />
        </TouchableOpacity>
        {/* Weight Input */}
        <TouchableWithoutFeedback
          onPress={() => weightInputRef.current?.focus()}>
          <View className="border border-[#BBBCB7] bg-white rounded-[20px] mb-[15px] py-[8px] px-[19px] items-center flex-row">
            <TextInput
              ref={weightInputRef}
              className="flex-1 font-Nunito-Regular"
              placeholder="Weight"
              keyboardType="numeric"
              value={weight}
              placeholderTextColor="#BBBCB7"
              onChangeText={setWeight}
            />
            <Text className="font-Nunito-Regular text-black opacity-50">
              Kgs
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text className=" text-[24px] font-Nunito-Bold mb-[10px]">
          Microchipping Details
        </Text>

        <View className="flex-row justify-between items-center px-4 py-2 bg-[#f7f7f7] border border-[#BBBCB7] h-[63px] rounded-[20px] mb-[10px]">
          <Text
            className="text-[16px] text-[#000000] font-Nunito-Regular"
            style={{fontWeight: 400}}>
            Is your pet microchipped?
          </Text>
          <View style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}>
            <Switch
              trackColor={{false: '#ccc', true: primary}}
              thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#ccc"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        {isEnabled && (
          <>
            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
              <View className="bg-white border border-[#BBBCB7] p-[10px] rounded-[20px] flex-row justify-between items-center mb-[15px]">
                <TextInput
                  ref={inputRef}
                  placeholder="Microchip number"
                  value={microchip}
                  onChangeText={text => setMicrochip(text)}
                  placeholderTextColor="#BBBCB7"
                  className="font-Nunito-Regular text-[#000000] text-[16px] flex-1"
                />
                <Image
                  source={images.Microchipping}
                  resizeMode="contain"
                  className="h-[35px] w-[35px] ml-2"
                  tintColor="grey"
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
              className=" bg-white border border-[#BBBCB7] p-[19px] rounded-[20px] flex-row justify-between items-center mb-[15px]"
              onPress={handleCalendarToggle}>
              <Text
                className={`font-Nunito-Regular text-[16px] ${
                  selectedDate ? 'text-black' : 'text-[#BBBCB7]'
                }`}>
                {selectedDate ? selectedDate : 'Date of microchipping'}
              </Text>
              <Image
                source={images.calenderIcon}
                resizeMode="contain"
                className=" h-[18px] w-[18px]"
                tintColor="grey"
              />
            </TouchableOpacity>
            {isCalendarVisible && (
              <Calendar
                onDayPress={handleDateSelect}
                markedDates={{
                  [selectedDate]: {selected: true, selectedColor: '#D75880'},
                  [today]: {
                    customStyles: {
                      container: {backgroundColor: '#FFD6E0'},
                      text: {color: '#D75880', fontWeight: 'bold'},
                    },
                  },
                }}
                markingType={'custom'}
                theme={{
                  arrowColor: '#D75880', // pink arrow color
                }}
              />
            )}
          </>
        )}

        <Text className=" text-[24px] font-Nunito-Bold mb-[10px]">
          KCI Registration
        </Text>
        <View className="pb-[100px]">
          <View className="flex-row justify-between items-center px-4 py-2 bg-[#f7f7f7] border border-[#BBBCB7] h-[63px] rounded-[20px] mb-[10px]">
            <Text
              className="text-[16px] text-[#000000] font-Nunito-Regular"
              style={{fontWeight: 400}}>
              Do you have an KCI Registration?
            </Text>
            <View style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}>
              <Switch
                trackColor={{false: '#ccc', true: primary}}
                thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#ccc"
                onValueChange={toggleKciSwitch}
                value={kci}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <FooterBtn title="Save" onClick={addPet} /> */}
      <FooterBtn
        title="Save"
        onClick={() => {
          if (goBack) {
            navigation.goBack();
          } else {
            navigation.navigate(screens.SelectSymptoms, {
              ...(isHomeVisit ? {isHomeVisit: true} : {}),
            });
          }
        }}
        //         // onClick={addPet}
      />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View className="bg-white p-5 rounded-t-2xl">
          <View style={{backgroundColor: 'white'}}>
            <View className="px-6">
              {/* <Text className="mt-6 font-Nunito-Bold text-[18px]">Age</Text> */}

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 30,
                  }}>
                  {/* Years Label */}
                  <View style={{alignItems: 'center'}}>
                    <Text className="font-Nunito-Bold text-[24px] mt-4">
                      Years
                    </Text>

                    <WheelPicker
                      data={data}
                      value={44}
                      style={{zIndex: 1}}
                      onValueChanged={({item: {value}}) => setAge(value)}
                      overlayItemStyle={{backgroundColor: '#ffffff'}}
                      itemTextStyle={{
                        fontFamily: 'Nunito-Bold',
                        fontSize: 18,
                        color: '#333',
                        borderBottomWidth: 1,
                        width: 110,
                        borderBottomColor: '#FFEDF9',
                        paddingBottom: 4, // for spacing
                      }}
                    />
                  </View>

                  {/* Months Label */}
                  <View style={{alignItems: 'center'}}>
                    <Text className="font-Nunito-Bold text-[24px] mt-4">
                      Months
                    </Text>

                    <WheelPicker
                      data={data}
                      value={44}
                      style={{zIndex: 1}}
                      onValueChanged={({item: {value}}) => setMonth(value)}
                      overlayItemStyle={{backgroundColor: '#ffffff'}}
                      itemTextStyle={{
                        fontFamily: 'Nunito-Bold',
                        fontSize: 18,
                        color: '#333',
                        borderBottomWidth: 1,
                        width: 120,
                        borderBottomColor: '#FFEDF9',
                        paddingBottom: 4, // for spacing
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className="w-full bottom-0">
            <View className="my-4">
              <TouchableOpacity
                className="rounded-full bg-[#d75880] w-full items-center"
                onPress={() => setModalVisible(false)}>
                <Text className="text-white font-Nunito-Bold text-[20px] py-5">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomSheet ref={breedRef} snapPoints={['75%']}>
        <View className="px-6">
          <Text className="mt-6 font-Nunito-Bold text-[18px]">Pet breed</Text>

          <View className="mb-[5px] mt-5">
            {/* search bar */}
            <SearchByInput />
          </View>

          <FlatList
            data={petBreeds}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.UUID}
            renderItem={({item}) => (
              <TouchableOpacity
                className="p-4 flex-row border-b-pastelgreyBorder border-b py-[15.5px] justify-between"
                onPress={() => {
                  setSelectedBreed(item.Pet_Breed);
                  closeBreedBottomSheet();
                }}>
                <Text
                  className={`${
                    selectedBreed === item.Pet_Breed ? 'text-primary' : ''
                  }`}
                  style={{fontFamily: 'Nunito-Regular', fontWeight: 400}}>
                  {item.Pet_Breed}
                </Text>
                {selectedBreed === item.Pet_Breed && (
                  <Image
                    source={images.footPrint}
                    className="w-5 h-[17px]"
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default AddYourPetHomeVisit;
