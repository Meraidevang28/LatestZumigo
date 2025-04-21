import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import CalendarCards from './CalendarCards';
const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState('Thu');
  const [viewMore, setViewMore] = useState(false);
  const handleViewMore = () => {
    viewMore ? setViewMore(false) : setViewMore(true);
  };

  // Example data for the week
  const days = [
    {day: 'Mon', date: 22},
    {day: 'Tue', date: 23},
    {day: 'Wed', date: 24},
    {day: 'Thu', date: 25},
    {day: 'Fri', date: 26},
    {day: 'Sat', date: 27},
    {day: 'Sun', date: 28},
  ];

  const handleDatePress = day => {
    setSelectedDate(day);
  };

  return (
    <>
      <View className="flex-1 items-center  bg-pastelGrey border border-pastelgreyBorder rounded-2xl ">
        {/* Week Range and Navigation */}
        <View className="flex flex-row items-center gap-[20px]  mb-[15px] mt-[15px]">
          <TouchableOpacity>
            <Text style={styles.arrow1}>{'<'}</Text>
          </TouchableOpacity>
          <Text className="text-[16px] text-[#000000] font-Nunito-Bold">
            April 22nd - 29th
          </Text>
          <TouchableOpacity>
            <Text style={styles.arrow2}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Days List */}
        <FlatList
          horizontal
          data={days}
          keyExtractor={item => item.date.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.dateContainer,
                item.day === selectedDate && styles.selectedDateContainer,
              ]}
              onPress={() => handleDatePress(item.day)}>
              <Text
                style={[
                  styles.dayText,
                  item.day === selectedDate && styles.selectedDayText,
                ]}>
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  item.day === selectedDate && styles.selectedDateText,
                ]}>
                {item.date}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
        />
        <CalendarCards
          title="Home Visit - Vet Visit, Vaccination"
          date="24, April, 2024"
          time="08:00 AM - 09:00 AM"
          status="Schedule"
        />
        <CalendarCards
          title="Tele consultation"
          date="24, April, 2024"
          time="08:00 AM - 09:00 AM"
          status="Schedule"
        />
        <CalendarCards
          title="Home Visit - Vet Visit, Vaccination"
          date="24, April, 2024"
          time="08:00 AM - 09:00 AM"
          status="Schedule"
        />
      </View>
      <TouchableOpacity onPress={handleViewMore}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Nunito-Regular',
            fontSize: 14,
            textDecorationLine: 'underline',
            marginTop: 15,
            // paddingBottom: "50px",
          }}>
          View More
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    backgroundColor: '#f3f6f7',
    borderRadius: 15,
    // marginLeft: 10,
    // marginRight: 50,
    borderWidth: 0.75,
    borderColor: '#e8e9eb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  arrow1: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginRight: 20,
  },
  arrow2: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 20,
  },

  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: '#f3f6f7',
    marginRight: 15, // Reduced to ensure spacing
  },
  selectedDateContainer: {
    backgroundColor: '#FFE4E1',
  },
  dayText: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Nunito-Regular',
  },
  selectedDayText: {
    color: '#FF4D4D',
    fontWeight: '600',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedDateText: {
    color: '#FF4D4D',
    fontWeight: '600',
    fontFamily: 'Nunito-Regular',
  },
});

export default CalendarComponent;
