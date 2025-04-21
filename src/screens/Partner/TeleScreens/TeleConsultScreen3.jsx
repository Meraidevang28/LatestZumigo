import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
  Modal,
} from 'react-native';
import React, {useState, useRef, useMemo, useCallback} from 'react';
import screens from '../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-modern-datepicker';
import {getToday, getFormatedDate} from 'react-native-modern-datepicker';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {primary} from '../../../assets/theme/colors';

const TeleConsultScreen3 = () => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [selectedStartsTwo, setSelectedStartsTwo] = useState(0);

  // Handle star press
  const handleStarPress = starIndex => {
    setSelectedStars(starIndex);
  };
  const handleStarPress2 = starIndex => {
    setSelectedStartsTwo(starIndex);
  };
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    'YYYY/MM/DD',
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(false);
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  const snapPoints = useMemo(() => ['100%'], []);

  const handleChange = selectedDate => {
    setCalendarDate(selectedDate);
  };
  const [calendarAddClicked, setCalendarAddClicked] = useState(false);
  const completedBottomSheetRef = useRef(null);
  const handlePresentCompletedModalPress = useCallback(() => {
    completedBottomSheetRef.current?.present();
  }, []);
  const handleSheetChangesCompleted = useCallback(index => {
    console.log('handleSheetChangesCompleted', index);
  }, []);
  const snapPointsCompleted = useMemo(() => ['80%'], []);
  const closeEstimateBottomSheet = () => {
    navigation.navigate(screens.Dashboard);
    completedBottomSheetRef.current?.dismiss();
  };
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <ScrollView>
            <View className="flex-1">
              <Text className="text-[16px] font-PTSans-Bold text-[#000000] ">
                Pet Details
              </Text>
              <View className=" bg-pastelGrey border border-pastelgreyBorder mt-[12px] rounded-[20px]">
                <View className="flex flex-row mt-[15px] ml-[10px] gap-[15px]">
                  <Image
                    // source={require('../../../assets/images/DummyImages/Dog.png')}
                    source={require('../../../assets/images/DummyImages/Dog.png')}
                    className="w-[59px] h-[59px]"
                  />
                  <View className="flex flex-col gap-[13px]">
                    <View className="flex flex-row gap-[6px]">
                      <Text className="text-[20px] font-junegull-Regular text-primary">
                        MAX
                      </Text>
                      <Text className="text-[15px] font-Nunito-Bold text-[#000000]">
                        Australian Shepherd
                      </Text>
                    </View>
                    <View className="flex flex-row">
                      <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7F]">
                        {' '}
                        Male |{' '}
                      </Text>
                      <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7F]">
                        {' '}
                        Age 3 yrs |{' '}
                      </Text>
                      <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7F]">
                        {' '}
                        30 Kgs{' '}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex flex-col ml-[15.5px] mt-[20.5px] gap-[7px]">
                  <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                    Symptoms -
                  </Text>
                  <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7F]">
                    Change in Appetite, Change in Activity Level
                  </Text>
                </View>
                <Text className="w-[314.5px] h-[0.5px] bg-[#bbbcb8] ml-[15px] mt-[16px] mb-[15px]"></Text>
                <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15.5px]">
                  Pet Images
                </Text>
                <View className="flex flex-row gap-[10px] ml-[15.5px] mt-[12px]">
                  <Image
                    source={require('../../../assets/images/DummyImages/Dog3.png')}
                    className="w-[70px] h-[58px]"
                  />
                  <Image
                    source={require('../../../assets/images/DummyImages/Dog3.png')}
                    className="w-[70px] h-[58px]"
                  />
                </View>
                <Text className="w-[314.5px] h-[0.5px] bg-[#bbbcb8] ml-[15px] mt-[16px] mb-[15px]"></Text>
                <View className="flex flex-col gap-[7px]">
                  <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15.5px]">
                    Note -
                  </Text>
                  <Text className="text-[14px] font-Nunito-Regular text-[#7F7E7C] ml-[15.5px] mb-[16.5px]">
                    Pellentesque suscipit tempor ullamcorper. Nuna quam posuere,
                    consectetur lectus eu,euismod ipsum.
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(screens.MedicalHistoryScreen)
                }>
                <View className=" flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder  rounded-[20px] mt-[15px]">
                  <View className="flex flex-row items-center  gap-[12.7px] mt-[20px] ml-[17px] mb-[20px]">
                    <Image
                      source={require('../../../assets/images/services.png')}
                      className="w-[16.29px] h-[18.01px]"
                    />
                    <Text className="text-[16px] font-Nunito-Bold">
                      Medical history
                    </Text>
                  </View>
                  <View className="mr-[24.8px]">
                    <Image
                      source={require('../../../assets/images/rightArrow.png')}
                      className="mt-[20px] mb-[20px] w-[11px] h-[9px]"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <Text className="text-[16px] font-PTSans-Bold text-[#000000]  mt-[29.9px]">
                Treatment details
              </Text>
              <View>
                <View className="  bg-pastelGrey border border-pastelgreyBorder rounded-2xl mt-[15px]">
                  <View className="flex flex-row items-center justify-between mt-[10px]">
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15px]">
                      Diagnosis Details
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(screens.TeleDiagnosis)}
                      className="border border-red-500 rounded-md px-3 py-1 mr-[10px]">
                      <Text className="text-red-500 text-[14px] font-Nunito-Regular">
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15px] mt-[21px] mb-[17px]">
                    Symptoms -
                  </Text>
                  <Text className="text-[15px] font-Nunito-Regular text-[#7f7f7f] ml-[15px] mb-[17px]">
                    DIGESTIVE SYSTEM
                  </Text>
                  <View className="flex flex-row ml-[15px]  gap-[20px] mb-[26px] w-[164px]">
                    <View className=" h-[34px] bg-pastelPrimary items-center justify-center rounded-[20px]">
                      <Text className="text-primary text-[12px] font-Nunito-Bold text-center mt-[10px] mb-[10px]  ml-[14px] mr-[15px] ">
                        Diarrhea
                      </Text>
                    </View>
                    <View className=" h-[34px] bg-pastelPrimary items-center rounded-[20px] ">
                      <Text className="text-primary text-[12px] font-Nunito-Bold text-center mt-[10px] ml-[14px] mr-[15px] ">
                        Vomiting
                      </Text>
                    </View>
                  </View>
                  <Text className="text-[15px] font-Nunito-Regular text-[#7f7f7f] ml-[15px] mb-[17px]">
                    SKIN & FUR
                  </Text>
                  <View className=" w-[116px] ml-[15px] bg-pastelPrimary items-center rounded-[20px]  ">
                    <Text className="text-primary text-[12px] font-Nunito-Bold text-center mt-[10px] mb-[10px] ">
                      Rashes, redness
                    </Text>
                  </View>
                  <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15px] mt-[20px] mb-[11px]">
                    Note -
                  </Text>
                  <Text className="ml-[15px] mb-[15px] text-[12px] font-Nunito-Regular text-[#7f7f7f]">
                    Pellentesque suscipit tempor ullamcorper. Nun a quam
                    posuere, consectetur lectus eu, euismod ipsum.
                  </Text>
                </View>
              </View>
              <View>
                <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl mt-[15px]">
                  <View className="flex flex-row items-center justify-between mt-[10px]">
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15px]">
                      Medication
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(screens.TeleMedicationScreen)
                      }
                      className="border border-red-500 rounded-md px-3 py-1 mr-[10px]">
                      <Text className="text-red-500 text-[14px] font-Nunito-Regular">
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex flex-row mt-[20px] ml-[15.3px] justify-between">
                    <View className="flex flex-row items-center gap-[9.7px]">
                      <Image
                        // source={require('../../../assets/images/bandageIcon.png')}
                        source={require('../../../assets/images/bandageIcon.png')}
                        style={{tintColor: primary}}
                      />
                      <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                        Syrup - Crocin Paracetamol
                      </Text>
                    </View>
                  </View>
                  <Text className="text-[14px] text-[#7f7e7c] font-Nunito-Regular ml-[39px] mt-[7px] mb-[16px]">
                    Paracetamool (100g/ml) Oral Drops
                  </Text>
                  <Text className="text-[14px] text-[#7f7e7c] font-Nunito-Regular ml-[39px]">
                    Instructions
                  </Text>
                  <Text className="text-[14px] text-[#7f7e7c] font-Nunito-Regular ml-[39px] mt-[6px] mb-[22px]">
                    0.5ml, 0.5-0.5-0.5, daily, for 3 days, after food
                  </Text>
                  <Text className="w-[314.5px] h-[0.5px] bg-[#bbbcb8] ml-[15px]  "></Text>
                  <View className="flex flex-row mt-[20px] ml-[15.3px] justify-between">
                    <View className="flex flex-row items-center gap-[9.7px]">
                      <Image
                        source={require('../../../assets/images/bandageIcon.png')}
                        style={{tintColor: primary}}
                      />
                      <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                        Capsules - Spasmonil Plus
                      </Text>
                    </View>
                  </View>
                  <Text className="text-[14px] text-[#7f7e7c] font-Nunito-Regular ml-[39px] mt-[7px] mb-[16px]">
                    Dicyclomine (10mg)
                  </Text>
                  <Text className="text-[14px] text-[#7f7e7c] font-Nunito-Regular ml-[39px]">
                    Instructions
                  </Text>
                  <Text className="text-[14px] text-[#7f7e7c] font-Nunito-Regular ml-[39px] mt-[6px] mb-[22px]">
                    1 unit,1-0-1, daily, for 3 days, before food
                  </Text>
                </View>
              </View>
              <View className="h-[98px] bg-pastelGrey border border-pastelgreyBorder mt-[20px] rounded-2xl text-[14px] text-[#000000] font-Nunito-Regular pl-[10px] pt-[10px]">
                <Text>
                  Pellentesque suscipit tempor ullamcorper. Nun a quam posuere,
                  consectetur lectus eu, euismod ipsum.
                </Text>
              </View>
              <View className="bg-white">
                <TouchableOpacity onPress={handlePresentModalPress}>
                  <View className="flex-col  justify-between  bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mt-[15px] mb-[15px] p-3">
                    <View className="flex flex-row items-center justify-between">
                      <Text
                        className="text-[16px] h-[22px] font-[Proxima-Nova-Medium]"
                        style={{marginLeft: 10}}>
                        Schedule Follow Up
                      </Text>
                      <Switch
                        trackColor={{false: '#E7ECF7', true: primary}}
                        thumbColor={accepted ? '#fff' : '#fff'}
                        value={accepted}
                        onValueChange={() => setAccepted(!accepted)}
                      />
                    </View>

                    {calendarAddClicked && (
                      <View className="flex flex-row items-center justify-between mt-3 ml-[10px]">
                        <View className="flex flex-row items-center gap-[10px]">
                          <Image
                            source={require('../../../assets/images/calender.png')}
                            className="w-[14.01px] h-[14.01px]"
                          />
                          <Text className="text-[14px] text-[#000000] font-Nunito-Regular">
                            25 April, 2024
                          </Text>
                        </View>
                        <TouchableOpacity
                          // onPress={() =>
                          //   navigation.navigate(screens.TeleMedicationScreen)
                          // }
                          className="border border-red-500 rounded-md px-3 py-1 mr-[2px]">
                          <Text className="text-red-500 text-[14px] font-Nunito-Regular">
                            Edit
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <Text className="text-[16px] font-PTSans-Bold text-[#000000]  mt-[29.9px]">
                Payment summary
              </Text>
              <View className="mb-[30px]">
                <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mt-[10px]">
                  <View className="mt-[15px] ml-[15px] flex flex-row items-center justify-between">
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                      Service Charges
                    </Text>
                    <View className=" flex-row  items-center space-x-1">
                      <Text className="text-[14px] font-[Nunito-Regular] text-[#7F7F7F]  mr-[15px]">
                        ₹1,000.00
                      </Text>
                    </View>
                  </View>
                  <View className="mt-[15px] ml-[15px] flex flex-row  justify-between">
                    <Text className="text-[16px] font-[Proxima-Nova-Medium] text-[#7F7F7F]">
                      GST and other charges
                    </Text>
                    <View className="flex flex-row items-center ">
                      <Text className="text-[14px] font-[Nunito-Regular] text-[#7F7F7F] mr-[15px]">
                        ₹60.00
                      </Text>
                    </View>
                  </View>

                  <Text className=" h-[0.5px] bg-[#bbbcb8] ml-[15px] mt-[16px] mb-[15px] mr-[15px]"></Text>
                  <View className="flex flex-row  justify-between ml-[20px]">
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                      Total
                    </Text>
                    <View className="flex flex-row mb-[16px] items-center">
                      <Text className="text-[15px] font-[Nunito-Bold] text-[#000000] mr-[15px]">
                        ₹1,060.00
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
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
            onPress={handlePresentCompletedModalPress}>
            <Text className="text-[20px] text-white font-Nunito-Bold text-center">
              Finish Consultation
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={completedBottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleChange}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="bg-white p-5 ">
            <View className="flex flex-col items-center">
              <Image
                source={require('../../../assets/images/paymentDone.png')}
              />
              <Text className="text-[26px] text-[#000000] font-Nunito-Bold text-center">
                Consultation completed succesful!
              </Text>
              <Text className="text-[14px] text-[#000000] font-Nunito-Regular">
                Donec in risus eget leo gravida tempor
              </Text>
            </View>
            <Text className="text-[16px] mt-[31px] font-PTSans-Bold text-[#000000]">
              How was your Zumigo experience?
            </Text>
            <View className="bg-pastelGrey border border-pastelgreyBorder justify-center h-[71px] rounded-2xl mt-[10px] ">
              <View className="flex flex-row items-center justify-center gap-[20px]">
                {[1, 2, 3, 4, 5].map(index => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleStarPress(index)}
                    // style={{
                    //   backgroundColor:
                    //     selectedStars >= index ? '#d75880' : 'transparent',
                    //   borderRadius: 20,
                    //   padding: 5,
                    // }}
                  >
                    <Image
                      source={require('../../../assets/images/staicon.png')}
                      style={{
                        tintColor:
                          selectedStars >= index ? '#fc030b' : '#8A8A8A',
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Text className="text-[16px] mt-[11px] font-PTSans-Bold text-[#000000]">
              How much do you rate the pet parent?
            </Text>
            <View className="bg-pastelGrey border border-pastelgreyBorder justify-center h-[71px] rounded-2xl mt-[10px] ">
              <View className="flex flex-row items-center justify-center gap-[20px]">
                {[1, 2, 3, 4, 5].map(index => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleStarPress2(index)}>
                    <Image
                      source={require('../../../assets/images/staicon.png')}
                      style={{
                        tintColor:
                          selectedStartsTwo >= index ? '#fc030b' : '#8A8A8A',
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className="mt-[10px] ">
              <Text className="text-[12px] font-Nunito-Regular text-[#000000]">
                Note:
              </Text>
              <Text className="text-[12px] font-Nunito-Regular text-[##919090] ">
                amet massa commodo, tincidunt justo at, luctus erat. Mauris
                accumsan magna nec nulla bibendum posuere. Etiam porta turpis
                sit amet risus egestas finibus.
              </Text>
            </View>
            <TouchableOpacity
              className="bg-primary rounded-2xl items-center justify-center h-[56px] mt-[20px] mb-[20px]"
              onPress={closeEstimateBottomSheet}>
              <Text className="text-[20px] text-white font-Nunito-Bold">
                Back to Home
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <Text className="text-[18px] text-[#000000] font-PTSans-Bold ml-[15px]">
            Schedule follow up
          </Text>
          <View className="bg-white p-5 items-center">
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={calendarDate}
              onDateChanged={handleChange}
            />
            <TouchableOpacity
              onPress={() => {
                setCalendarAddClicked(true);
                setAccepted(true); // Set Switch to ON
                bottomSheetModalRef.current?.dismiss(); // Dismiss modal
              }}
              className="bg-primary w-full mt-[10px] h-[56px] rounded-2xl items-center justify-center">
              <Text className="text-white text-[20px] font-Nunito-Bold">
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default TeleConsultScreen3;

const styles = StyleSheet.create({});
