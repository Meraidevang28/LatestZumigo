import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {primary} from '../../../assets/theme/colors';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';

const SelectDateTimeGroomer = ({navigation}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const toggleDaySelection = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleTimePress = time => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(prevTimes => prevTimes.filter(t => t !== time));
    } else {
      setSelectedTimes(prevTimes => [...prevTimes, time]);
    }
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    return Array.from({length: 7}, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date.getDate();
    });
  };

  const weekDates = useMemo(() => getCurrentWeekDates(), []);
  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '01:00 PM',
    '01:30 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  const renderItem = ({item}) => {
    const isSelected = selectedTimes.includes(item);
    return (
      <TouchableOpacity
        onPress={() => handleTimePress(item)}
        style={[
          styles.timeItem,
          {
            backgroundColor: isSelected ? primary : '#F2F6F733',
            borderColor: isSelected ? primary : '#848A9A33',
          },
        ]}>
        <Text
          style={[
            styles.timeText,
            {
              color: isSelected ? '#fff' : '#838999',
            },
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: hp('3%')}}>
        <Text style={styles.heading}>Select Date and Time</Text>

        <Text style={styles.subHeading}>Select Date</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.weekContainer}>
            {weekDays.map((day, index) => {
              const isSelected = selectedDays.includes(day);
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleDaySelection(day)}
                  style={[
                    styles.dayItem,
                    {
                      backgroundColor: isSelected ? primary : '#F2F6F7',
                      borderColor: isSelected ? primary : '#d1d5db',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.dayText,
                      {
                        color: isSelected ? '#fff' : '#7f7f7f',
                      },
                    ]}>
                    {day}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      {
                        color: isSelected ? '#fff' : '#7f7f7f',
                      },
                    ]}>
                    {weekDates[index]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.divider} />

        <Text style={styles.subHeading}>Select Time</Text>

        <FlatList
          data={timeSlots}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={renderItem}
          contentContainerStyle={{alignItems: 'center'}}
        />
      </ScrollView>

      <FooterBtn
        title="Book Appointment"
        onClick={() =>
          navigation.navigate(screens.PreviewProceedPaymentGroomer)
        }
      />
    </SafeAreaView>
  );
};

export default SelectDateTimeGroomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
  },
  heading: {
    fontSize: wp('6.2%'),
    fontWeight: '700',
    fontFamily: 'Nunito-Regular',
    marginTop: hp('1%'),
  },
  subHeading: {
    fontSize: wp('5.2%'),
    fontWeight: '500',
    fontFamily: 'Nunito-Regular',
    marginTop: hp('2%'),
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%'),
    gap: wp('2%'),
  },
  dayItem: {
    width: wp('13.5%'),
    height: hp('8%'),
    borderRadius: wp('4%'),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2%'),
  },
  dayText: {
    fontSize: wp('3.6%'),
    fontFamily: 'Nunito-Bold',
  },
  dateText: {
    marginTop: hp('0.5%'),
    fontSize: wp('3.3%'),
    fontFamily: 'Nunito-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#848A9A33',
    width: '100%',
    marginVertical: hp('2%'),
  },
  timeItem: {
    paddingVertical: hp('1.5%'),
    width: wp('28%'),
    borderRadius: wp('4%'),
    margin: wp('1.5%'),
    borderWidth: 1,
    alignItems: 'center',
  },
  timeText: {
    fontWeight: '600',
    fontSize: wp('4%'),
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
  },
});
