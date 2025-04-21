import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import screens from '../../../constants/screens';
import FooterBtn from '../../../components/shared/FooterBtn';
import CalendarComp from '../../../components/shared/CalendarComp';

const SelectDateTime = ({navigation}) => {
  const [selectedSlot, setSelectedSlot] = useState('09:00 AM - 10:00 AM');

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '03:00 PM - 04:00 PM',
    '05:00 PM - 06:00 PM',
    '07:00 PM - 08:00 PM',
  ];
  return (
    <View className="flex-1 bg-white px-6">
      {/* title  */}
      <Text className="mt-5 mb-[18px] text-[26px] font-PTSans-Bold text-darkGunmetal">
        Select date and time
      </Text>

      {/* calendar will go here  */}

      <View>
        <View className="">
          <CalendarComp />
        </View>
      </View>

      {/* time selection  */}

      <View className="mt-[30px] mb-4">
        <Text className="text-[18px] font-semibold font-Nunito-Bold mb-[13px]  text-darkGunmetal">
          Time slots
        </Text>
      </View>

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
              className={` text-[14px] font-medium text-darkGunmetal leading-6  font-Nunito-Regular ${
                selectedSlot === slot ? ' text-white' : ' text-darkGunmetal'
              }`}>
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* proceed btn  */}

      <FooterBtn
        title="Proceed"
        onClick={() => navigation.navigate(screens.BookAppointment)}
      />
    </View>
  );
};

export default SelectDateTime;
