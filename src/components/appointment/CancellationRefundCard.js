import {View, Text} from 'react-native';
import React from 'react';

const CancellationRefundCard = () => {
  return (
    <View className="p-[15px] pr-[49px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
      <Text className=" opacity-60 font-Nunito-Regular">
        Free cancellations/reschedules if done before 24hrs or if a professional
        isn’t assigned. A fee will be charged otherwise…
      </Text>
      <Text className=" underline mt-3 font-Nunito-Regular">Learn more</Text>
    </View>
  );
};

export default CancellationRefundCard;
