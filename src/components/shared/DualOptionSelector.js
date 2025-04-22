import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const DualOptionSelector = ({title1, title2, slected, setSelected}) => {
  return (
    <View className=" flex-row gap-[15px]">
      <TouchableOpacity
        className={` flex-1  py-[17px] rounded-full items-center border ${
          slected === title1
            ? ' bg-primary border-primary'
            : ' bg-white  border-[#BBBCB7]'
        }`}
        onPress={() => setSelected(title1)}>
        <Text
          className={` text-[16px]  leading-[22px] ${
            slected === title1
              ? ' text-white font-Nunito-Bold'
              : ' text-[#BBBCB7] font-Nunito-Regular'
          }`}>
          {title1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={` flex-1  py-[17px] rounded-full items-center border ${
          slected === title2
            ? ' bg-primary border-primary'
            : ' bg-white  border-[#BBBCB7]'
        }`}
        onPress={() => setSelected(title2)}>
        <Text
          className={` text-[16px]  leading-[22px] ${
            slected === title2
              ? ' text-white font-Nunito-Bold'
              : ' text-[#BBBCB7] font-Nunito-Regular'
          }`}>
          {title2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DualOptionSelector;
