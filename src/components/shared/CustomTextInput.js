import React from 'react';
import {View, TextInput} from 'react-native';

const CustomTextInput = ({
  value,
  placeholder,
  onChangeText,
  keyboardType,
  containerStyle,
  inputStyle,
}) => {
  return (
    <View className={`${containerStyle}`}>
      <TextInput
        className={`border border-[#BBBCB7] bg-white font-Nunito-Regular rounded-[20px] mb-[15px] p-[19px] py-5 ${inputStyle} text-black text-[16px]`}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#BBBCB7"
      />
    </View>
  );
};

export default CustomTextInput;
