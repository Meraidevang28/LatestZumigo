import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import React from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import images from '../../../assets/images';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
const RadiologistServiceSelection = ({navigation}) => {
  const data = [
    {
      id: 1,
      image: images.ChestLightgreenxray,
      title: 'Chest X-Rays',
      footer: 'More Details',
    },
    {
      id: 2,
      image: images.Abdominalxraylightgreen1,
      title: 'Abdominal X-Rays',
      footer: 'More Details',
    },
    {
      id: 3,
      image: images.OrthopedicXraysdarkgreen1,
      title: 'Orthopaedic X-Rays',
      footer: 'More Details',
    },
    {
      id: 4,
      image: images.dentalxray,
      title: 'Dental X-Rays',
      footer: 'More Details',
    },
  ];
  const bottomSheetRef = useRef(null);

  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);
  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <View className="mt-[15px] mb-2">
            <RegistrationProgressBar screenNo={3} n={6} />
          </View>
          <ScrollView>
            <Text
              className="text-[24px] mt-[10px] text-[#3333333] font-Nunito-Regular"
              style={{fontWeight: '700'}}>
              Select Your Services
            </Text>
            <Text
              className="text-[16px] font-Nunito-Regular text-[#838999]"
              style={{fontWeight: '500'}}>
              You can choose multiple services
            </Text>
            <View className="mb-[200px]">
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => setSelectedId(item.id)}
                    className={`py-5 mt-[10px] flex flex-row items-center justify-between gap-4 mb-4 border border-[#848A9A33] rounded-[20px] ${
                      selectedId === item.id
                        ? 'bg-[#FFEDF966] border border-pastelPrimary'
                        : 'bg-[#F2F6F733]'
                    }`}>
                    <View className="flex items-center justify-center">
                      <Image source={item.image} style={styles.image} />
                    </View>
                    <View style={styles.textContent}>
                      <Text
                        className="text-[22px] text-[#333333] font-Nunito-Regular"
                        style={{fontWeight: '700'}}>
                        {item.title}
                      </Text>

                      <View className="flex-row items-center justify-between">
                        <TouchableOpacity onPress={openModal}>
                          <Text
                            className="text-[16px] font-Nunito-Regular text-[#D75880] underline mt-[7px]"
                            style={{fontWeight: '600'}}>
                            {item.footer}
                          </Text>
                        </TouchableOpacity>

                        {selectedId === item.id && (
                          <Image
                            source={images.footPrint} // Adjust the path as needed
                            style={{width: 22, height: 22}}
                            className="right-4 top-2"
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
        </View>
        <FooterBtn
          title="Continue"
          onClick={() => navigation.navigate(screens.RadiologistCommercial)}
        />
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
            Chest X-Rays
          </Text>

          <View className="flex p-4 bg-[#white] rounded-t-2xl justify-center items-center">
            <View className=" flex flex-col gap-[5px] justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-4 mt-4">
              <View className="flex flex-row">
                <Text
                  className="font-Nunito-Regular text-[15px] text-[#000000]"
                  style={{fontWeight: '600'}}>
                  A chest X-Ray may be recommended for a pet with a respiratory
                  illness or breathing issue, as well as to evaluate the heart
                  or lungs to aid in disease diagnosis.
                </Text>
              </View>

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

export default RadiologistServiceSelection;

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
    width: 70,
    height: 63,
    borderRadius: 12,
    marginRight: 15,
    left: 10,
    padding: 10,
    resizeMode: 'contain',
    // backgroundColor: 'black',
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
