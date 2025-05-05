import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import CustomTextInput from '../../../components/shared/CustomTextInput';
import screens from '../../../constants/screens';
import AddressDetailCard from '../../../components/appointment/AddressDetailCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL, ADD_USER_ADDRESS} from '@env';

const FillAddressDetailsGroomer = ({navigation}) => {
  const [formData, setFormData] = useState({
    flatNo: '',
    apartment: '',
    directions: '',
    street: '',
    state: '',
    city: '',
    pincode: '',
    country: '',
  });

  const [selectedType, setSelectedType] = useState('Home');
  const [fullAddress, setFullAddress] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [userTypeUuid, setUserTypeUuid] = useState('');
  const [userMasterUuid, setUserMasterUuid] = useState('');

  const inputFields = [
    {key: 'flatNo', label: 'Flat No/ Door No'},
    {key: 'apartment', label: 'Apartment'},
    {key: 'directions', label: 'Directions to reach (Optional)'},
    {key: 'street', label: 'Street'},
    {key: 'state', label: 'State'},
    {key: 'city', label: 'City'},
    {key: 'pincode', label: 'Pincode'},
  ];

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const formatFullAddress = () => {
    const {
      flatNo,
      apartment,
      street,
      directions,
      city,
      state,
      pincode,
      country,
    } = formData;
    let addressParts = [
      flatNo,
      apartment,
      street,
      directions,
      city,
      state,
      pincode,
      country,
    ];
    return addressParts.filter(part => part && part.trim()).join(', ');
  };

  useEffect(() => {
    setFullAddress(formatFullAddress());
  }, [formData]);

  useEffect(() => {
    const loadAddressData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('addressDetails');
        const token = await AsyncStorage.getItem('auth_token');
        const userType = await AsyncStorage.getItem('user_type_uuid');
        const userMaster = await AsyncStorage.getItem('userUUID');

        if (token) setAuthToken(token);
        if (userType) setUserTypeUuid(userType);
        if (userMaster) setUserMasterUuid(userMaster);

        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);

          const getValueByName = name =>
            parsedData.find(item => item.name === name)?.value || '';

          setFormData(prev => ({
            ...prev,
            flatNo: getValueByName('flatNumber'),
            apartment: getValueByName('apartmentName'),
            street: getValueByName('area'),
            city: getValueByName('city'),
            state: getValueByName('state'),
            pincode: getValueByName('pincode'),
            country: getValueByName('country'),
          }));
        }
      } catch (error) {
        console.error('Failed to load data from storage:', error);
      }
    };

    loadAddressData();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = {
        Master_Environment_UUID: '9549B2F6-0350-4484-9269-58F85A4FFxx1',
        UserType_uuid: userTypeUuid,
        UserMaster_uuid: userMasterUuid,
        Country_Uuid: formData.country,
        State_Uuid: formData.state,
        City_Uuid: formData.city,
        Flat_no: formData.flatNo,
        Apartment: formData.apartment,
        Directions_to_reach: formData.directions,
        Street: formData.street,
        Pin_Code: formData.pincode,
        IsDefault: true,
        IsDisplay: true,
        IsActive: true,
      };

      const response = await fetch(`${API_BASE_URL}${ADD_USER_ADDRESS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok) {
        // Alert.alert('Success', 'Address saved successfully!');
        navigation.navigate(screens.ParentDetails, {
          isHomeVisit: true,
        });
      } else {
        console.error(resData);
        Alert.alert('Error', resData.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('API call failed:', error);
      Alert.alert('Error', 'Failed to save address');
    }
  };
  const [selectedCategory, setSelectedCategory] = useState(1);
  // const {width, height} = Dimensions.get('window');
  // const scale = width / 375; // 375 is the base width (iPhone 6)
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
  // const screenWidth = Dimensions.get('window').width;
  // const uuid = consultation.UUID;
  // const name = consultation.Consultaytion_Name;
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <Text className="font-Nunito-Bold text-[24px] leading-9 mb-[10px]">
          Fill your Address Details
        </Text>
        <View className="mb-[5.8px]">
          <View className="mb-[15px]">
            <AddressDetailCard
              title={` ${selectedType}`}
              address={fullAddress}
            />
          </View>

          {inputFields.map(field => (
            <View key={field.key}>
              <CustomTextInput
                placeholder={field.label}
                value={formData[field.key]}
                onChangeText={value => handleInputChange(field.key, value)}
              />
            </View>
          ))}
        </View>

        <Text className="opacity-50 mb-[10px] font-Nunito-Regular">
          Save as
        </Text>
        <View className="flex-row justify-between flex-1 gap-[8.5px] mb-[100px]">
          {[
            {
              type: 'Home',
              image: images.homeIcon,
              dimention: 'h-[18px] w-[18.29px]',
            },
            {
              type: 'Office',
              image: images.Office,
              dimention: 'h-[14px] w-[14.73px]',
            },
            {
              type: 'Other',
              image: images.address,
              dimention: 'h-[10px] w-[8px]',
            },
          ].map(item => (
            <TouchableOpacity
              key={item?.type}
              className={`py-[13px] border flex-1 justify-center gap-[9.5px] items-center rounded-[50px] flex-row ${
                selectedType === item?.type
                  ? 'border-primary bg-primary'
                  : 'border-pastelgreyBorder bg-pastelGrey'
              }`}
              onPress={() => setSelectedType(item?.type)}>
              <Image
                source={item?.image}
                className={item?.dimention}
                style={[
                  {
                    tintColor: '#A9A7A5',
                    paddingBottom: 3,
                    resizeMode: 'contain',
                    // left: -3,
                    // backgroundColor: 'black',
                    padding: 10,
                  },
                  selectedType === item?.type && {tintColor: 'white'},
                ]}
              />
              <Text
                className={`font-Nunito-Regular ${
                  selectedType === item?.type
                    ? 'text-white'
                    : 'text-[#333333] opacity-40'
                }`}>
                {item?.type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <FooterBtn
        title="Continue"
        // onClick={handleSubmit}
        onClick={async () => {
          const selectedUUID = await AsyncStorage.getItem(
            'selected_consultation_uuid',
          );

          if (!selectedUUID) {
            Alert.alert('Please select a consultation type before continuing.');
            return;
          }

          navigation.navigate(screens.ParentDetailsGroomer);
        }}
      />
    </View>
  );
};

export default FillAddressDetailsGroomer;
