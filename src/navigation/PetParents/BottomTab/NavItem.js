import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const NavItem = ({icon, active, label, onPress}) => {
  return (
    <View>
      <TouchableOpacity
        className="items-center justify-center flex-1 pt-5"
        onPress={onPress}>
        {active && (
          <View className="bg-white rounded-b-[9px] h-[5px] w-[34px] absolute top-0 "></View>
        )}
        {/* <Image
          source={icon}
          className=" w-[22px] h-[19px] mb-[9px] "
          resizeMode="contain"
          tintColor={active ? '#ffffff' : '#ffffff99'}
        /> */}
        <Image
          source={icon}
          style={{
            width: 45,
            height: 45,
            marginBottom: 4,
            tintColor: active ? '#ffffff' : '#ffffff99',
          }}
          resizeMode="contain"
        />
        <Text
          className={` font-Nunito-Bold  text-white ${
            active ? '' : ' opacity-60'
          }`}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavItem;
