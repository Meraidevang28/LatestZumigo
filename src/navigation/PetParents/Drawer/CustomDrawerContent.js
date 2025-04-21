import React, {useRef} from 'react';
import {SectionList, Text, View, TouchableOpacity, Image} from 'react-native';
import screens from '../../../constants/screens';
import BottomSheet from '../../../components/shared/BottomSheet';
import images from '../../../assets/images';
import ConfirmationBottomSheet from '../../../components/shared/ConfirmationBottomSheet';
import {useDispatch} from 'react-redux';
import {logout} from '../../../state/redux/slice/authSlice';

const CustomDrawerContent = ({navigation}) => {
  const dispatch = useDispatch();

  const DATA = [
    {
      title: 'My account',
      icon: images.Account,
      dimensions: 'h-[18px] w-[12.97px]',
      data: [
        {
          title: 'Profile',
          onclick: () => navigation.navigate(screens.Profile),
        },
        {
          title: 'Appointments',
          onclick: () => navigation.navigate(screens.Appointments),
        },
        {
          title: 'Pets',
          onclick: () => navigation.navigate(screens.Pets),
        },
        {
          title: 'Addresses',
          onclick: () => navigation.navigate(screens.Address),
        },
        {
          title: 'Medical records',
          onclick: () => navigation.navigate(screens.MedicalRecords),
        },
        {
          title: 'Vaccinations',
          onclick: () => navigation.navigate(screens.Vaccinations),
        },
        {
          title: 'Payments method',
          onclick: () => navigation.navigate(screens.PaymentMethods),
        },
      ],
    },
    {
      title: 'Settings',
      icon: images.Settings,
      dimensions: 'w-[17.26px] h-[18.01px]',
      data: [],
      onclick: () => navigation.navigate(screens.Settings),
    },
    {
      title: 'Terms & Conditions',
      icon: images.Term,
      dimensions: 'h-[18px] w-[18px]',
      data: [],
      onclick: () => navigation.navigate(screens.TermsConditions),
    },
    {
      title: 'Privacy policy',
      icon: images.privacy,
      dimensions: 'h-[18px] w-[17.92px]',
      data: [],
      onclick: () => navigation.navigate(screens.PrivacyPolicy),
    },
    {
      title: 'Contact Us',
      icon: images.ContactUS,
      dimensions: 'h-[18px] w-[16.72px]',
      data: [],
      onclick: () => navigation.navigate(screens.ContactUs),
    },
    {
      title: 'Logout',
      icon: images.logout,
      dimensions: 'h-[18.01px] w-[14.41px]',
      data: [],
      onclick: () => handleOpenPress(),
    },
  ];
  const handleItemPress = onclick => {
    onclick();
  };

  const handleTitlePress = (title, onclick) => {
    onclick();
    console.log(`${title} clicked`);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleItemPress(item.onclick)}
      className="">
      <Text className=" text-[16px] font-medium text-darkGunmetal opacity-60 pt-[15.07px] border-t-[1.5px] border-t-[#FBF7F6] ml-[39px] pb-[16.7px] leading-[22px] font-Nunito-Regular">
        {item?.title}
      </Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section: {title, icon, onclick = () => {}, dimensions},
  }) => (
    <TouchableOpacity
      onPress={() => handleTitlePress(title, onclick)}
      className={`flex-row items-center  py-5 justify-between  ${
        title == 'My account' ? '' : 'border-t-[1.5px]  border-t-[#FBF7F6] '
      }`}>
      <View className="flex-row items-center">
        <Image source={icon} className={`  mr-[15px] ${dimensions}`} />
        <Text className="text-[16px] font-medium text-darkGunmetal leading-[22px] font-Nunito-Regular">
          {title}
        </Text>
      </View>
      {title == 'My account' && (
        <View className="flex-row items-center gap-2 bg-pastelPrimary p-2 py-[6px] rounded-xl">
          <Image
            source={images.star}
            style={{tintColor: '#d75880'}}
            className=" color-primary h-4 w-4"
          />
          <Text className=" text-primary">4.4</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const bottomSheetRef = useRef(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.present();
  return (
    <View className="bg-white flex-1 px-6">
      <View className="mt-[58px] mb-[12px] flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.BackBtn} className="h-[13.51px] w-[7.51px]" />
        </TouchableOpacity>
        <Text className=" text-[22px] text-primary ml-[20.5px] font-junegull-Regular">
          Zumigo
        </Text>
      </View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />

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
  );
};

export default CustomDrawerContent;
