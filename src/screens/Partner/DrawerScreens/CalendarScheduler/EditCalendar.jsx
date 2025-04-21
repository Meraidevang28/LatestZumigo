import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
// import {primary} from '../../../assets/theme/colors';
import {primary} from '../../../../assets/theme/colors';
import screens from '../../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
const EditCalendar = () => {
  const navigation = useNavigation();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDaySelection = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day)); // Unselect
    } else {
      setSelectedDays([...selectedDays, day]); // Select
    }
  };
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const hoursData = [
    {
      title: 'Hours',
      hourSlot: [
        {startTime: '9:00 AM', endTime: '12:00 PM'},
        {startTime: '1:00 PM', endTime: '4:00 PM'},
        {startTime: '5:00 PM', endTime: '8:00 PM'},
      ],
    },
  ];

  const scheduleData = [
    {
      day: 'Monday',
      slots: [
        {startTime: '9:00 AM', endTime: '12:00 PM'},
        {startTime: '1:00 PM', endTime: '4:00 PM'},
        {startTime: '5:00 PM', endTime: '8:00 PM'},
      ],
    },
    {
      day: 'Tuesday',
      slots: [
        {startTime: '9:00 AM', endTime: '12:00 PM'},
        {startTime: '1:00 PM', endTime: '4:00 PM'},
        {startTime: '5:00 PM', endTime: '8:00 PM'},
      ],
    },
    {
      day: 'Wednesday',
      slots: [
        {startTime: '9:00 AM', endTime: '12:00 PM'},
        {startTime: '1:00 PM', endTime: '4:00 PM'},
        {startTime: '5:00 PM', endTime: '8:00 PM'},
      ],
    },
    {
      day: 'Thusday',
      slots: [
        {startTime: '9:00 AM', endTime: '12:00 PM'},
        {startTime: '1:00 PM', endTime: '4:00 PM'},
        {startTime: '5:00 PM', endTime: '8:00 PM'},
      ],
    },
    {
      day: 'Friday',
      slots: [
        {startTime: '9:00 AM', endTime: '12:00 PM'},
        {startTime: '1:00 PM', endTime: '4:00 PM'},
        {startTime: '5:00 PM', endTime: '8:00 PM'},
      ],
    },
  ];

  return (
    <>
      <View className="flex-1 bg-white px-6">
        <ScrollView>
          <Text className="text-[26px] font-PTSans-Bold">
            Schedule your work for a week?
          </Text>
          <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f] mt-[9px]">
            Please set your start and end dates when you are available to work.
          </Text>
          <ScrollView horizontal>
            <View className="flex-1 flex-row items-center gap-[6px] mt-4">
              {weekDays.map((day, index) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => toggleDaySelection(day)}>
                    <View
                      className={`w-[44px] h-[54px] border border-pastelgreyBorder rounded-[10px] flex items-center justify-center ${
                        isSelected ? 'bg-primary' : 'bg-pastelGrey'
                      }`}>
                      <Text
                        className={
                          isSelected
                            ? 'text-white font-Nunito-Bold'
                            : 'text-[#7f7f7f]'
                        }>
                        {day}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[20px] mb-[15px]">
            <View className="flex flex-row justify-between items-center mt-[20px] ml-[16px] mb-[20px]">
              <Text className="text-[15px] font-Nunito-Bold">
                Use same hours for all days
              </Text>
              <Switch
                trackColor={{false: '#767577', true: primary}}
                thumbColor={isEnabled ? '#f7f7f7' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                className="mr-[12px]"
              />
            </View>
          </View>
          {isEnabled ? (
            <FlatList
              data={hoursData}
              keyExtractor={item => item.title}
              renderItem={({item}) => (
                <View className="mb-5">
                  <Text className="text-[16px] font-bold text-black mb-2">
                    {item.title}
                  </Text>

                  {/* Grey Background Box */}
                  <View className="bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-3">
                    {item.hourSlot.map((slot, index) => (
                      <View
                        key={index}
                        className="flex-row justify-between items-center py-2">
                        <View className="flex-row gap-2">
                          <TouchableOpacity>
                            <Text className="text-[14px] text-black bg-white px-3 py-2 rounded-[8px] w-[120px] text-center">
                              {slot.startTime}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Text className="text-[14px] text-black bg-white px-3 py-2 rounded-[8px] w-[120px] text-center">
                              {slot.endTime}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        {index === item.hourSlot.length - 1 ? (
                          <TouchableOpacity>
                            <Image
                              source={require('../../../../assets/images/secondaryAdd.png')}
                              className="w-[14px] h-[14px]"
                              style={{tintColor: primary}}
                            />
                          </TouchableOpacity>
                        ) : (
                          <View className="w-[14px] h-[14px]" />
                        )}
                        <TouchableOpacity>
                          <Image
                            source={require('../../../../assets/images/deleteImage.png')}
                            className="w-[10px] h-[14px]"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            />
          ) : (
            <FlatList
              data={scheduleData}
              keyExtractor={item => item.day}
              renderItem={({item}) => (
                <View className="mb-5">
                  <Text className="text-[16px] font-bold text-black mb-2">
                    {item.day}
                  </Text>

                  {/* Grey Background Box */}
                  <View className="bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-3">
                    {item.slots.map((slot, index) => (
                      <View
                        key={index}
                        className="flex-row justify-between items-center py-2">
                        <View className="flex-row gap-2">
                          <TouchableOpacity>
                            <Text className="text-[14px] text-black bg-white px-3 py-2 rounded-[8px] w-[120px] text-center">
                              {slot.startTime}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Text className="text-[14px] text-black bg-white px-3 py-2 rounded-[8px] w-[120px] text-center">
                              {slot.endTime}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        {index === item.slots.length - 1 ? (
                          <TouchableOpacity>
                            <Image
                              source={require('../../../../assets/images/secondaryAdd.png')}
                              className="w-[14px] h-[14px]"
                            />
                          </TouchableOpacity>
                        ) : (
                          <View className="w-[14px] h-[14px]" />
                        )}
                        <TouchableOpacity>
                          <Image
                            source={require('../../../../assets/images/deleteImage.png')}
                            className="w-[10px] h-[14px]"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            />
          )}
        </ScrollView>
      </View>
      <View
        className="bg-white flex px-6 justify-center h-[100px] w-full"
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 50, height: 60}, // Adjust as needed
          shadowOpacity: 50, // Lower for subtle shadows
          shadowRadius: 10,
          elevation: 18, // Android shadow
        }}>
        <TouchableOpacity
          className="h-[60px] bg-primary items-center justify-center rounded-2xl"
          onPress={() => {
            navigation.navigate(screens.CalendarScheduler);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditCalendar;

const styles = StyleSheet.create({});
