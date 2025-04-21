import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import screens from '../../constants/screens';

const YourAppointmentCard = () => {
  const navigation = useNavigation();

  return (
    <View className=" ">
      <Text className=" font-Nunito-Bold text-[18px] mt-5 mb-4 ">
        Your appointment{' '}
      </Text>
      <TouchableOpacity
        className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl p-4"
        onPress={() => navigation.navigate(screens.BookingScheduled)}>
        {/* Main Card */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className=" font-Nunito-Bold text-[16px]">
            Vet - Home visit
          </Text>
          <Image
            source={images.secondaryBack}
            resizeMode="contain"
            className=" h-[14px] w-6"
          />
        </View>

        {/* Date & Time */}
        <View className="flex-row items-center gap-2 ">
          <Image
            source={images.calender}
            className=" h-5 w-5"
            resizeMode="contain"
          />
          <Text className=" font-Nunito-Regular">24, April, 2024</Text>
        </View>

        <View className="flex-row items-center mt-2 gap-2">
          <Image
            source={images.clock}
            className=" h-5 w-5"
            resizeMode="contain"
          />
          <Text className="font-Nunito-Regular">09:00 AM - 10:00 AM</Text>
        </View>

        {/* Doctor Info */}
        <View className="bg-primary rounded-xl flex-row items-center mt-4 p-2 gap-3">
          <Image source={images.VetImage} className="w-12 h-12 rounded-xl" />
          <View>
            <Text className="text-white font-Nunito-Bold">
              Dr. Jeevan Kumar
            </Text>
            <Text className="text-white font-Nunito-Regular ">
              Master of veterinary science
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default YourAppointmentCard;
