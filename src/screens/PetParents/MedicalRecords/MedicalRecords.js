import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import images from '../../../assets/images';
import screens from '../../../constants/screens';
import FooterBtn from '../../../components/shared/FooterBtn';
import SearchByInput from '../../../components/shared/SearchByInput';

const MedicalRecords = ({navigation}) => {
  const [selectedPet, setSelectedPet] = useState('Max');

  const pets = [
    {id: '1', name: 'Max', image: images.dog},
    {id: '2', name: 'Charlie', image: images.dog2},
  ];

  const records = [
    {
      id: '1',
      doctor: 'Dr. Jeevan Kumar',
      date: '26 April, 2024',
      symptoms: 'Change in Appetite, Change in Water Intake',
    },
    {
      id: '2',
      doctor: 'Dr. Manisha',
      date: '25 April, 2024',
      symptoms: 'Skin Symptoms, such as licking, itching',
    },
    {
      id: '3',
      doctor: 'Dr. Santosh',
      date: '24 April, 2024',
      symptoms: 'Change in Appetite, Change in Water Intake',
    },
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
      <Text className="text-center mt-2 text-[20px] text-primary font-junegull-Regular">
        {pet.name}
      </Text>
    </View>
  );

  const renderRecord = ({item}) => (
    <TouchableOpacity
      className="bg-pastelGrey border border-pastelgreyBorder mb-[10px] rounded-2xl py-[15px] px-[17px]"
      onPress={() => navigation.navigate(screens.MedicalRecordDetails)}>
      <View className="flex-row justify-between">
        <View className="flex-row gap-[10px]">
          <Image
            source={images.services}
            resizeMode="contain"
            className="h-[18.01px] w-[16.29px] "
          />
          <View>
            <Text className="text-[16px] mb-[7px] text-darkGunmetal font-Proxima-Nova-Semibold">
              {item.doctor}
            </Text>
            <Text className="text-darkGunmetal leading-[17px] font-Nunito-Regular">
              {item.date}
            </Text>
          </View>
        </View>
        <Image
          source={images.secondaryBack}
          resizeMode="contain"
          style={{height: 14, width: 24}}
        />
      </View>
      <View className="border-t border-t-pastelgreyBorder mt-[11px] mb-[10px]"></View>

      <Text
        style={{fontFamily: 'Proxima-Nova-Regular'}}
        className="text-[12px] text-[#8D8F95]">
        Symptoms:{' '}
        <Text
          style={{fontFamily: 'Proxima-Nova-Medium '}}
          className="text-darkGunmetal">
          {item.symptoms}
        </Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white px-6">
      <FlatList
        data={records}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View>
            <Text className="mt-5  mb-3 text-[16px] text-darkGunmetal font-Figtree-SemiBold">
              Select Pet
            </Text>
            <View className="flex-row">{pets.map(pet => renderPet(pet))}</View>
            <View className="mt-[30px] mb-[10px]">
              {/* search bar  */}
              <SearchByInput />
            </View>
            <View className="flex-row mb-[20px]">
              <Text className=" py-[10px] px-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-[15px] text-[12px] opacity-50 font-Nunito-Regular">
                Date and Time
              </Text>
            </View>
          </View>
        )}
        renderItem={renderRecord}
        ListFooterComponent={() => <View className=" pb-40" />}
      />
      <FooterBtn
        title="Add medical record"
        onClick={() => navigation.navigate(screens.AddMedicalRecords)}
      />
    </View>
  );
};

export default MedicalRecords;
