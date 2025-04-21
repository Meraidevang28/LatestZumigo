import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import images from '../../../assets/images';
import screens from '../../../constants/screens';

const Vaccinations = ({navigation}) => {
  const [selectedPet, setSelectedPet] = useState('Max');

  const pets = [
    {id: '1', name: 'Max', image: images.dog},
    {id: '2', name: 'Charlie', image: images.dog2},
  ];

  const renderPet = pet => (
    // change key value based on backend data
    <View className="mr-3" key={pet?.id}>
      <TouchableOpacity onPress={() => setSelectedPet(pet.name)}>
        <Image
          source={pet.image}
          className={` h-[100px] aspect-square rounded-2xl ${
            selectedPet === pet.name ? ' border border-primary' : ''
          }`}
        />
        {selectedPet === pet.name && (
          <Image
            source={images.footPrint}
            className=" w-[20px] h-[17.13px] absolute top-[10px] right-[10.5px]"
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(screens.VaccinationsTimeLine)}>
        <Text className="text-center mt-2 text-[20px] text-primary font-junegull-Regular">
          {pet.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white px-6">
      <Text className="mt-5  mb-3 text-[16px] text-darkGunmetal font-Figtree-SemiBold">
        Select Pet
      </Text>
      <View className="flex-row">{pets.map(pet => renderPet(pet))}</View>
    </View>
  );
};

export default Vaccinations;
