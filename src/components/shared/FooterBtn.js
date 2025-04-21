import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';

const FooterBtn = ({
  title,
  onClick = () => {},
  position = 'absolute',
  disabled = false,
}) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <View
      className={`${position} w-full px-6 bottom-0 `}
      style={{
        width: windowWidth,
        boxShadow: '0 -3px 12px #0000000F',
      }}>
      <View className=" py-4 bg-white">
        <TouchableOpacity
          className="rounded-full bg-[#d75880] w-full items-center"
          onPress={onClick}
          disabled={disabled}>
          <Text className=" text-white font-Nunito-Bold text-[20px] py-5">
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterBtn;
