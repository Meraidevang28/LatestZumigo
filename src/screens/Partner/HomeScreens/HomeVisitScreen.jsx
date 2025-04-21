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
} from 'react-native';
import FooterBtn from '../../../components/shared/FooterBtn';
import InProgressHomeVisit from '../../../components/vetRegistrationComponents/InProgressHomeVisit';
import screens from '../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import {primary} from '../../../assets/theme/colors';

const HomeVisitScreen = () => {
  const navigation = useNavigation();
  const [isOtpVerify, setOtpVerify] = useState(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const bottomSheetRef = useRef(null);

  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 10,
      onPanResponderMove: Animated.event([null, {dy: translateY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150) {
          closeModal();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;
  const openOtpModal = () => {
    setIsOtpModalVisible(true);
  };

  const closeOtpModal = () => {
    navigation.navigate(screens.InProgressHomeVisit);
    setIsOtpModalVisible(false);

    setOtpVerify(!isOtpVerify);
  };
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <View className="flex-1">
            <ScrollView>
              <View>
                <View className=" bg-[#fde8d3] rounded-[20px] ">
                  <Text className="w-[30px] h-[6px] bg-[#ffb149] rounded-[20px] ml-[15px]"></Text>
                  <Text className="text-[16px] font-Nunito-Bold mt-[9.3px] ml-[15px]">
                    Scheduled
                  </Text>
                  <Text className="text-[14px] font-Nunito-Regular text-[#7F7E7C] ml-[15px] mt-[7.7px] mb-[16px]">
                    Pellentesque suscipit tempor ullamcorper. Nuna quam posuere,
                    consectetur lectus eu,euismod ipsum.
                  </Text>
                </View>
                <View className=" flex flex-col gap-[8.9px] bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[20.8px]">
                  <View className="flex flex-row items-center justify-center w-[190px] h-[19px] mt-[15.3px] ml-[10px] gap-[5px]">
                    <Text className="text-[14px] font-Nunito-Regular text-[##7F7F7F] items-center gap-[2px] mt-[2px]">
                      Appointment ID:
                    </Text>
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                      234567896
                    </Text>
                  </View>
                  <View className="flex flex-row items-center h-[19px] mb-[17px] ml-[10px] gap-[8.3px] ">
                    <Image
                      source={require('../../../assets/images/timedate.png')}
                      className="w-[18.18px] h-[16.05px] mt-[5px]"
                      style={{tintColor: primary}}
                    />
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                      24, April, 2024, 09:00 AM - 10:00 AM
                    </Text>
                  </View>
                </View>
                <View className=" flex flex-row justify-between mt-[15.1px]">
                  <TouchableOpacity>
                    <View className=" flex flex-row items-center justify-center gap-[9px] pt-[11px] pb-[12px] rounded-[10px] w-[91px]  bg-pastelPrimary">
                      <Image
                        source={require('../../../assets/images/secondaryCall.png')}
                        className="w-[18.04px] h-[18.04px]"
                        style={{tintColor: primary}}
                      />
                      <Text className="text-[15px] font-Nunito-Bold text-[#1C222F] ">
                        Call
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View className=" flex flex-row items-center justify-center pt-[11px] pb-[12px]  gap-[9px] rounded-[10px] w-[91px]  bg-pastelPrimary">
                      <Image
                        source={require('../../../assets/images/secondaryChat.png')}
                        className="w-[18.04px] h-[18.04px]"
                        style={{tintColor: primary}}
                      />
                      <Text className="text-[15px] font-Nunito-Bold text-[#1C222F]">
                        Chat
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View className=" flex flex-row items-center justify-center gap-[9px] rounded-[10px] w-[119px] pt-[11px] pb-[12px]  bg-pastelPrimary">
                      <Image
                        source={require('../../../assets/images/Direction.png')}
                        className="w-[18.04px] h-[18.04px]"
                        style={{tintColor: primary}}
                      />
                      <Text className="text-[15px] font-Nunito-Bold text-[#1C222F]">
                        Directions
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text className="text-[16px] font-PTSans-Bold text-[#000000]  mt-[29.9px]">
                  Pet Details
                </Text>
                <View className=" bg-pastelGrey border border-pastelgreyBorder mt-[12px] rounded-[20px]">
                  <View className="flex flex-row mt-[15px] ml-[10px] gap-[15px]">
                    <Image
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
                      Pellentesque suscipit tempor ullamcorper. Nuna quam
                      posuere, consectetur lectus eu,euismod ipsum.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(screens.MedicalHistoryScreen)
                  }>
                  <View className=" flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder   rounded-[20px] mt-[15px] h-[60px]">
                    <View className="flex flex-row items-center  gap-[12.7px]  ml-[17px]  ">
                      <Image
                        source={require('../../../assets/images/services.png')}
                        className="w-[16.29px] h-[18.01px]"
                        style={{tintColor: primary}}
                      />
                      <Text className="text-[16px] font-Nunito-Bold">
                        Medical history
                      </Text>
                    </View>
                    <View className="mr-[24.8px]">
                      <Image
                        source={require('../../../assets/images/rightArrow.png')}
                        className="mt-[20px] mb-[20px] w-[8px] h-[10px]"
                        style={{tintColor: primary}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={openModal}>
                  <View className=" flex flex-row  items-center justify-between bg-pastelGrey border border-pastelgreyBorder  rounded-[20px] mt-[15px] h-[60px]">
                    <View className="flex flex-row items-center  gap-[12.7px]  ml-[17px]  ">
                      <Image
                        source={require('../../../assets/images/services.png')}
                        className="w-[16.29px] h-[18.01px] "
                        style={{tintColor: primary}}
                      />
                      <Text className="text-[16px] font-Nunito-Bold">
                        Service details
                      </Text>
                    </View>
                    <View className="mr-[24.8px]">
                      <Image
                        source={require('../../../assets/images/rightArrow.png')}
                        className="mt-[20px] mb-[20px] w-[8px] h-[10px]"
                        style={{tintColor: primary}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                <Text className="text-[16px] font-PTSans-Bold text-[#000000]  mt-[29.9px]">
                  Payment summary
                </Text>
                <View className=" mt-[14px]  bg-pastelGrey border border-pastelgreyBorder rounded-[20px]">
                  <View className="flex flex-row items-center justify-between mt-[15px] ml-[15px]">
                    <Text className="text-[16px] font-Nunito-Bold">
                      Service Charges
                    </Text>
                    <Text className="mr-[15px]">₹850.00</Text>
                  </View>
                  <View className="flex flex-row items-center justify-between mt-[15px] ml-[15px]">
                    <Text className="text-[16px] font-Nunito-Regular">
                      GST and other charges
                    </Text>
                    <Text className="mr-[15px]">₹150.00</Text>
                  </View>
                  <View className="flex flex-row items-center justify-between mt-[15px] ml-[15px]">
                    <Text className="text-[16px] font-Nunito-Regular">
                      Travel Fee
                    </Text>
                    <Text className="mr-[15px]">₹199.00</Text>
                  </View>
                  <Text className="w-[334.5px] h-[0.5px] bg-[#bbbcb8] ml-[15px] mt-[16px] mb-[15px]"></Text>
                  <View className="flex flex-row items-center justify-between mt-[15px] ml-[15px] mb-[16px]">
                    <Text className="text-[16px] font-Nunito-Bold">
                      Estimate
                    </Text>
                    <Text className="mr-[15px] font-Nunito-Bold">
                      ₹1,199.00
                    </Text>
                  </View>
                </View>
                <Text className="text-[16px] font-PTSans-Bold text-[#000000]  mt-[29.9px]">
                  Address
                </Text>
                <View className=" mt-[14px]  mb-[100px] bg-pastelGrey border border-pastelgreyBorder rounded-[20px]">
                  <View className="flex flex-row gap-[5.9px] mt-[15px] ml-[14.5px]">
                    <Image
                      source={require('../../../assets/images/address.png')}
                      className="w-[13.21px] h-[16px]"
                      style={{tintColor: primary}}
                    />
                    <Text className="text-[14px] font-Nunito-Bold text-[#000000]">
                      Banjara Hills
                    </Text>
                  </View>
                  <Text className=" text-[12px] font-Nunito-Regular ml-[34px] mt-[7px] mb-[16px] w-[226px] h-[30px]">
                    Park View Estate, Road No. 2, Banjara Hills, Hyderabad,
                    Telangana 500034, India
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <Modal
            visible={isOtpModalVisible}
            transparent
            animationType="slide"
            onRequestClose={closeOtpModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Enter the OTP</Text>
                <Text style={styles.modalSubtitle}>
                  Please enter the OTP received from the pet parent
                </Text>
                <View style={styles.otpInputContainer}>
                  {Array(4)
                    .fill('')
                    .map((_, index) => (
                      <TextInput
                        key={index}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                      />
                    ))}
                </View>
                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={closeOtpModal}>
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['40%']}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="flex h-[300px]  p-4 bg-[#white] rounded-t-2xl">
            <Text className="text-lg font-PTSans-Bold ml-[15px] mb-[15px] ">
              Service details
            </Text>
            <View className="flex flex-row justify-between items-center bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-4 mt-4">
              <Text className="text-base font-Nunito-Bold">Vet visit</Text>
              <Text className="text-base font-Nunito-Regular text-gray-600">
                ₹850.00
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-primary mt-4 font-Nunito-Regular">
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
          onPress={openOtpModal}>
          <Text className="font-Nunito-Bold mt-[18px] mb-[20px] text-[20px] text-white text-center">
            Start Consultation
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'start',
  },
  modalTitle: {
    fontSize: 18,
    // fontWeight: "bold",
    textAlign: 'start',
    marginBottom: 10,
    fontFamily: 'Nunito-Bold',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontFamily: 'Nunito-Regular',
  },
  otpInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  otpInput: {
    width: 48,
    height: 58,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#e8e9eb',
    borderRadius: 10,
    backgroundColor: '#f3f6f7',
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  verifyButton: {
    backgroundColor: '#d75880',
    height: 60,
    marginTop: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
export default HomeVisitScreen;
