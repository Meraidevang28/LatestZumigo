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
import {useNavigation} from '@react-navigation/native';
import screens from '../../../constants/screens';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import {primary} from '../../../assets/theme/colors';
const TeleConsultationScreen = () => {
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
  const openOtpModal = () => {
    setIsOtpModalVisible(true);
  };

  const closeOtpModal = () => {
    navigation.navigate(screens.TeleConsultScreen);
    setIsOtpModalVisible(false);

    setOtpVerify(!isOtpVerify);
  };
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <ScrollView>
            <View className="flex-1">
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
              <View className=" flex flex-col gap-[8.9px] bg-pastelGrey border border-pastelgreyBorder  rounded-[20px] mt-[20.8px]">
                <View className="flex flex-row items-center justify-center w-[190px] h-[19px] mt-[15.3px] ml-[15px] gap-[5px]">
                  <Text className="text-[14px] font-Nunito-Regular text-[##7F7F7F] items-center gap-[2px] mt-[2px]">
                    Appointment ID:
                  </Text>
                  <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                    234567896
                  </Text>
                </View>
                <View className="flex flex-row items-center  h-[19px] mb-[17px] ml-[15px] gap-[8.3px] ">
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
              <View className=" flex flex-row   mt-[15.1px] gap-[12.2px]">
                <TouchableOpacity>
                  <View className=" flex flex-row items-center justify-center gap-[9px] rounded-[10px] w-[91px] h-[40px] bg-pastelPrimary">
                    <Image
                      source={require('../../../assets/images/secondaryCall.png')}
                      className="w-[18.04px] h-[18.04px]"
                      style={{tintColor: primary}}
                    />
                    <Text className="text-[15px] font-Nunito-Bold text-[#1C222F]">
                      Call
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View className=" flex flex-row items-center justify-center gap-[9px] rounded-[10px] w-[91px] h-[40px] bg-pastelPrimary">
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
              </View>
              <Text className="text-[16px] font-PTSans-Bold text-[#000000] mt-[29.9px]">
                Pet Details
              </Text>
              <View className=" bg-pastelGrey border border-pastelgreyBorder  mt-[12px] rounded-[20px]">
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
                    Pellentesque suscipit tempor ullamcorper. Nuna quam posuere,
                    consectetur lectus eu,euismod ipsum.
                  </Text>
                </View>
              </View>
              {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate(screens.MedicalHistoryScreen)
                }>
                <View className=" flex flex-row  items-center justify-between bg-pastelGrey border border-pastelgreyBorder  rounded-[20px] mt-[15px]">
                  <View className="flex flex-row items-center  gap-[12.7px] mt-[20px] ml-[17px] ">
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
              </TouchableOpacity> */}
              <View className="flex w-full flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[15px]">
                <View className="flex flex-row pl-[15px]">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(screens.MedicalHistoryScreen)
                    }
                    className="bg-pastelGrey rounded-xl flex flex-row items-center justify-between w-full  ">
                    <View className="flex flex-row items-center  gap-[12.7px]  ">
                      <Text className="text-[16px] font-Nunito-Bold ">
                        Medical history
                      </Text>
                    </View>
                    <View className="mr-[24.8px]">
                      <Image
                        source={require('../../../assets/images/secondaryAdd.png')}
                        className="mt-[18px] mb-[18px] w-[18px] h-[18px]"
                        style={{tintColor: primary}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-[16px] font-PTSans-Bold text-[#000000]  mt-[29.9px]">
                Payment summary
              </Text>
              <View className=" mt-[14px]  bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mb-[30px]">
                <View className="flex flex-row items-center justify-between mt-[15px] ml-[15px]">
                  <Text className="text-[16px] font-Nunito-Bold">
                    Service Charges
                  </Text>
                  <Text className="mr-[15px]">₹1000.00</Text>
                </View>
                <View className="flex flex-row items-center justify-between mt-[15px] ml-[15px]">
                  <Text className="text-[16px] font-Nunito-Regular">
                    GST and other charges
                  </Text>
                  <Text className="mr-[15px]">₹60.00</Text>
                </View>

                <Text className="w-[314.5px] h-[0.5px] bg-[#bbbcb8] ml-[15px] mt-[16px] mb-[15px]"></Text>
                <View className="flex flex-row items-center justify-between mt-[15px] ml-[15px] mb-[16px]">
                  <Text className="text-[16px] font-Nunito-Bold">Total</Text>
                  <Text className="mr-[15px] font-Nunito-Bold">₹1,060.00</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          className="bg-white flex px-6 justify-center  shadow-lg shadow-gray-950 h-[100px] w-full"
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 50, height: 60}, // Adjust as needed
            shadowOpacity: 50, // Lower for subtle shadows
            shadowRadius: 10,
            elevation: 18, // Android shadow
          }}>
          <TouchableOpacity
            className="h-[60px] bg-primary items-center justify-center rounded-2xl"
            onPress={openOtpModal}>
            <Text className="text-[20px] text-white font-Nunito-Bold text-center">
              Start Consultation
            </Text>
          </TouchableOpacity>
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
      </BottomSheetModalProvider>
    </>
  );
};

export default TeleConsultationScreen;

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
