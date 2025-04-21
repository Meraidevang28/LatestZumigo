import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import CustomTextInput from '../../../components/shared/CustomTextInput';
import screens from '../../../constants/screens';
import AddressDetailCard from '../../../components/appointment/AddressDetailCard';

const GroomerAddressDetails = ({navigation}) => {
  const [formData, setFormData] = useState({
    flatNo: '',
    apartment: '',
    directions: '',
    street: 'Park View Estate, Road No. 2',
    state: 'Telangana',
    city: 'Hyderabad',
    pincode: '500034',
  });

  const [selectedType, setSelectedType] = useState('Home');

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

  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <Text className="   font-Nunito-Bold text-[24px] leading-9 mb-[10px]">
          Fill your Address Details
        </Text>
        <View className=" mb-[5.8px]">
          <View className=" mb-[15px]">
            <AddressDetailCard
              title="Banjara Hills"
              address="Park View Estate, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034, India "
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

        {/* Save as  */}
        <Text className=" opacity-50 mb-[10px] font-Nunito-Regular">
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
              dimention: 'h-[14px] w-[11.56px]',
            },
          ].map(item => (
            <TouchableOpacity
              key={item?.type}
              className={`py-[13px] border flex-1 justify-center gap-[6.5px] items-center rounded-2xl flex-row ${
                selectedType === item?.type
                  ? ' border-primary bg-primary'
                  : ' border-pastelgreyBorder bg-pastelGrey'
              } `}
              onPress={() => setSelectedType(item?.type)}>
              <Image
                source={item?.image}
                className={`${item?.dimention}
                }`}
                style={[
                  {
                    tintColor: '#A9A7A5',
                    resizeMode: 'contain',
                  },

                  selectedType === item?.type && {tintColor: 'white'},
                ]}
              />
              <Text
                className={` font-Nunito-Regular ${
                  selectedType === item?.type
                    ? ' text-white'
                    : ' text-[#333333] opacity-40'
                }`}>
                {item?.type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <FooterBtn
        title="Continue"
        onClick={() =>
          navigation.navigate(screens.GroomerServiceLocation, {
            isHomeVisit: true,
          })
        }
      />
    </View>
  );
};

export default GroomerAddressDetails;
