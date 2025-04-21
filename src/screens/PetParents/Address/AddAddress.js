import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import CustomTextInput from '../../../components/shared/CustomTextInput';

const AddAddress = ({navigation}) => {
  const [formData, setFormData] = useState({
    flatNo: '',
    apartment: '',
    directions: '',
    street: '',
    state: '',
    city: '',
    pincode: '',
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
        <View className=" mt-5 mb-[5.8px]">
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
        <Text
          style={{fontFamily: 'Proxima-Nova-Medium'}}
          className=" opacity-50 mb-[10px]">
          Save as
        </Text>
        <View className="flex-row justify-between flex-1 gap-[8.5px]">
          {[
            {
              type: 'Home',
              image: images.Home,
              dimention: 'h-[14px] w-[13.29px]',
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
                  {tintColor: '#A9A7A5'},
                  selectedType === item?.type && {tintColor: 'white'},
                ]}
              />
              <Text
                className={`${
                  selectedType === item?.type
                    ? ' text-white'
                    : ' text-[#333333] opacity-40'
                }`}
                style={{fontFamily: 'Proxima-Nova-Regular'}}>
                {item?.type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <FooterBtn title="Save" />
    </View>
  );
};

export default AddAddress;
