import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AddressDetailCard from '../../../components/appointment/AddressDetailCard';
import images from '../../../assets/images';
import ServiceInfoCard from '../../../components/shared/ServiceInfoCard';
import screens from '../../../constants/screens';
import SearchByInput from '../../../components/shared/SearchByInput';

const filterOptions = ['Popular', 'Ratings'];

const petGroomingServices = [
  {
    id: '1',
    name: 'Petfolk',
    description: 'Pet Grooming Salon',
    rating: '4.2/5',
    reviews: 134,
    price: '₹1,200.00',
    service: 'Routine Grooming',
    image: images.PetfolkImage,
  },
  {
    id: '2',
    name: 'Just Groom',
    description: 'Best Luxury Pet Spa & Salon',
    rating: '4.1/5',
    reviews: 134,
    price: '₹1,300.00',
    service: 'Routine Grooming',
    image: images.PetfolkImage,
  },
  {
    id: '3',
    name: 'Bubbles for Cuddles',
    description: 'Pet Spa & Store',
    rating: '4.5/5',
    reviews: 134,
    price: '₹1,400.00',
    service: 'Routine Grooming',
    image: images.PetfolkImage,
  },
  {
    id: '4',
    name: 'Happy pet grooming service',
    description: 'Pet groomer',
    rating: '4.7/5',
    reviews: 134,
    price: '₹1,500.00',
    service: 'Routine Grooming',
    image: images.PetfolkImage,
  },
];

const ChooseProvider = ({navigation}) => {
  const [isSelectedBy, setIsSelectedBy] = useState('Popular');
  const [serviceProvider, setServiceProvider] = useState(null);

  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        {/* title  */}
        <Text
          className="mt-5 mb-[18px] text-[26px] font-semibold text-darkGunmetal"
          style={{fontFamily: 'Proxima-Nova-Semibold'}}>
          Choose the provider
        </Text>

        {/* Address  */}

        <Text
          className=" text-[16px]  text-black  mb-3 mt-[20px]"
          style={{fontFamily: 'Figtree-SemiBold'}}>
          Address
        </Text>
        <AddressDetailCard change={true} />

        <View className=" mt-4">
          {/* search bar  */}
          <SearchByInput />
        </View>
        {/* selection type  */}
        <View className="mt-[16px] mb-5 flex-row">
          {filterOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`py-[10px] px-[15px] mr-[6px] border rounded-[15px] ${
                isSelectedBy === item
                  ? 'bg-primary border-primary text-white'
                  : 'bg-pastelGrey border-pastelgreyBorder text-red-300'
              }`}
              onPress={() => setIsSelectedBy(item)}>
              <Text
                className={`text-[12px] font-medium ${
                  isSelectedBy === item ? 'text-white' : 'text-darkGunmetal'
                } leading-[15px]`}
                style={{fontFamily: 'Proxima-Nova-Medium'}}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          {petGroomingServices.map((item, index) => (
            <ServiceInfoCard
              key={index}
              image={item?.image}
              name={item?.name}
              qualification={item?.description}
              rating={item?.rating}
              reviews={item.reviews}
              isSelected={serviceProvider == item?.id}
              onClick={() => {
                if (serviceProvider == item?.id) {
                  navigation.navigate(screens.GroomingDateTime);
                }
                setServiceProvider(item?.id);
              }}>
              <Text className=" font-Proxima-Nova-Regular text-darkGunmetal">
                <Text className=" text-[20px] font-Proxima-Nova-Semibold text-gray-900">
                  {item?.price}/
                </Text>{' '}
                {item?.service}
              </Text>
            </ServiceInfoCard>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ChooseProvider;
