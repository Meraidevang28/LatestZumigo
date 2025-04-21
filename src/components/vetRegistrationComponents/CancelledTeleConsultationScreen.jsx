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

const CancelledTeleConsultationScreen = () => {
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
    <BottomSheetModalProvider>
      <View className="flex-1 bg-white px-6">
        <ScrollView>
          <View>
            <View>
              <View
                className="rounded-[15px]  mt-[15px]  "
                style={{backgroundColor: '#fadcde'}}>
                {/* Progress bar */}
                <View
                  className="w-[30px] h-[6px]  ml-[15px]  rounded-[20px]"
                  style={{backgroundColor: '#FF5362'}}></View>

                {/* Title */}
                <Text className="mt-[15px] ml-[15px]  font-Nunito-Bold  text-[16px] text-[#1C222F]">
                  Cancelled
                </Text>

                {/* Content */}
                <View className="flex flex-row w-full justify-between mt-[15px] mb-[16px] px-[15px]">
                  {/* Description */}
                  <Text className="flex-1 mr-[10px] font-Nunito-Regular  text-[14px] text-[#7F7E7C]">
                    Pellentesque suscipit tempor ullamcorper. Nuna quam posuere,
                    consectetur lectus eu.
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View className="  rounded-[15px] mt-[20px]  bg-pastelGrey border border-pastelgreyBorder">
                <View className="flex flex-row items-center ml-[15px] mt-[15.3px]  gap-[5px]">
                  <Text className="text-[14px] text-[#7F7F7F] font-[Figtree-Regular]">
                    Appointment Booked for:
                  </Text>
                  <Text className="text-[16px] text-[#000000] font[Figtree-Medium]">
                    MAX
                  </Text>
                </View>
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
            <Text className=" mb-[12px] mt-[20px] text-[16px] text-[#000000] font-PTSans-Bold">
              Pet Details
            </Text>
            <View className=" bg-pastelGrey border border-pastelgreyBorder  mt-[12px] rounded-[20px]">
              <View className="flex flex-row mt-[15px] ml-[10px] gap-[15px]">
                <Image
                  source={require('../../assets/images/DummyImages/Dog2.png')}
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
                  source={require('../../assets/images/DummyImages/Dog5.png')}
                  className="w-[70px] h-[58px]"
                />
                <Image
                  source={require('../../assets/images/DummyImages/Dog5.png')}
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
            <Text className=" text-[18px] font-PTSans-Bold text-[#000000] mt-[30px] ">
              Reason for Cancellation
            </Text>
            <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[14.2px] mb-[50px]">
              <Text className="text-[16px] font-Nunito-Regular text-[#000000] mt-[18.5px] ml-[16px] mb-[21.5px]">
                Changed my mind
              </Text>
            </View>
          </View>
        </ScrollView>
        {/* <View className="flex items-center justify-center mx-6">
              <FooterBtn title="Share to customer" />
            </View> */}
      </View>
    </BottomSheetModalProvider>
  );
};

export default CancelledTeleConsultationScreen;

const styles = StyleSheet.create({});
