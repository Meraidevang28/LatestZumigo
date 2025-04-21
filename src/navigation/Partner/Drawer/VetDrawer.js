import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../constants/screens';
import BottomSheet from '../../../components/shared/BottomSheet';
import ConfirmationBottomSheet from '../../../components/shared/ConfirmationBottomSheet';
import {useDispatch} from 'react-redux';
import {logout} from '../../../state/redux/slice/authSlice';
import {primary} from '../../../assets/theme/colors';
const VetDrawer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.present();
  return (
    <View className="flex-1 bg-white">
      <View className="w-[393px] mt-[30px] ">
        <View className=" flex flex-col ml-[33px]">
          <View className="flex flex-row gap-[18px] items-center">
            <Image
              source={require('../../../assets/images/Account.png')}
              className="w-[12.97px] h-[18px]"
              style={{tintColor: primary}}
            />
            <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
              My account
            </Text>
          </View>
          <Text className="w-[305px] h-[0.2px] bg-[#e8e9eb] ml-[31px] mt-[17.1px] mb-[15.5px]"></Text>
          <View className="ml-[31px]">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.ProfileScreen);
              }}>
              <Text className="text-[16px] font-Nunito-Regular text-[#7F7F7F]">
                Profile
              </Text>
            </TouchableOpacity>
            <Text className="w-[305px] h-[0.2px] bg-[#e8e9eb]  mt-[17.1px] mb-[15.5px]"></Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.AssistantsScreen)}>
              <Text className="text-[16px] font-Nunito-Regular text-[#7F7F7F]">
                Assistants
              </Text>
            </TouchableOpacity>
            <Text className="w-[305px] h-[0.2px] bg-[#e8e9eb]  mt-[17.1px] mb-[15.5px]"></Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screens.ScheduledAppointments)
              }>
              <Text className="text-[16px] font-Nunito-Regular text-[#7F7F7F]">
                Appointment Scheduled
              </Text>
            </TouchableOpacity>
            <Text className="w-[305px] h-[0.2px] bg-[#e8e9eb]  mt-[17.1px] mb-[15.5px]"></Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.CalendarScheduler)}>
              <Text className="text-[16px] font-Nunito-Regular text-[#7F7F7F]">
                Calender Scheduler
              </Text>
            </TouchableOpacity>
            <Text className="w-[305px] h-[0.2px] bg-[#e8e9eb]  mt-[17.1px] mb-[15.5px]"></Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.RatingFeedbackScreen)}>
              <Text className="text-[16px] font-Nunito-Regular text-[#7F7F7F]">
                Rating and Feedbacks
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="w-[343px] h-[0.2px] bg-[#e8e9eb]  mt-[17.1px] mb-[15.5px]"></Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.SettingScreen)}>
            <View className="flex flex-row gap-[18px] items-center">
              <Image
                source={require('../../../assets/images/Settings.png')}
                className="w-[17.26px] h-[18.01px]"
                style={{tintColor: primary}}
              />
              <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                Settings
              </Text>
            </View>
          </TouchableOpacity>
          <Text className="w-[343px] h-[0.2px] bg-[#e8e9eb]  mt-[21.1px] mb-[21.7px]"></Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.TermsConditions)}>
            <View className="flex flex-row gap-[18px] items-center">
              <Image
                source={require('../../../assets/images/Term.png')}
                className="w-[19.2px] h-[19px]"
                style={{tintColor: primary}}
              />
              <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                Terms & Conditions
              </Text>
            </View>
          </TouchableOpacity>
          <Text className="w-[343px] h-[0.2px] bg-[#e8e9eb]  mt-[21.1px] mb-[21.7px]"></Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.PrivacyPolicy)}>
            <View className="flex flex-row gap-[18px] items-center">
              <Image
                source={require('../../../assets/images/privacy.png')}
                className="w-[17.92px] h-[18px]"
                style={{tintColor: primary}}
              />
              <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                Privacy policy
              </Text>
            </View>
          </TouchableOpacity>
          <Text className="w-[343px] h-[0.2px] bg-[#e8e9eb]  mt-[21.1px] mb-[21.7px]"></Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.VetContactUs)}>
            <View className="flex flex-row gap-[18px] items-center">
              <Image
                source={require('../../../assets/images/ContactUS.png')}
                className="w-[16.72px] h-[18px]"
                style={{tintColor: primary}}
              />
              <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                Contact Us
              </Text>
            </View>
          </TouchableOpacity>
          <Text className="w-[343px] h-[0.2px] bg-[#e8e9eb]  mt-[21.1px] mb-[21.7px]"></Text>
          <TouchableOpacity onPress={handleOpenPress}>
            <View className="flex flex-row gap-[18px] items-center">
              <Image
                source={require('../../../assets/images/logout.png')}
                className="w-[14.41px] h-[18.01px]"
                style={{tintColor: primary}}
              />
              <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
          <BottomSheet ref={bottomSheetRef}>
            <ConfirmationBottomSheet
              title="Are you sure want to logout?"
              onAcceptClick={() => {
                handleClosePress();
                dispatch(logout());
              }}
              onDeclineClick={() => {
                handleClosePress();
              }}
            />
          </BottomSheet>
        </View>
      </View>
    </View>
  );
};

export default VetDrawer;

const styles = StyleSheet.create({});
