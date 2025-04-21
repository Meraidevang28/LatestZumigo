import {View, Text} from 'react-native';
import React from 'react';

const TitleCard = ({title, text, backgroundcolor, headerIconcolor}) => {
  return (
    <View className={`pb-4 pl-[15px] pr-[45px] ${backgroundcolor} rounded-2xl`}>
      <View className={`h-[6px] w-[30px] ${headerIconcolor} rounded-b-lg`} />
      <Text className="mt-[9.3px] mb-[7.7px] text-[16px] text-darkGunmetal font-Nunito-Bold">
        {title}
      </Text>
      <Text className="text-[#7F7E7C] font-Nunito-Regular">{text}</Text>
    </View>
  );
};

export default TitleCard;
