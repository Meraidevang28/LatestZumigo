import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Boxes from '../../../components/vetRegistrationComponents/Boxes';
import OnGoingAppointment from '../../../components/vetRegistrationComponents/onGoingAppointment';
import CircleDesign from '../../../components/vetRegistrationComponents/CircleDesign';
import AppointmentComponent from '../../../components/vetRegistrationComponents/AppointmentComponent';
import CalendarComponent from '../../../components/vetRegistrationComponents/CalendarComponent';
import AddvertisementCards from '../../../components/vetRegistrationComponents/AddvertisementCards';
import screens from '../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import BottomNavigation from '../../../components/shared/BottomNavigation';
import {primary} from '../../../assets/theme/colors';
import images from '../../../assets/images';
import {Dimensions} from 'react-native';
const VetDashboard = () => {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-[#f2f6f7]">
      <ScrollView>
        <View className="flex flex-row mt-[10px] items-center justify-between px-3">
          <View className="flex flex-row items-center">
            <View className="mt-[10px]">
              <TouchableOpacity
                onPress={() => navigation.navigate(screens.VetDrawer)}>
                <Image
                  // source={require('../../assets/images/sidbarOpen.png')}
                  source={images.drawerIcon}
                  className=" w-[23px] h-[23px]"
                />
              </TouchableOpacity>
            </View>
            <View className="mt-[10px]">
              <Text className="text-lg font-bold text-gray-700 ml-[15px]">
                <Text className="text-[22px]  font-Nunito-Regular text-[#1C222F]">
                  Hi,{' '}
                </Text>
                <Text className="text-[22px] font-Nunito-Bold text-black">
                  Dr. Jeevan!
                </Text>
              </Text>
            </View>
          </View>
          <View className=" mt-[10px] flex flex-row gap-[16px] items-center justify-center mr-[24px]">
            <TouchableOpacity>
              <Image
                source={images.contactusIcon}
                className="w-[18.56px] h-[19.98px]"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screens.NotificationComponent)
              }>
              <Image
                source={images.notificationIcon}
                className="w-[18.56px] h-[22.98px]"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 bg-[#f2f6f7] px-4">
          <View className=" flex-col">
            <View className="flex flex-row items-center">
              <View className=" pt-10  mr-[6px] mb-[25px] w-[180px] ">
                <Text
                  // numberOfLines={2}
                  className=" font-Nunito-Bold text-primary text-[16px] leading-6">
                  You have 10 appointments this week
                </Text>
                <Text className=" w-[139px] text-[13px] leading-[19.5px] text-[#333333] font-Nunito-Regular mt-[4px]">
                  Your pet patients are delighted to receive thoughtful,
                  personalised and comforting healthcare!
                </Text>
              </View>
              <View className=" bg-[#f2f6f7] ">
                {/* <Image
              source={images.dogIcon}
              className=" rounded-full bg-[#f2f6f7]"
              style={{width: 165, height: 250}}
              // tintColor="#f2f6f7"
              resizeMode="contain"
            /> */}
                <Image
                  source={images.dogIcon}
                  className="rounded-full bg-[#f2f6f7]"
                  style={{
                    width: width * 0.42, // ~45% of screen width
                    height: width * 0.68, // aspect ratio similar to 165x250
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
            <Text className=" text-[18px] text-[#1C222F] font-Nunito-Regular mt-[30px] mb-[14px]">
              Upcoming Appointment
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.HomeVisitScreen)}>
              <OnGoingAppointment
                title="Tele Consultation"
                date="April 24, 2024"
                time="09:00 AM"
              />
            </TouchableOpacity>
            <View className=" h-[40px]  mt-[33px] flex flex-row justify-between items-center">
              <Text className="font-PTSans-Bold text-[16px] text-[#000000]">
                Earnings
              </Text>
              <View className="flex flex-row items-center gap-[8px] w-[110px] h-[39px]  border border-pastelgreyBorder rounded-[20px] bg-[#f3f6f7]">
                <Text className=" ml-[12px] mt-[8px] mb-[7px] text-center font-Nunito-Regular">
                  This month
                </Text>
                <Image
                  source={require('../../../assets/images/downArrow.png')}
                  style={{tintColor: primary}}
                  className="w-[10px] h-[5px]"
                />
              </View>
            </View>
            <View className="flex  h-[159.12px] bg-pastelGrey border border-pastelgreyBorder  mt-[14.2px] rounded-[20px] ">
              <CircleDesign />
            </View>
            <View className="flex-row items-center justify-between  h-[79px]  bg-pastelGrey border border-pastelgreyBorder mt-[29.9px] rounded-[20px]">
              <View className="flex flex-row items-center justify-between ml-[20px] mt-[20.8px] mb-[13.1px] ">
                <View className="flex flex-col gap-[3px]">
                  <Text className="text-[12px] font-Nunito-Regular text-[#787A82]">
                    Average Earning by Vet
                  </Text>
                  <View className=" h-[21px] flex flex-row items-center justify-center mb-[20.2px] ">
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                      80,574.00/
                    </Text>
                    <Text className="text-[12px] text-[#787A82] font-Nunito-Regular mt-[3px]">
                      Per month
                    </Text>
                  </View>
                </View>
              </View>
              <Image
                source={require('../../../assets/images/EarningImage.png')}
                className="w-[68.63px] h-[60.1px] mr-[36.4px]  "
              />
            </View>
            <View className=" h-[40px]  mt-[33px] flex flex-row justify-between items-center">
              <Text className="font-PTSans-Bold text-[16px] text-[#000000]">
                Appointments
              </Text>
              <View className="flex flex-row items-center gap-[8px] w-[110px] h-[39px]  border border-pastelgreyBorder rounded-[20px] bg-[#f3f6f7] mb-[10.2px]">
                <Text className=" ml-[12px] mt-[8px] mb-[7px] text-center font-Nunito-Regular">
                  This month
                </Text>
                <Image
                  source={require('../../../assets/images/ArrowDown.png')}
                  className="w-[10px] h-[5px]"
                />
              </View>
            </View>

            <AppointmentComponent />
            <Text className="font-PTSans-Bold text-[16px] text-[#000000]  mt-[19.7px] mb-[14px]">
              Appointments
            </Text>
            <View>
              <CalendarComponent />
            </View>
          </View>
          <AddvertisementCards />
          <BottomNavigation />
        </View>
      </ScrollView>
    </View>
  );
};

export default VetDashboard;

const styles = StyleSheet.create({});
