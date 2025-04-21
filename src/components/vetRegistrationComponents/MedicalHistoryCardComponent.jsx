import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import screens from '../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import {primary} from '../../assets/theme/colors';

const MedicalHistoryCardComponent = ({name, date, symptom}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screens.ConsultationSummaryScreen)}>
      <View className="  bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[15px]">
        <View className="flex flex-row items-center justify-between ml-[17px] mt-[17px]">
          <View className="flex flex-row gap-[10.7px] items-center">
            <Image
              source={require('../../assets/images/services.png')}
              className="w-[16.29px] h-[18.01px]"
              style={{tintColor: primary}}
            />
            <Text className="text-[16px] font-Nunito-Bold text-[#1C222F]">
              {name}
            </Text>
          </View>
          <Image
            source={require('../../assets/images/rightArrow.png')}
            className=" mr-[17.8px] w-[8px] h-[10px]"
            style={{tintColor: primary}}
          />
        </View>
        <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7F] ml-[44px] mt-[7px]">
          {date}
        </Text>
        <Text className="h-[0.75px] bg-primaryBorder ml-[15.8px] mr-[15.8px] mt-[11px]"></Text>

        <View className="ml-[17px] mt-[10px] mb-[16px] flex flex-row flex-wrap gap-[3px]">
          <Text className=" text-[12px] font-Nunito-Regular text-[#7F7F7F]">
            Symptoms:
          </Text>
          <Text className=" text-[12px] font-Nunito-Bold text-[#1C222F]">
            {symptom}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MedicalHistoryCardComponent;

const styles = StyleSheet.create({});
