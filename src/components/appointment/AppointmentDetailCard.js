import {View, Text, Image} from 'react-native';
import React from 'react';
import images from '../../assets/images';

const AppointmentDetailCard = ({id, dateAndTime}) => {
  return (
    <View className="bg-pastelGrey border-pastelgreyBorder border rounded-2xl pt-[15.3px] pl-[15px] pb-[17px]">
      <Text className=" font-Nunito-Regular">
        Appointment ID: <Text className=" font-Nunito-Bold">{id}</Text>
      </Text>
      <View className="flex-row gap-2 items-center mt-[9px]">
        <Image source={images.timedate} className="w-[18px] h-[16px]" />
        <Text className=" font-Nunito-Bold">{dateAndTime}</Text>
      </View>
    </View>
  );
};

export default AppointmentDetailCard;
