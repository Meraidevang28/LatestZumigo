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
import React, {useRef, useMemo, useState, useCallback, useEffect} from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import {darkGrey, primary} from '../../../assets/theme/colors';
import FooterBtn from '../../../components/shared/FooterBtn';
import WheelPicker from '@quidone/react-native-wheel-picker';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../constants/screens';

const ScheduleWeek = () => {
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [activeTimeField, setActiveTimeField] = useState(null); // 'start' or 'end'
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

  const [modalVisible, setModalVisible] = useState(false);
  const [hourSlot, setHourSlot] = useState([
    {startTime: '', endTime: '', type: ''},
  ]);
  const [schedule, setSchedule] = useState([
    {day: 'Monday', slots: [{startTime: '', endTime: '', type: ''}]},
    {day: 'Tuesday', slots: [{startTime: '', endTime: '', type: ''}]},
    {day: 'Wednesday', slots: [{startTime: '', endTime: '', type: ''}]},
    {day: 'Thursday', slots: [{startTime: '', endTime: '', type: ''}]},
    {day: 'Friday', slots: [{startTime: '', endTime: '', type: ''}]},
  ]);

  const handleAddSlot = () => {
    if (isEnabled) {
      setHourSlot([...hourSlot, {startTime: '', endTime: '', type: ''}]);
    } else {
      // Add to individual day slots here
    }
  };

  const handleDeleteSlot = indexToDelete => {
    setHourSlot(prev => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleAddDaySlot = dayIndex => {
    if (isEnabled) {
      // Add a slot for the hours
    } else {
      // Add a slot for a specific day
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
    }
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

  const [selectedType, setSelectedType] = useState('');
  const [selectedModeIndex, setSelectedModeIndex] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [isSelectingStartTime, setIsSelectingStartTime] = useState(true);
  const hourData = [...Array(12).keys()].map(i => ({
    value: i + 1,
    label: (i + 1).toString(),
  }));
  const minData = ['00', '15', '30', '45'].map(i => ({value: i, label: i}));
  const amPmData = ['AM', 'PM'].map(i => ({value: i, label: i}));
  const [selectedHour, setSelectedHour] = useState(1);
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedAmPm, setSelectedAmPm] = useState('AM');
  const [formattedTime, setFormattedTime] = useState('');
  const [slot, setSlot] = useState({startTime: ''});

  // const handleTimeSelect = () => {
  //   const time = `${selectedHour}:${selectedMinute} ${selectedAmPm}`;
  //   setFormattedTime(time);

  //   if (selectedSlotIndex !== null) {
  //     const updatedSlots = [...hourSlot];
  //     if (isSelectingStartTime) {
  //       updatedSlots[selectedSlotIndex].startTime = time;
  //     } else {
  //       updatedSlots[selectedSlotIndex].endTime = time;
  //     }
  //     setHourSlot(updatedSlots);
  //   }

  //   setTimeModalVisible(false);
  // };
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const handleTimeSelect = () => {
    const time = `${selectedHour}:${selectedMinute} ${selectedAmPm}`;
    setFormattedTime(time);

    if (!isEnabled && selectedDayIndex !== null && selectedSlotIndex !== null) {
      const updatedSchedule = [...schedule];

      // Update either startTime or endTime based on the selection
      if (isSelectingStartTime) {
        updatedSchedule[selectedDayIndex].slots[selectedSlotIndex].startTime =
          time;
      } else {
        updatedSchedule[selectedDayIndex].slots[selectedSlotIndex].endTime =
          time;
      }

      setSchedule(updatedSchedule);
    } else if (isEnabled && selectedSlotIndex !== null) {
      // Update the hourSlot array only when isEnabled is true
      const updatedSlots = [...hourSlot];

      // Ensure that only startTime or endTime is updated based on the condition
      const updatedSlot = updatedSlots[selectedSlotIndex];

      // If selecting startTime, only update startTime
      if (isSelectingStartTime) {
        updatedSlot.startTime = time;
      }
      // If selecting endTime, only update endTime
      else {
        updatedSlot.endTime = time;
      }

      // Update the entire slots array to ensure the correct slot is modified
      updatedSlots[selectedSlotIndex] = updatedSlot;

      setHourSlot(updatedSlots);
    }

    // Close the modal after time selection
    setTimeModalVisible(false);
  };
  useEffect(() => {
    console.log('Slot updated:', slot);
    console.log('HourSlot updated:', hourSlot);
  }, [slot, hourSlot]);

  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-4">
          <View className="flex-1">
            <ScrollView>
              <View className="mt-[15px] mb-2 ">
                <RegistrationProgressBar screenNo={6} />
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
                            isSelected
                              ? 'bg-primary border-primary'
                              : 'bg-[#F2F6F7]'
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
                  <Text
                    className="text-[16px] font-Nunito-Regular text-black mb-2"
                    style={{fontWeight: 700}}>
                    Hours
                  </Text>

                  <View className="bg-[#F2F6F733] border border-pastelgreyBorder rounded-[20px] px-2 pt-3 pb-1">
                    {hourSlot.map((slot, index) => (
                      <View
                        key={index}
                        className="flex-row items-center mb-3 mt-[5px]">
                        {/* Time Buttons Section - take all available space */}
                        <View className="flex-row items-center gap-3 flex-1">
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedDayIndex(0);
                              setSelectedSlotIndex(index); // Store the index of the selected slot
                              visitOpenModal();
                            }}
                            className="bg-white border border-gray-300 rounded-full px-4 py-2 min-w-[110px]">
                            <Text
                              className={`text-black font-Nunito-Regular text-center ${
                                selectedSlotIndex === index
                                  ? 'text-black'
                                  : 'text-gray-400'
                              }`}
                              style={{fontWeight: '500'}}>
                              {slot.type || 'Service Mode'}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedSlotIndex(index);
                              setIsSelectingStartTime(true); // <- This tells the modal it's for start time
                              setTimeModalVisible(true);
                            }}
                            className="bg-white border border-gray-300 rounded-[15px] px-2 py-2 min-w-[70px]">
                            <Text
                              className={`text-center font-Nunito-Regular ${
                                slot.startTime ? 'text-black' : 'text-gray-400'
                              }`}
                              style={{fontWeight: '500'}}>
                              {slot.startTime || 'Start Time'}
                              {console.log('Rendering time:', slot.startTime)}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedSlotIndex(index);
                              setIsSelectingStartTime(false); // <- This tells the modal it's for end time
                              setTimeModalVisible(true);
                            }}
                            className="bg-white border border-gray-300 rounded-full px-2 py-2 min-w-[70px]">
                            <Text
                              className={`text-center font-Nunito-Regular ${
                                slot.endTime ? 'text-black' : 'text-gray-400'
                              }`}
                              style={{fontWeight: 500}}>
                              {slot.endTime || 'End Time'}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        {/* Fixed width delete button for consistent spacing */}
                        <TouchableOpacity
                          onPress={() => handleDeleteSlot(index)}
                          className=" w-[22px] items-end">
                          <Image
                            source={require('../../../assets/images/DummyImages/delete.png')}
                            className="w-[12px] h-[13px]"
                            style={{tintColor: '#D9607C'}}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}

                    {/* Add More Button */}
                    <TouchableOpacity onPress={handleAddSlot} className="mt-1">
                      <Text
                        className="text-primary text-[14px] font-Nunito-Regular"
                        style={{fontWeight: 600}}>
                        + Add More
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                // <FlatList
                //   data={schedule}
                //   keyExtractor={item => item.day}
                //   renderItem={({item, index: dayIndex}) => (
                //     <View className="mb-5">
                //       <Text className="text-[16px] font-bold text-black mb-2">
                //         {item.day}
                //       </Text>

                //       <View className="bg-[#F2F6F733] border border-pastelgreyBorder rounded-[20px] px-2 pt-3 pb-1">
                //         {item.slots.map((slot, index) => (
                //           <View
                //             key={index}
                //             className="flex-row items-center mb-3 mt-[5px]"
                //             style={{flexWrap: 'wrap'}} // Allow wrapping
                //           >
                //             {/* Time Buttons Section - take all available space */}
                //             <View className="flex-row items-center gap-3 flex-1">
                //               <TouchableOpacity
                //                 onPress={() => setTimeModalVisible(true)}
                //                 className="bg-white border border-gray-300 rounded-[15px] px-2 py-2 min-w-[70px]">
                //                 <Text
                //                   className="text-gray-400 text-center font-Nunito-Regular"
                //                   style={{fontWeight: 500}}>
                //                   {slot.startTime || 'Start Time'}
                //                 </Text>
                //               </TouchableOpacity>

                //               <TouchableOpacity
                //                 onPress={() => setTimeModalVisible(true)}
                //                 className="bg-white border border-gray-300 rounded-full px-2 py-2 min-w-[70px]">
                //                 <Text
                //                   className="text-gray-400 font-Nunito-Regular text-center"
                //                   style={{fontWeight: 500}}>
                //                   {slot.endTime || 'End Time'}
                //                 </Text>
                //               </TouchableOpacity>

                //               <TouchableOpacity
                //                 onPress={visitOpenModal}
                //                 className="bg-white border border-gray-300 rounded-full px-4 py-2 min-w-[110px]">
                //                 <Text
                //                   className="text-black font-Nunito-Regular text-center"
                //                   style={{fontWeight: '500'}}>
                //                   {selectedType || 'Service Mode'}
                //                 </Text>
                //               </TouchableOpacity>
                //             </View>

                //             {/* Fixed width delete button for consistent spacing */}
                //             <TouchableOpacity
                //               onPress={() =>
                //                 handleDeleteDaySlot(dayIndex, index)
                //               }
                //               className="ml-2 w-[24px] items-end">
                //               <Image
                //                 source={require('../../../assets/images/DummyImages/delete.png')}
                //                 className="w-[12px] h-[13px]"
                //                 style={{tintColor: '#D9607C'}}
                //               />
                //             </TouchableOpacity>
                //           </View>
                //         ))}

                //         {/* Add More Button */}
                //         <TouchableOpacity
                //           onPress={() => handleAddDaySlot(dayIndex)}
                //           className="mt-1">
                //           <Text
                //             className="text-primary text-[14px] font-Nunito-Regular"
                //             style={{fontWeight: 600}}>
                //             + Add More
                //           </Text>
                //         </TouchableOpacity>
                //       </View>
                //     </View>
                //   )}
                //   ListFooterComponent={() => (
                //     <View style={{height: 20}} /> // Adding a little spacing at the end of the list
                //   )}
                // />
                <FlatList
                  data={schedule}
                  keyExtractor={item => item.day}
                  renderItem={({item, index: dayIndex}) => (
                    <View className="mb-5">
                      <Text className="text-[16px] font-bold text-black mb-2">
                        {item.day}
                      </Text>

                      <View className="bg-[#F2F6F733] border border-pastelgreyBorder rounded-[20px] px-2 pt-3 pb-1">
                        {item.slots.map((slot, slotIndex) => (
                          <View
                            key={slotIndex}
                            className="flex-row items-center mb-3 mt-[5px]"
                            style={{flexWrap: 'wrap'}}>
                            {/* Time Buttons Section */}
                            <View className="flex-row items-center gap-3 flex-1">
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectedDayIndex(dayIndex); // ✅ Track selected day
                                  setSelectedSlotIndex(slotIndex); // ✅ Track selected slot
                                  visitOpenModal(); // Open bottom sheet
                                }}
                                className="bg-white border border-gray-300 rounded-full px-4 py-2 min-w-[110px]">
                                <Text
                                  className={`font-Nunito-Regular text-center ${
                                    slot.type ? 'text-black' : 'text-gray-400'
                                  }`}
                                  style={{fontWeight: '500'}}>
                                  {slot.type || 'Service Mode'}
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectedDayIndex(dayIndex); // Set the selected day index
                                  setSelectedSlotIndex(slotIndex); // Set the selected slot index
                                  setIsSelectingStartTime(true); // Ensure you are selecting the start time
                                  setTimeModalVisible(true);
                                }}
                                className="bg-white border border-gray-300 rounded-[15px] px-2 py-2 min-w-[70px]">
                                <Text
                                  className={`text-center font-Nunito-Regular ${
                                    slot.startTime
                                      ? 'text-black'
                                      : 'text-gray-400'
                                  }`}
                                  style={{fontWeight: 500}}>
                                  {slot.startTime || 'Start Time'}
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() => {
                                  setSelectedDayIndex(dayIndex); // Set the selected day index
                                  setSelectedSlotIndex(slotIndex); // Set the selected slot index
                                  setIsSelectingStartTime(false); // Ensure you are selecting the end time
                                  setTimeModalVisible(true);
                                }}
                                className="bg-white border border-gray-300 rounded-full px-2 py-2 min-w-[70px]">
                                <Text
                                  className={`text-center font-Nunito-Regular ${
                                    slot.endTime
                                      ? 'text-black'
                                      : 'text-gray-400'
                                  }`}
                                  style={{fontWeight: 500}}>
                                  {slot.endTime || 'End Time'}
                                </Text>
                              </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                              onPress={() =>
                                handleDeleteDaySlot(dayIndex, slotIndex)
                              }
                              className="ml-2 w-[24px] items-end">
                              <Image
                                source={require('../../../assets/images/DummyImages/delete.png')}
                                className="w-[12px] h-[13px]"
                                style={{tintColor: '#D9607C'}}
                              />
                            </TouchableOpacity>
                          </View>
                        ))}

                        <TouchableOpacity
                          onPress={() => handleAddDaySlot(dayIndex)}
                          className="mt-1">
                          <Text
                            className="text-primary text-[14px] font-Nunito-Regular"
                            style={{fontWeight: 600}}>
                            + Add More
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  ListFooterComponent={() => <View style={{height: 20}} />}
                />
              )}
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
            <Text className="text-lg font-bold text-black mb-4">Select</Text>

            {/* Tele Consult Option */}
            {/* <TouchableOpacity
              onPress={() => {
                if (selectedDayIndex !== null && selectedSlotIndex !== null) {
                  const updatedSchedule = [...schedule];
                  updatedSchedule[selectedDayIndex].slots[
                    selectedSlotIndex
                  ].type = 'Tele Consult';
                  setSchedule(updatedSchedule); // ✅ update main state
                  visitBottomSheetRef.current?.dismiss();
                }
              }}
              className="flex-row justify-between items-center py-3 border-b border-gray-300">
              <Text
                className={`text-[16px] ${
                  selectedSlotIndex !== null &&
                  hourSlot[selectedSlotIndex]?.type === 'Tele Consult'
                    ? 'text-primary'
                    : 'text-black'
                }`}>
                Tele Consult
              </Text>
              <Image
                source={
                  selectedSlotIndex !== null &&
                  hourSlot[selectedSlotIndex]?.type === 'Tele Consult'
                    ? require('../../../assets/images/footPrint.png')
                    : ''
                }
                className="w-5 h-5"
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                if (selectedDayIndex !== null && selectedSlotIndex !== null) {
                  if (isEnabled) {
                    const updatedSlots = [...hourSlot];
                    updatedSlots[selectedSlotIndex].type = 'Tele Consult';
                    setHourSlot(updatedSlots);
                  } else {
                    const updatedSchedule = [...schedule];
                    updatedSchedule[selectedDayIndex].slots[
                      selectedSlotIndex
                    ].type = 'Tele Consult';
                    setSchedule(updatedSchedule);
                  }
                  visitBottomSheetRef.current?.dismiss();
                }
              }}
              className="flex-row justify-between items-center py-3 border-b border-gray-300">
              <Text
                className={`text-[16px] ${
                  selectedSlotIndex !== null &&
                  (isEnabled
                    ? hourSlot[selectedSlotIndex]?.type
                    : schedule[selectedDayIndex]?.slots[selectedSlotIndex]
                        ?.type) === 'Tele Consult'
                    ? 'text-primary'
                    : 'text-black'
                }`}>
                Tele Consult
              </Text>
              {selectedSlotIndex !== null &&
                (isEnabled
                  ? hourSlot[selectedSlotIndex]?.type
                  : schedule[selectedDayIndex]?.slots[selectedSlotIndex]
                      ?.type) === 'Tele Consult' && (
                  <Image
                    source={require('../../../assets/images/footPrint.png')}
                    className="w-5 h-5"
                  />
                )}
            </TouchableOpacity>

            {/* Home Visit Option */}
            {/* <TouchableOpacity
              onPress={() => {
                if (selectedDayIndex !== null && selectedSlotIndex !== null) {
                  const updatedSchedule = [...schedule];
                  updatedSchedule[selectedDayIndex].slots[
                    selectedSlotIndex
                  ].type = 'Home Visit';
                  setSchedule(updatedSchedule); // ✅ update main state
                  visitBottomSheetRef.current?.dismiss();
                }
              }}
              className="flex-row justify-between items-center py-3">
              <Text
                className={`text-[16px] ${
                  selectedSlotIndex !== null &&
                  hourSlot[selectedSlotIndex]?.type === 'Home Visit'
                    ? 'text-primary'
                    : 'text-black'
                }`}>
                Home Visit
              </Text>
              <Image
                source={
                  selectedSlotIndex !== null &&
                  hourSlot[selectedSlotIndex]?.type === 'Home Visit'
                    ? require('../../../assets/images/homeIcon.png')
                    : ''
                }
                className="w-5 h-5"
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                if (selectedDayIndex !== null && selectedSlotIndex !== null) {
                  if (isEnabled) {
                    const updatedSlots = [...hourSlot];
                    updatedSlots[selectedSlotIndex].type = 'Home Visit';
                    setHourSlot(updatedSlots);
                  } else {
                    const updatedSchedule = [...schedule];
                    updatedSchedule[selectedDayIndex].slots[
                      selectedSlotIndex
                    ].type = 'Home Visit';
                    setSchedule(updatedSchedule);
                  }
                  visitBottomSheetRef.current?.dismiss();
                }
              }}
              className="flex-row justify-between items-center py-3">
              <Text
                className={`text-[16px] ${
                  selectedSlotIndex !== null &&
                  (isEnabled
                    ? hourSlot[selectedSlotIndex]?.type
                    : schedule[selectedDayIndex]?.slots[selectedSlotIndex]
                        ?.type) === 'Home Visit'
                    ? 'text-primary'
                    : 'text-black'
                }`}>
                Home Visit
              </Text>
              {selectedSlotIndex !== null &&
                (isEnabled
                  ? hourSlot[selectedSlotIndex]?.type
                  : schedule[selectedDayIndex]?.slots[selectedSlotIndex]
                      ?.type) === 'Home Visit' && (
                  <Image
                    source={require('../../../assets/images/homeIcon.png')}
                    className="w-5 h-5"
                  />
                )}
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
              <Text className="font-Nunito-Bold text-[18px] pt-[10px] pb-[10px] pl-[10  px]">
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
                data={hourData}
                value={Number(selectedHour)}
                onValueChanged={({item: {value}}) =>
                  setSelectedHour(Number(value))
                }
                overlayItemStyle={{backgroundColor: '#ffffff'}}
                itemTextStyle={{
                  fontFamily: 'Nunito-Bold',
                  fontSize: 18,
                  color: '#333',
                  borderBottomWidth: 1,
                  // width: 110,
                  borderBottomColor: '#FFEDF9',
                  paddingBottom: 4, // for spacing
                }}
              />
              {/* Minutes */}
              <WheelPicker
                data={minData}
                value={String(selectedMinute)}
                onValueChanged={({item: {value}}) =>
                  setSelectedMinute(String(value))
                }
                overlayItemStyle={{backgroundColor: '#ffffff'}}
                itemTextStyle={{
                  fontFamily: 'Nunito-Bold',
                  fontSize: 18,
                  color: '#333',
                  borderBottomWidth: 1,
                  // width: 120,
                  borderBottomColor: '#FFEDF9',
                  paddingBottom: 4, // for spacing
                }}
              />

              {/* AM/PM */}

              <WheelPicker
                data={amPmData}
                value={String(selectedAmPm)}
                onValueChanged={({item: {value}}) =>
                  setSelectedAmPm(String(value))
                }
                overlayItemStyle={{backgroundColor: '#ffffff'}}
                itemTextStyle={{
                  fontFamily: 'Nunito-Bold',
                  fontSize: 18,
                  color: '#333',
                  borderBottomWidth: 1,
                  // width: 120,
                  borderBottomColor: '#FFEDF9',
                  paddingBottom: 4, // for spacing
                }}
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
