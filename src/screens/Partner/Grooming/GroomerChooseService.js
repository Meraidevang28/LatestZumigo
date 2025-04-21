import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import screens from '../../../constants/screens';
import FooterBtn from '../../../components/shared/FooterBtn';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import images from '../../../assets/images';

const services = [
  {
    id: 1,
    title: 'Chest X-Rays',
    subtitle: 'Lorum Ipsum',
    description:
      'A chest X-ray may be recommended for a pet with a respiratory illness or breathing issue, as well as to evaluate the heart or lungs to aid in disease diagnosis.',
  },
  {
    id: 2,
    title: 'Abdominal X-Rays',
    subtitle: 'Lorum Ipsum',
    description:
      'Abdominal X-rays may be used to aid in the diagnosis of conditions involving the intestines, bladder, and other internal abdominal organs.',
  },
  {
    id: 3,
    title: 'Orthopedic X-Rays',
    subtitle: 'Lorum Ipsum',
    description:
      'Orthopedic X-rays may be ordered by your veterinarian to check for injuries, bone tumors or fractures, or to confirm a diagnosis of arthritis.',
  },
  {
    id: 4,
    title: 'Dental X-Rays',
    subtitle: 'Lorum Ipsum',
    description:
      "Dental X-rays are used to get an accurate picture of your pet's oral health.",
  },
];
const GroomerChooseService = ({navigation}) => {
  const [selectedServices, setSelectedServices] = useState([]);

  console.log('------------->>>>>>>', JSON.stringify(selectedServices));

  const toggleSelection = id => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <View className="mt-[15px] mb-2">
          <RegistrationProgressBar screenNo={4} n={6} />
        </View>
        <Text className="text-[14px] text-[#7f7f7f] font-Nunito-Regular mb-[21px]">
          Select services{' '}
        </Text>
        <View>
          {services.map(item => {
            const isSelected = selectedServices.includes(item.title);
            return (
              <TouchableOpacity
                key={item.id}
                className={`p-4 rounded-2xl mb-4 border ${
                  isSelected
                    ? 'bg-pastelPrimary border-primary'
                    : 'bg-pastelGrey border-pastelgreyBorder'
                }`}
                onPress={() => toggleSelection(item.title)}>
                <Text className=" font-Nunito-Bold text-[18px]">
                  {item.title}
                </Text>
                <Text className="font-Nunito-Regular my-2">
                  {item.subtitle}
                </Text>
                <Text className="font-Nunito-Regular ">{item.description}</Text>
                <Text className=" text-[12px] opacity-50 font-Nunito-Regular mt-3">
                  <Text className=" font-Nunito-Bold ">Note: </Text>
                  Pellentesque suscipit tempor ullamcorper. Nunc a quam posuere,
                  consectetur lectus eu, euismod ipsum.
                </Text>

                {isSelected && (
                  <Image
                    source={images.footPrint}
                    resizeMode="contain"
                    className=" absolute w-5 h-[17px] right-[16px] top-[16px]"
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <View className=" mb-40" />
      </ScrollView>
      <FooterBtn
        title={'Continue'}
        onClick={() => navigation.navigate(screens.GroomerSchedule)}
      />
    </View>
  );
};

export default GroomerChooseService;
