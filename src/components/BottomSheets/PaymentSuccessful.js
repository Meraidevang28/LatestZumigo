import {View, Text, Switch, Image} from 'react-native';
import React, {useState} from 'react';
import BottomSheet from '../shared/BottomSheet';
import {ScrollView} from 'react-native-gesture-handler';
import images from '../../assets/images';
import FooterBtn from '../shared/FooterBtn';
import {useNavigation} from '@react-navigation/native';

const BookingDetailItem = ({icon, label, value}) => {
  return (
    <View className="flex-row justify-between items-center py-4 border-b border-b-pastelgreyBorder">
      <View className="flex-row items-center">
        <Image
          source={icon}
          className="h-[14px] w-[22px]"
          resizeMode="contain"
          style={{tintColor: '#d75880'}}
        />
        <Text className="text-gray-600 ml-2">{label}</Text>
      </View>
      <Text className="text-gray-800 font-medium">{value}</Text>
    </View>
  );
};

const PaymentSuccessful = ({innerRef, details, provider}) => {
  const [accepted, setAccepted] = useState(false);
  const navigation = useNavigation();

  return (
    <BottomSheet ref={innerRef}>
      <View className="px-6">
        <ScrollView>
          <View className="flex-1 bg-white items-center">
            {/* Success Icon */}
            <View className="">
              <Image
                source={images.paymentDone}
                className=" h-[154px]"
                resizeMode="contain"
              />
            </View>

            {/* Booking Confirmation Text */}
            <Text className=" text-[26px] font-Nunito-Bold my-[10px]">
              Booking Confirmed
            </Text>
            <Text className="opacity-80 text-center px-14 font-Nunito-Regular">
              Your booking is confirmed. Please find the details for the
              appointment.
            </Text>

            {/* Booking Details Card */}
            <View className="bg-pastelGrey border border-pastelgreyBorder p-4 rounded-2xl mt-[30px] w-full mb-36">
              <BookingDetailItem
                icon={images.vetVisit}
                label={details?.service}
                value={details?.serviceDetail}
              />
              <BookingDetailItem
                icon={images.calender}
                label="Date"
                value={details?.date}
              />
              <BookingDetailItem
                icon={images.clock}
                label="Time"
                value={details?.time}
              />

              {/* Doctor Details */}
              <View className="flex-row mt-4 w-full pb-4 border-b border-b-pastelgreyBorder items-start">
                <Image
                  source={provider?.image}
                  className="w-14 h-14 rounded-[6px]"
                />
                <View className="ml-3">
                  <Text className=" font-Nunito-Bold text-[16px]">
                    {provider?.name}
                  </Text>
                  <Text className="opacity-50 text-[12px] my-[5px]">
                    {provider?.work}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-yellow-500 text-lg">⭐</Text>
                    <Text className=" font-Nunito-Bold ml-[6px]">
                      4.9/5{' '}
                      <Text className=" font-Nunito-Regular text-[14px] opacity-50">
                        rating
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              {/* WhatsApp Notification Toggle */}
              <View className="flex-row items-center pt-4 w-full gap-[10px] ">
                <Switch
                  trackColor={{false: '#E7ECF7', true: '#d75880'}}
                  thumbColor={true ? '#fff' : '#fff'}
                  value={accepted}
                  onValueChange={() => setAccepted(!accepted)}
                />
                <Text className=" text-[16px] font-Nunito-Bold">
                  WhatsApp notifications
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <FooterBtn onClick={() => navigation.popToTop()} title="Back to Home" />
      </View>
    </BottomSheet>
  );
};

export default PaymentSuccessful;
