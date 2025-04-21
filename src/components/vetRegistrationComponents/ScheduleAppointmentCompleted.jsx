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
import {primary} from '../../assets/theme/colors';
//   import PetDetailsComponent from "../../components/vetRegistration/PetDetailsComponent";
import {useNavigation} from '@react-navigation/native';
import FooterBtn from '../../components/shared/FooterBtn';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
const ScheduleAppointmentCompleted = () => {
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const diagnosisBottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['80%'], []);
  const openDiagnosisSheet = useCallback(() => {
    diagnosisBottomSheetRef.current?.present();
  }, []);
  const closeDiagnosisSheet = useCallback(() => {
    diagnosisBottomSheetRef.current?.dismiss();
  }, []);
  const medicationBottomSheetRef = useRef(null);
  const medicationSnapPoints = useMemo(() => ['80%'], []);
  const openMedicationSheet = useCallback(() => {
    medicationBottomSheetRef.current?.present();
  }, []);
  const closeMedicationSheet = useCallback(() => {
    medicationBottomSheetRef.current?.dismiss();
  }, []);
  return (
    <BottomSheetModalProvider>
      <View className="flex-1 bg-white px-6">
        <ScrollView>
          <View>
            <View>
              <View
                className="rounded-[15px] mt-[15px]  "
                style={{backgroundColor: '#daf7dc'}}>
                {/* Progress bar */}
                <View
                  className="w-[30px] h-[6px]  ml-[15px]  rounded-[20px]"
                  style={{backgroundColor: '#1ebc28'}}></View>

                {/* Title */}
                <Text className="mt-[15px] ml-[15px]  font-Nunito-Bold  text-[16px] text-[#1C222F]">
                  Completed
                </Text>

                {/* Content */}
                <View className="flex flex-row w-full justify-between mt-[15px] mb-[16px] px-[15px]">
                  {/* Description */}
                  <Text className="flex-1 mr-[10px] font-Nunito-Regular  text-[14px] text-[#7F7E7C]">
                    Pellentesque suscipit tempor ullamcorper. Nuna quam posuere,
                    consectetur lectus eu.
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
            <Text className=" ml-[20px] mb-[12px] mt-[20px] text-[16px] text-[#000000] font-PTSans-Bold">
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
                    <Text className="text-[20px] font-junegull-Regular text-[#6319C4]">
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

            <Text className="text-[16px] font-PTSans-Bold text-[#000000] mt-[10px]">
              Treatment details
            </Text>
            <View>
              <TouchableOpacity onPress={openDiagnosisSheet}>
                <View className=" flex flex-row items-center justify-between ] h-[58px] bg-pastelGrey border border-pastelgreyBorder rounded-[15px]  mt-[15px]">
                  <View className="flex-row justify-center items-center  gap-[12.7px] ml-[17px] mb-[21px] mt-[19px]">
                    <Image
                      source={require('../../assets/images/services.png')}
                      className="w-[16.29px] h-[18.01px]"
                    />
                    <Text className=" h-[20.01px] text-center font-[Proxima-Nova-Medium] text-[16px]">
                      Diagnosis Details
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={require('../../assets/images/rightArrow.png')}
                      className="mr-[24.8px]  "
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={openModal}>
                <View className=" flex flex-row items-center justify-between  h-[58px] bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mt-[15px]">
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
                      className="mr-[24.8px] "
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <Text className="mt-[20px] mb-[14px] h-[18px] font-PTSans-Bold text-[16px] text-[#000000]">
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
                        ₹9,399.00
                      </Text>
                    </View>
                  </View>
                  <View className="mt-[15px] ml-[15px] flex flex-row  justify-between">
                    <Text className="text-[16px] font-[Proxima-Nova-Medium] text-[#7F7F7F]">
                      GST and other charges
                    </Text>
                    <View className="flex flex-row items-center ">
                      <Text className="text-[14px] font-[Nunito-Regular] text-[#7F7F7F] mr-[15px]">
                        ₹250.00
                      </Text>
                    </View>
                  </View>
                  <View className="mt-[15px] ml-[15px] flex flex-row  justify-between mb-[16px]">
                    <Text className="text-[16px] font-[Proxima-Nova-Medium] text-[#7F7F7F]">
                      Travel Fee
                    </Text>
                    <View className="flex flex-row items-center">
                      <Text className="text-[14px]  font-[Nunito-Regular] text-[#7F7F7F] mr-[15px]">
                        ₹199.00
                      </Text>
                    </View>
                  </View>
                  <Text className="border-t-[0.75px] border-[#FCEFDD] mr-[14.5px] ml-[14.5px] "></Text>
                  <View className="flex flex-row  justify-between ml-[20px]">
                    <Text className="text-[16px] font-[Proxima-Nova-Bold] text-[#000000]">
                      Estimate
                    </Text>
                    <View className="flex flex-row mb-[16px] items-center">
                      <Text className="text-[15px] font-[Nunito-Bold] text-[#000000] mr-[15px]">
                        ₹9,848.00
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="mb-[30px]">
                <Text className="text-[16px] text-[#000000] font-PTSans-Bold mt-[20px]  mb-[12px]">
                  Address
                </Text>
                <View>
                  <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[15px]  mb-[50px]">
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
      </View>
    </BottomSheetModalProvider>
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
export default ScheduleAppointmentCompleted;
