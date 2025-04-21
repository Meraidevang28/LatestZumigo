import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import images from '../../../assets/images';
import screens from '../../../constants/screens';

const vaccinations = [
  {id: 1, label: '6-8 Weeks'},
  {id: 2, label: '10-12 Weeks'},
  {id: 3, label: '12-24 Weeks'},
  {id: 4, label: '14-16 Weeks'},
  {id: 5, label: '12-16 Months'},
  {id: 6, label: '1-2 Years (Every)'},
  {id: 7, label: '1-3 Years (Every)'},
];

const VaccinationsTimeLine = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6">
      <FlatList
        data={vaccinations}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            className="flex-row items-center bg-pastelGrey p-5 rounded-2xl border mb-3 border-pastelgreyBorder"
            onPress={() => navigation.navigate(screens.VaccinationDetails)}>
            <Image
              source={images.vaccination}
              resizeMode="contain"
              className=" h-[20px] w-[20px] mr-3"
            />
            <Text className="text-base font-semibold text-black flex-1">
              {item.label}
            </Text>
            <Image
              source={images.secondaryBack}
              className=" h-[14px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default VaccinationsTimeLine;
