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
import BarChart from '../../../components/shared/BarChart';
const VetDashboard = () => {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;
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
        <View className="flex-1 bg-[#f2f6f7] ">
          <View className=" flex-col">
            <View className="flex flex-row items-center px-4">
              <View className="  mr-[6px] mb-[20px] w-[180px] ">
                <Text
                  // numberOfLines={2}
                  className=" font-Nunito-Bold text-primary text-[16px] leading-6">
                  You have 10 appointments this week
                </Text>
                <Text className=" w-[139px] text-[13px] leading-[19.5px] text-[#333333] font-Nunito-Regular mt-[10px]">
                  Your pet patients are delighted to receive thoughtful,
                  personalised and comforting healthcare!
                </Text>
              </View>
              <View className=" bg-[#f2f6f7] ">
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
            <Text className=" text-[18px] text-[#1C222F] font-Nunito-Regular  mb-[14px] px-4">
              Upcoming Appointment
            </Text>
            <TouchableOpacity
              className="px-4"
              onPress={() => navigation.navigate(screens.HomeVisitScreen)}>
              <OnGoingAppointment
                title="Tele Consultation"
                date="April 24, 2024"
                time="09:00 AM"
              />
            </TouchableOpacity>
            <View className="rounded-t-[20px] bg-white mt-[20px]">
              <View className="mt-6 flex-row items-center justify-between gap-3 px-4">
                {[
                  {label: 'Pets served', count: 90},
                  {label: 'Total Appointments', count: 134},
                ].map((item, index) => (
                  <View
                    key={index}
                    className="bg-[#814DCC4D] h-[90px] flex-1 flex-col items-center justify-center gap-2 rounded-[16px]"
                    style={{
                      minWidth: screenWidth * 0.43, // around 43% of screen width
                    }}>
                    <Text className=" font-Nunito-Regular text-black text-[16px]">
                      {item.label}
                    </Text>
                    <Text className="text-xl font-Nunito-Bold text-black">
                      {item.count}
                    </Text>
                  </View>
                ))}
              </View>

              <View className="mt-[5px] px-2">
                <BarChart />
              </View>
              <View className="flex flex-row items-center gap-2 px-4 mt-[25px]">
                <View className="flex flex-col gap-4 rounded-[20px] w-[50%] h-[118px] border border-[#848A9A33] bg-white">
                  <Text
                    className="font-Nunito-Regular text-[21px] mt-[15px] left-2"
                    style={{fontWeight: '700'}}>
                    {' '}
                    ₹ 2,861.00{' '}
                  </Text>
                  <Text
                    className="text-[16px] font-Nunito-Regular text-[#838999] left-4"
                    style={{fontWeight: '500'}}>
                    Settled
                  </Text>
                </View>
                <View className="flex flex-col gap-4 rounded-[20px] w-[50%] h-[118px] border border-[#848A9A33] bg-white">
                  <Text
                    className="font-Nunito-Regular text-[21px] mt-[15px] left-2"
                    style={{fontWeight: '700'}}>
                    {' '}
                    ₹ 6,860.00{' '}
                  </Text>
                  <Text
                    className="text-[16px] font-Nunito-Regular text-[#838999] left-4"
                    style={{fontWeight: '500'}}>
                    In processing
                  </Text>
                </View>
              </View>
              <View className="px-4 rounded-2xl">
                <View className="flex flex-row items-center mt-[20px] rounded-2xl px-6 h-[184px] bg-[#FFEDF966] border border-[#D7588033]">
                  <View className="flex flex-col mt-[10px] w-[75%] ">
                    <Text
                      className="text-[15px] text-primary font-Nunito-Regular"
                      style={{fontWeight: '500'}}>
                      Your Average Earning
                    </Text>
                    <View className="flex flex-row items-center mt-[5px]">
                      <Text
                        className="text-[#333333] text-[16px] font-Nunito-Regular"
                        style={{fontWeight: '700'}}>
                        ₹80,574.00{' '}
                      </Text>
                      <Text
                        className="text-[#333333] text-[14px] font-Nunito-Regular"
                        style={{fontWeight: '400'}}>
                        / Per month
                      </Text>
                    </View>
                    <Text className="text-[14px] mt-[8px]" numberOfLines={3}>
                      Vets in your neighbourhood are catering to more
                      appointments between 8-10pm
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={images.dogwithMoney}
                      style={{width: '96', height: '123'}}
                    />
                  </View>
                </View>
              </View>
              <AddvertisementCards />
            </View>
          </View>
          {/* </View> */}
          {/* <BottomNavigation /> */}
          <View />
        </View>
      </ScrollView>
    </View>
  );
};

export default VetDashboard;

const styles = StyleSheet.create({});
