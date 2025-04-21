import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import TitleCard from '../../../components/appointment/TitleCard';
import images from '../../../assets/images';
import AppointmentDetailCard from '../../../components/appointment/AppointmentDetailCard';
import BookingVetDetailCard from '../../../components/appointment/BookingVetDetailCard';
import PetDetailCard from '../../../components/appointment/PetDetailCard';
import PaymentSummaryCard from '../../../components/appointment/PaymentSummaryCard';
import AddressDetailCard from '../../../components/appointment/AddressDetailCard';
import CancellationRefundCard from '../../../components/appointment/CancellationRefundCard';
import BottomSheetTitleCard from '../../../components/appointment/BottomSheetTitleCard';
import screens from '../../../constants/screens';

const BookingScheduled = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <View className="mt-[10px]">
          <TitleCard
            title="Scheduled"
            text="Pellentesque suscipit tempor ullamcorper. Nun
a quam posuere, consectetur lectus eu,
euismod ipsum. "
            backgroundcolor="bg-[#FBA53726]"
            headerIconcolor="bg-[#FBA537]"
          />
        </View>

        {/* otp share  */}

        <View className="border border-pastelgreyBorder bg-pastelGrey py-[14px] pl-[15px]  rounded-2xl mt-[14.5px]">
          {/* <Text className=" font-Nunito-Regular text-gray-500">
            Appointment ID: <Text className=" text-black">234567896</Text>
          </Text> */}

          <View className="flex-row gap-[10px] items-center ">
            <Text className=" font-Nunito-Regular">Share the OTP to Vet</Text>
            <View className="flex-row gap-1">
              {[8, 8, 5, 6].map((val, index) => (
                <View
                  className="bg-pastelPrimary pt-[6px] pb-[5px] px-[10px] rounded-lg"
                  key={String(index)}>
                  <Text className="text-[16px] text-primary font-Nunito-Bold">
                    {val}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Appointment  */}
        <View className="mt-[20px]">
          <AppointmentDetailCard
            id="234567896"
            dateAndTime="24, April, 2024, 09:00 AM - 10:00 AM"
          />
        </View>

        {/* Vet Details  */}

        <Text className=" text-[16px] font-semibold text-black  mb-3 mt-[30px] font-Nunito-Bold">
          Vet Details
        </Text>
        <View className="mb-2">
          <BookingVetDetailCard>
            <View className=" flex-row gap-4 border-t border-t-pastelgreyBorder pt-4 mt-4">
              <TouchableOpacity className="py-5 pr-[22px] pl-[18px] w-[30%] bg-pastelPrimary  rounded-2xl flex-row items-center gap-[8.7px]">
                <Image
                  source={images.secondaryCall}
                  className="h-[18px] w-[18px]"
                />
                <Text className="text-[15px] text-darkGunmetal font-Nunito-Regular">
                  Call
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="py-5 pr-[22px] pl-[18px] bg-pastelPrimary  w-[30%] rounded-2xl flex-row items-center gap-[8.7px]">
                <Image
                  source={images.secondaryChat}
                  className="h-[18px] w-[20px]"
                />
                <Text className="text-[15px] text-darkGunmetal font-Nunito-Regular">
                  Chat
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="py-5 pr-[22px] pl-[18px] bg-pastelPrimary  w-[30%] rounded-2xl flex-row items-center gap-[8.7px]">
                <Image
                  source={images.address}
                  className="h-[18px] w-[20px]"
                  resizeMode="contain"
                />
                <Text className="text-[15px] text-darkGunmetal font-Nunito-Regular">
                  Track
                </Text>
              </TouchableOpacity>
            </View>
          </BookingVetDetailCard>
        </View>

        {/* Appointment  */}
        <View className="mt-[15px] mb-[30px]">
          <View className="bg-pastelGrey border-pastelgreyBorder border rounded-2xl p-4">
            <View className="flex-row gap-2 items-center">
              <Image source={images.timedate} className="w-[18px] h-[16px]" />
              <Text className="font-Nunito-Regular">
                24, April, 2024, 09:00 AM - 10:00 AM
              </Text>
            </View>
          </View>
        </View>

        {/* Reschedule and Cancel appointment btn  */}

        <View className="gap-[9px] flex-row">
          <TouchableOpacity
            className=" px-[41px] py-3  items-center border rounded-[10px] bg-primary border-primary"
            onPress={() => navigation.navigate(screens.AppointmentReschedule)}>
            <Text className="text-white font-Nunito-Bold">Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 py-3  items-center border rounded-[10px] bg-primaryOpacity-10 border-primaryOpacity-10"
            onPress={() =>
              navigation.navigate(screens.AppointmentCancellation)
            }>
            <Text className="text-primary font-Nunito-Bold">
              Cancel appointment
            </Text>
          </TouchableOpacity>
        </View>

        {/* pet detail  */}
        <Text className=" text-[16px]  text-black  mb-3 mt-[30px] font-Nunito-Bold">
          Pet Details
        </Text>

        {/* Pet details  */}
        <PetDetailCard onClick={() => {}} />

        {/* Service details  */}
        <View className="my-[15px]">
          <BottomSheetTitleCard title="Service details" />
        </View>

        {/* Payment summary  */}

        <Text className="text-[16px] mb-[14px] font-Nunito-Bold">
          Payment summary
        </Text>

        <PaymentSummaryCard />

        {/* Address  */}

        <Text className=" text-[16px]  text-black  mb-3 mt-[20px] font-Nunito-Bold">
          Address
        </Text>
        <AddressDetailCard change={true} />

        {/* Cancellation & reschedule policy  */}
        <Text className="text-[16px] mb-[14px] mt-5 font-Nunito-Bold">
          Cancellation & reschedule policy
        </Text>

        <View className="mb-[20px]">
          <CancellationRefundCard />
        </View>
        <View className="mb-[50px]"></View>
      </ScrollView>
    </View>
  );
};

export default BookingScheduled;
