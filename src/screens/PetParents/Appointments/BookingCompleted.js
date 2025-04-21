import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import TitleCard from '../../../components/appointment/TitleCard';
import images from '../../../assets/images';
import AppointmentDetailCard from '../../../components/appointment/AppointmentDetailCard';
import BookingVetDetailCard from '../../../components/appointment/BookingVetDetailCard';
import PetDetailCard from '../../../components/appointment/PetDetailCard';
import BottomSheetTitleCard from '../../../components/appointment/BottomSheetTitleCard';
import PaymentSummaryCard from '../../../components/appointment/PaymentSummaryCard';
import AddressDetailCard from '../../../components/appointment/AddressDetailCard';
import screens from '../../../constants/screens';

const BookingCompleted = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <View className="mt-[10px]">
          <TitleCard
            title="Completed"
            text="Pellentesque suscipit tempor ullamcorper. Nun
a quam posuere, consectetur lectus eu,
euismod ipsum. "
            backgroundcolor="bg-[#1EBC2826]"
            headerIconcolor="bg-[#1EBC28]"
          />
        </View>

        {/* Appointment  */}
        <View className="my-[20px]">
          <AppointmentDetailCard
            id="234567896"
            dateAndTime="24, April, 2024, 09:00 AM - 10:00 AM"
          />
        </View>

        {/* Vet Details  */}

        <Text className=" text-[16px] font-semibold text-black  mb-[10px] font-Proxima-Nova-Semibold">
          Vet Details
        </Text>
        <View className="mb-5">
          <BookingVetDetailCard />
        </View>

        {/* Book again & Share profile btn  */}
        <View className="gap-[9px] flex-row">
          <TouchableOpacity
            className=" px-[30px] py-3  items-center border rounded-[10px]  bg-pastelGrey border-pastelgreyBorder gap-[10px] flex-row"
            onPress={() => navigation.navigate(screens.SelectDateTime)}>
            <Image source={images.bookAgain} className=" h-[14px] w-[14px]" />
            <Text className=" text-darkGunmetal font-Proxima-Nova-Semibold">
              Book again
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3  items-center border rounded-[10px] bg-pastelGrey border-pastelgreyBorder  gap-[10px] flex-row justify-center">
            <Image source={images.share} className=" h-[14px] w-[12.66px]" />

            <Text className=" text-darkGunmetal font-Proxima-Nova-Semibold">
              Share profile
            </Text>
          </TouchableOpacity>
        </View>
        {/* pet detail  */}

        <Text className=" text-[16px] font-semibold text-black mt-5 mb-3 font-Figtree-SemiBold">
          Pet Details
        </Text>
        {/* Pet details  */}
        <PetDetailCard />

        {/* Medical history  */}
        <View className="py-[15px]">
          <BottomSheetTitleCard title="Medical history" />
        </View>

        {/* Service details  */}

        <BottomSheetTitleCard title="Service details" />

        {/* Payment summary  */}

        <View className=" mt-5 mb-[14px] flex-row justify-between">
          <Text className="text-[16px] font-Proxima-Nova-Semibold">
            Payment summary
          </Text>
          <View className="gap-2 flex-row">
            <Text className="text-[12px] text-primary font-Nunito-Regular">
              Download invoice
            </Text>
            <Image
              className="h-[14px] w-[15px]"
              source={images.download}
              style={{height: 14, width: 15}}
            />
          </View>
        </View>

        <PaymentSummaryCard />

        {/* Address  */}
        <Text className="text-[16px] font-semibold mt-5 mb-[13px] font-Proxima-Nova-Semibold">
          Address
        </Text>
        <AddressDetailCard />
        <View className="mb-[50px]" />
      </ScrollView>
    </View>
  );
};

export default BookingCompleted;
