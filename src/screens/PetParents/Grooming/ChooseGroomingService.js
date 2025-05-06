import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import screens from '../../../constants/screens';
const ChooseGroomingService = ({navigation}) => {
  const standardGroomingData = [
    {
      id: 1,
      image: images.freshClean,
      heading: 'Fresh & Clean',
      sub_heading: 'Up to 60 minutes',
      text: 'More Details',
      price: '1,200.00',
    },
    {
      id: 2,
      image: images.primeCut,
      heading: 'Prime Cut',
      sub_heading: 'Approximately 90-120 minutes',
      text: 'More Details',
      price: '1,500.00',
    },
    {
      id: 3,
      image: images.layer_2,
      heading: 'Luxe Pamper',
      sub_heading: 'Approximately 90-120 minutes',
      text: 'More Details',
      price: '1,800.00',
    },
  ];
  const specialGroomingData = [
    {
      id: 1,
      image: images.dryBath,
      heading: 'Essential Care',
      bottomheading: '(Dry Bath)',
      sub_heading: 'Up to 60 minutes',
      text: 'More Details',
      price: '2,100.00',
    },
    {
      id: 2,
      image: images.bathingPersonDog,
      heading: 'Medicated Care',
      bottomheading: '(Tick & Flea Treatment)',
      sub_heading: 'Up to 60 minutes',
      text: 'More Details',
      price: '2,500.00',
    },
  ];
  const bottomSheetRef = useRef(null);

  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6 ">
          <ScrollView>
            <Text
              className="text-[24px] mt-[10px] font-Nunito-Regular text-[#333333]"
              style={{fontWeight: '700'}}>
              Choose a service for Max
            </Text>

            <Text
              className="text-[16px] font-Nunito-Regular text-[#333333] mt-[20px] mb-[10px] "
              style={{fontWeight: '500'}}>
              Standard Grooming
            </Text>
            <View style={styles.box}>
              <FlatList
                data={standardGroomingData}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View className="py-5 flex flex-row items-center justify-between gap-4 mb-4 bg-[#F2F6F733] border border-[#848A9A33] rounded-[20px]">
                    <Image source={item.image} style={styles.image} />
                    <View style={styles.textContent}>
                      <Text
                        className="text-[24px] text-[#333333] font-Nunito-Regular"
                        style={{fontWeight: '700'}}>
                        {item.heading}
                      </Text>
                      <Text
                        className="text-[14px] text-[#838999] font-Nunito-Regular"
                        style={{fontWeight: '400'}}>
                        {item.sub_heading}
                      </Text>
                      <TouchableOpacity onPress={openModal}>
                        <Text
                          className="text-[16px] font-Nunito-Regular text-[#D75880] underline mt-[7px]"
                          style={{fontWeight: '600'}}>
                          {item.text}
                        </Text>
                      </TouchableOpacity>
                      <View className="flex flex-row items-center mt-3">
                        <Text
                          className="text-[18px] font-Nunito-Regular"
                          style={{fontWeight: 600}}>
                          ₹{item.price}{' '}
                        </Text>
                        <Text className="text-[13px] font-Nunito-Regular text-[#838999]">
                          onwards
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
            <Text
              className="text-[16px] font-Nunito-Regular text-[#333333] mt-[20px] mb-[20px] "
              style={{fontWeight: '500'}}>
              Special Grooming
            </Text>
            <View style={styles.box} className="mb-[150px]">
              <FlatList
                data={specialGroomingData}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View className="py-5 flex flex-row items-center justify-between gap-4 mb-4 bg-[#F2F6F733] border border-[#848A9A33] rounded-[20px]">
                    <Image source={item.image} style={styles.image} />
                    <View style={styles.textContent}>
                      <Text
                        className="text-[24px] text-[#333333] font-Nunito-Regular"
                        style={{fontWeight: '700'}}>
                        {item.heading}
                      </Text>
                      <Text
                        className="text-[15px] text-[#838999] font-Nunito-Regular"
                        style={{fontWeight: '400'}}>
                        {item.bottomheading}
                      </Text>
                      <Text
                        className="text-[14px] text-[#838999] font-Nunito-Regular"
                        style={{fontWeight: '400'}}>
                        {item.sub_heading}
                      </Text>
                      <TouchableOpacity onPress={openModal}>
                        <Text
                          className="text-[16px] font-Nunito-Regular text-[#D75880] underline mt-[7px]"
                          style={{fontWeight: '600'}}>
                          {item.text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </ScrollView>

          <FooterBtn
            title="Continue"
            onClick={() => navigation.navigate(screens.SelectGroomer)}
          />
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['80%']}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <Text
            className="text-[20px] font-Nunito-Regular ml-[15px] mt-3 "
            style={{fontWeight: '700'}}>
            Fresh & Clean
          </Text>
          <Text className="text-[12px] ml-[15px] text-[#838999]">
            Up to 60 minutes
          </Text>
          <Text className="text-[15px] mt-[9px] ml-[15px] text-[#333333]">
            Basic Grooming Service
          </Text>
          <View className="flex p-4 bg-[#white] rounded-t-2xl justify-center items-center">
            <View className=" flex flex-col gap-[5px] justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-4 mt-4">
              <View className="flex flex-row">
                <Text
                  className="font-Nunito-Regular text-[15px] text-[#000000]"
                  style={{fontWeight: '600'}}>
                  Core Service: Full Body Brushing, Shampoo & Conditioning,
                  Underbelly & Paw Cleaning, Nail Clipping, Ear Cleaning, Dental
                  Care
                </Text>
              </View>
              <Text className="mt-[6px]">
                Ideal For: Breeds with short hair or pets that need only basic
                grooming to keep clean
              </Text>
              <Text className="text-[14px] text-[#838999] mt-[20px]">
                Note: Service durations are only an estimate and may vary
                depending on the pet breed
              </Text>
            </View>
            <TouchableOpacity
              className="bg-primary w-[100%] flex items-center justify-center py-[15px] rounded-full mt-[30px]"
              onPress={closeModal}>
              <Text
                className="text-[21px] font-Nunito-Regular text-white"
                style={{fontWeight: '700'}}>
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default ChooseGroomingService;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  box: {
    // backgroundColor: '#fff',
    // borderRadius: 12,
    // padding: 12,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 4,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  image: {
    width: 80,
    height: 83,
    borderRadius: 12,
    marginRight: 12,
    left: 10,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333333',
  },
  subtitle: {
    color: '#666',
    marginBottom: 4,
  },
  description: {
    color: '#999',
  },
});
