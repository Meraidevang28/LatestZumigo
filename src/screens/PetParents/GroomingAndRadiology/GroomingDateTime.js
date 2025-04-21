import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import ServiceInfoCard from '../../../components/shared/ServiceInfoCard';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import CalendarComp from '../../../components/shared/CalendarComp';
import screens from '../../../constants/screens';

const timeSlots = [
  '09:00 AM - 10:00 AM',
  '11:00 AM - 12:00 PM',
  '01:00 PM - 02:00 PM',
  '03:00 PM - 04:00 PM',
  '05:00 PM - 06:00 PM',
  '07:00 PM - 08:00 PM',
];

const GroomingDateTime = ({navigation}) => {
  const [selectedSlot, setSelectedSlot] = useState('09:00 AM - 10:00 AM');

  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        {/* title  */}
        <Text
          className="mt-5 mb-[18px] text-[26px] font-semibold text-darkGunmetal"
          style={{fontFamily: 'Proxima-Nova-Semibold'}}>
          Choose the provider
        </Text>

        {/* service details card  */}
        <ServiceInfoCard
          image={images.PetfolkImage}
          name={'Petfolk'}
          qualification={'Pet Grooming Salon'}
          rating={'4.2/5'}
          reviews={134}
          onClick={() => {}}>
          <Text className=" font-Proxima-Nova-Regular text-darkGunmetal">
            <Text className=" text-[20px] font-Proxima-Nova-Semibold text-gray-900">
              {'₹1,200.00'}/
            </Text>{' '}
            {'Routine Grooming'}
          </Text>
        </ServiceInfoCard>

        {/* Date Selection */}
        <View className=" mb-[30px]  mt-[5px]">
          <CalendarComp />
        </View>

        {/* Select time */}

        <Text className=" mb-[15px] text-[18px] font-Proxima-Nova-Semibold">
          Select time to proceed
        </Text>

        <View className=" flex flex-row justify-between flex-wrap mb-36">
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
      </ScrollView>
      <FooterBtn
        title={'Proceed'}
        onClick={() => navigation.navigate(screens.GroomingServices)}
      />
    </View>
  );
};

export default GroomingDateTime;
