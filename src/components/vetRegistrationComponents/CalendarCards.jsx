import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {primary} from '../../assets/theme/colors';

const CalendarCards = ({title, date, time, status}) => {
  const navigation = useNavigation();
  const [viewMore, setViewMore] = useState(false);
  const handleViewMore = () => {
    viewMore ? setViewMore(false) : setViewMore(true);
  };
  const statusBackgroundColor =
    status === 'Completed'
      ? '#8efa95'
      : status === 'Schedule'
      ? '#f5e0c6'
      : '#EEE';
  const handleNavigation = () => {
    if (title.toLowerCase().includes('tele consultation')) {
      navigation.navigate('TeleConsultationScreen'); // Replace with actual screen name
    } else if (title.toLowerCase().includes('home visit')) {
      navigation.navigate('HomeVisitScreen'); // Replace with actual screen name
    }
  };
  return (
    <>
      <TouchableOpacity onPress={handleNavigation}>
        <View className=" flex flex-row gap-[10px] border-t-[0.75px] border-t-[#FCEFDD] mt-[15px] py-3">
          <Text className="w-[39px] h-[39px] bg-[#EEE7F7] rounded-[15px]"></Text>
          <View className="flex flex-col justify-around">
            <View className="flex flex-row justify-between">
              <Text className="text-[14px] font-Nunito-Bold text-[#1C222F]">
                {title}
              </Text>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/rightArrow.png')}
                  style={{tintColor: primary}}
                  className="w-[8px] h-[10px]"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row  item-center gap-[15px]">
              <Text className="mt-[3px]">
                <Image
                  source={require('../../assets/images/calender.png')}
                  className="w-[14.01px] h-[14.01px]"
                  style={{resizeMode: 'cover', tintColor: primary}}
                />
              </Text>
              <Text className="text-[15px] font-Nunito-Regular text-[#666666] ">
                {date}
              </Text>
            </View>
            <View className="flex-row gap-[15px]">
              <Text className="mt-[3px]">
                <Image
                  source={require('../../assets/images/clock.png')}
                  className="w-[11.81px] h-[14px]"
                  style={{resizeMode: 'cover', tintColor: primary}}
                />
              </Text>
              <Text className="text-[14px] font-Nunito-Regular text-[#666666]">
                {time}
              </Text>
              <Text
                style={{
                  backgroundColor: statusBackgroundColor,
                  textAlign: 'center',
                  borderRadius: 5,
                  color: '#FBA537',
                  fontWeight: '600',
                  width: 80,
                  fontFamily: 'Nunito-Bold',
                  paddingTop: 4.5,
                  paddingBottom: 4.5,
                }}>
                {status}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CalendarCards;

const styles = StyleSheet.create({});
