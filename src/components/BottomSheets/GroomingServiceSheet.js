import {View, Text} from 'react-native';
import React from 'react';
import BottomSheet from '../shared/BottomSheet';
import {ScrollView} from 'react-native-gesture-handler';

const GroomingServiceSheet = ({innerRef}) => {
  return (
    <BottomSheet ref={innerRef}>
      <View className="px-6">
        <Text className="text-[18px] font-bold mt-[26px] mb-6 font-Nunito-Bold">
          Service details
        </Text>
        <ScrollView>
          <View className="mb-28">
            <View className=" bg-pastelGrey border border-pastelgreyBorder p-4 rounded-lg">
              <Text className=" font-Nunito-Bold">Package</Text>
              <Text className=" mt-[5px] mb-[10px] text-[12px] font-Nunito-Regular">
                Routine Grooming
              </Text>
              <View className="border-b  border-b-pastelgreyBorder  mb-5" />
              <Text className=" font-Nunito-Bold">Offerings</Text>
              <Text className=" mt-[5px] mb-4  text-[12px] font-Nunito-Regular">
                Deshedding, Combing and Brushing, Nail Clipping, Ear Cleaning,
                Dental Care, Changes in breathing pattern.
              </Text>
              <Text className=" text-[12px] font-Nunito-Regular">
                <Text className=" font-Nunito-Bold">Note: </Text>
                Service durations are only an estimate and may vary depending on
                the pet breed
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default GroomingServiceSheet;
