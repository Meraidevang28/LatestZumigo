import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import images from '../../assets/images';
const BottomNavigation = () => {
  return (
    <View className="bg-primary rounded-[20px] h-[80px] flex mb-[20px] ">
      <View className="flex flex-row mt-[18px] items-center justify-center gap-[45px]">
        <TouchableOpacity>
          <View className="flex flex-col items-center justify-center gap-[5px]">
            <Image source={require('../../assets/images/homeIcon.png')} />
            <Text className="text-[14px] text-white font-Nunito-Bold">
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex flex-col items-center justify-center gap-[5px]">
            <Image
              source={require('../../assets/images/appointmentIcon.png')}
            />
            <Text className="text-[14px] text-white font-Nunito-Bold">
              Appointments
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex flex-col items-center justify-center gap-[5px]">
            <Image source={require('../../assets/images/profileIcon.png')} />
            <Text className="text-[14px] text-white font-Nunito-Bold">
              Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
