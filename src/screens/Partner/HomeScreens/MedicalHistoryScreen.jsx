import {StyleSheet, Text, Image, View} from 'react-native';
import MedicalHistoryCardComponent from '../../../components/vetRegistrationComponents/MedicalHistoryCardComponent';
import React from 'react';

const MedicalHistoryScreen = () => {
  return (
    <View className="flex-1 bg-white px-6">
      <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[20px]">
        <View className="flex flex-row gap-[15px] mt-[15px] ml-[15px] mb-[15px] ">
          <Image
            source={require('../../../assets/images/DummyImages/Dog.png')}
            className="w-[59px] h-[59px]"
          />
          <View className="flex flex-col gap-[9px]">
            <View className="flex flex-row gap-[6px] items-center">
              <Text className="text-[20px] font-[junegull-Regular] text-primary">
                MAX
              </Text>
              <Text className="text-[12px] font-Nunito-Regular text-[#1C222F]">
                Australian Shepherd
              </Text>
            </View>
            <View className="flex flex-row gap-[10px]">
              <Text className="text-[14px] font-Nunito-Regular text-[#7F7E7C] ">
                Male |
              </Text>
              <Text className="text-[14px] font-Nunito-Regular text-[#7F7E7C]">
                Age 3 yr |
              </Text>
              <Text className="text-[14px] font-Nunito-Regular text-[#7F7E7C]">
                30 Kgs
              </Text>
            </View>
          </View>
        </View>
      </View>
      <MedicalHistoryCardComponent
        name="Dr. Jeevan Kumar"
        date="26 April, 2024"
        symptom="Change in Appetite, Change in Water Intake"
      />
      <MedicalHistoryCardComponent
        name="Dr. Manisha"
        date="25 April, 2024"
        symptom="Change in Appetite, Change in Water Intake"
      />
      <MedicalHistoryCardComponent
        name="Dr. Santosh"
        date="24 April, 2024"
        symptom="Change in Appetite, Change in Water Intake"
      />
    </View>
  );
};

export default MedicalHistoryScreen;

const styles = StyleSheet.create({});
