import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {Children} from 'react';
import images from '../../assets/images';

const ServiceInfoCard = ({
  image,
  name,
  qualification,
  onClick,
  rating,
  reviews,
  isSelected = false,
  children,
}) => {
  return (
    <TouchableOpacity
      className={`flex flex-row pt-[14.8px] pb-[15.4px] px-[14.5px] mb-[15px] rounded-2xl border  gap-[15px] ${
        isSelected
          ? ' bg-pastelPrimary border-primary'
          : 'border-pastelgreyBorder bg-pastelGrey'
      }`}
      onPress={onClick}>
      <Image source={image} className="h-[67px] w-[67px]  rounded-[10px]" />
      <View>
        <Text className="font-semibold text-[16px] text-darkGunmetal mb-[6.2px] font-Nunito-Bold">
          {name}
        </Text>
        <Text className=" text-black opacity-50 text-[12px] font-normal mb-[8.8px] font-Nunito-Regular">
          {qualification}
        </Text>

        <View className="flex-row gap-[6.1px]">
          <Image source={images.star} className=" h-[10px] w-[10.43px]" />
          <Text className="text-[14px] font-normal mb-[8.8px] leading-none  font-Nunito-Regular text-black">
            {rating}{' '}
            <Text className=" text-gray-500 text-[12px] font-normal">
              ({reviews} Review)
            </Text>
          </Text>
        </View>
        {children}
      </View>

      {isSelected && (
        <Image
          source={images.footPrint}
          className=" w-[20px] h-[17.13px] absolute top-[10px] right-[10.5px]"
        />
      )}
    </TouchableOpacity>
  );
};

export default ServiceInfoCard;
