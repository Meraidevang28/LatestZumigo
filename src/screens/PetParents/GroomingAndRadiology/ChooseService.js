import {View, Text, SectionList, Image, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import images from '../../../assets/images';
import screens from '../../../constants/screens';
import GroomingMoreDeatails from '../../../components/BottomSheets/GroomingMoreDeatails';

const services = [
  {
    title: 'Regular Grooming',
    data: [
      {
        id: '1',
        name: 'Care',
        subTitle: 'Basic Grooming Service',
        description: [
          'Shampoo & Conditioning',
          'Full Body Brushing',
          'Underbelly & Paw Cleaning',
        ],
        price: '₹1,200.00',
        duration: '60min',
        image: images.grooming,
      },
      {
        id: '2',
        name: 'Comfort',
        subTitle: 'Basic Grooming Service',
        description: ['Shampoo & Conditioning', 'Full Body Brushing'],
        price: '₹1,500.00',
        duration: '90-120min',
        image: images.grooming,
      },
      {
        id: '3',
        name: 'Luxe',
        subTitle: 'Basic Grooming Service',
        description: ['Oil Massage', 'Paw Massage', 'Shampoo & Conditioning'],
        price: '₹2,200.00',
        duration: '60min',
        image: images.grooming,
      },
    ],
  },
  {
    title: 'Special Grooming',
    data: [
      {
        id: '4',
        name: 'Dry Bath',
        subTitle: 'Basic Grooming Service',
        description: [
          'Dry Shampoo',
          'Body Wipes & Powders',
          'Underbelly & Paw Cleaning',
        ],
        price: '₹2,800.00',
        duration: '45min',
        image: images.grooming,
      },
      {
        id: '5',
        name: 'Medicated Bath',
        subTitle: 'Basic Grooming Service',
        description: [
          'Medicated Shampoo & Conditioner',
          'Tick Removal',
          'Full Body Brushing',
        ],
        price: '₹3,000.00',
        duration: '60min',
        image: images.grooming,
      },
    ],
  },
];

const ChooseService = ({navigation, route}) => {
  const {petName} = route?.params;
  const [selectedService, setSelectedService] = useState(null);
  const bottomSheetRef = useRef(null);

  const handleOpenPress = () => bottomSheetRef.current?.present();

  return (
    <View className="flex-1 bg-white px-6">
      <Text className=" mt-5 mb-[1px] text-[26px] font-Proxima-Nova-Semibold">
        {`Choose a service for ${petName}`}
      </Text>

      <SectionList
        sections={services}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({section: {title}}) => (
          <Text className="text-[18px] font-Proxima-Nova-Semibold text-darkGunmetal mt-[15px] mb-3">
            {title}
          </Text>
        )}
        renderItem={({item}) => (
          <TouchableOpacity
            className={`  border  rounded-2xl p-[15px] mb-[15px]
            ${
              selectedService === item.id
                ? ' border-primary bg-pastelPrimary'
                : 'border-pastelgreyBorder bg-pastelGrey '
            }
              `}
            onPress={() => {
              if (selectedService === item.id) {
                navigation.navigate(screens.ChooseProvider);
              }
              setSelectedService(item.id);
            }}>
            <View className="flex-row gap-[15px]">
              <Image
                source={item.image}
                className="w-[66px] h-[60px]"
                resizeMode="contain"
              />
              <View>
                <Text className=" text-[16px] font-Proxima-Nova-Bold text-darkGunmetal mb-[5px]">
                  {item.name}
                </Text>
                <Text className=" font-Proxima-Nova-Regular text-darkGunmetal">
                  {item.subTitle}
                </Text>
              </View>
            </View>
            <View className="mt-6">
              {item.description.map((point, index) => (
                <Text
                  key={index}
                  className="font-Proxima-Nova-Regular  leading-[20px]">
                  • {point}
                </Text>
              ))}
            </View>
            <TouchableOpacity onPress={() => handleOpenPress()}>
              <Text className=" underline text-primary mt-2 mb-[14px] text-[12px] font-Proxima-Nova-Regular">
                More details
              </Text>
            </TouchableOpacity>

            <Text className=" w-[65%] opacity-60 leading-[16px] mb-5 font-Proxima-Nova-Regular">
              <Text className=" font-Nunito-Regular">Note: </Text>
              Service durations are only an estimate and may vary depending on
              the pet breed
            </Text>
            <View className=" flex-row items-center">
              <Text className=" font-Proxima-Nova-Regular text-gray-900">
                From
                <Text className=" text-darkGunmetal font-Proxima-Nova-Semibold text-[20px]">
                  {' '}
                  {item.price}
                </Text>
              </Text>
              <View className="mx-[5px] h-full border-[0.5px] border-pastelgreyBorder rounded-full"></View>
              <Text className="font-Proxima-Nova-Regular text-gray-900">
                {item.duration}
              </Text>
            </View>

            {selectedService === item.id && (
              <Image
                source={images.footPrint}
                className=" w-[20px] h-[17.13px] absolute top-[10px] right-[10.5px]"
              />
            )}
          </TouchableOpacity>
        )}
      />

      <GroomingMoreDeatails innerRef={bottomSheetRef} />
    </View>
  );
};

export default ChooseService;
