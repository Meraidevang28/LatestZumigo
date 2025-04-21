import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ConfirmationBottomSheet = ({
  title,
  onAcceptClick = () => {},
  onDeclineClick = () => {},
  acceptText = 'Yes',
  declineText = 'No',
}) => {
  return (
    <View className="px-6">
      <View className="mt-[46px] mb-[32px]">
        {/* image will go here  */}
        <View className="h-[67px] w-[158px]  bg-[#F5F3F0] mx-auto rounded-lg"></View>
      </View>
      <Text className="mb-[89px] text-[26px] text-center font-medium  font-Nunito-Bold mx-6">
        {title}
      </Text>
      <View className="flex flex-row gap-[15px] mb-[50px]">
        <TouchableOpacity
          className="flex-1 bg-primaryOpacity-20 py-5 items-center rounded-2xl"
          onPress={onDeclineClick}>
          <Text className="text-[20px] font-Nunito-Bold text-primary">
            {declineText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-primary py-5 items-center rounded-2xl"
          onPress={onAcceptClick}>
          <Text className="text-[20px] font-semibold text-white font-Nunito-Bold">
            {acceptText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmationBottomSheet;
