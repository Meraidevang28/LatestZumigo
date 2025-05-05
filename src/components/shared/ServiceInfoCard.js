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
  isSelected,
  children,
}) => {
  return (
    <TouchableOpacity
      className={`flex flex-row pt-[14.8px] pb-[15.4px] px-[14.5px] mb-[15px] mt-3 rounded-2xl border  gap-[15px] ${
        isSelected
          ? ' bg-pastelPrimary border-primary'
          : 'border-pastelgreyBorder bg-pastelGrey'
      }`}
      onPress={onClick}>
      <Image source={image} className="h-[90px] w-[90px]  rounded-[10px]" />
      <View>
        <Text
          className="text-[20px] font-PTSans-Bold  text-darkGunmetal mb-[3px] "
          style={{fontWeight: '700'}}>
          {name}
        </Text>
        <Text
          className=" text-black opacity-50 text-[14px] font-normal mb-[3px] font-Nunito-Regular"
          style={{fontWeight: '500'}}>
          {qualification}
        </Text>

        <View className="flex-row items-center gap-[6.1px]">
          <Image
            source={images.star}
            className=" h-[17px] w-[18px]"
            style={{bottom: 2}}
          />
          <Text
            className="text-[16px] font-Nunito-Regular text-primary"
            style={{fontWeight: '700'}}>
            {rating}{' '}
            <Text className=" text-[#838999] text-[13px] font-normal">
              ({reviews} Review)
            </Text>
          </Text>
        </View>
        {children}
      </View>

      {isSelected && (
        <Image
          source={images.footPrint}
          className=" w-[20px] h-[17.13px] absolute top-[16px] right-[10.5px]"
        />
      )}
    </TouchableOpacity>
  );
};

export default ServiceInfoCard;
