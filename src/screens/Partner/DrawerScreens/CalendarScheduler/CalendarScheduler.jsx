import React, {useRef, useMemo, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
} from 'react-native';
import {primary} from '../../../../assets/theme/colors';
import FooterBtn from '../../../../components/shared/FooterBtn';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../../constants/screens';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CalendarComp from '../../../../components/shared/CalendarComp';
const CalendarScheduler = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('Thu');
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
  const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [status, setStatus] = useState('disable');
  const handlePress = () => {
    if (status === 'disable') {
      setStatus('hidden'); // First press: Hide button, text turns gray
    } else if (status === 'hidden') {
      setStatus('enable'); // Second press: Show "Enable" button, text turns black
    } else {
      setStatus('disable'); // Third press: Back to initial state
    }
  };
  const BottomsheetRef = useRef(null);
  const snapPoints = useMemo(() => ['60%'], []);
  const handlePresentModalPress = useCallback(() => {
    BottomsheetRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    BottomsheetRef.current?.dismiss();
    setIsEnabled(previousState => !previousState);
  }, []);

  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <ScrollView>
            <View>
              <View className="">
                <CalendarComp />
              </View>
            </View>
            <TouchableOpacity onPress={handlePresentModalPress}>
              <View className=" mt-[20px]  bg-pastelGrey border border-pastelgreyBorder rounded-[20px]">
                <View className="flex flex-row justify-between items-center mt-[20px] ml-[16px] mb-[20px]">
                  <Text className="text-[15px] font-Nunito-Bold h-[20px]">
                    Mark as Holiday
                  </Text>
                  <Switch
                    trackColor={{false: '#767577', true: primary}}
                    thumbColor={isEnabled ? '#f7f7f7' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    // onValueChange={toggleSwitch}
                    value={isEnabled}
                    className="mr-[12px]"
                  />
                </View>
              </View>
            </TouchableOpacity>

            <Text className="text-[16px] font-PTSans-Bold text-[#000000] mt-[30.9px] mb-[14.1px]">
              Home Visit
            </Text>
            <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
              <View className="flex flex-row gap-[5px] items-center mb-[17px] ml-[16px] mt-[30px]">
                <Text
                  className={`text-[16px] font-Nunito-Bold ${
                    isEnabled ? 'text-gray-400' : 'text-black'
                  }`}>
                  09:00 AM - 10:00 AM
                </Text>
                <Text className="text-[12px] font-Nunito-Regular text-[#7f7f7f]">
                  Home Visit
                </Text>
              </View>
              <Text className="ml-[16px] text-[14px] font-Nunito-Regular text-[#7f7f7f] mb-[20.5px]">
                No appointments
              </Text>
              <Text className=" h-[0.9px] bg-[#e8e9eb] ml-[15.5px] mt-[17.5px] mr-[15.5px] mb-[15.5px]"></Text>
              <TouchableOpacity onPress={handlePress} className="w-full">
                <View className="flex flex-row items-center justify-between p-4">
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-2">
                      <Text
                        className={`text-[16px] font-Nunito-Bold ${
                          status === 'hidden' ? 'text-gray-400' : 'text-black'
                        }`}>
                        10:00 AM - 11:00 AM
                      </Text>
                      <Text className="text-[12px] font-Nunito-Regular text-[#7f7f7f]">
                        Home Visit
                      </Text>
                    </View>
                    <Text className=" text-[14px] font-Nunito-Regular text-[#7f7f7f] mb-[20.5px]">
                      No appointments
                    </Text>
                  </View>

                  {status !== 'hidden' && (
                    <View
                      className={`w-[90px] h-[90px] items-center justify-center rounded-md  ${
                        status === 'disable' ? 'bg-primary' : 'bg-green-500'
                      }`}>
                      <Text className="text-[16px] font-Nunito-Bold text-white">
                        {status === 'disable' ? 'Disable' : 'Enable'}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <Text className=" h-[0.9px] bg-[#e8e9eb] ml-[15.5px] mr-[15.5px] mb-[15.5px]"></Text>
              <View className="flex flex-row gap-[5px] items-center mb-[17px] ml-[16px] mt-[30px]">
                <Text
                  className={`text-[16px] font-Nunito-Bold ${
                    isEnabled ? 'text-gray-400' : 'text-black'
                  }`}>
                  12:00 AM - 01:00 PM
                </Text>
                <Text className="text-[12px] font-Nunito-Regular text-[#7f7f7f]">
                  Home Visit
                </Text>
              </View>
              <Text className="ml-[16px] text-[14px] font-Nunito-Regular text-[#7f7f7f] mb-[20.5px]">
                No appointments
              </Text>
            </View>
            <Text className="text-[16px] font-PTSans-Bold text-[#000000] mt-[30.9px] mb-[14.1px]">
              Tele Consultation
            </Text>
            <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
              <View className="flex flex-row mt-[10px] ">
                <Text className="w-[7px] h-[95px] bg-purple rounded-l-lg"></Text>
                <View className="flex flex-col bg-[#dcc9f5] w-[335px]">
                  <View className="  gap-[5px] flex flex-row items-center ">
                    <Text
                      className={`text-[16px] font-Nunito-Bold ${
                        isEnabled ? 'text-gray-400' : 'text-black'
                      }`}>
                      01:00 PM - 01:15 PM
                    </Text>
                    <Text className="text-[14px] font-Nunito-Regular mt-[12px] text-[#7f7f7f]">
                      Tele Consultation
                    </Text>
                  </View>
                  <View className="flex flex-row mt-[8.5px] ml-[10px] gap-[4px] items-center">
                    <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                      Appointment ID:
                    </Text>
                    <Text className='text-[16px] font-Nunito-Bold"'>
                      234567896
                    </Text>
                  </View>
                  <Text className="text-[14px] font-Nunito-Bold text-[#000000] mt-[8.5px] ml-[10px]">
                    For Max
                  </Text>
                </View>
              </View>
              <View className="flex flex-row ml-[10px] mt-[18.8px] gap-[6px] items-center">
                <Text
                  className={`text-[16px] font-Nunito-Bold ${
                    isEnabled ? 'text-gray-400' : 'text-black'
                  }`}>
                  01:15 PM - 01:30 PM
                </Text>
                <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                  Tele Consultation
                </Text>
              </View>
              <Text className="mt-[17px] text-[14px] font-Nunito-Regular text-[#7f7f7f] ml-[10px]">
                No appointments
              </Text>
              <Text className=" h-[0.9px] bg-[#e8e9eb] ml-[15.5px] mt-[20.5px] mr-[15.5px] mb-[15.5px]"></Text>
              <View className="flex flex-row ml-[10px] mt-[18.8px] gap-[6px] items-center">
                <Text
                  className={`text-[16px] font-Nunito-Bold ${
                    isEnabled ? 'text-gray-400' : 'text-black'
                  }`}>
                  01:30 PM - 01:45 PM
                </Text>
                <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                  Tele Consultation
                </Text>
              </View>
              <Text className="mt-[17px] text-[14px] font-Nunito-Regular text-[#7f7f7f] ml-[10px]">
                No appointments
              </Text>
              <Text className=" h-[0.9px] bg-[#e8e9eb] ml-[15.5px] mt-[20.5px] mr-[15.5px] mb-[15.5px]"></Text>
              <View className="flex flex-row ml-[10px] mt-[18.8px] gap-[6px] items-center">
                <Text
                  className={`text-[16px] font-Nunito-Bold ${
                    isEnabled ? 'text-gray-400' : 'text-black'
                  }`}>
                  01:45 PM - 02:00 PM
                </Text>
                <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                  Tele Consultation
                </Text>
              </View>
              <Text className="mt-[17px] text-[14px] font-Nunito-Regular text-[#7f7f7f] ml-[10px] mb-[31.7px]">
                No appointments
              </Text>
            </View>
            <Text className="text-[16px] font-PTSans-Bold text-[#000000] mt-[30.9px] mb-[14.1px]">
              Home Visit
            </Text>
            <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl mb-[150px]">
              <View className="flex flex-row ml-[10px] mt-[18.8px] gap-[6px] items-center">
                <Text
                  className={`text-[16px] font-Nunito-Bold ${
                    isEnabled ? 'text-gray-400' : 'text-black'
                  }`}>
                  02:00 PM - 03:00 PM
                </Text>
                <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                  Home Visit
                </Text>
              </View>
              <Text className="mt-[17px] text-[14px] font-Nunito-Regular text-[#7f7f7f] ml-[10px] mb-[31.7px]">
                No appointments
              </Text>

              <View className="flex flex-row mt-[10px] ">
                <Text className="w-[7px] h-[95px] bg-purple rounded-l-lg"></Text>
                <View className="flex flex-col bg-[#dcc9f5] w-[335px]">
                  <View className="  gap-[5px] flex flex-row items-center ">
                    <Text
                      className={`text-[16px] font-Nunito-Bold ${
                        isEnabled ? 'text-gray-400' : 'text-black'
                      }`}>
                      03:00 PM - 04:00 PM
                    </Text>
                    <Text className="text-[14px] font-Nunito-Regular mt-[12px] text-[#7f7f7f]">
                      Home Visit
                    </Text>
                  </View>
                  <View className="flex flex-row mt-[8.5px] ml-[10px] gap-[4px] items-center">
                    <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                      Appointment ID:
                    </Text>
                    <Text className='text-[16px] font-Nunito-Bold"'>
                      234567896
                    </Text>
                  </View>
                  <Text className="text-[14px] font-Nunito-Bold text-[#000000] mt-[8.5px] ml-[10px]">
                    For Max
                  </Text>
                </View>
              </View>
              <View className="flex flex-row ml-[10px] mt-[18.8px] gap-[6px] items-center">
                <Text
                  className={`text-[16px] font-Nunito-Bold ${
                    isEnabled ? 'text-gray-400' : 'text-black'
                  }`}>
                  04:00 PM - 05:00 PM
                </Text>
                <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                  Home Visit
                </Text>
              </View>
              <Text className="mt-[17px] text-[14px] font-Nunito-Regular text-[#7f7f7f] ml-[10px] mb-[31.7px]">
                No appointments
              </Text>
              <Text className=" h-[0.9px] bg-[#e8e9eb] ml-[15.5px] mr-[15.5px] mb-[15.5px]"></Text>
              <View className="flex flex-row ml-[10px] mt-[18.8px] gap-[6px] items-center">
                <Text
                  className={`text-[16px] font-Nunito-Bold ${
                    isEnabled ? 'text-gray-400' : 'text-black'
                  }`}>
                  05:00 PM - 06:00 PM
                </Text>
                <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                  Home Visit
                </Text>
              </View>
              <Text className="mt-[17px] text-[14px] font-Nunito-Regular text-[#7f7f7f] ml-[10px] mb-[31.7px]">
                No appointments
              </Text>
              <Text className=" h-[0.9px] bg-[#e8e9eb] ml-[15.5px] mr-[15.5px] mb-[15.5px]"></Text>
              <View className="flex flex-row ml-[10px] mt-[18.8px] gap-[6px] items-center">
                <Text
                  className={`text-[16px] font-Nunito-Bold ${
                    isEnabled ? 'text-gray-400' : 'text-black'
                  }`}>
                  06:00 PM - 07:00 PM
                </Text>
                <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                  Home Visit
                </Text>
              </View>
              <Text className="mt-[17px] text-[14px] font-Nunito-Regular text-[#7f7f7f] ml-[10px] mb-[31.7px]">
                No appointments
              </Text>
              <Text className=" h-[0.9px] bg-[#e8e9eb] ml-[15.5px] mr-[15.5px] mb-[15.5px]"></Text>
              <View className="flex flex-row ml-[10px] mt-[18.8px] gap-[6px] items-center">
                <Text
                  className={`text-[16px] font-Nunito-Bold ${
                    isEnabled ? 'text-gray-400' : 'text-black'
                  }`}>
                  07:00 PM - 08:00 PM
                </Text>
                <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                  Home Visit
                </Text>
              </View>
              <Text className="mt-[17px] text-[14px] font-Nunito-Regular text-[#7f7f7f] ml-[10px] mb-[31.7px]">
                No appointments
              </Text>
            </View>
          </ScrollView>
          {/* <FooterBtn title="Edit" /> */}
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={BottomsheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="p-5">
            <View className="flex flex-col justify-center items-center">
              <Text className="h-[66px] w-[158px] text-center bg-[#bbbcb8] rounded-[10px]"></Text>
              <Text className="text-[18px] text-[#000000] font-Nunito-Bold text-center mt-[10px] w-[264px]">
                This will mark the entire day as a holiday and hide your
                availability from customers.
              </Text>
            </View>
            <View className="flex flex-row items-center gap-[10px] mt-[60px] justify-center">
              <TouchableOpacity
                className="bg-[#edc5d2] h-[60px] w-[165px] items-center justify-center rounded-2xl"
                onPress={handleDismissModalPress}>
                <Text className="text-primary text-[16px] font-Nunito-Bold">
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary h-[60px] w-[165px] items-center justify-center rounded-2xl"
                onPress={handleDismissModalPress}>
                <Text className="text-white text-[16px] font-Nunito-Bold">
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
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
            navigation.navigate(screens.EditCalendar);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CalendarScheduler;

const styles = StyleSheet.create({
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
    color: '#d75880',
    fontWeight: '700',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
  },
  selectedDateText: {
    color: '#d75880',
    fontWeight: '700',
    fontFamily: 'Nunito-Regular',
  },
});
