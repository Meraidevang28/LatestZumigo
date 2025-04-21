import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../constants/screens';
import FooterBtn from '../../../components/shared/FooterBtn';
import {primary} from '../../../assets/theme/colors';
const TeleMedicationSummaryScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View className="flex-1 bg-white px-6">
        <View className="flex-1">
          <View className="bg-pastelGrey border border-pastelgreyBorder rounded-2xl mb-[12px]">
            <View className="flex flex-row mt-[20px] ml-[15.3px] justify-between">
              <View className="flex flex-row items-center gap-[9.7px]">
                <Image
                  source={require('../../../assets/images/bandageIcon.png')}
                  style={{tintColor: primary}}
                />
                <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                  Syrup - Crocin Paracetamol
                </Text>
              </View>
              <View className="flex flex-row gap-[15.6px] mr-[15px]">
                <Image
                  source={require('../../../assets/images/editIcon.png')}
                  style={{tintColor: primary}}
                />
                <Image
                  source={require('../../../assets/images/deleteImage.png')}
                  className="w-[12px] h-[16px]"
                />
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
          </View>
          <View className="bg-pastelGrey border border-pastelgreyBorder rounded-2xl mb-[12px]">
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
              <View className="flex flex-row gap-[15.6px] mr-[15px]">
                <Image
                  source={require('../../../assets/images/editIcon.png')}
                  style={{tintColor: primary}}
                />
                <Image
                  source={require('../../../assets/images/deleteImage.png')}
                  className="w-[12px] h-[16px]"
                />
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
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.AddMedicationScreen);
              }}>
              <View className=" flex flex-row items-center justify-between  h-[58px] bg-pastelGrey border border-pastelgreyBorder rounded-[15px]  mt-[10px]  mb-[10px]">
                <View className="flex-row justify-center items-center  gap-[12.7px] ml-[17px] mb-[21px] mt-[19px]">
                  <Text className="text-center font-[Proxima-Nova-Medium] text-[16px] h-[20px]">
                    Add Medication
                  </Text>
                </View>
                <View>
                  <Image
                    source={require('../../../assets/images/secondaryAdd.png')}
                    className="mr-[24.8px] w-[18px] h-[18px] "
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* <FooterBtn
        title="Save"
        onClick={() => navigation.navigate(screens.InProgressHomeVisit4)}
      /> */}
        </View>
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
          onPress={() => navigation.navigate(screens.TeleConsultScreen3)}>
          <Text className="font-Nunito-Bold mt-[18px] mb-[20px] text-[20px] text-white text-center">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TeleMedicationSummaryScreen;

const styles = StyleSheet.create({});
