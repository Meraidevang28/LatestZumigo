import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import images from '../../../assets/images';
import screens from '../../../constants/screens';
import FooterBtn from '../../../components/shared/FooterBtn';

const PetProfile = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6">
      {/* Pet Image */}
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mt-[26px] px-[10px]">
          <TouchableOpacity className=" bg-primary rounded-lg py-[5.2px] pl-[8.5px] pr-[8px]">
            <Image
              source={images.leftWhite}
              className="h-[13.51px] w-[7.51px]"
            />
          </TouchableOpacity>
          <Image
            source={images.dog}
            className=" h-[179px] w-[179px] rounded-2xl"
          />
          <TouchableOpacity className=" bg-primary rounded-lg py-[5.2px] pl-[8.5px] pr-[8px]">
            <Image
              source={images.rightWhite}
              className="h-[13.51px] w-[7.51px]"
            />
          </TouchableOpacity>
        </View>

        {/* Pet Details */}
        <Text className=" mt-[12px] mb-[30px] text-[26px] text-primary text-center font-junegull-Regular">
          MAX
        </Text>
        <View className="bg-pastelGrey border border-pastelgreyBorder rounded-2xl px-5 mb-48">
          <DetailItem label="Breed" value="Australian Shepherd" />
          <DividerLine />
          <DetailItem label="Gender" value="Male" />
          <DividerLine />
          <DetailItem label="Age" value="3 Years 6 Months" />
          <DividerLine />
          <DetailItem label="Microchip number" value="44567897654" />
          <DividerLine />
          <DetailItem label="Date of microchipping" value="12-04-2018" />
          <DividerLine />
          <DetailItem label="KCI Registration" value="Yes" />
        </View>
      </ScrollView>
      <FooterBtn
        title="Edit"
        onClick={() => navigation.navigate(screens.EditPetDetails)}
      />
    </View>
  );
};

const DetailItem = ({label, value}) => (
  <View className="flex-row justify-between pt-5 pb-5">
    <Text className=" font-medium opacity-50 font-Nunito-Regular">{label}</Text>
    <Text className=" text-[16px] font-Nunito-Bold">{value}</Text>
  </View>
);

const DividerLine = () => {
  return <View className="border-t border-t-pastelgreyBorder" />;
};

export default PetProfile;
