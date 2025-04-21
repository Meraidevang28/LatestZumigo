import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import TitleCard from '../../../components/appointment/TitleCard';
import AppointmentDetailCard from '../../../components/appointment/AppointmentDetailCard';
import images from '../../../assets/images';
import BookingVetDetailCard from '../../../components/appointment/BookingVetDetailCard';

const BookingCancelled = () => {
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <View className="mt-[10px]">
          <TitleCard
            title="Cancelled"
            text="Pellentesque suscipit tempor ullamcorper. Nun
a quam posuere, consectetur lectus eu,
euismod ipsum. "
            backgroundcolor="bg-[#EC585626]"
            headerIconcolor="bg-[#EC5856]"
          />
        </View>

        {/* Appointment Booked for*/}

        <View className="mt-[15px] mb-[30px]">
          <View className="bg-pastelGrey border-pastelgreyBorder border rounded-2xl pt-[15.3px] pl-[15px] pb-[17px]">
            <Text
              className=" text-gray-900"
              style={{fontFamily: 'Figtree-Regular'}}>
              Appointment Booked for:{' '}
              <Text
                className=" text-black text-[16px]"
                style={{fontFamily: 'Figtree-Medium'}}>
                MAX
              </Text>
            </Text>
            <Text
              className=" text-gray-900"
              style={{fontFamily: 'Figtree-Regular'}}>
              Appointment ID:{' '}
              <Text
                className=" text-black text-[16px]"
                style={{fontFamily: 'Figtree-Medium'}}>
                234567896
              </Text>
            </Text>
            <View className="flex-row gap-2 items-center mt-[9px]">
              <Image source={images.timedate} className="w-[18px] h-[16px]" />
              <Text
                className="text-[16px] leading-[16px]"
                style={{fontFamily: 'Proxima-Nova-Medium'}}>
                24, April, 2024, 09:00 AM - 10:00 AM
              </Text>
            </View>
          </View>
        </View>

        {/* Vet Details  */}

        <Text className=" text-[16px] font-semibold text-black  mb-[10px] font-Proxima-Nova-Semibold">
          Vet Details
        </Text>
        <View className="mb-5">
          <BookingVetDetailCard />
        </View>

        {/* reasons  */}

        <View>
          <Text
            className="text-[18px] text-darkGunmetal mb-[10px] pr-[43px]"
            style={{fontFamily: 'Proxima-Nova-Semibold'}}>
            Reason for Cancellation
          </Text>
          <Text
            className={`text-[16px] font-Proxima-Nova-Regular  text-darkGunmetal bg-pastelGrey border border-pastelgreyBorder p-4 rounded-2xl`}>
            Changed my mind
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingCancelled;
