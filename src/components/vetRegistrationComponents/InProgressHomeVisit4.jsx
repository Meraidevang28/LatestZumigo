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
import {useNavigation} from '@react-navigation/native';
import FooterBtn from '../../components/shared/FooterBtn';

import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {primary} from '../../assets/theme/colors';
const InProgressHomeVisit4 = () => {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);
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
                  <View className="flex flex-row items-center ml-[15px] mt-[15.3px]  gap-[5px]">
                    <Text className="text-[14px] text-[#7F7F7F] font-[Figtree-Regular]">
                      Appointment ID:
                    </Text>
                    <Text className="text-[16px] text-[#000000] font[Figtree-Medium]">
                      23456789
                    </Text>
                  </View>
                  <View className="flex flex-row items-center  ml-[15px] mt-[15.3px] mb-[17px] gap-[5px]">
                    <Image
                      // source={require("../assets/images/timedate.png")}
                      source={require('../../assets/images/timedate.png')}
                      className="w-[18.18] h-[16.05]"
                    />
                    <Text className="font-[Nunito-Bold] h-[20px] text-[16px] text-[#1C222F]">
                      24, April, 2024, 09:00 AM - 10:00 AM
                    </Text>
                  </View>
                </View>
              </View>
              <Text className="  mb-[12px] mt-[20px] text-[16px] text-[#000000] font-[Figtree-SemiBold]">
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
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(screens.MedicalHistoryScreen)
                  }>
                  <View className=" flex flex-row items-center justify-between  bg-pastelGrey border border-pastelgreyBorder rounded-[15px]  mt-[15px]">
                    <View className="flex-row justify-center items-center  gap-[12.7px] ml-[17px] h-[60px]">
                      <Image
                        source={require('../../assets/images/services.png')}
                        className="w-[16.29px] h-[18.01px]"
                      />
                      <Text className=" h-[20.01px] text-center font-[Proxima-Nova-Medium] text-[16px]">
                        Medical history
                      </Text>
                    </View>
                    <View>
                      <Image
                        source={require('../../assets/images/rightArrow.png')}
                        className="mr-[24.8px] w-[8px] h-[10px] "
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <Text className=" mt-[20px] text-[16px] text-[#000000] font-[Figtree-SemiBold]">
                Treatment Details
              </Text>
              <View>
                <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl mt-[15px]">
                  <View className="flex flex-row items-center justify-between mt-[10px]">
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15px]">
                      Diagnosis Details
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(screens.Diagnosis)}
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
                        navigation.navigate(screens.AddMedicationScreen)
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
                        source={require('../../assets/images/bandageIcon.png')}
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
                  <Text className="text-[14px] text-[#7f7e7c] font-Nunito-Regular ml-[39px] mt-[6px] mb-[10px]">
                    0.5ml, 0.5-0.5-0.5, daily, for 3 days, after food
                  </Text>
                  <Text className="w-[314.5px] h-[0.5px] bg-[#bbbcb8] ml-[15px] mt-[16px] "></Text>
                  <View className="flex flex-row mt-[20px] ml-[15.3px] justify-between">
                    <View className="flex flex-row items-center gap-[9.7px]">
                      <Image
                        source={require('../../assets/images/bandageIcon.png')}
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
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(screens.RadiologyScreen);
                  }}>
                  <View className=" flex flex-row items-center justify-between  h-[58px] bg-pastelGrey border border-pastelgreyBorder rounded-[15px]  mt-[10px]  mb-[10px]">
                    <View className="flex-row justify-center items-center  gap-[12.7px] ml-[17px] h-[60px]">
                      <Text className="text-center font-[Proxima-Nova-Medium] text-[16px] h-[20px]">
                        Radiology
                      </Text>
                    </View>
                    <View>
                      <Image
                        source={require('../../assets/images/secondaryAdd.png')}
                        className="mr-[24.8px] w-[18px] h-[18px] "
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <View className="flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mt-[15px] mb-[15px] h-[60px]">
                  <Text
                    className="text-[16px] mt-[19px] mb-[21px] font-[Proxima-Nova-Medium] h-[20px]"
                    style={{marginLeft: 19}}>
                    Schedule Follow Up
                  </Text>
                  <Switch
                    trackColor={{false: '#E7ECF7', true: '#FF5362'}}
                    thumbColor={true ? '#fff' : '#fff'}
                    value={accepted}
                    onValueChange={() => setAccepted(!accepted)}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity onPress={openModal}>
                  <View className=" flex flex-row items-center justify-between  bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mt-[15px]">
                    <View className="flex flex-row justify-center items-center gap-[12.7px] ml-[17px] mb-[21px] mt-[19px]">
                      <Image
                        source={require('../../assets/images/services.png')}
                        className="w-[16.29px] h-[18.01px]"
                      />
                      <Text className="w-[207px] h-[18px] font-[Proxima-Nova-Medium] text-[16px]">
                        Service details
                      </Text>
                    </View>
                    <View>
                      <Image
                        source={require('../../assets/images/rightArrow.png')}
                        className="mr-[24.8px] w-[8px] h-[10px] "
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <BottomSheetModal
                  ref={bottomSheetRef}
                  snapPoints={['40%']}
                  backdropComponent={({style}) => (
                    <View
                      style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]}
                    />
                  )}>
                  <BottomSheetView>
                    <View className="flex h-[300px] p-4 bg-white rounded-t-2xl">
                      <Text className="text-lg font-bold">Service details</Text>
                      <View className="flex flex-row justify-between items-center bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-4 mt-4">
                        <Text className="text-base font-medium">Vet visit</Text>
                        <Text className="text-base text-gray-600">₹850.00</Text>
                      </View>
                      <TouchableOpacity>
                        <Text className="text-red-500 mt-4">
                          + Add Additional Services
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </BottomSheetView>
                </BottomSheetModal>
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
                      <Text className="text-[16px] font-[Proxima-Nova-Medium] text-[#000000]">
                        Estimate
                      </Text>
                      <View className="flex flex-row mb-[16px] items-center">
                        <Text className="text-[15px] font-[Nunito-Regular] text-[#000000] mr-[15px]">
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
                    <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mb-[50px]">
                      <View className="flex flex-row gap-[5.9px] mt-[15px] ml-[14.9px] mb-[7px]">
                        <Image
                          source={require('../../assets/images/address.png')}
                          className="w-[13.21px] h-[16px]"
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
      <View
        className="bg-white flex px-6 justify-center h-[100px] w-full"
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 50, height: 60}, // Adjust as needed
          shadowOpacity: 50, // Lower for subtle shadows
          shadowRadius: 10,
          elevation: 18, // Android shadow
        }}>
        <TouchableOpacity className="h-[60px] bg-primary items-center justify-center rounded-2xl">
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
export default InProgressHomeVisit4;
