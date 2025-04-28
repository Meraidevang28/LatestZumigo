import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  ScrollView,
  FlatList,
  Image,
  Button,
  Modal,
  Platform,
  Dimensions,
  // FlatList,
} from 'react-native';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import {primary} from '../../../assets/theme/colors';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
const SelectDataTimeHomeVisit = ({navigation}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDays, setSelectedDays] = useState([]);
  const toggleDaySelection = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day)); // Unselect
    } else {
      setSelectedDays([...selectedDays, day]); // Select
    }
  };
  const [selectedTimes, setSelectedTimes] = useState([]); // notice array []
  const handleTimePress = time => {
    if (selectedTimes.includes(time)) {
      // If already selected, remove it
      setSelectedTimes(prevTimes => prevTimes.filter(t => t !== time));
    } else {
      // Otherwise add it
      setSelectedTimes(prevTimes => [...prevTimes, time]);
    }
  };
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
        style={{
          backgroundColor: isSelected ? primary : '#F2F6F733', // Pink when selected
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderRadius: 12,
          margin: 8,
          borderWidth: 1,
          borderColor: isSelected ? primary : '#848A9A33',
        }}>
        <Text
          style={{
            color: isSelected ? '#fff' : '#838999',
            fontWeight: '600',
            fontSize: 16,
            textAlign: 'center',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView>
        <Text
          className="text-[24px] font-Nunito-Regular"
          style={{fontWeight: '700'}}>
          Select Data and Time
        </Text>
        <Text
          className="text-[21px] mt-[15px] font-Nunito-Regular"
          style={{fontWeight: '500'}}>
          Select Date
        </Text>
        <ScrollView horizontal>
          <View className="flex-1 flex-row items-center gap-[10px] mt-4">
            {weekDays.map((day, index) => {
              const isSelected = selectedDays.includes(day);
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleDaySelection(day)}>
                  <View
                    className={`w-[49px] h-[53px] border border-pastelgreyBorder rounded-[15px] flex items-center justify-center ${
                      isSelected ? 'bg-primary border-primary' : 'bg-[#F2F6F7]'
                    }`}>
                    <Text
                      className={
                        isSelected
                          ? 'text-white font-Nunito-Bold'
                          : 'text-[#7f7f7f]  font-Nunito-Bold'
                      }>
                      {day}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <View className="h-[1px] bg-black w-full my-4" />
        <Text
          style={{
            fontSize: 22,
            fontWeight: '500',
            marginBottom: 10,
            marginTop: 20,
          }}
          className="text-[21px] font-Nunito-Regular">
          Select Time
        </Text>

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
        onClick={() => navigation.navigate(screens.PreviewProceedPayment)}
      />
    </View>
  );
};

export default SelectDataTimeHomeVisit;

const styles = StyleSheet.create({});
