import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  Animated,
  PanResponder,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import screens from '../../constants/screens';
import React, {useRef, useMemo, useState, useCallback} from 'react';
//   import PetDetailsComponent from "../../components/vetRegistration/PetDetailsComponent";
import {useNavigation, useRoute} from '@react-navigation/native';
import FooterBtn from '../../components/shared/FooterBtn';

import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {primary} from '../../assets/theme/colors';
const InProgressHomeVisit = () => {
  const route = useRoute();
  const {digestiveSystem, skinFur, eyesEars, note} = route.params || {};
  const isEmpty =
    (!digestiveSystem || digestiveSystem.length === 0) &&
    (!skinFur || skinFur.length === 0) &&
    (!eyesEars || eyesEars.length === 0);
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    navigation.navigate(screens.AdditionalServicesScreen);
  }, []);
  const confirmationBottomSheet = useRef(null);
  const snapPoints = useMemo(() => ['60%'], []);

  const openConfirmationSheet = useCallback(() => {
    confirmationBottomSheet.current?.present();
  }, []);

  const closeConfirmationSheet = useCallback(() => {
    navigation.navigate(screens.VetDashboard2);
    confirmationBottomSheet.current?.dismiss();
  }, []);

  const selectedServicesNames = route.params?.selectedServicesNames || [];
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <ScrollView>
            <View className="flex-1">
              <View>
                <View
                  className="rounded-[15px]  mt-[15px]  "
                  style={{backgroundColor: '#D9E4FD'}}>
                  {/* Progress bar */}
                  <View
                    className="w-[30px] h-[6px]  ml-[15px]  rounded-[20px]"
                    style={{backgroundColor: '#004CF2'}}></View>

                  {/* Title */}
                  <Text className="mt-[15px] ml-[15px]  font-Nunito-Bold  text-[16px] text-[#1C222F]">
                    In progress
                  </Text>

                  {/* Content */}
                  <View className="flex flex-row w-full justify-between mt-[15px] mb-[16px] px-[15px]">
                    {/* Description */}
                    <Text className="flex-1 mr-[10px] font-Nunito-Regular  text-[14px] text-[#7F7E7C]">
                      Pellentesque suscipit tempor ullamcorper. Nuna quam
                      posuere, consectetur lectus eu.
                    </Text>

                    {/* Service time */}
                    <View
                      className="flex flex-col items-end gap-[10px] "
                      style={{marginTop: 20}}>
                      <Text className="text-[12px] font-Nunito-Regular   text-[#7F7E7C]">
                        Service started at:
                      </Text>
                      <Text className="text-[18px] font-Nunito-Bold  text-[#000]">
                        09:05 AM
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <View className="  rounded-[15px] mt-[20px]  bg-pastelGrey border border-pastelgreyBorder">
                  <View className="flex flex-row items-center ml-[10px] mt-[15.3px]  gap-[5px]">
                    <Text className="text-[14px] text-[#7F7F7F] font-[Figtree-Regular]">
                      Appointment ID:
                    </Text>
                    <Text className="text-[16px] text-[#000000] font-Nunito-Bold">
                      23456789
                    </Text>
                  </View>
                  <View className="flex flex-row items-center  ml-[10px] mt-[15.3px] mb-[17px] gap-[5px]">
                    <Image
                      // source={require("../assets/images/timedate.png")}
                      source={require('../../assets/images/timedate.png')}
                      className="w-[18.18] h-[16.05]"
                      style={{tintColor: primary}}
                    />
                    <Text className="font-[Nunito-Bold] h-[20px] text-[16px] text-[#1C222F]">
                      24, April, 2024, 09:00 AM - 10:00 AM
                    </Text>
                  </View>
                </View>
              </View>
              <Text className="  mb-[12px] mt-[20px] text-[16px] text-[#000000] font-PTSans-Bold">
                Pet Details
              </Text>
              <View className=" bg-pastelGrey border border-pastelgreyBorder  mt-[12px] rounded-[20px]">
                <View className="flex flex-row mt-[15px] ml-[10px] gap-[15px]">
                  <Image
                    source={require('../../assets/images/DummyImages/Dog.png')}
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
                    source={require('../../assets/images/DummyImages/Dog3.png')}
                    className="w-[70px] h-[58px]"
                  />
                  <Image
                    source={require('../../assets/images/DummyImages/Dog3.png')}
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
                <View className=" flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder  rounded-[20px] mt-[15px] h-[60px]">
                  <View className="flex flex-row items-center  gap-[12.7px]  ml-[17px]  ">
                    <Image
                      source={require('../../assets/images/services.png')}
                      className="w-[16.29px] h-[18.01px]"
                      style={{tintColor: primary}}
                    />
                    <Text
                      className="text-[16px] font-Nunito-Bold text-[#000000]"
                      style={{lineHeight: 22}}>
                      Medical history
                    </Text>
                  </View>
                  <View className="mr-[24.8px]">
                    <Image
                      source={require('../../assets/images/rightArrow.png')}
                      className="mt-[20px] mb-[20px] w-[8px] h-[10px]"
                      style={{tintColor: primary}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <Text className=" mt-[20px] text-[16px] text-[#000000] font-PTSans-Bold">
                Treatment Details
              </Text>

              <View className="flex w-full flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[15px]">
                {isEmpty ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(screens.Diagnosis)}>
                      <View className=" flex flex-row items-center justify-between  w-full">
                        <View className="flex flex-row justify-center items-center gap-[12.7px] ml-[17px] pt-[19px] pb-[21px] ">
                          <Image
                            source={require('../../assets/images/services.png')}
                            className="w-[16.29px] h-[18.01px]"
                            style={{tintColor: primary}}
                          />
                          <Text
                            className="w-[207px] font-Nunito-Bold text-[16px]"
                            style={{lineHeight: 22}}>
                            Diagnosis Details
                          </Text>
                        </View>
                        <View>
                          <Image
                            source={require('../../assets/images/secondaryAdd.png')}
                            className="mr-[24.8px] w-[18px] h-[18px] "
                            style={{tintColor: primary}}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View className="flex flex-col w-full">
                      <View className="flex-row justify-between items-center mb-3 mt-[15px] ml-[15px] mr-[15px] ">
                        <Text
                          className="text-[16px] font-Nunito-Bold text-[#000000]"
                          style={{lineHeight: 22}}>
                          Diagnosis Details
                        </Text>
                        <TouchableOpacity
                          onPress={() => navigation.navigate(screens.Diagnosis)}
                          className="border border-red-500 rounded-md px-3 py-1">
                          <Text className="text-red-500 text-[14px] font-Nunito-Regular">
                            Edit
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* Symptoms Section */}
                      <Text className="text-[16px] font-Nunito-Bold text-[#000000] mb-2 ml-[15px]">
                        Symptoms -
                      </Text>
                      {/* Digestive System */}
                      {digestiveSystem?.length > 0 && (
                        <>
                          <Text className="text-[14px] ml-[15px] text-[#888888] font-Nunito-Regular mb-[13.5px]">
                            DIGESTIVE SYSTEM
                          </Text>
                          <View className="flex-row flex-wrap gap-2  ml-[15px]">
                            {digestiveSystem.map((item, index) => (
                              <View
                                key={index}
                                className="bg-pastelPrimary px-3 py-1 rounded-[20px]">
                                <Text className="text-primary text-[14px]   pt-[10px] pb-[10px]">
                                  {item}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </>
                      )}

                      {/* Skin & Fur */}
                      {skinFur?.length > 0 && (
                        <>
                          <Text className="text-[14px] ml-[15px] text-[#888888] font-Nunito-Regular mb-[13.5px] mt-[25px]">
                            SKIN & FUR
                          </Text>
                          <View className="flex-row flex-wrap gap-2  ml-[15px]">
                            {skinFur.map((item, index) => (
                              <View
                                key={index}
                                className="bg-pastelPrimary px-3 py-1 rounded-[20px]">
                                <Text className="text-primary text-[14px]  pt-[10px] pb-[10px]">
                                  {item}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </>
                      )}

                      {/* Eyes & Ears */}
                      {eyesEars?.length > 0 && (
                        <>
                          <Text className="text-[14px] ml-[15px] text-[#888888] font-Nunito-Regular mb-[13.5px] mt-[25px]">
                            EYES & EARS
                          </Text>
                          <View className="flex-row flex-wrap gap-2 ml-[15px]">
                            {eyesEars.map((item, index) => (
                              <View
                                key={index}
                                className="bg-pastelPrimary px-3 py-1 rounded-2xl">
                                <Text className="text-primary text-[14px] pt-[10px] pb-[10px]">
                                  {item}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </>
                      )}
                      <Text className="text-[16px] font-Nunito-Bold text-[#000000] mt-[25px] ml-[15px]">
                        Note -
                      </Text>
                      <Text className="text-[14px] text-[#888888] ml-[15px] mb-[20px] mt-[10px]">
                        {note ? note : 'No note provided.'}
                      </Text>
                    </View>
                  </>
                )}
              </View>
              {/* 
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(screens.AddMedicationScreen)
                  }>
                  <View className=" flex flex-row items-center justify-between  bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mt-[15px]">
                    <View className="flex flex-row justify-center items-center gap-[12.7px] ml-[17px]  ">
                      <Image
                        source={require('../../assets/images/services.png')}
                        className="w-[16.29px] h-[18.01px]"
                        style={{tintColor: primary}}
                      />
                      <Text
                        className="w-[207px] font-Nunito-Bold text-[16px]"
                        style={{lineHeight: 22}}>
                        Add Medication
                      </Text>
                    </View>
                    <View>
                      <Image
                        source={require('../../assets/images/secondaryAdd.png')}
                        className="mr-[24.8px] w-[18px] h-[18px] "
                        style={{tintColor: primary}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View> */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(screens.AddMedicationScreen)
                }>
                <View className=" flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder  rounded-[20px] mt-[15px] h-[60px]">
                  <View className="flex flex-row items-center  gap-[12.7px]  ml-[17px]  ">
                    <Image
                      source={require('../../assets/images/services.png')}
                      className="w-[16.29px] h-[18.01px]"
                      style={{tintColor: primary}}
                    />
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                      Add Medication
                    </Text>
                  </View>
                  <View className="mr-[24.8px]">
                    <Image
                      source={require('../../assets/images/secondaryAdd.png')}
                      className="mt-[20px] mb-[20px] w-[18px] h-[18px]"
                      style={{tintColor: primary}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View className="mt-[15px]">
                {selectedServicesNames.length > 0 ? (
                  selectedServicesNames.map((name, index) => (
                    <View
                      key={index}
                      className="flex flex-row  bg-pastelGrey border border-pastelgreyBorder pt-[19px] pb-[21px] mb-[10px] rounded-[15px] w-full h-[62px]">
                      <View className="flex flex-row items-center justify-between w-full ">
                        <Text className="text-[16px] text-[#000000] font-Nunito-Bold  pl-[15px]">
                          {name}
                        </Text>
                        <View>
                          <Image
                            source={require('../../assets/images/secondaryAdd.png')}
                            className="mr-[24.8px] w-[18px] h-[18px] "
                            style={{tintColor: primary}}
                          />
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text className="text-[14px] text-gray-500"></Text>
                )}
              </View>
              <View>
                <View className="flex-row items-center justify-between  bg-pastelGrey border border-pastelgreyBorder rounded-[15px] h-[60px] ">
                  <Text
                    className="text-[16px] mt-[19px] mb-[21px] h-[20px] font-Nunito-Bold "
                    style={{marginLeft: 19}}>
                    Schedule Follow Up
                  </Text>
                  <Switch
                    trackColor={{false: '#E7ECF7', true: primary}}
                    thumbColor={true ? '#fff' : '#fff'}
                    value={accepted}
                    onValueChange={() => setAccepted(!accepted)}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity onPress={openModal}>
                  <View className=" flex flex-row items-center justify-between  bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mt-[15px] h-[60px]">
                    <View className="flex flex-row justify-center items-center gap-[12.7px] ml-[17px] pt-[19px] pb-[21px] ">
                      <Image
                        source={require('../../assets/images/services.png')}
                        className="w-[16.29px] h-[18.01px]"
                        style={{tintColor: primary}}
                      />
                      <Text
                        className="w-[207px] font-Nunito-Bold text-[16px]"
                        style={{lineHeight: 22}}>
                        Service details
                      </Text>
                    </View>
                    <View>
                      <Image
                        source={require('../../assets/images/rightArrow.png')}
                        className="mr-[24.8px] w-[8px] h-[10px] "
                        style={{tintColor: primary}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(screens.AdditionalServicesScreen)
                  }>
                  <Text className="text-[16px] mt-[15px] h-[20px] font-[Nunito-Regular] text-[#FF5362]">
                    + Add Additional Services
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text className="mt-[20px] mb-[14px] h-[18px] font-[Proxima-Nova-Semibold] text-[16px] text-[#000000] ">
                  Payment summary
                </Text>
                <View>
                  <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[15px] ">
                    <View className="mt-[15px] ml-[15px] flex flex-row items-center justify-between">
                      <Text className="text-[16px] font-[Proxima-Nova-Semibold] text-[#000000]">
                        Service Charges
                      </Text>
                      <View className=" flex-row  items-center space-x-1">
                        <Text className="text-[14px] font-[Nunito-Regular] text-[#7F7F7F]  mr-[15px]">
                          ₹850
                        </Text>
                      </View>
                    </View>
                    <View className="mt-[15px] ml-[15px] flex flex-row  justify-between">
                      <Text className="text-[16px] font-[Proxima-Nova-Medium] text-[#7F7F7F]">
                        GST and other charges
                      </Text>
                      <View className="flex flex-row items-center ">
                        <Text className="text-[14px] font-[Nunito-Regular] text-[#7F7F7F] mr-[15px]">
                          ₹60
                        </Text>
                      </View>
                    </View>
                    <View className="mt-[15px] ml-[15px] flex flex-row  justify-between mb-[16px]">
                      <Text className="text-[16px] font-[Proxima-Nova-Medium] text-[#7F7F7F]">
                        GST and other charges
                      </Text>
                      <View className="flex flex-row items-center">
                        <Text className="text-[14px]  font-[Nunito-Regular] text-[#7F7F7F] mr-[15px]">
                          ₹199.00
                        </Text>
                      </View>
                    </View>
                    <Text className="border-t-[0.75px] border-mediumGrey mr-[14.5px] ml-[14.5px] "></Text>
                    <View className="flex flex-row  justify-between ml-[20px]">
                      <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                        Estimate
                      </Text>
                      <View className="flex flex-row mb-[16px] items-center">
                        <Text className="text-[15px] font-Nunito-Bold text-[#000000] mr-[15px]">
                          ₹1,109.00
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="mb-[30px]">
                  <Text className="text-[16px] text-[#000000] font-[Figtree-SemiBold] mt-[20px]  mb-[12px]">
                    Address
                  </Text>
                  <View>
                    <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[15px]  mb-[50px]">
                      <View className="flex flex-row gap-[5.9px] mt-[15px] ml-[14.9px] mb-[7px]">
                        <Image
                          source={require('../../assets/images/address.png')}
                          className="w-[13.21px] h-[16px]"
                          style={{tintColor: primary}}
                        />
                        <Text className="font-[Nunito-Regular] h-[20px] text-[14px] text-[#000000]">
                          Banjara Hills
                        </Text>
                      </View>
                      <Text className="font-[Nunito-Regular] text-[12px] text-[#7F7F7F] ml-[35px] mb-[16px] w-[226px] h-[30px]">
                        Park View Estate, Road No. 2, Banjara Hills, Hyderabad,
                        Telangana 500034, India
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          {/* <FooterBtn title="Share to customer" /> */}
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={confirmationBottomSheet}
        snapPoints={snapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="flex bg-[white] px-6">
            <View className=" items-center flex flex-col ">
              <Text className="w-[158px] h-[67px] bg-[#f5f3f0] text-center rounded-[10px] mt-[30px] ml-[117px] mr-[118px]"></Text>
              <Text className="text-[20px]  font-Nunito-Regular text-[#000000] mt-[20px] ml-[29px]">
                The appointment will remain open until the reports for the
                selected services are updated and 'Close appointment' is clicked
              </Text>
            </View>
          </View>
          <View className="mt-[50px] px-6 flex mb-[20px]">
            <TouchableOpacity
              className="bg-primary h-[56px] rounded-2xl items-center justify-center"
              onPress={closeConfirmationSheet}>
              <Text className="text-[20px] text-white font-Nunito-Bold text-center">
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['40%']}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="flex h-[300px] p-4 bg-white rounded-t-2xl">
            <Text className="text-lg font-bold">Service details</Text>
            <View className="flex flex-row justify-between items-center bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-4 mt-4">
              <Text className="text-base font-medium">Vet visit</Text>
              <Text className="text-base text-gray-600">₹850.00</Text>
            </View>
            <TouchableOpacity onPress={closeModal}>
              <Text className="text-red-500 mt-4">
                + Add Additional Services
              </Text>
            </TouchableOpacity>
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
          className=" bg-primary items-center justify-center rounded-2xl"
          onPress={openConfirmationSheet}>
          <Text className="font-Nunito-Bold mt-[18px] mb-[20px] text-[20px] text-white text-center">
            Share to customer
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    backgroundColor: '#d75580',
    height: 60,
    width: 345,
    marginTop: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 30,
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
export default InProgressHomeVisit;
