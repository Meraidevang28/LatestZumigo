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
import CalendarComp from '../../../components/shared/CalendarComp';

const timeSlots = [
  '09:00 AM - 10:00 AM',
  '11:00 AM - 12:00 PM',
  '01:00 PM - 02:00 PM',
  '03:00 PM - 04:00 PM',
  '05:00 PM - 06:00 PM',
  '07:00 PM - 08:00 PM',
];

const AppointmentReschedule = ({navigation}) => {
  const [selectedSlot, setSelectedSlot] = useState('09:00 AM - 10:00 AM');
  const [note, setNotet] = useState('');

  const showToast = () => {
    Toast.show({
      type: 'successfullyToast',
      text1: 'Appointments updated',
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

        <View className="mt-4 mb-4">
          <View className="bg-pastelGrey border-pastelgreyBorder border rounded-2xl pt-[15.3px] pl-[15px] pb-[17px]">
            <Text className=" text-gray-900 mb-1 mt-2  font-Nunito-Regular">
              Appointment ID:{' '}
              <Text className=" text-black text-[16px] font-Nunito-Bold">
                234567896
              </Text>
            </Text>
            <Text className=" text-gray-900 font-Nunito-Regular">
              Appointment Booked for:{' '}
              <Text className=" text-black text-[16px]  font-Nunito-Bold">
                MAX
              </Text>
            </Text>
          </View>
        </View>

        {/* Vet Details  */}

        <View className="mb-[30px]">
          <BookingVetDetailCard />
        </View>

        {/* Date and Time  */}

        <View>
          <Text className="text-[18px] text-darkGunmetal mb-[10px] pr-[43px] font-Nunito-Bold">
            Date and Time
          </Text>
          <CalendarComp />
        </View>

        {/* Time Slots  */}

        <View className=" my-4">
          <Text className="text-[18px] text-darkGunmetal mb-[10px] pr-[43px] font-Nunito-Bold">
            Time Slots
          </Text>
          <View className=" flex flex-row justify-between flex-wrap">
            {timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                className={`mb-[10px] w-[48.5%] py-[15px] rounded-2xl items-center border ${
                  selectedSlot === slot
                    ? 'bg-primary border-primary'
                    : 'bg-[#FCF4F4] border-[#F8E1E3]'
                }`}
                onPress={() => setSelectedSlot(slot)}>
                <Text
                  className={` text-[14px] font-medium text-darkGunmetal leading-6 ${
                    selectedSlot === slot ? ' text-white' : ' text-darkGunmetal'
                  }`}
                  style={{fontFamily: 'Proxima-Nova-Medium'}}>
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="bg-pastelGrey border border-pastelgreyBorder rounded-2xl px-4 h-[100px] ">
          <TextInput
            className=""
            placeholder="Note"
            value={note}
            onChangeText={setNotet}
            placeholderTextColor="#00000080"
            multiline
          />
        </View>
      </ScrollView>
      <FooterBtn
        title="Reschedule"
        onClick={() => {
          showToast();
          navigation.pop(2);
        }}
      />
    </View>
  );
};

export default AppointmentReschedule;
