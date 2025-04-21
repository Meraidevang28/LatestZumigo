import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const CircleDesign = () => {
  return (
    <View className="flex flex-row gap-[30.2px] mt-[20.8px] mb-[24.3px] ml-[30px]">
      <View className="w-[120px] h-[120px]">
        <Image
          source={require('../../assets/images/circle.png')}
          className="w-[118.75px] h-[118.75px]"
        />
      </View>
      <View className="flex flex-col gap-[22px] mr-[50px]">
        <View>
          <Text className="text-[14px] font-Nunito-Regular text-[#787A82]">
            Earning
          </Text>
          <Text className="w-[15px] h-[3px] bg-[#FBA537] rounded-[15px] mt-[5px]"></Text>
          <Text className="font-Nunito-Bold text-[20px] text-[#1C222F]">
            1,32,499.00
          </Text>
        </View>
        <View>
          <Text className="text-[14px] font-Nunito-Regular text-[#787A82]">
            Settled
          </Text>
          <Text className="w-[15px] h-[3px] bg-[#6319C4] rounded-[15px] mt-[5px]"></Text>
          <Text className="font-Nunito-Bold text-[20px] text-[#1C222F]">
            92,674.00
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CircleDesign;

const styles = StyleSheet.create({});
