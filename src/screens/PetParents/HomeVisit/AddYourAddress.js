import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import images from '../../../assets/images';
import screens from '../../../constants/screens';

const AddYourAddress = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white mb-[100px]"
        showsVerticalScrollIndicator={false}>
        <Text className="  my-5 font-Nunito-Bold text-[26px]">
          Add your Address
        </Text>
        <TouchableOpacity
          className=" flex-row w-full justify-center items-center bg-white border-2 border-primary  rounded-full py-2 gap-2"
          onPress={() => navigation.navigate(screens.MapViewScreenParent)}>
          <Text className="text-[30px] font-Nunito-Bold  text-primary">+</Text>
          <Text className=" font-Nunito-Bold text-[21px] text-primary">
            Add Address
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 items-center pb-4">
        <Image
          source={images.addressIcon}
          resizeMode="contain"
          style={{width: 600, height: 300}}
        />
      </View>
    </View>
  );
};

export default AddYourAddress;
