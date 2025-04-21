import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Boxes = ({title, number, color}) => {
  return (
    <View>
      <View
        className="rounded-[15px] mt-2 flex-col"
        style={{
          backgroundColor: color,
          // width: '109',
          height: '90',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          borderRadius: 15,
        }}>
        <Text className="w-[102px] ml-[12px] font-[Nunito-Regular] text-[14px] text-[#7F7E7C]">
          {title}
        </Text>
        <Text className="w-[51px] ml-[12px] font-[Nunito-Bold] text-[20px] text[#1C222F] ">
          {number}
        </Text>
      </View>
    </View>
  );
};

export default Boxes;

const styles = StyleSheet.create({});
