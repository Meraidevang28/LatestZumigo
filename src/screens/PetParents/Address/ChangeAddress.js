import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AddressDetailCard from '../../../components/appointment/AddressDetailCard';
import {TextInput} from 'react-native-gesture-handler';
import images from '../../../assets/images';
import SearchByInput from '../../../components/shared/SearchByInput';
import screens from '../../../constants/screens';

const ChangeAddress = ({navigation}) => {
  const addresses = [
    {
      title: 'Home',
      address:
        'Park View Estate, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034, India',
    },
    {
      title: 'Hyderabad',
      address:
        'Park View Estate, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034, India',
    },
    {
      title: 'Bangalore',
      address:
        'No.31, 2nd Floor, HRG Arcade, Outer Ring Road Above Cafe Coffee Day, Diagonally Opposite Bangalore Central Mall, Bellandur, Bengaluru, Karnataka 560103, India',
    },
  ];

  return (
    <View className="flex-1 bg-white px-6">
      <View className=" mb-[10px] mt-5">
        {/* search bar  */}
        <SearchByInput />
      </View>
      {/* Use Current Location */}
      <TouchableOpacity className="flex-row items-center mt-3">
        <Image
          source={images.currentLocation}
          className="h-[20px] w-[20px]"
          resizeMode="contain"
        />
        <Text className=" text-primary ml-2 font-Nunito-Regular">
          Use current location
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-4"
        onPress={() => navigation.navigate(screens.AddAddress)}>
        <Text className="text-primary font-Nunito-Regular">
          + Add new address
        </Text>
      </TouchableOpacity>

      <View className=" my-5">
        <Text className=" text-[18px] font-Nunito-Bold">Saved Addresses</Text>
      </View>
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        {addresses.map((item, index) => (
          <View className=" mb-4" key={index}>
            <AddressDetailCard title={item?.title} address={item?.address} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChangeAddress;
