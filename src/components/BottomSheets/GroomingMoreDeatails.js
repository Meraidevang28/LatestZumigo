import {View, Text} from 'react-native';
import React from 'react';
import BottomSheet from '../shared/BottomSheet';

const GroomingMoreDeatails = ({innerRef}) => {
  return (
    <BottomSheet ref={innerRef}>
      <View className="px-6">
        <Text className="text-[18px] font-bold mt-[26px] font-Nunito-Bold">
          Care
        </Text>
        <Text className=" mt-1 mb-3 text-[12px] opacity-50 font-Nunito-Regular">
          Basic Grooming Service
        </Text>

        <View className="bg-pastelGrey  p-4 rounded-2xl border border-pastelgreyBorder mb-20">
          <View className="space-y-2">
            {[
              'Shampoo & Conditioning',
              'Full Body Brushing',
              'Underbelly & Paw Cleaning',
              'Nail Clipping',
              'Ear Cleaning',
              'Dental Care',
              'Changes in breathing pattern',
            ].map((item, index) => (
              <Text key={index} className=" font-Nunito-Regular mb-1">
                • {item}
              </Text>
            ))}
          </View>

          <Text className=" mt-5 font-Nunito-Regular">
            <Text className=" font-Nunito-Bold">Note:</Text> Service durations
            are only an estimate and may vary depending on the pet breed
          </Text>
        </View>
      </View>
    </BottomSheet>
  );
};

export default GroomingMoreDeatails;
