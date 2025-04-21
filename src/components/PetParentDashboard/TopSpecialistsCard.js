import {View, Text, Image} from 'react-native';
import React from 'react';
import images from '../../assets/images';

const TopSpecialistsCard = ({doctor}) => {
  return (
    <View className="flex-row  bg-pastelGrey rounded-[10px] mb-[10px] border border-pastelgreyBorder py-[9px] pl-[11px] gap-[14px]">
      <Image
        source={doctor.image}
        className="w-[62px] h-[62px] rounded-[15px]"
      />
      <View>
        <Text className="font-Proxima-Nova-Bold text-[16px]">
          {doctor.name}
        </Text>
        <Text className="font-Proxima-Nova-Bold text-[13px] opacity-55">
          {doctor.degree}
        </Text>
        <View className="flex-row items-center mt-1 gap-[7px]">
          <Image source={images.star} className=" h-[14px] w-[14px]" />
          <Text className="font-Proxima-Nova-Bold text-[13px]">
            {doctor.rating}
          </Text>
          <Text className="font-Proxima-Nova-Bold text-[13px] opacity-55">
            ({doctor.reviews} Reviews)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TopSpecialistsCard;
