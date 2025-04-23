import {View, TextInput, Image} from 'react-native';
import React from 'react';
import images from '../../assets/images';

const SearchByInput = () => {
  return (
    <View className="flex-row items-center bg-white border border-pastelgreyBorder rounded-2xl px-4 w-full">
      {/* Search Icon */}
      <Image source={images.search} className="h-4 w-4" />
      {/* Vertical Line */}
      <View className="w-[1px] h-5 bg-[#A5A4A380] mx-3" />

      {/* Text Input */}
      <TextInput
        placeholder="Search by..."
        placeholderTextColor="#A5A4A380"
        style={{
          fontFamily: 'Nunito-Regular', // custom font for both text and placeholder
        }}
        className="flex-1 text-gray-600"
      />
    </View>
  );
};

export default SearchByInput;
