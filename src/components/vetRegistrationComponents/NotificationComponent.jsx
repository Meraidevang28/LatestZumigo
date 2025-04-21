import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import screens from '../../constants/screens';

const NotificationComponent = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white px-6">
      <View>
        <Text className="font-PTSans-Bold text-[16px] text-[#000000] ml-[24px] ">
          New
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screens.HomeVisitScreen);
          }}>
          <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mt-[18px]">
            <View className="flex flex-row gap-[15px]">
              <View className="flex flex-row items-start">
                <Text className="h-[56px] w-[56px] bg-[#bbbcb8] mt-[15px] ml-[10px] rounded-[15px]"></Text>
                <Text className="w-[14px] h-[14px] bg-green-600 rounded-[50px] mt-[15px] ml-[-7px] "></Text>
              </View>
              <View className="flex flex-col mt-[15px]">
                <Text className="font-Nunito-Bold text-[15px] text-[#1C222F]">
                  Mr Jone Smith
                </Text>
                <View className="flex flex-row gap-[1px]">
                  <Text className="text-[15px] font-Nunito-Regular text-[#7F7E7C]">
                    Booked Services on{' '}
                  </Text>
                  <Text className="text-[15px] font-Nunito-Bold text-[#1C222F]">
                    24 April 2024
                  </Text>
                </View>
                <View className="flex flex-row gap-[15px]">
                  <Text className="text-[12px]  font-Nunito-Regular text-[#7F7E7C] ">
                    Home Visit |
                  </Text>
                  <Text className="text-[12px]  font-Nunito-Regular text-[#7F7E7C] mb-[15px] ">
                    09:00 AM
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({});
