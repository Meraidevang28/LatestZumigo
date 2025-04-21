import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import images from '../../../../assets/images';
import {primary} from '../../../../assets/theme/colors';
const VetContactUs = () => {
  return (
    <View className="flex-1 bg-white px-6">
      <Text className="text-[#000000] mt-[15px] text-[12px] font-Nunito-Regular">
        Fusce sit amet massa commodo, tincidunt justo at, luctus erat. Mauris
        accumsan magna nec nulla bibendum posuere. Etiam porta turpis sit amet
        risus egestas finibus.{' '}
      </Text>
      <Text className="text-[18px] font-PTSans-Bold text-[#000000] mt-[30px] mb-[13px]">
        Customer support{' '}
      </Text>
      <View className="flex flex-col bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
        <View className="flex flex-col gap-[7px] pl-[20px] mt-[20px]">
          <View className="flex flex-row items-center gap-[10px]">
            <Image
              source={require('../../../../assets/images/contact.png')}
              className="w-[15.99px] h-[16px]"
              style={{tintColor: primary}}
            />
            <Text className="text-[12px] text-[#00000080] font-Nunito-Regular">
              Contact number
            </Text>
          </View>
          <Text className="text-[15px] font-Nunito-Bold text-[#000000] pl-[20px]">
            +91 97048576875
          </Text>
        </View>
        <View className="flex flex-col gap-[7px] pl-[20px] mt-[20px] mb-[21px]">
          <View className="flex flex-row items-center gap-[10px]">
            <Image
              source={require('../../../../assets/images/email.png')}
              className="w-[17.99px] h-[13.9px]"
              style={{tintColor: primary}}
            />
            <Text className="text-[12px] text-[#00000080] font-Nunito-Regular">
              Email Address
            </Text>
          </View>
          <Text className="text-[15px] font-Nunito-Bold text-[#000000] pl-[20px]">
            help@zumigo.pet
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VetContactUs;

const styles = StyleSheet.create({});
