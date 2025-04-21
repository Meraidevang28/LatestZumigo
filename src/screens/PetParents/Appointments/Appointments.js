import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import images from '../../../assets/images';
import screens from '../../../constants/screens';

const AppointmentsScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  // Data for upcoming appointments
  const upcomingAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Jeevan Kumar',
      type: 'Home Visit',
      status: 'Scheduled',
      date: 'April 24, 2024',
      time: '09:00 AM',
      image: images.VetImage,
    },
    {
      id: '2',
      doctorName: 'Dr. Jeevan Kumar',
      type: 'Tele Consultation',
      status: 'In progress',
      date: 'April 26, 2024',
      time: '09:00 AM',
      image: images.VetImage,
    },
    {
      id: '3',
      doctorName: 'Dr. Manisha',
      type: 'Home Visit',
      status: 'Scheduled',
      date: 'April 26, 2024',
      time: '04:30 PM',
      image: images.VetImage2,
    },
  ];

  // Data for past appointments
  const pastAppointments = [
    {
      id: '4',
      doctorName: 'Mr. Jone Smith',
      type: 'Home Visit',
      status: 'Completed',
      date: 'April 24, 2024',
      time: '09:00 AM',
      image: images.VetImage,
    },
    {
      id: '5',
      doctorName: 'Mr. Martin',
      type: 'Tele Consultation',
      status: 'Closed',
      date: 'April 26, 2024',
      time: '10:00 AM',
      image: images.VetImage,
    },
    {
      id: '6',
      doctorName: 'Ms. Marie Thomas',
      type: 'Home Visit',
      status: 'Cancelled',
      date: 'April 26, 2024',
      time: '04:30 PM',
      image: images.VetImage,
    },
  ];

  const renderAppointment = ({item}) => (
    <TouchableOpacity
      className="bg-pastelGrey border border-pastelgreyBorder mb-[15px] rounded-2xl flex-row py-[15px] px-[16px] gap-4"
      onPress={() => {
        item.status === 'Scheduled'
          ? navigation.navigate(screens.BookingScheduled)
          : item.status === 'In progress'
          ? null
          : item.status === 'Completed'
          ? navigation.navigate(screens.BookingCompleted)
          : item.status === 'Cancelled'
          ? navigation.navigate(screens.BookingCancelled)
          : null;
      }}>
      <Image source={item.image} className="h-[68px] w-[68px]" />
      <View>
        <Text className="text-darkGunmetal text-[16px] mb-[7.2px] font-Proxima-Nova-Semibold">
          {item.doctorName}
        </Text>

        <View className="flex-row items-center mb-[5px] gap-[6.5px]">
          <Text className="text-[12px] text-gray-800 font-Nunito-Regular">
            {item.type}
          </Text>
          <View className=" border-l border-[#D1D1D1] h-[10px]" />
          <Text
            className={`
            pt-[6.5px] pb-[3px] px-[10px] rounded-md text-[12px] leading-3 font-Nunito-Regular
            ${
              item.status === 'Scheduled'
                ? ' bg-lightYellow text-yellow'
                : item.status === 'In progress'
                ? ' bg-[#1CBC2826] text-[#1CBC28]'
                : item.status === 'Completed'
                ? ' bg-[#1CBC2826] text-[#1CBC28]'
                : item.status === 'Closed'
                ? ' bg-[#F45B5B26] text-[#F45B5B]'
                : ' bg-[#F45B5B26] text-[#F45B5B]'
            }`}>
            {item.status}
          </Text>
        </View>
        <View className="flex-row gap-[6.5px] mt-[5px]">
          <Text className="leading-[14px] font-Nunito-Regular">
            {item.date}
          </Text>
          <View className=" border-l border-[#D1D1D1] h-[10px]" />
          <Text className="leading-[14px] font-Nunito-Regular">
            {item.time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white px-6">
      {/* Tabs */}
      <View className="my-5 flex-row bg-pastelGrey rounded-2xl overflow-hidden ">
        <TouchableOpacity
          className={`flex-1 p-[15px] items-center  rounded-2xl ${
            activeTab === 'Upcoming' ? ' bg-primary' : ''
          }`}
          onPress={() => setActiveTab('Upcoming')}>
          <Text
            className={` text-[16px]  leading-[22px] ${
              activeTab === 'Upcoming'
                ? ' text-white font-Proxima-Nova-Semibold'
                : ' text-[#969492] font-Nunito-Regular'
            }`}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-[15px] items-center  rounded-2xl ${
            activeTab === 'Past' ? ' bg-primary' : ''
          }`}
          onPress={() => setActiveTab('Past')}>
          <Text
            className={` text-[16px]   leading-[22px] ${
              activeTab === 'Past'
                ? ' text-white font-Proxima-Nova-Semibold'
                : ' text-[#969492] font-Nunito-Regular'
            }`}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointment List */}
      <FlatList
        data={
          activeTab === 'Upcoming' ? upcomingAppointments : pastAppointments
        }
        renderItem={renderAppointment}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AppointmentsScreen;
