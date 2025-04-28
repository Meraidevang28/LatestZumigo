import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import React from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';

const RadiologistCommercial = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6">
      <View className="mt-[15px] mb-2">
        <RegistrationProgressBar screenNo={4} n={6} />
      </View>
      <Text
        className="text-[24px] font-Nunito-Regular text-[#333333] mt-[10px]"
        style={{fontWeight: '700'}}>
        Enter Your Commercials
      </Text>
      <Text>Pet Grooming Services</Text>
      <View className="py-6 mt-3 px-4  bg-[#FFEDF966] border border-[#D7588033] rounded-[20px]">
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text
              className="text-[18px] font-Nunito-Regular"
              style={{fontWeight: '400'}}>
              Chest X-Rays
            </Text>
          </View>
          <View className="border border-[#BBBCB7] bg-white py-2 px-3 rounded-[17px] ">
            <TextInput
              className="text-[#333333] w-[79px]"
              placeholder="Enter Price"
              placeholderTextColor="#BBBCB7"
              keyboardType="numeric"></TextInput>
          </View>
        </View>
      </View>
      <View className="py-6 mt-3 px-4  bg-[#FFEDF966] border border-[#D7588033] rounded-[20px]">
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text
              className="text-[18px] font-Nunito-Regular"
              style={{fontWeight: '400'}}>
              Abdominal X-Rays
            </Text>
          </View>
          <View className="border border-[#BBBCB7] bg-white py-2 px-3 rounded-[17px] ">
            <TextInput
              className="text-[#333333] w-[79px]"
              placeholder="Enter Price"
              placeholderTextColor="#BBBCB7"
              keyboardType="numeric"></TextInput>
          </View>
        </View>
      </View>
      <Text
        className="text-primary mt-[5px] mb-[5px] ml-2 text-[14px] font-Nunito-Regular"
        style={{fontWeight: '400'}}>
        *Government taxes levied as applicable
      </Text>
      <View className=" flex items-center bottom-0 justify-center ">
        <Image
          source={images.dogwithPencile}
          style={{width: '60%', height: '48%'}}
        />
      </View>
      <FooterBtn
        title="Continue"
        onClick={() => navigation.navigate(screens.RadiologistSchedule)}
      />
    </View>
  );
};

export default RadiologistCommercial;

const styles = StyleSheet.create({});
