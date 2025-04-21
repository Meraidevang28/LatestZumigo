import {View, Text} from 'react-native';
import React from 'react';

const GroomingPaymentSummary = () => {
  return (
    <View className="p-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
      <View className="flex-row justify-between mb-[14px]">
        <Text className="text-[16px]  font-Proxima-Nova-Semibold ">
          Package Amount
        </Text>
        <Text className="text-[14px]  opacity-60 font-Nunito-Regular">
          ₹1,200.00
        </Text>
      </View>
      <View className="flex-row justify-between mb-[14px]">
        <Text className="text-[14px]  opacity-60 font-Nunito-Regular">
          GST and other charges
        </Text>
        <Text className="text-[14px]  opacity-60 leading-5 font-Nunito-Regular">
          ₹150
        </Text>
      </View>
      <View className="flex-row justify-between mb-[14px] ">
        <Text className="text-[14px]  opacity-60 font-Nunito-Regular">
          Add-ons Total
        </Text>
        <Text className="text-[14px]  opacity-60 leading-5 font-Nunito-Regular">
          ₹0.00
        </Text>
      </View>

      {/* line  */}
      <View className="mt-[2px] mb-[15px] border-t-[0.75px] border-pastelgreyBorder"></View>
      <View className="flex-row justify-between">
        <Text className="text-[14px] font-Nunito-Regular  ">Total </Text>
        <Text className="text-[14px] font-Proxima-Nova-Semibold">
          ₹1,350.00
        </Text>
      </View>
    </View>
  );
};

export default GroomingPaymentSummary;
