import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
// import React from 'react';
import screens from '../../../constants/screens';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import React, {useRef, useState, useCallback} from 'react';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
const VeterinarianTeleInfo = ({navigation}) => {
  const bottomSheetRef = useRef(null);

  const openModal = useCallback(() => {
    navigation.navigate(screens.SelectDateTimeTeleConsultation);
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);
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
        <View className="flex-1 px-6  bg-white">
          <ScrollView>
            {/* doctor info  */}

            <View className="flex flex-row gap-[15px] pt-5">
              <Image
                source={images.VetImage}
                className="h-[100px] w-[100px] rounded-[10px]"
              />
              <View>
                <Text className="text-[18px] font-bold mb-[9px]  leading-none font-Nunito-Bold">
                  Dr. Jeevan Kumar
                </Text>
                <Text className="text-[16px] font-medium mb-[10px] opacity-50 font-Nunito-Regular ">
                  Master of veterinary science
                </Text>
                <Text className="text-[14px] font-normal mb-[9px] opacity-50 font-Nunito-Regular">
                  Lorum ipsum
                </Text>
                <Text className="text-[12px] font-normal text-gray-400 font-Nunito-Regular">
                  Known Languages:
                  <Text className="text-darkGunmetal">
                    Telugu, Hindi, English
                  </Text>
                </Text>
              </View>
            </View>

            {/* info cards  */}
            <View className="flex flex-row gap-[10px] w-full mt-5 mb-10">
              <View className=" py-[14px] bg-[#EFE8F9] flex-1 items-center rounded-2xl">
                <Image
                  source={images.vetInfoCatDog}
                  className="h-[30px] w-[35px] mb-[9px]"
                />
                <Text
                  className="text-[14px] text-darkGunmetal font-Nunito-Regular"
                  style={{fontWeight: '700'}}>
                  1200+
                </Text>
                <Text className="text-[14px] text-[#838999] font-Nunito-Regular">
                  Patients
                </Text>
              </View>
              <View className=" py-[14px] bg-[#EFE8F9] flex-1 items-center rounded-2xl">
                <Image
                  source={images.starShadow}
                  className="h-[29px] w-[29px] mb-[9px]"
                />
                <Text
                  className="text-[14px] text-darkGunmetal  font-Nunito-Regular"
                  style={{fontWeight: '700'}}>
                  4.8/5
                </Text>
                <Text className="text-[14px] text-[#838999] font-Nunito-Regular">
                  Rating
                </Text>
              </View>
              <View className=" py-[14px] bg-[#EFE8F9] flex-1 items-center rounded-2xl">
                <Image
                  source={images.vetInfoThreeStar}
                  className="h-[35px] w-[35px] mb-[9px]"
                />
                <Text
                  className="text-[14px]  text-darkGunmetal  font-Nunito-Regular"
                  style={{fontWeight: '700'}}>
                  10 Years
                </Text>
                <Text className="text-[14px] text-[#838999] font-Nunito-Regular">
                  Experience
                </Text>
              </View>
            </View>

            {/* About Veterinarian  */}
            <Text
              className="text-[18px] mb-[13px] font-Nunito-Regular text-[#333333]"
              style={{fontWeight: '600'}}>
              About Veterinarian
            </Text>
            <Text className="text-[14px] text-[#838999] font-Nunito-Regular mb-10">
              Phasellus dapibus efficitur aliquam. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Nulla facilisi. Nullam dictum nibh a ultrices porttitor.{' '}
              <Text className=" text-primary">Read more</Text>
            </Text>
            <Text
              className="text-[18px] mb-[13px] font-Nunito-Regular text-[#333333]"
              style={{fontWeight: '600'}}>
              Zumigo Reviews
            </Text>
            <View className="flex flex-row items-center gap-2">
              <View className="bg-[#FBA537] h-[33px] aspect-square rounded-full justify-center items-center  ">
                <Text className="text-white text-[15px] font-Nunito-Regular">
                  JS
                </Text>
              </View>
              <Text className="text-[15px] font-Nunito-Bold">Jone Smith</Text>
            </View>
            <View className="flex-row items-center gap-[4.2]">
              <View className="gap-[3px] flex-row">
                {[1, 2, 3, 4, 5].map(index => {
                  return (
                    <Image
                      source={images.star}
                      className="w-[10px] h-[10px]"
                      key={index}
                    />
                  );
                })}
              </View>
              <Text className="my-[5px] text-[10px] font-normal text-black opacity-50 font-Nunito-Regular">
                3 days ago
              </Text>
            </View>
            <Text className="text-[#797A7B] font-Nunito-Regular mb-5">
              Phasellus dapibus efficitur aliquam. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Nulla facilisi. Nullam dictum nibh a ultrices porttitor.
              <Text className=" text-primary text-[12px] font-Nunito-Regular">
                Read more
              </Text>
            </Text>
            <View className="flex flex-row items-center gap-2">
              <View className="bg-[#FBA537] h-[33px] aspect-square rounded-full justify-center items-center  ">
                <Text className="text-white text-[15px] font-Nunito-Regular">
                  MP
                </Text>
              </View>
              <Text className="text-[15px] font-Nunito-Bold">
                Martin Philips
              </Text>
            </View>
            <View className="flex-row items-center gap-[4.2]">
              <View className="gap-[3px] flex-row">
                {[1, 2, 3, 4, 5].map(index => {
                  return (
                    <Image
                      source={images.star}
                      className="w-[10px] h-[10px]"
                      key={index}
                    />
                  );
                })}
              </View>
              <Text className="my-[5px] text-[10px] font-normal text-black opacity-50 font-Nunito-Regular">
                5 days ago
              </Text>
            </View>
            <Text className="text-[#797A7B] font-Nunito-Regular mb-5">
              Phasellus dapibus efficitur aliquam. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Nulla facilisi. Nullam dictum nibh a ultrices porttitor.
              <Text className=" text-primary text-[12px] font-Nunito-Regular">
                Read more
              </Text>
            </Text>

            {/* <Text className=" underline text-center">View all reviews</Text>
      <FooterBtn
        title="Book Appointment"
        onClick={() => navigation.navigate(screens.SelectDateTime)}
      /> */}
            <View className="mb-[150px]">
              <Text className="text-center underline text-primary text-[16px]">
                View all reviews
              </Text>
            </View>
          </ScrollView>
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

export default VeterinarianTeleInfo;
