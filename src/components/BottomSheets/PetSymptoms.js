import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import BottomSheet from '../shared/BottomSheet';
import images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import screens from '../../constants/screens';

const PetSymptoms = ({innerRef}) => {
  const navigation = useNavigation();

  return (
    <BottomSheet ref={innerRef}>
      <View className="px-6">
        <Text className="text-[18px] font-bold mt-[26px] mb-6 font-Nunito-Bold">
          Pet Details
        </Text>

        <View className="justify-between flex-row mb-[3px] ">
          <Text className="font-medium leading-[26px] font-Nunito-Regular">
            Symptoms -{' '}
          </Text>
          <TouchableOpacity
            className="px-[12px] py-[6px] border border-primary rounded-md"
            onPress={() => {
              innerRef?.current?.close();
              setTimeout(() => {
                navigation.navigate(screens.SelectSymptoms, {
                  isEdit: true,
                  isHomeVisit: true,
                });
              }, 400);
            }}>
            <Text className="text-primary text-[12px] font-medium font-Nunito-Regular">
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="mb-4 pb-4 border-b-pastelgreyBorder border-b">
          Change in Appetite, Change in Activity Level
        </Text>

        <Text className="font-medium mb-[11px] leading-[26px] font-Nunito-Regular ">
          Pet Images -{' '}
        </Text>
        <Image
          source={images.dog3}
          className="h-[58px] w-[70px] rounded-[6px] mb-24"
        />
      </View>
    </BottomSheet>
  );
};

export default PetSymptoms;
