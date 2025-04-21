import {View, Text, Image} from 'react-native';
import React from 'react';
import images from '../../assets/images';

const BottomSheetTitleCard = ({title}) => {
  return (
    <View className="py-5 px-[17px]  bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
      <View className="flex-row justify-between items-center">
        <View className="flex flex-row gap-[12.7px] items-center">
          <Image source={images.services} className="h-[18px] w-[16.29px]" />
          <View>
            <Text className=" text-[16px] text-darkGunmetal font-Nunito-Regular">
              {title}
            </Text>
          </View>
        </View>
        {/* right arrow  */}
        <Image
          source={images.secondaryBack}
          resizeMode="contain"
          style={{height: 14, width: 24}}
        />
      </View>
    </View>
  );
};

export default BottomSheetTitleCard;
