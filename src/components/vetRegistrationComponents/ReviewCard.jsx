import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ReviewCard = ({initials, name, day}) => {
  return (
    <View className="w-[345px] flex flex-col">
      <View className="flex flex-row items-center gap-[8px]">
        <View className="w-[33px] h-[33px] bg-yellow rounded-[50%] items-center justify-center">
          <Text className="text-[15px] font-Nunito-Bold text-white items-center">
            {initials}
          </Text>
        </View>
        <Text className="text-[15px] font-Nunito-Bold text-[#000000]">
          {name}
        </Text>
      </View>
      <View className="flex flex-row mt-[8px] gap-[8.2px] items-center">
        <View className="flex flex-row">
          <Image
            source={require('../../assets/images/star.png')}
            className="w-[8.36px] h-[8.01px]"
          />
          <Image
            source={require('../../assets/images/star.png')}
            className="w-[8.36px] h-[8.01px]"
          />
          <Image
            source={require('../../assets/images/star.png')}
            className="w-[8.36px] h-[8.01px]"
          />
          <Image
            source={require('../../assets/images/star.png')}
            className="w-[8.36px] h-[8.01px]"
          />
          <Image
            source={require('../../assets/images/star.png')}
            className="w-[8.36px] h-[8.01px]"
          />
        </View>
        <Text className="text-[10px] font-Nunito-Regular text-[#7f7f7f] mr-[4.2px]">
          {day} days ago
        </Text>
      </View>
      <Text className="text-[15px] font-Nunito-Bold text-[#000000] mt-[18px]">
        Phasellus dapibus efficitur aliquam
      </Text>
      <Text className="text-[15px] font-Nunito-Regular text-[#7f7f7f] mt-[9px]">
        Phasellus dapibus efficitur aliquam. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas. Nulla
        facilisi. Nullam dictum nibh a ultrices porttitor.
      </Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({});
