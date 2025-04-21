import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import screens from '../../constants/screens';

const AddressDetailCard = ({
  change = false,
  title = 'Banjara Hills',
  address = 'Park View Estate, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034, India',
}) => {
  const navigation = useNavigation();

  return (
    <View className="py-[15px] pl-[15px] px-[12px] bg-white border border-[#BBBCB7] rounded-2xl">
      <View className="flex  flex-row gap-[10px]">
        <Image source={images.address} className="h-[22px] w-[18.21px]" />

        <View className=" mr-[15px] ml-[6px] flex-1">
          <Text className="leading-none font-Nunito-Bold text-[21px]">
            {title}
          </Text>
          <Text className=" opacity-50 text-[16px] font-Nunito-Regular mt-[6px]">
            {address}
          </Text>
        </View>
        <View>
          {change && (
            <TouchableOpacity
              className="px-2 py-[6px] border border-primary rounded-md"
              onPress={() => navigation.navigate(screens.ChangeAddress)}>
              <Text className="text-primary text-[12px] font-Nunito-Regular leading-[15px] ">
                Change
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default AddressDetailCard;
