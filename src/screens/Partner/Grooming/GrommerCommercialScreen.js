import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import FooterBtn from '../../../components/shared/FooterBtn';
import images from '../../../assets/images';
import screens from '../../../constants/screens';

const GrommerCommercialScreen = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6">
      <View className="mt-[15px] mb-2">
        <RegistrationProgressBar screenNo={4} n={6} />
      </View>
      <Text className="text-[24px] font-Nunito-Bold mt-[20px]">
        Enter Your Commercials
      </Text>
      <Text
        className="text-[16px] mt-[10px] font-Nunito-Regular"
        style={{fontWeight: '500'}}>
        Pet Grooming Services
      </Text>
      <View className="py-6 mt-3 px-4  bg-[#FFEDF966] border border-[#D7588033] rounded-[20px]">
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text
              className="text-[18px] font-Nunito-Regular"
              style={{fontWeight: '700'}}>
              Fresh & Clean
            </Text>
            <Text
              className="text-[14px] text-[#838999] font-Nunito-Regular "
              style={{fontFamily: '400'}}>
              Up to 60 minutes
            </Text>
            <Text
              className="text-[16px] mt-[10px] font-Nunito-Regular"
              style={{fontWeight: '400'}}>
              Basic Grooming Service
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
        <View className="flex w-[190px] flex-row items-center justify-between">
          <View>
            <Text
              className="text-[18px] font-Nunito-Regular"
              style={{fontWeight: '700'}}>
              Prime Cut
            </Text>
            <Text
              className="text-[14px] text-[#838999] font-Nunito-Regular"
              numberOfLines={2}>
              Approximately 90-120 minutes
            </Text>
            <Text
              className="text-[16px] mt-[10px] font-Nunito-Regular"
              numberOfLines={2}>
              Grooming Service with Haircut
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
      {/* <TouchableOpacity> */}
      <Text
        className="text-primary mt-[5px] mb-[5px] ml-2 text-[14px] font-Nunito-Regular"
        style={{fontWeight: '400'}}>
        *Government taxes levied as applicable
      </Text>
      {/* </TouchableOpacity> */}
      <View className=" flex items-center  ">
        <Image
          source={images.dogwithPencile}
          style={{width: '60%', height: '48%'}}
        />
      </View>
      <FooterBtn
        title="Continue"
        onClick={() => navigation.navigate(screens.GroomerSchedule)}
      />
    </View>
  );
};

export default GrommerCommercialScreen;

const styles = StyleSheet.create({});
