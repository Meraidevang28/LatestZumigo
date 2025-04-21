import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import images from '../../assets/images';

const PetDetailCard = ({onClick = () => {}, isDisable = false}) => {
  return (
    <View>
      <TouchableOpacity
        className="py-[15px] pl-[10px] pr-3 bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
        onPress={onClick}
        disabled={isDisable}>
        <View className="flex-row justify-between">
          <View className="flex flex-row gap-[15px] items-center">
            <Image
              source={images.dog}
              className="h-[59px] w-[59px] rounded-[10px]"
            />
            <View>
              <View className="mb-[9px] gap-[6px] flex-row items-center">
                <Text className=" text-primary text-[20px] font-junegull-Regular">
                  MAx
                </Text>
                <Text className="text-darkGunmetal text-[15px] leading-[26px] font-Nunito-Regular">
                  Australian Shepherd
                </Text>
              </View>
              <Text
                style={{fontFamily: 'Proxima-Nova-Regular'}}
                className="leading-[26px] opacity-50">
                Male | Age 3 yrs | 30 Kgs
              </Text>
            </View>
          </View>

          {/* right arrow  */}

          {!isDisable && (
            <Image
              source={images.secondaryBack}
              resizeMode="contain"
              style={{height: 14, width: 24}}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PetDetailCard;
