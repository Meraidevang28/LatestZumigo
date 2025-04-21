import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Svg, Circle} from 'react-native-svg';

const notifications = [
  {
    id: '1',
    doctorName: 'Dr. Jeevan Kumar',
    bookingDate: '24 April, 2024',
    bookingTime: '09:00 AM',
    visitType: 'Home Visit',
  },
];

const Notification = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white px-6">
      {/* Section Title */}
      <Text className="text-[16px] font-Figtree-SemiBold mt-5 mb-3">New</Text>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View className=" bg-pastelGrey border border-pastelgreyBorder  px-[10px] py-[15px] rounded-2xl flex-row items-center gap-[15px]">
            {/* Placeholder for Image */}
            <View className="w-14 h-14 bg-[#F8EFE2] rounded-xl items-end">
              <View className=" w-[14px] h-[14px] bg-[#55AB68] rounded-full mr-[-2px] mt-[-2px] " />
            </View>

            {/* Notification Details */}
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-base font-semibold">
                  {item.doctorName}
                </Text>
              </View>
              <Text className="text-gray-500">
                Booking on: {item.bookingDate}
              </Text>
              <View className="flex-row">
                <Text className="text-gray-400">{item.visitType}</Text>
                <Text className="text-gray-400 ml-2">{item.bookingTime}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Notification;
