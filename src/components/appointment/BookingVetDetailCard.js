import {View, Text, Image} from 'react-native';
import React from 'react';
import images from '../../assets/images';

const BookingVetDetailCard = ({children}) => {
  return (
    <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl p-[15px] ">
      <View className="flex-row gap-[15px]">
        <Image source={images.VetImage} className="h-[68px] w-[68px]" />
        <View>
          <Text className="text-[16px] text-darkGunmetal font-Nunito-Bold">
            Dr. Jeevan Kumar
          </Text>
          <Text className="my-[7px] text-[12px] text-gray-500 leading-[18px] font-Nunito-Regular">
            Master of veterinary science
          </Text>
          <View className="flex-row items-center gap-[5px]  mb-[11px]">
            <Image source={images.star} className="h-[10px] w-[10px]" />
            <Text className="font-Nunito-Regular">
              4.9/5{' '}
              <Text className="text-[12px] text-gray-400">(134 Review)</Text>
            </Text>
          </View>
          <View className=" flex-row gap-2 items-center">
            <Text className="text-[12px] text-gray-500 font-Nunito-Regular">
              Home Visit
            </Text>
            <View className=" h-4 w-[2px] bg-pastelgreyBorder" />
            <Text className=" px-2 bg-[#FBA53726] rounded-lg py-1 text-[#FBA537] font-Nunito-Regular text-[12px]">
              Scheduled
            </Text>
          </View>
        </View>
      </View>
      {children}
    </View>
  );
};

export default BookingVetDetailCard;
