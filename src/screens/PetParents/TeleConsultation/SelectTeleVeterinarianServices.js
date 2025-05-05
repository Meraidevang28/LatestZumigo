import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useRef, useState, useCallback} from 'react';
import BottomSheet from '../../../components/shared/BottomSheet';
import images from '../../../assets/images';
import ConfirmationBottomSheet from '../../../components/shared/ConfirmationBottomSheet';
import ServiceInfoCard from '../../../components/shared/ServiceInfoCard';
import SearchByInput from '../../../components/shared/SearchByInput';
import FooterBtn from '../../../components/shared/FooterBtn';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import screens from '../../../constants/screens';
const veterinarians = [
  {
    id: '1',
    name: 'Dr. Jeevan Kumar',
    qualification: 'Master of veterinary science',
    rating: '4.9/5',
    reviews: 134,
    footer: 'More Details',
    image: images.VetImage, // Replace with actual image URL
  },
  {
    id: '2',
    name: 'Dr. Manisha',
    qualification: 'Master of veterinary science',
    rating: '4.9/5',
    reviews: 134,
    footer: 'More Details',
    image: images.VetImage2,
  },
  {
    id: '3',
    name: 'Dr. Esha Singh',
    qualification: 'Master of veterinary science',
    rating: '4.9/5',
    reviews: 134,
    footer: 'More Details',
    image: images.VetImage3,
  },
  {
    id: '4',
    name: 'Dr. Preeti Jain',
    qualification: 'Master of veterinary science',
    rating: '4.9/5',
    reviews: 134,
    footer: 'More Details',
    image: images.VetImage4,
  },
];

const SelectTeleVeterinarianServices = ({navigation, route}) => {
  const bottomSheetRef = useRef(null);

  const openModal = () => {
    navigation.navigate(screens.SelectDateTimeTeleConsultation);
  };

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const isTeleConsult = route?.params?.isTeleConsult;

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.present();
  const [selectedVetIndex, setSelectedVetIndex] = useState(null);
  const handleOkayButton = () => {
    closeModal();
    navigation.navigate(screens.SelectDateTimeTeleConsultation);
  };
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          {/* title  */}
          {/* <ScrollView> */}

          <FlatList
            data={veterinarians}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <>
                <Text className="mt-2 mb-[18px] text-[26px] font-PTSans-Bold text-darkGunmetal">
                  Select Veterinarian
                </Text>

                <View className="flex-row items-center bg-white border border-pastelgreyBorder rounded-2xl px-4 w-full mb-4">
                  <Image source={images.search} className="h-4 w-4" />
                  <View className="w-[1px] h-5 bg-[#A5A4A380] mx-3" />
                  <TextInput
                    placeholder="Search by..."
                    placeholderTextColor="#A5A4A380"
                    style={{
                      fontFamily: 'Nunito-Regular',
                    }}
                    className="flex-1 text-gray-600"
                  />
                </View>
              </>
            }
            renderItem={({item, index}) => (
              <ServiceInfoCard
                image={item?.image}
                name={item?.name}
                qualification={item?.qualification}
                rating={item?.rating}
                reviews={item?.reviews}
                isSelected={selectedVetIndex === index}
                onClick={() => {
                  if (selectedVetIndex === index) {
                    setSelectedVetIndex(null);
                  } else {
                    setSelectedVetIndex(index);
                  }
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(screens.VeterinarianTeleInfo)
                  }>
                  <Text
                    className="text-primary mt-1 underline text-[14px] font-Nunito-Regular"
                    style={{fontWeight: '600'}}>
                    {item?.footer}
                  </Text>
                </TouchableOpacity>
              </ServiceInfoCard>
            )}
            contentContainerStyle={{paddingBottom: 100}} // To give some bottom space
          />

          {/* </ScrollView> */}

          <FooterBtn title="Book Appointment" onClick={openModal} />
        </View>
      </BottomSheetModalProvider>
      {/* <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['80%']}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="flex items-center ">
            <Text className="bg-[#F5F3F0] w-[158px] h-[67px] rounded-2xl mt-2"></Text>
          </View>
          <Text
            className="px-3 mt-[30px] text-[19px] text-center"
            style={{lineHeight: '30'}}>
            This booking may result in a visit from the vet or their assistant
            to your home.
          </Text>
          <Text className="text-[21px] text-center mt-6">
            Click “OK” to proceed.
          </Text>
          <View className="flex flex-row items-center px-3 gap-2 mt-10 mb-4">
            <TouchableOpacity
              onPress={() => closeModal()}
              className="border-2 border-primary w-[70%] h-[60px] items-center justify-center rounded-full"
              style={{width: '50%'}}>
              <Text
                className="text-center text-[21px] text-primary font-Nunito-Regular"
                style={{fontWeight: '700'}}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOkayButton()}
              className=" bg-primary border border-primary h-[60px] items-center justify-center  rounded-full"
              style={{width: '50%'}}>
              <Text
                className="text-center text-[21px] text-white font-Nunito-Regular"
                style={{fontWeight: '700'}}>
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal> */}
    </>
  );
};

export default SelectTeleVeterinarianServices;
