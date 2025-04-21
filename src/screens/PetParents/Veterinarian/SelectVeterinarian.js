import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import BottomSheet from '../../../components/shared/BottomSheet';
import screens from '../../../constants/screens';
import images from '../../../assets/images';
import ConfirmationBottomSheet from '../../../components/shared/ConfirmationBottomSheet';
import ServiceInfoCard from '../../../components/shared/ServiceInfoCard';
import SearchByInput from '../../../components/shared/SearchByInput';

const filterOptions = [
  'Popular',
  'Date and Time',
  'Ratings',
  'Specializatiocn',
];

const veterinarians = [
  {
    id: '1',
    name: 'Dr. Jeevan Kumar',
    qualification: 'Master of veterinary science',
    rating: '4.9/5',
    reviews: 134,
    languages: 'Telugu, Hindi, English',
    image: images.VetImage, // Replace with actual image URL
  },
  {
    id: '2',
    name: 'Dr. Manisha',
    qualification: 'Master of veterinary science',
    rating: '4.9/5',
    reviews: 134,
    languages: 'Kannada, Hindi, English',
    image: images.VetImage2,
  },
  {
    id: '3',
    name: 'Dr. Esha Singh',
    qualification: 'Master of veterinary science',
    rating: '4.9/5',
    reviews: 134,
    languages: 'Telugu, Hindi, English',
    image: images.VetImage3,
  },
  {
    id: '4',
    name: 'Dr. Preeti Jain',
    qualification: 'Master of veterinary science',
    rating: '4.9/5',
    reviews: 134,
    languages: 'Telugu, Hindi, English',
    image: images.VetImage4,
  },
];

const SelectVeterinarian = ({navigation, route}) => {
  const [isSelectedBy, setIsSelectedBy] = useState('Popular');
  const bottomSheetRef = useRef(null);

  const isTeleConsult = route?.params?.isTeleConsult;

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.present();

  return (
    <View className="flex-1 bg-white px-6">
      {/* title  */}
      <Text className="mt-5 mb-[18px] text-[26px] font-PTSans-Bold text-darkGunmetal">
        Select Veterinarian
      </Text>

      {/* search bar  */}

      <View>
        <SearchByInput />
      </View>

      {/* selection type  */}
      <View className="mt-[10px] mb-5">
        <FlatList
          data={filterOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.toString()} // Or use index if necessary
          renderItem={({item}) => (
            <TouchableOpacity
              className={`py-[10px] px-[15px] mr-[6px]  border rounded-[15px] ${
                isSelectedBy === item
                  ? 'bg-primary border-primary text-white'
                  : 'bg-pastelGrey border-pastelgreyBorder text-red-300'
              }`}
              onPress={() => setIsSelectedBy(item)}>
              <Text
                className={` text-[12px] font-medium font-Nunito-Regular ${
                  isSelectedBy === item ? 'text-white' : 'text-darkGunmetal'
                }`}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* veterian List  */}

      <Text className="text-[18px] font-semibold  font-Nunito-Regular mb-[13px]  text-darkGunmetal">
        Select
      </Text>

      <FlatList
        data={veterinarians}
        keyExtractor={(item, index) => index.toString()} // Or use index if necessary
        renderItem={({item}) => (
          <ServiceInfoCard
            image={item?.image}
            name={item?.name}
            qualification={item?.qualification}
            rating={item?.rating}
            reviews={item.reviews}
            onClick={() => {
              if (isTeleConsult) {
                navigation.navigate(screens.VeterinarianInfo);
                return;
              } else {
                handleOpenPress();
              }
            }}>
            <Text className="text-[12px] font-Nunito-Regular text-gray-400 ">
              Known Languages:{' '}
              <Text className="text-black">{item?.languages}</Text>
            </Text>
          </ServiceInfoCard>
        )}
      />

      <BottomSheet ref={bottomSheetRef}>
        <ConfirmationBottomSheet
          title="This booking may result in a visit from the vet or their assistant
            to your home. Click “OK” to proceed."
          onAcceptClick={() => {
            handleClosePress();
            navigation.navigate(screens.VeterinarianInfo);
          }}
          onDeclineClick={() => {
            handleClosePress();
          }}
          acceptText="Ok"
          declineText="Cancel"
        />
      </BottomSheet>
    </View>
  );
};

export default SelectVeterinarian;
