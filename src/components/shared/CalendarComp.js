import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import images from '../../assets/images';
import {Calendar} from 'react-native-calendars';
import {primary} from '../../assets/theme/colors';

const dates = [
  {day: 'Mon', date: 22},
  {day: 'Tue', date: 23},
  {day: 'Wed', date: 24},
  {day: 'Thu', date: 25},
  {day: 'Fri', date: 26},
  {day: 'Sat', date: 27},
  {day: 'Sun', date: 28},
];
const CalendarComp = () => {
  const [selectedDate, setSelectedDate] = useState(24);
  const [viewMode, setViewMode] = useState('week');
  const [selected, setSelected] = useState('');

  return (
    <View className=" bg-pastelGrey border border-pastelgreyBorder  rounded-2xl  overflow-hidden">
      {viewMode === 'week' ? (
        <View className=" pt-[22px]">
          <View className="flex-row  justify-between items-center mb-3">
            <Image
              source={images.BackBtn}
              className="w-[7.51px] h-[14.51px] ml-[14px]"
              style={{tintColor: '#1C222F'}}
            />
            <Text className="text-lg font-Nunito-Bold">April 22nd - 29th</Text>
            <Image
              source={images.BackBtn}
              className="w-[7.51px] h-[14.51px] mr-[14px] rotate-180"
              style={{tintColor: '#1C222F'}}
            />
          </View>

          {/* Date List */}
          <View className="flex-row justify-between mb-5 px-[25px]">
            {dates.map(d => (
              <TouchableOpacity
                key={d.date}
                className={`rounded-lg py-3 ${
                  selectedDate === d.date ? ' bg-primaryOpacity-10 px-3' : ''
                }`}
                onPress={() => setSelectedDate(d.date)}>
                <Text
                  className={`text-center  font-Nunito-Regular  text-[12px] ${
                    selectedDate === d.date
                      ? 'text-primary'
                      : 'text-black opacity-50'
                  }`}>
                  {d.day}
                </Text>
                <Text
                  className={`text-center font-Nunito-Regular text-[12px] ${
                    selectedDate === d.date
                      ? 'text-primary font-bold'
                      : 'text-black opacity-50'
                  }`}>
                  {d.date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <Calendar
          // Customize the appearance of the calendar
          style={{}}
          renderArrow={direction =>
            direction === 'left' ? (
              <Image
                source={images.BackBtn}
                className="w-[7.51px] h-[14.51px] "
                style={{tintColor: '#1C222F'}}
              />
            ) : (
              <Image
                source={images.BackBtn}
                className="w-[7.51px] h-[14.51px] rotate-180"
                style={{tintColor: '#1C222F'}}
              />
            )
          }
          theme={{
            calendarBackground: '#f3f6f7',
            textSectionTitleColor: '#00000080', // day
            selectedDayBackgroundColor: '#d75880',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '00000080',
            dayTextColor: '#00000080',
            textDisabledColor: '#3333331A',
          }}
          current={selected}
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
        />
      )}

      <TouchableOpacity
        onPress={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}>
        <View className="bg-pastelgreyBorder py-[15px] flex-row gap-2 items-center justify-center">
          <Image
            source={images.calender}
            className=" h-4 w-4"
            style={{tintColor: primary}}
          />
          <Text className=" font-Nunito-Bold">Monthly View</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CalendarComp;
