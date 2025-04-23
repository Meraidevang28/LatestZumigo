import {View, Text, Image} from 'react-native';
import React from 'react';
import images from '../../assets/images';

const TopSpecialistsCard = ({doctor}) => {
  return (
    <View className="flex-row  bg-pastelGrey rounded-[10px] mb-[10px] border border-pastelgreyBorder py-[9px] pl-[11px] gap-[14px]">
      <Image
        source={doctor.image}
        className="w-[80px] h-[80px] rounded-[15px]"
      />
      <View>
        <Text className="font-PTSans-Bold text-[16px]">{doctor.name}</Text>
        <Text className="font-Nunito-Bold text-[14px] opacity-55 mt-[4px] mb-[4px]">
          {doctor.degree}
        </Text>
        <View className="flex-row items-center mt-1 gap-[7px]">
          <Image source={images.star} className=" h-[24px] w-[24px]" />
          <Text className="font-Nunito-Bold text-primary text-[16px]">
            {doctor.rating}
          </Text>
          <Text className="font-Nunito-Regular text-[#838999] text-[13px] opacity-55">
            ({doctor.reviews} Reviews)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TopSpecialistsCard;
