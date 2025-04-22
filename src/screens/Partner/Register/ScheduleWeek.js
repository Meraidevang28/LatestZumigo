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
} from 'react-native';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import {darkGrey, primary} from '../../../assets/theme/colors';
import FooterBtn from '../../../components/shared/FooterBtn';
import {Picker} from '@react-native-picker/picker';
import TimePicker from '../../../components/vetRegistrationComponents/TimePicker';
import WheelPicker from '@quidone/react-native-wheel-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Modal from 'react-native-modal';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../constants/screens';

const ScheduleWeek = () => {
  const {height, width} = Dimensions.get('window');
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [selectedMinuteIndex, setSelectedMinuteIndex] = useState(0);
  const [selectedHourIndex, setSelectedHourIndex] = useState(0);
  const [selectedAmPmIndex, setSelectedAmPmIndex] = useState(0);
  const [activeTimeField, setActiveTimeField] = useState(null); // 'start' or 'end'
  const hourdata = [...Array(12).keys()].map(index => ({
    value: index + 1,
    label: String(index + 1),
  }));
  // const mindata = [...Array(60).keys()].map(index => ({
  //   value: index,
  //   label: index < 10 ? `0${index}` : String(index),
  // }));
  const mindata = [0, 15, 30, 45].map(index => ({
    value: index,
    label: index < 10 ? `0${index}` : String(index),
  }));
  const amPmData = [
    {value: 'AM', label: 'AM'},
    {value: 'PM', label: 'PM'},
  ];
  const handleTimeSelect = () => {
    const selectedHour = hourdata[selectedHourIndex]?.label;
    const selectedMinute = mindata[selectedMinuteIndex]?.label;
    const selectedAmPm = amPmData[selectedAmPmIndex]?.label;

    // ✅ Set the selected time and close the modal
    setSelectedTime(`${selectedHour}:${selectedMinute} ${selectedAmPm}`);
    setTimeModalVisible(false);
  };
  const bottomSheetRef = useRef(null);
  const timebottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['70%'], []);
  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const timeBottomSheetRef = useRef(null);
  const timeSnapPoint = useMemo(() => ['60%'], []);
  const timeOpenModal = useCallback(() => {
    timeBottomSheetRef.current?.present();
    setModalVisible(true);
  }, []);
  const timeCloseModal = useCallback(() => {
    timeBottomSheetRef.current?.dismiss();
    setModalVisible(false);
  }, []);

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
  const navigation = useNavigation();
  const visitBottomSheetRef = useRef(null);
  const visitSnapPoint = useMemo(() => ['80%'], []);
  const visitOpenModal = useCallback(() => {
    visitBottomSheetRef.current?.present();
  }, []);
  const visitCloseModal = useCallback(() => {
    navigation.navigate(screens.VetDashboard);
    visitBottomSheetRef.current?.dismiss();
  }, []);

  const pickerData = Array.from({length: 24}, (_, i) => ({
    index: i,
    value: `${i}:00`,
  }));
  const [selectedTime, setSelectedTime] = useState({value: '0:00', index: 0});
  const [modalVisible, setModalVisible] = useState(false);
  const [hourSlot, setHourSlot] = useState([
    {startTime: '', endTime: '', type: ''},
  ]);

  const handleAddSlot = () => {
    setHourSlot(prev => [...prev, {startTime: '', endTime: '', type: ''}]);
  };

  const handleDeleteSlot = indexToDelete => {
    setHourSlot(prev => prev.filter((_, i) => i !== indexToDelete));
  };
  const [schedule, setSchedule] = useState([
    {day: 'Monday', slots: [{startTime: '', endTime: '', type: ''}]},
    {day: 'Tuesday', slots: [{startTime: '', endTime: '', type: ''}]},
    {day: 'Wednesday', slots: [{startTime: '', endTime: '', type: ''}]},
    {day: 'Thursday', slots: [{startTime: '', endTime: '', type: ''}]},
    {day: 'Friday', slots: [{startTime: '', endTime: '', type: ''}]},
  ]);
  const handleAddDaySlot = dayIndex => {
    setSchedule(prev =>
      prev.map((item, index) =>
        index === dayIndex
          ? {
              ...item,
              slots: [...item.slots, {startTime: '', endTime: '', type: ''}],
            }
          : item,
      ),
    );
  };

  const handleDeleteDaySlot = (dayIndex, slotIndex) => {
    setSchedule(prev =>
      prev.map((item, index) =>
        index === dayIndex
          ? {
              ...item,
              slots: item.slots.filter((_, i) => i !== slotIndex),
            }
          : item,
      ),
    );
  };
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-4">
          <View className="flex-1">
            <ScrollView>
              <View className="mt-[15px] mb-2 ">
                <RegistrationProgressBar screenNo={7} />
              </View>

              <View></View>
              <View className="w-[269px]">
                <Text className="text-[26px] font-Nunito-Bold text-[#1C222F] mt-[10px]">
                  Set Your Availability
                </Text>
              </View>

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
                            isSelected ? 'bg-primary' : 'bg-[#F2F6F7]'
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

              <View className=" bg-[#F2F6F733] border border-pastelgreyBorder rounded-[20px] mt-[20px] mb-[15px]">
                <View className="flex flex-row justify-between items-center mt-[20px] ml-[16px] mb-[20px]">
                  <Text
                    className="text-[16px] font-Nunito-Regular"
                    style={{fontWeight: 400}}>
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
                <>
                  <Text className="text-[16px] font-bold text-black mb-2">
                    Hours
                  </Text>

                  <View className="bg-[#F2F6F733] border border-pastelgreyBorder rounded-[20px] px-3 pt-3 pb-1">
                    {hourSlot.map((slot, index) => (
                      <View
                        key={index}
                        className="flex-row items-center justify-between mb-3 mt-[5px]">
                        <View className="flex-row flex-1 gap-1">
                          <TouchableOpacity
                            onPress={() => setTimeModalVisible(true)}
                            className="bg-white border border-gray-300 rounded-[15px] px-4 py-2">
                            <Text className="text-gray-400 text-sm">
                              {slot.startTime || 'Start Time'}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => setTimeModalVisible(true)}
                            className="bg-white border border-gray-300 rounded-full px-4 py-2">
                            <Text className="text-gray-400 text-sm">
                              {slot.endTime || 'End Time'}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={visitOpenModal}
                            className="bg-white border border-gray-300 rounded-full px-4 py-2">
                            <Text className="text-black text-sm">
                              {slot.type || 'Service Mode'}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                          onPress={() => handleDeleteSlot(index)}
                          style={{marginLeft: 10}}>
                          <Image
                            source={require('../../../assets/images/deleteImage.png')}
                            className="w-[10px] h-[13px] "
                            style={{tintColor: '#D9607C'}}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}

                    {/* Add More Button */}
                    <TouchableOpacity onPress={handleAddSlot} className="mt-1">
                      <Text className="text-primary text-[14px] font-medium">
                        + Add More
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <FlatList
                  data={schedule}
                  keyExtractor={item => item.day}
                  renderItem={({item, index: dayIndex}) => (
                    <View className="mb-5">
                      <Text className="text-[16px] font-bold text-black mb-2">
                        {item.day}
                      </Text>

                      <View className="bg-[#F2F6F733] border border-pastelgreyBorder rounded-[15px] px-3 pt-3 pb-1">
                        {item.slots.map((slot, slotIndex) => (
                          <View
                            key={slotIndex}
                            className="flex-row items-center justify-between mb-3 mt-[5px]">
                            <View className="flex-row flex-1 gap-1">
                              <TouchableOpacity
                                onPress={() => {
                                  setActiveTimeField('start');
                                  setTimeModalVisible(true);
                                }}
                                className="bg-white border border-gray-300 rounded-full px-4 py-2">
                                <Text className="text-gray-400 text-sm">
                                  {slot.startTime || 'Start Time'}
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() => {
                                  setActiveTimeField('end');
                                  setTimeModalVisible(true);
                                }}
                                className="bg-white border border-gray-300 rounded-full px-4 py-2">
                                <Text className="text-gray-400 text-sm">
                                  {slot.endTime || 'End Time'}
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={visitOpenModal}
                                className="bg-white border border-gray-300 rounded-full px-4 py-2">
                                <Text className="text-black text-sm">
                                  {slot.type || 'Service Mode'}
                                </Text>
                              </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                              onPress={() =>
                                handleDeleteDaySlot(dayIndex, slotIndex)
                              }
                              className="ml-2">
                              <Image
                                source={require('../../../assets/images/deleteImage.png')}
                                className="w-[10px] h-[13px] "
                                style={{tintColor: '#D9607C'}}
                              />
                            </TouchableOpacity>
                          </View>
                        ))}

                        <TouchableOpacity
                          onPress={() => handleAddDaySlot(dayIndex)}
                          className="mt-1">
                          <Text className="text-primary text-[14px] font-medium">
                            + Add More
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              )}

              {/* <TouchableOpacity
                className="mt-[66px] mb-[200px] "
                onPress={openModal}>
                <Text className="text-[14px] text-center font-Nunito-Regular text-[#000000] underline">
                  Skip for now
                </Text>
              </TouchableOpacity> */}
            </ScrollView>
          </View>
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="flex bg-[white] px-6">
            <View className="items-center flex flex-col ">
              <Text className="w-[158px] h-[67px] bg-[#f5f3f0] text-center rounded-[10px] mt-[60px] ml-[117px] mr-[118px]"></Text>
              <Text className="text-[20px] w-[336px] font-Nunito-Regular text-[#000000] mt-[20px] ml-[29px]">
                Your profile will not be activated for business without defining
                your Zumigo schedule. Please complete your schedule setup.
              </Text>
            </View>
          </View>
          <View className=" mt-[150px] px-6">
            <FooterBtn title="ok" onClick={closeModal} />
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
          className="h-[60px] bg-primary items-center justify-center rounded-full"
          onPress={() => {
            navigation.navigate(screens.VetBankDetails);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={visitBottomSheetRef}
        snapPoints={visitSnapPoint}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="p-5">
            {/* Header */}
            <Text className="text-lg font-bold text-black mb-4">Select</Text>

            {/* Tele Consult Option */}
            <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-300">
              <Text className="text-[16px] text-red-500">Tele Consult</Text>
              <Image
                source={require('../../../assets/images/footPrint.png')} // Replace with correct path
                className="w-5 h-5"
              />
            </TouchableOpacity>

            {/* Home Visit Option */}
            <TouchableOpacity className="py-3">
              <Text className="text-[16px] text-black">Home Visit</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <Modal
        visible={isTimeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTimeModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              // padding: 20,
            }}>
            <View className="flex flex-row items-center justify-between bg-pastelGrey rounded-2xl ">
              <Text className="font-Nunito-Bold text-[18px] pt-[10px] pb-[10px] pl-[10px]">
                Select Time
              </Text>
              <TouchableOpacity onPress={handleTimeSelect}>
                <Text className="text-[19px] text-primary font-PTSans-Bold pt-[10px] pb-[10px] pr-[10px]">
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>

            {/* ✅ Time Pickers */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 50,
                marginTop: 0,
              }}>
              {/* Hours */}
              <WheelPicker
                data={hourdata}
                selectedIndex={selectedHourIndex}
                onChange={index => setSelectedHourIndex(index)}
                overlayItemStyle={{backgroundColor: '#00000000'}}
              />

              {/* Minutes */}
              <WheelPicker
                data={mindata}
                selectedIndex={selectedMinuteIndex}
                onChange={index => setSelectedMinuteIndex(index)}
                overlayItemStyle={{backgroundColor: '#00000000'}}
              />

              {/* AM/PM */}
              <WheelPicker
                data={amPmData}
                selectedIndex={selectedAmPmIndex}
                onChange={index => setSelectedAmPmIndex(index)}
                overlayItemStyle={{backgroundColor: '#00000000'}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ScheduleWeek;

const styles = StyleSheet.create({
  // container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {backgroundColor: 'blue', padding: 12, borderRadius: 8},
  buttonText: {color: 'white', fontSize: 16},
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,

    margin: 20,
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  pickerContainer: {flexDirection: 'row', alignItems: 'center'},
  separator: {fontSize: 18, marginHorizontal: 10},
  picker: {width: 80, height: 150},
  confirmButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  confirmButtonText: {color: 'white', fontSize: 16},
});
