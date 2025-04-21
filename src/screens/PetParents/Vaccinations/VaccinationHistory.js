import {View, Text, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../../assets/images';

const doses = [
  {
    id: '1',
    name: 'Bordatella',
    dose: '1 of 3',
    date: '12-04-2023',
    image: images.vaccinationbatch,
  },
  {
    id: '2',
    name: 'Bordatella',
    dose: '2 of 3',
    date: '12-06-2023',
    image: images.vaccinationbatch,
  },
  {
    id: '3',
    name: 'Bordatella',
    dose: '3 of 3',
    date: '12-08-2023',
    image: images.vaccinationbatch,
  },
];

const VaccinationHistory = ({navigation, route}) => {
  const {vaccine} = route?.params;

  useEffect(() => {
    navigation.setOptions({title: vaccine});
  }, []);

  return (
    <View className="flex-1 bg-white px-6">
      {/* Vaccine List */}
      <FlatList
        data={doses}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View className=" bg-pastelGrey p-4 mb-3 rounded-2xl border border-pastelgreyBorder">
            <Text className="text-base font-semibold">{item.name}</Text>
            <View className="flex-row gap-4 items-center my-5">
              <Text className="text-gray-600">Doses: {item.dose}</Text>
              <Text className="">{item.date}</Text>
            </View>
            <View className=" items-start">
              <View className=" bg-[#E6E6E6] py-[15px] rounded-[4px] px-[2px]">
                <Image
                  source={item.image}
                  className="w-16 h-[33px] rounded-[4px]"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default VaccinationHistory;
