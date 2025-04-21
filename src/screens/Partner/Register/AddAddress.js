import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import images from '../../../assets/images';
import screens from '../../../constants/screens';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
const AddAddress = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6">
      <View className="mt-[15px] mb-2">
        <RegistrationProgressBar screenNo={2} />
      </View>
      <ScrollView
        className="flex-1 bg-white mb-[100px]"
        showsVerticalScrollIndicator={false}>
        <Text className="  my-5 font-Nunito-Bold text-[26px]">
          Add your Address
        </Text>
        <TouchableOpacity
          className=" flex-row w-full justify-center items-center bg-white border-2 border-primary  rounded-full py-2 gap-2"
          onPress={() => navigation.navigate(screens.MapViewScreenVet)}>
          <Text className="text-[30px]  text-primary">+</Text>
          <Text className=" font-Nunito-Bold text-[21px] text-primary">
            Add Address
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 items-center pb-4">
        <Image source={images.addressIcon} resizeMode="contain" />
      </View>
    </View>
  );
};

export default AddAddress;
