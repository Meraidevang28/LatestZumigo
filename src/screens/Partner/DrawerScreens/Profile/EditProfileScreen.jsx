import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TextInputs from '../../../../components/vetRegistrationComponents/TextInputs';
import FooterBtn from '../../../../components/shared/FooterBtn';
import screens from '../../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {primary} from '../../../../assets/theme/colors';
const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('Jeevan');
  const [lastName, setLastName] = useState('Kumar');
  const [mobileNo, setMobileNo] = useState('+91 8876347786');
  const [email, setEmail] = useState('jeevankumar@hotmail.com');
  const [address, setAddress] = useState(
    'Plot No.3-6-289, 3rd Floor, Hyderguda Main Rd, Himayatnagar ',
  );
  const [city, setCity] = useState('Hyderabad');
  const [pincode, setPincode] = useState('500033');
  const [vetLicense, setvetLicense] = useState('3456898987475');
  const [gstin, setGstIn] = useState('22AAAAA0000A1Z5');
  const [vetFullName, setVetFullName] = useState('Jeevan Kumar');
  const [bankName, setBankName] = useState('State bank of india');
  const [accountNo, setAccountNo] = useState('2345678987');
  const [ifscCode, setIfscCode] = useState('SBIN2400G');
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
  return (
    <>
      <View className="flex-1 bg-white px-6">
        <ScrollView>
          <View className="mb-[130px]">
            <View className="flex flex-row items-center gap-[10px] ">
              <View className="flex-1 ] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                <TextInput
                  placeholder="First Name"
                  value={firstName}
                  placeholderTextColor="#00000080"
                  onChangeText={text => setFirstName(text)}
                  className="flex-1 pl-[19.3px] pb-[21px] pt-[19px] font-Nunito-Regular text-[#1C222F] text-[16px] "></TextInput>
              </View>
              <View className="w-[165px]  bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                <TextInput
                  placeholder="Last Name"
                  value={lastName}
                  placeholderTextColor="#00000080"
                  onChangeText={text => setLastName(text)}
                  className="flex-1 font-Nunito-Regular text-[#1C222F]  pl-[19.3px] pb-[21px] pt-[19px] text-[16px]"></TextInput>
              </View>
            </View>
            <TextInput
              value={mobileNo}
              placeholder="Mobile no"
              placeholderTextColor="#00000080"
              onChangeText={text => setMobileNo(text)}
              className="text-[16px] font-Nunito-Regular text-[#1C222F] mt-[10px]  pl-[19.3px] pb-[21px] pt-[19px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
            />
            <TextInput
              value={email}
              placeholder="Email"
              placeholderTextColor="#00000080"
              onChangeText={text => setEmail(text)}
              className="text-[16px] font-Nunito-Regular text-[#1C222F] mt-[10px]  pl-[19.3px] pb-[21px] pt-[19px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
            />
            <TextInput
              value={address}
              placeholder="Address"
              placeholderTextColor="#00000080"
              onChangeText={text => setAddress(text)}
              multiline={true}
              numberOfLines={4}
              className="text-[16px] font-Nunito-Regular text-[#1C222F]  mt-[10px]  pl-[19.3px] pb-[21px] pt-[19px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
            />
            <View className="flex flex-row items-center gap-[10px] mb-[15px] mt-[10px]">
              <View className="flex-1  bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                <TextInput
                  placeholder="City"
                  value={city}
                  placeholderTextColor="#00000080"
                  onChangeText={text => setCity(text)}
                  className="flex-1 p-3 px-4  font-Nunito-Regular text-[#1C222F] text-[16px] pl-[19.3px] pb-[21px] pt-[19px] "></TextInput>
              </View>
              <View className="w-[165px] flex justify-center  bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                <TextInput
                  placeholder="Pincode"
                  value={pincode}
                  placeholderTextColor="#00000080"
                  onChangeText={text => setPincode(text)}
                  className="flex-1 font-Nunito-Regular text-[#1C222F] text-[16px] pl-[19.3px] pb-[21px] pt-[19px]"></TextInput>
              </View>
            </View>
            <View className=" h-[144px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl mt-[15px]">
              <View className="flex flex-row items-center justify-between mt-[15px] ml-[15px] mr-[21.1px]">
                <Text className="text-[16px] font-Nunito-Regular text-[#000000]">
                  Upload photo
                </Text>
                <Image
                  source={require('../../../../assets/images/upload.png')}
                  className="w-[15.81px] h-[18px]"
                  style={{tintColor: primary}}
                />
              </View>
              <View className="flex flex-row">
                <Image
                  source={require('../../../../assets/images/DummyImages/VetImage.png')}
                  className="w-[66px] h-[66px] ml-[15px] mt-[21px]"
                />
                <Image
                  source={require('../../../../assets/images/cancelIcon.png')}
                  className="mt-[17px]  mr-[260px] w-[14px] h-[14px]"
                />
              </View>
            </View>
            <View className=" h-[144px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl ">
              <View className="flex flex-row justify-between mt-[20px] mr-[21.1px]">
                <Text className="ml-[15px] text-[16px] text-[#000000] font-Nunito-Regular">
                  Upload Aadhaar
                </Text>
                <Image
                  source={require('../../../../assets/images/upload.png')}
                  className="w-[15.81px] h-[18px]"
                  style={{tintColor: primary}}
                />
              </View>
              <View className="ml-[15px] flex flex-row gap-[16px] mt-[21px] mb-[20px]">
                <View className="flex flex-row">
                  <Image
                    source={require('../../../../assets/images/AadhaarCard.png')}
                    className="w-[66px] h-[66px]"
                  />
                  <Image
                    source={require('../../../../assets/images/cancelIcon.png')}
                    className=" w-[14px] h-[14px]"
                  />
                </View>
                <View className="flex flex-row">
                  <Image
                    source={require('../../../../assets/images/AadhaarCard.png')}
                    className="w-[66px] h-[66px]"
                  />
                  <Image
                    source={require('../../../../assets/images/cancelIcon.png')}
                    className=" w-[14px] h-[14px]"
                  />
                </View>
              </View>
            </View>
            <View className=" h-[144px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl ">
              <View className="flex flex-row justify-between mt-[20px] mr-[21.1px]">
                <Text className="ml-[15px] text-[16px] text-[#000000] font-Nunito-Regular">
                  Upload PAN ID
                </Text>
                <Image
                  source={require('../../../../assets/images/upload.png')}
                  className="w-[15.81px] h-[18px]"
                  style={{tintColor: primary}}
                />
              </View>
              <View className="ml-[15px] flex flex-row gap-[16px] mt-[21px] mb-[20px]">
                <View className="flex flex-row">
                  <Image
                    source={require('../../../../assets/images/AadhaarCard.png')}
                    className="w-[66px] h-[66px]"
                  />
                  <Image
                    source={require('../../../../assets/images/cancelIcon.png')}
                    className=" w-[14px] h-[14px]"
                  />
                </View>
              </View>
            </View>
            <View className=" h-[144px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl ">
              <View className="flex flex-row justify-between mt-[20px] mr-[21.1px]">
                <Text className="ml-[15px] text-[16px] text-[#000000] font-Nunito-Regular">
                  Upload Degree certificate
                </Text>
                <Image
                  source={require('../../../../assets/images/upload.png')}
                  className="w-[15.81px] h-[18px]"
                  style={{tintColor: primary}}
                />
              </View>
              <View className="ml-[15px] flex flex-row gap-[16px] mt-[21px] mb-[20px]">
                <View className="flex flex-row">
                  <Image
                    source={require('../../../../assets/images/DegreeCertificate.png')}
                    className="w-[66px] h-[66px]"
                  />
                  <Image
                    source={require('../../../../assets/images/cancelIcon.png')}
                    className=" w-[14px] h-[14px]"
                  />
                </View>
                <View className="flex flex-row">
                  <Image
                    source={require('../../../../assets/images/DegreeCertificate.png')}
                    className="w-[66px] h-[66px]"
                  />
                  <Image
                    source={require('../../../../assets/images/cancelIcon.png')}
                    className=" w-[14px] h-[14px]"
                  />
                </View>
                <View className="flex flex-row">
                  <Image
                    source={require('../../../../assets/images/DegreeCertificate.png')}
                    className="w-[66px] h-[66px]"
                  />
                  <Image
                    source={require('../../../../assets/images/cancelIcon.png')}
                    className=" w-[14px] h-[14px]"
                  />
                </View>
              </View>
            </View>
            <View className=" h-[144px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl mb-[15px] ">
              <View className="flex flex-row justify-between mt-[20px] mr-[21.1px]">
                <Text className="ml-[15px] text-[16px] text-[#000000] font-Nunito-Regular">
                  Vet License
                </Text>
                <Image
                  source={require('../../../../assets/images/upload.png')}
                  className="w-[15.81px] h-[18px]"
                  style={{tintColor: primary}}
                />
              </View>
              <View className="ml-[15px] flex flex-row gap-[16px] mt-[21px] mb-[20px]">
                <View className="flex flex-row">
                  <Image
                    source={require('../../../../assets/images/DegreeCertificate.png')}
                    className="w-[66px] h-[66px]"
                  />
                  <Image
                    source={require('../../../../assets/images/cancelIcon.png')}
                    className=" w-[14px] h-[14px]"
                  />
                </View>
              </View>
            </View>
            <TextInput
              value={vetLicense}
              onChangeText={text => setvetLicense(text)}
              placeholderTextColor="#00000080"
              placeholder="Enter vet licence number"
              className="text-[16px] font-Nunito-Regular text-[#1C222F]  pl-[19.3px] pb-[21px] pt-[19px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
            />
            <Text className="mt-[29.9px] text-[16px] font-PTSans-Bold">
              Business details
            </Text>
            <View className=" h-[144px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl mb-[15px]">
              <View className="flex flex-row justify-between mt-[20px] mr-[21.1px]">
                <Text className="ml-[15px] text-[16px] text-[#000000] font-Nunito-Regular">
                  Upload compnay logo
                </Text>
                <Image
                  source={require('../../../../assets/images/upload.png')}
                  className="w-[15.81px] h-[18px]"
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
            <TextInput
              value={gstin}
              onChangeText={text => setGstIn(text)}
              placeholderTextColor="#00000080"
              placeholder="GST(Optional)"
              className="text-[16px] font-Nunito-Regular text-[#1C222F]  pl-[19.3px] pb-[21px] pt-[19px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
            />
            <View className=" h-[145px]  bg-pastelGrey border border-pastelgreyBorder rounded-2xl mt-[15px] ">
              <Text className="w-[300px] text-[16px] font-Nunito-Regular mx-[14px] my-[14px] text-[#000000] ml-[20px]">
                1st Floor Ayyappa Towers, Near Malaysian Township Circle, 9th
                Phase Road 6th Phase, Kukatpally Housing Board Colony,
                Hyderabad, Telangana 500072, India
              </Text>
            </View>

            <Text className="text-[16px] font-PTSans-Bold text-[#000000] mt-[20px] mb-[15px]">
              Bank details
            </Text>
            <TextInput
              value={vetFullName}
              onChangeText={text => setVetFullName(text)}
              placeholderTextColor="#00000080"
              placeholder="Name of account holder"
              className="text-[16px] font-Nunito-Regular text-[#1C222F] pl-[19.3px] pb-[21px] pt-[19px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
            />
            <TextInput
              value={bankName}
              onChangeText={text => setBankName(text)}
              placeholderTextColor="#00000080"
              placeholder="Bank name"
              className="text-[16px] font-Nunito-Regular text-[#1C222F] mt-[10px] pl-[19.3px] pb-[21px] pt-[19px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
            />
            <TextInput
              value={accountNo}
              onChangeText={text => setAccountNo(text)}
              placeholderTextColor="#00000080"
              placeholder="Account No"
              className="text-[16px] font-Nunito-Regular text-[#1C222F] mt-[10px] pl-[19.3px] pb-[21px] pt-[19px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
            />
            <TextInput
              value={ifscCode}
              onChangeText={text => setIfscCode(text)}
              placeholderTextColor="#00000080"
              placeholder="IIFC code"
              className="text-[16px] font-Nunito-Regular text-[#1C222F]  mt-[10px] pl-[19.3px] pb-[21px] pt-[19px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
            />
          </View>
        </ScrollView>

        {/* <FooterBtn
        title="Save"
        onClick={() => navigation.navigate(screens.ProfileScreen)}
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
              navigation.navigate(screens.ProfileScreen);
            }}>
            <Text className="text-[20px] text-white font-Nunito-Bold text-center">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
