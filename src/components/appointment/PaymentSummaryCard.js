import {View, Text} from 'react-native';
import React from 'react';

const PaymentSummaryCard = () => {
  return (
    <View className="p-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
      <View className="flex-row justify-between mb-[14px]">
        <Text className="text-[16px]  font-Proxima-Nova-Semibold ">
          Service Charges
        </Text>
        <Text className="text-[14px]  opacity-60 font-Nunito-Regular">
          ₹9,399
        </Text>
      </View>
      <View className="flex-row justify-between mb-[14px]">
        <Text className="text-[14px]  opacity-60 font-Nunito-Regular">
          GST and other charges
        </Text>
        <Text className="text-[14px]  opacity-60 leading-5 font-Nunito-Regular">
          ₹200
        </Text>
      </View>
      <View className="flex-row justify-between mb-[14px] ">
        <Text className="text-[14px]  opacity-60 font-Nunito-Regular">
          Travel Fee
        </Text>
        <Text className="text-[14px]  opacity-60 leading-5 font-Nunito-Regular">
          ₹199.00
        </Text>
      </View>

      {/* line  */}
      <View className="mt-[2px] mb-[15px] border-t-[0.75px] border-pastelgreyBorder"></View>
      <View className="flex-row justify-between">
        <Text className="text-[14px] font-Nunito-Regular  ">Estimate</Text>
        <Text className="text-[14px] font-Proxima-Nova-Semibold">
          ₹9,848.00
        </Text>
      </View>
    </View>
  );
};

export default PaymentSummaryCard;
