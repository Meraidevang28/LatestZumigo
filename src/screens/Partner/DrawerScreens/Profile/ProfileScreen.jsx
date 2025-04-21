import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FooterBtn from '../../../../components/shared/FooterBtn';
import screens from '../../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {primary} from '../../../../assets/theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [vetLicenseNo, setVetLicenseNo] = useState('3456898987475');
  const [gstNo, setGstNo] = useState('22AAAAA0000A1Z5');
  const [accountHolder, setAccountHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedAccountHolder = await AsyncStorage.getItem('accountHolder');
        const storedBankName = await AsyncStorage.getItem('bankName');
        const storedAccountNo = await AsyncStorage.getItem('accountNo');
        const storedIfscCode = await AsyncStorage.getItem('ifscCode');

        if (storedAccountHolder) setAccountHolder(storedAccountHolder);
        if (storedBankName) setBankName(storedBankName);
        if (storedAccountNo) setAccountNo(storedAccountNo);
        if (storedIfscCode) setIfscCode(storedIfscCode);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadStoredData();
  }, []);
  return (
    <>
      <View className="flex-1 bg-white px-6">
        <ScrollView>
          <View className=" mb-[100px]">
            <View className="flex flex-col  bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
              <View className="flex flex-row mt-[14.8px] ml-[14.5px] mb-[15.2px] gap-[15px]">
                <Image
                  source={require('../../../../assets/images/DummyImages/VetImage.png')}
                  className="w-[67px] h-[66px] rounded-2xl"
                />
                <View className="flex flex-col ">
                  <Text className="text-[16px] mb-[7.2px] font-Nunito-Bold text-[#1c222f]">
                    Dr.Jeevan Kumar
                  </Text>
                  <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7f] mb-[6.2px]">
                    +918876347789
                  </Text>
                  <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7f]">
                    jeevankumar@hotmail.com
                  </Text>
                </View>
              </View>
              <Text className="flex flex-row w-[253px] ml-[14px] mb-[30px] mr-[95px]">
                <Text className="text-[16px] font-Nunito-Bold text-[#7F7F7f]">
                  Address:{' '}
                </Text>
                <Text className="text-[16px] font-Nunito-Regular  text-[#1c222f]">
                  Plot No.3-6-289, 3rd Floor, Hyderguda Main Rd, Himayatnagar,
                  Hyderabad,500033
                </Text>
              </Text>
            </View>
            <View className=" h-[144px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl ">
              <View className="flex flex-row justify-between mt-[20px]">
                <Text className="ml-[15px] text-[16px] text-[#000000] font-Nunito-Regular">
                  Aadhaar
                </Text>
                <Image
                  source={require('../../../../assets/images/download.png')}
                  className="w-[17.34px] h-[16.01px] mr-[20.7px]"
                  style={{tintColor: primary}}
                />
              </View>
              <View className="ml-[15px] flex flex-row gap-[16px] mt-[21px] mb-[20px]">
                <Image
                  source={require('../../../../assets/images/AadhaarCard.png')}
                  className="w-[66px] h-[66px]"
                />
                <Image
                  source={require('../../../../assets/images/AadhaarCard.png')}
                  className="w-[66px] h-[66px]"
                />
              </View>
            </View>
            <View className=" h-[144px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl ">
              <View className="flex flex-row justify-between mt-[20px]">
                <Text className="ml-[15px] text-[16px] text-[#000000] font-Nunito-Regular">
                  PAN ID
                </Text>
                <Image
                  source={require('../../../../assets/images/download.png')}
                  className="w-[17.34px] h-[16.01px] mr-[20.7px]"
                  style={{tintColor: primary}}
                />
              </View>
              <View className="ml-[15px] flex flex-row gap-[16px] mt-[21px] mb-[20px]">
                <Image
                  source={require('../../../../assets/images/PanCard.png')}
                  className="w-[66px] h-[66px]"
                />
              </View>
            </View>
            <View className=" h-[144px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl ">
              <View className="flex flex-row justify-between mt-[20px]">
                <Text className="ml-[15px] text-[16px] text-[#000000] font-Nunito-Regular">
                  Degree certificate
                </Text>
                <Image
                  source={require('../../../../assets/images/download.png')}
                  className="w-[17.34px] h-[16.01px] mr-[20.7px]"
                  style={{tintColor: primary}}
                />
              </View>
              <View className="ml-[15px] flex flex-row gap-[16px] mt-[21px] mb-[20px]">
                <Image
                  // source={require('../../../../../assets/images/DegreeCertificate.png')}
                  source={require('../../../../assets/images/DegreeCertificate.png')}
                  className="w-[66px] h-[66px]"
                />
                <Image
                  source={require('../../../../assets/images/DegreeCertificate.png')}
                  className="w-[66px] h-[66px]"
                />
                <Image
                  source={require('../../../../assets/images/DegreeCertificate.png')}
                  className="w-[66px] h-[66px]"
                />
              </View>
            </View>
            <View className=" h-[144px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl ">
              <View className="flex flex-row justify-between mt-[20px]">
                <Text className="ml-[15px] text-[16px] text-[#000000] font-Nunito-Regular">
                  Vet License
                </Text>
                <Image
                  source={require('../../../../assets/images/download.png')}
                  className="w-[17.34px] h-[16.01px] mr-[20.7px]"
                  style={{tintColor: primary}}
                />
              </View>
              <View className="ml-[15px] flex flex-row gap-[16px] mt-[21px] mb-[20px]">
                <Image
                  source={require('../../../../assets/images/vetLicense.png')}
                  className="w-[66px] h-[66px]"
                />
              </View>
            </View>
            <View className=" mt-[15px] h-[58px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
              <Text className="text-[16px] text-[#000000] font-Nunito-Regular mt-[19px] ml-[19.3px]">
                3456898987475
              </Text>
            </View>
            <Text className="mt-[29.9px] text-[16px] font-PTSans-Bold">
              Business details
            </Text>
            <View className=" h-[144px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl ">
              <View className="flex flex-row justify-between mt-[20px]">
                <Text className="ml-[15px] text-[16px] text-[#000000] font-Nunito-Regular">
                  compnay logo
                </Text>
                <Image
                  source={require('../../../../assets/images/download.png')}
                  className="w-[17.34px] h-[16.01px] mr-[20.7px]"
                  style={{tintColor: primary}}
                />
              </View>
              <View className="ml-[15px] flex flex-row  mt-[21px] mb-[20px]">
                <Image
                  source={require('../../../../assets/images/businessIcon.png')}
                  className="w-[66px] h-[66px]"
                />
                <Image
                  source={require('../../../../assets/images/cancelIcon.png')}
                  className="w-[14px] h-[14px]"
                />
              </View>
            </View>
            <View className=" mt-[15px] h-[58px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
              <Text className="text-[16px] text-[#000000] font-Nunito-Regular mt-[19px] ml-[19.3px]">
                22AAAAA0000A1Z5
              </Text>
            </View>
            <View className="  bg-pastelGrey border border-pastelgreyBorder rounded-2xl mt-[15px] ">
              <Text className="ml-[20px] mt-[15px] text-[14px] font-Nunito-Regular text-[#7F7F7F] mb-[7px]">
                Business address
              </Text>
              <Text className=" text-[16px] font-Nunito-Regular text-[#000000] ml-[20px] pb-[20px]">
                1st Floor Ayyappa Towers, Near Malaysian Township Circle, 9th
                Phase Road 6th Phase, Kukatpally Housing Board Colony,
                Hyderabad, Telangana 500072, India
              </Text>
            </View>
            <Text className="mt-[29.9px] text-[16px] font-PTSans-Bold">
              Bank details
            </Text>
            <View className=" flex flex-col bg-pastelGrey border border-pastelgreyBorder rounded-2xl  mt-[15px]">
              <View className="flex flex-row justify-between items-center mr-[26.1px] ml-[20px] mt-[21px]">
                <View className="flex flex-col gap-[7px] ">
                  <Text className="text-[14px] h-[16px] font-Nunito-Regular text-[#A4A3A1]">
                    Account holder name
                  </Text>
                  <Text className="text-[16px] font-Nunito-Regular text-[#1C222F]">
                    {accountHolder}
                  </Text>
                </View>
                <Image
                  source={require('../../../../assets/images/copyIcon.png')}
                  style={{tintColor: primary}}
                  className="w-[14px] h-[18px]"
                />
              </View>
              <Text className="w-[315.08] h-[0.9px] bg-[#e8e9eb] ml-[20px] mt-[17.5px] mr-[14.4px] mb-[15.5px]"></Text>
              <View className="flex flex-row justify-between items-center mr-[26.1px] ml-[20px] mt-[21px]">
                <View className="flex flex-col gap-[7px] ">
                  <Text className="text-[14px] h-[16px] font-Nunito-Regular text-[#A4A3A1]">
                    Bank name
                  </Text>
                  <Text className="text-[16px] font-Nunito-Regular text-[#1C222F]">
                    {bankName}
                  </Text>
                </View>
                <Image
                  source={require('../../../../assets/images/copyIcon.png')}
                  style={{tintColor: primary}}
                  className="w-[14px] h-[18px]"
                />
              </View>
              <Text className="w-[315.08] h-[0.9px] bg-[#e8e9eb] ml-[20px] mt-[17.5px] mr-[14.4px] mb-[15.5px]"></Text>
              <View className="flex flex-row justify-between items-center mr-[26.1px] ml-[20px] mt-[21px]">
                <View className="flex flex-col gap-[7px] ">
                  <Text className="text-[14px] h-[16px] font-Nunito-Regular text-[#A4A3A1]">
                    Account no
                  </Text>
                  <Text className="text-[16px] font-Nunito-Regular text-[#1C222F]">
                    {accountNo}
                  </Text>
                </View>
                <Image
                  source={require('../../../../assets/images/copyIcon.png')}
                  style={{tintColor: primary}}
                  className="w-[14px] h-[18px]"
                />
              </View>
              <Text className="w-[315.08] h-[0.9px] bg-[#e8e9eb] ml-[20px] mt-[17.5px] mr-[14.4px] mb-[15.5px]"></Text>
              <View className="flex flex-row justify-between items-center mr-[26.1px] ml-[20px] mt-[21px]">
                <View className="flex flex-col gap-[7px] mb-[30px] ">
                  <Text className="text-[14px] h-[16px] font-Nunito-Regular text-[#A4A3A1]">
                    IIFC
                  </Text>
                  <Text className="text-[16px] font-Nunito-Regular text-[#1C222F]">
                    {ifscCode}
                  </Text>
                </View>
                <Image
                  source={require('../../../../assets/images/copyIcon.png')}
                  style={{tintColor: primary}}
                  className="w-[14px] h-[18px]"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* <FooterBtn
        title="Edit"
        onClick={() => navigation.navigate(screens.EditProfileScreen)}
      /> */}
      </View>
      {!isKeyboardVisible && (
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
              navigation.navigate(screens.EditProfileScreen);
            }}>
            <Text className="text-[20px] text-white font-Nunito-Bold text-center">
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
