import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import screens from '../../../constants/screens';
import images from '../../../assets/images';

const pets = [
  {
    id: '1',
    name: 'FLASH',
    breed: 'Australian Shepherd',
    gender: 'Male',
    age: '3 yr',
    weight: '30 Kgs',
    image: images.dog, // Replace with your image URL
  },
  {
    id: '2',
    name: 'MAX',
    breed: 'Australian Shepherd',
    gender: 'Male',
    age: '3 yr',
    weight: '34 Kgs',
    image: images.dog, // Replace with your image URL
  },
  {
    id: '3',
    name: 'CHARLIE',
    breed: 'Beagle',
    gender: 'Female',
    age: '4 yr',
    weight: '20 Kgs',
    image: images.dog2, // Replace with your image URL
  },
];

const Pets = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      className="flex-row mt-[10px] py-[15px] pl-[10px] pr-[17.8] bg-pastelGrey border border-pastelgreyBorder  rounded-2xl justify-between"
      onPress={() => navigation.navigate(screens.PetProfile)}>
      <View className=" flex-row">
        <Image
          source={item.image}
          className=" rounded-[10px] h-[59px] w-[59px]"
        />
        <View className="ml-[15px]">
          <View className=" flex-row gap-[6px]">
            <Text className=" text-primary font-normal text-[20px] mb-[9px] leading-[24px]  font-junegull-Regular">
              {item.name}
            </Text>
            <Text className=" text-[12px] font-medium text-darkGunmetal my-auto leading-[26px] font-Nunito-Regular">
              {item.breed}
            </Text>
          </View>
          <Text
            className=" opacity-50 leading-[26px] "
            style={{fontFamily: 'Proxima-Nova-Regular'}}>
            {item.gender} | Age {item.age} | {item.weight}
          </Text>
        </View>
      </View>
      <Image
        source={images.secondaryBack}
        // className=" w-[11.97px] h-[7.09px]"
        resizeMode="contain"
        style={{height: 14, width: 24}}
      />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white px-6">
      <View className="mt-[10px]" />
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <TouchableOpacity
            className=" w-full mt-[15px] py-[19px] justify-center bg-pastelGrey border-pastelgreyBorder border rounded-2xl flex-row items-center gap-2 "
            onPress={() =>
              navigation.navigate(screens.AddYourPet, {
                title: 'Add Your Pet!',
                goBack: true,
              })
            }>
            <Image
              source={images.secondaryAdd}
              className=" h-[18px] aspect-square"
              style={{height: 18, width: 18}}
            />
            <Text className=" text-[16px] font-medium text-primary leading-[19px] font-Nunito-Regular">
              Add Pet
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default Pets;
