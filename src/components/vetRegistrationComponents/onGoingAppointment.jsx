import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {primary} from '../../assets/theme/colors';

const OnGoingAppointmentComponent = ({title, date, time}) => {
  return (
    <View>
      <View className="  bg-[#FFEDF9] border border-[#D7588033] rounded-[15px] ">
        <View className="flex-row ml-[15px] justify-between mb-[10px] mt-[15px]">
          <Text className="font-[Nunito-Bold] text-[14px]">{title}</Text>
          <Image
            source={require('../../assets/images/rightArrow.png')}
            className="mr-[16.8px] w-[10px] h-[15px]"
            style={{tintColor: primary}}
          />
        </View>
        <View className="flex-row item-center gap-[5px] ml-[15px] mb-[10px]">
          <Text className="mt-[3px]">
            <Image
              source={require('../../assets/images/calender.png')}
              className="w-[14.01px] h-[14.01px]"
              style={{tintColor: primary}}
            />
          </Text>
          <Text className="text-[15px] font-[ProximaNova-Regular] text-[#000] ">
            {date}
          </Text>
        </View>
        <View className="flex-row items-center gap-[5px] ml-[15px] mb-[10px]">
          <Text className="mt-[3px]">
            <Image
              source={require('../../assets/images/clock.png')}
              className="w-[11.81px] h-[14px]"
              style={{tintColor: primary}}
            />
          </Text>
          <Text className="text-[14px] font-[ProximaNova-Regular] text-[#000]">
            {time}
          </Text>
        </View>

        <View className="flex flex-row items-center rounded-[10px] ml-[15px] mr-[25px]  bg-primary border border-primaryBorder px-3 py-3 mt-3 mb-[15px]">
          <Image
            // source={require("../assets/images/DummyImages/Mask Group 116.png")}
            source={require('../../assets/images/DummyImages/TeleImage.png')}
            className="w-[55px] h-[42px] rounded-[20px] border border-[#ffffff]"
          />
          <View className="flex flex-col justify-around">
            <View className="flex flex-row items-center ml-[10px] gap-3">
              <Text className="text-[20px] text-[#FFFFFF] font-junegull-Regular">
                MAX
              </Text>
              <Text className="font-[ProximaNova-Regular] text-[16px] text-[#FFFFFF]">
                German Shepherd
              </Text>
            </View>
            <View className=" flex flex-row ml-[10px] gap-3">
              <Text className="font-[ProximaNova-Regular] text-[14px] text-[#FFFFFF]">
                Male |
              </Text>
              <Text className="font-[ProximaNova-Regular] text-[14px] text-[#FFFFFF]">
                Age 3 yrs |
              </Text>
              <Text className="font-[ProximaNova-Regular] text-[14px] text-[#FFFFFF]">
                30 Kgs
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnGoingAppointmentComponent;

const styles = StyleSheet.create({});
