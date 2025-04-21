import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import images from '../../../assets/images';
import screens from '../../../constants/screens';

const pets = [
  {id: '1', name: 'MAX', image: images.dog},
  {id: '2', name: 'CHARLIE', image: images.dog2},
];

const SelectPet = ({navigation, route}) => {
  const [selectedPet, setSelectedPet] = useState(null);

  const {header} = route?.params;

  useEffect(() => {
    navigation.setOptions({title: header});
  }, []);

  return (
    <View className="flex-1 bg-white px-6">
      <Text className=" mt-5 mb-[30px] text-[26px] font-Proxima-Nova-Semibold">
        Who are we helping?
      </Text>
      <Text className=" text-[16px] font-Figtree-SemiBold mb-3">
        Select Pet
      </Text>
      <View className=" flex-row gap-[15px] flex-wrap">
        {pets.map((pet, index) => (
          <View key={index} className="">
            <TouchableOpacity
              onPress={() => {
                setSelectedPet(pet.id);
                navigation.navigate(screens.ChooseService, {
                  petName: pet?.name,
                });
              }}
              className={` rounded-2xl `}>
              <Image
                source={pet.image}
                className={` h-[100px] w-[100px] rounded-2xl ${
                  selectedPet === pet.id ? ' border border-primary' : ''
                }`}
              />
              {selectedPet === pet.id && (
                <Image
                  source={images.footPrint}
                  resizeMode="contain"
                  className=" absolute w-5 h-[17px] right-[10px] top-[10px]"
                />
              )}
            </TouchableOpacity>
            <Text className="text-center mt-2 text-[20px] text-primary font-junegull-Regular">
              {pet.name}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          className=" bg-pastelGrey border border-pastelgreyBorder h-[100px] w-[100px] rounded-2xl items-center justify-center gap-2"
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
      </View>
    </View>
  );
};

export default SelectPet;
