import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import screens from '../../../constants/screens';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';

const VeterinarianInfo = ({navigation}) => {
  return (
    <View className="flex-1 px-6  bg-white">
      {/* doctor info  */}

      <View className="flex flex-row gap-[15px] pt-5">
        <Image
          source={images.VetImage}
          className="h-[100px] w-[100px] rounded-[10px]"
        />
        <View>
          <Text className="text-[18px] font-bold mb-[9px]  leading-none font-Nunito-Bold">
            Dr. Jeevan Kumar
          </Text>
          <Text className="text-[16px] font-medium mb-[10px] opacity-50 font-Nunito-Regular ">
            Master of veterinary science
          </Text>
          <Text className="text-[14px] font-normal mb-[9px] opacity-50 font-Nunito-Regular">
            Lorum ipsum
          </Text>
          <Text className="text-[12px] font-normal text-gray-400 font-Nunito-Regular">
            Known Languages:
            <Text className="text-darkGunmetal">Telugu, Hindi, English</Text>
          </Text>
        </View>
      </View>

      {/* info cards  */}
      <View className="flex flex-row gap-[10px] w-full mt-5 mb-10">
        <View className=" py-[14px] bg-primaryOpacity-10 flex-1 items-center rounded-2xl">
          <Image source={images.people} className="h-[18px] w-5 mb-[9px]" />
          <Text className="text-[14px] text-darkGunmetal font-Nunito-Bold">
            1200+
          </Text>
          <Text className="text-[12px] text-gray-800 font-Nunito-Regular">
            Patients
          </Text>
        </View>
        <View className=" py-[14px] bg-[##FBA53726] flex-1 items-center rounded-2xl">
          <Image
            source={images.starShadow}
            className="h-[18.06px] w-[18.85px] mb-[9px]"
          />
          <Text className="text-[14px] text-darkGunmetal  font-Nunito-Bold">
            4.9/5
          </Text>
          <Text className="text-[12px]  text-gray-800 font-Nunito-Regular">
            Z Rating
          </Text>
        </View>
        <View className=" py-[14px] bg-pastelPrimary flex-1 items-center rounded-2xl">
          <Image
            source={images.rating}
            className="h-[18.75px] w-[17.87px] mb-[9px]"
          />
          <Text className="text-[14px]  text-darkGunmetal  font-Nunito-Bold">
            10 Years
          </Text>
          <Text className="text-[12px]  text-gray-800 font-Nunito-Regular">
            Experience
          </Text>
        </View>
      </View>

      {/* About Veterinarian  */}
      <Text className="text-[18px] mb-[13px] font-Nunito-Bold text-darkGunmetal">
        About Veterinarian
      </Text>
      <Text className="text-[14px] font-Nunito-Regular mb-10">
        Phasellus dapibus efficitur aliquam. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas. Nulla
        facilisi. Nullam dictum nibh a ultrices porttitor.{' '}
        <Text className=" text-[#004CF2]">Read more</Text>
      </Text>
      <Text className="text-[18px] mb-[13px] font-Nunito-Bold text-darkGunmetal">
        Z Reviews
      </Text>
      <View className="flex flex-row items-center gap-2">
        <View className="bg-[#FBA537] h-[33px] aspect-square rounded-full justify-center items-center  ">
          <Text className="text-white text-[15px] font-Nunito-Regular">JS</Text>
        </View>
        <Text className="text-[15px] font-Nunito-Regular">Jone Smith</Text>
      </View>
      <View className="flex-row items-center gap-[4.2]">
        <View className="gap-[3px] flex-row">
          {[1, 2, 3, 4, 5].map(index => {
            return (
              <Image
                source={images.star}
                className="w-[8.36px] h-[8.01px]"
                key={index}
              />
            );
          })}
        </View>
        <Text className="my-[5px] text-[10px] font-normal text-black opacity-50 font-Nunito-Regular">
          3 days ago
        </Text>
      </View>
      <Text className="text-[#797A7B] font-Nunito-Regular mb-5">
        Phasellus dapibus efficitur aliquam. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas. Nulla
        facilisi. Nullam dictum nibh a ultrices porttitor.
        <Text className=" text-[#004CF2] text-[12px] font-Nunito-Regular">
          Read more
        </Text>
      </Text>

      <Text className=" underline text-center">View all reviews</Text>
      <FooterBtn
        title="Book Appointment"
        onClick={() => navigation.navigate(screens.SelectDateTime)}
      />
    </View>
  );
};

export default VeterinarianInfo;
