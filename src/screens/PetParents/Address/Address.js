import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import images from '../../../assets/images';
import screens from '../../../constants/screens';

const Address = ({navigation}) => {
  const [defaultAdd, setDefaultAdd] = useState(1);
  // Address Data
  const addresses = [
    {
      id: '1',
      title: 'Home',
      address: 'Raghav Textiles, 2nd Floor 205, Homeland ',
    },
    {
      id: '2',
      title: 'Office',
      address:
        'Chinmaya Mission Hospital Rd, Binnamangala, Stage 1, Indiranagar, Bengaluru, Karnataka 560038, India',
    },
  ];

  // Render Function for Each Item
  const renderAddress = ({item}) => (
    <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl mb-[14px] pt-[22px] pl-[22px] pb-[15px] pr-[19.4px]">
      <View className="flex-row flex-1 justify-between gap-[4.4px] mb-[15px]">
        <View className="flex-shrink">
          <Text
            className="text-darkGunmetal text-[18px]"
            style={{fontFamily: 'Proxima-Nova-Bold'}}>
            {item.title}
          </Text>
          <Text
            className="opacity-60 text-[12px] mt-[10px]"
            style={{fontFamily: 'Proxima-Nova-Regular'}}>
            {item.address}
          </Text>
        </View>
        <View className=" flex-row gap-[5px]">
          {item.id == defaultAdd ? (
            <Text>Default</Text>
          ) : (
            <TouchableOpacity onPress={() => setDefaultAdd(item.id)}>
              <Text>Set Default</Text>
            </TouchableOpacity>
          )}

          <Image source={images.address} className=" w-[13.21px] h-[16px]" />
        </View>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity
          className=" py-[6px] px-[13px] bg-pastelGrey border border-primary rounded-md"
          onPress={() => navigation.navigate(screens.EditAddress)}>
          <Text
            className="text-primary text-[12px]"
            style={{fontFamily: 'Proxima-Nova-Medium'}}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className=" py-[6px] px-[13px] bg-pastelGrey border border-primary rounded-md">
          <Text
            className="text-primary text-[12px]"
            style={{fontFamily: 'Proxima-Nova-Medium'}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Footer Component
  const renderFooter = () => (
    <TouchableOpacity onPress={() => navigation.navigate(screens.AddAddress)}>
      <Text
        style={{fontFamily: 'Proxima-Nova-Medium'}}
        className="text-[16px] leading-5 text-primary">
        + Add Address
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white px-6">
      <View className="mt-2"></View>
      {/* FlatList for Address Cards */}
      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter} // Adding Footer
      />
    </View>
  );
};

export default Address;
