import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

import TitleCard from '../../../components/appointment/TitleCard';
import images from '../../../assets/images';
import BookingVetDetailCard from '../../../components/appointment/BookingVetDetailCard';
import FooterBtn from '../../../components/shared/FooterBtn';
import Toast from 'react-native-toast-message';

const AppointmentCancellation = ({navigation}) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const reasons = [
    'Forgot about the appointment',
    'Visited another doctor',
    'Changed my mind',
    'Doctor asked me to cancel',
    'Others',
  ];

  const handleReasonSelect = reason => {
    setSelectedReason(reason);
    if (reason !== 'Others') {
      setCustomReason('');
    }
  };

  const showToast = () => {
    Toast.show({
      type: 'successfullyToast',
      text1: 'Appointments cancelled',
      text2: 'successfully',
      autoHide: false,
      props: {onPressOk: () => Toast.hide()},
    });
  };
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white mb-[100px]"
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

        {/* Appointment Booked for*/}

        <View className="mt-[15px] mb-[30px]">
          <View className="bg-pastelGrey border-pastelgreyBorder border rounded-2xl pt-[15.3px] pl-[15px] pb-[17px]">
            <Text className=" text-gray-900 font-Nunito-Regular">
              Appointment Booked for:{' '}
              <Text className=" text-black text-[16px]  font-Nunito-Bold">
                MAX
              </Text>
            </Text>
            <Text className=" text-gray-900 mb-1 mt-2  font-Nunito-Regular">
              Appointment ID:{' '}
              <Text className=" text-black text-[16px] font-Nunito-Bold">
                234567896
              </Text>
            </Text>
            <View className="flex-row gap-2 items-center mt-[9px]">
              <Image source={images.timedate} className="w-[18px] h-[16px]" />
              <Text className="text-[16px] leading-[16px] font-Nunito-Bold">
                24, April, 2024, 09:00 AM - 10:00 AM
              </Text>
            </View>
          </View>
        </View>

        {/* Vet Details  */}

        <Text className=" text-[16px] font-semibold text-black mb-4 font-Nunito-Bold">
          Vet Details
        </Text>
        <View className="mb-[30px]">
          <BookingVetDetailCard />
        </View>

        {/* reasons  */}

        <View>
          <Text className="text-[18px] text-darkGunmetal mb-[10px] pr-[43px] font-Nunito-Bold">
            Please help us to know the reason for canceling the appointment?
          </Text>
          <View className=" bg-pastelGrey border border-pastelgreyBorder px-[15px] rounded-2xl">
            {reasons.map((reason, index) => (
              <TouchableOpacity
                key={index}
                className="py-3 flex-row justify-between items-center border-b border-b-pastelgreyBorder"
                onPress={() => handleReasonSelect(reason)}>
                <Text
                  className={`text-[16px]  font-Nunito-Regular ${
                    selectedReason === reason
                      ? ' text-primary'
                      : ' text-darkGunmetal'
                  }`}>
                  {reason}
                </Text>
                {selectedReason === reason && (
                  <Image
                    source={images.footPrint}
                    className="h-[17px] w-5"
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
          {selectedReason === 'Others' && (
            <View className="bg-pastelGrey border border-pastelgreyBorder rounded-2xl px-4 mt-5 h-[100px] ">
              <TextInput
                className=""
                placeholder="Reason"
                value={customReason}
                placeholderTextColor="#00000080"
                onChangeText={setCustomReason}
                multiline
              />
            </View>
          )}
        </View>
      </ScrollView>
      <FooterBtn
        title="Cancel"
        onClick={() => {
          showToast();
          navigation.pop(2);
        }}
      />
    </View>
  );
};

export default AppointmentCancellation;
