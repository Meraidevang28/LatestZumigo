import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState, useCallback, useMemo} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import images from '../../../assets/images';
// import {FontAwesome} from '@expo/vector-icons';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../constants/screens';
import {primary} from '../../../assets/theme/colors';

const services = [
  {id: '1', name: 'Vet visit', icon: images.VetServices, price: 2000},
  {id: '2', name: 'Lab Diagnostic', icon: images.PharmacyService, price: 2000},
  {id: '3', name: 'ECG', icon: images.GroomingService, price: 2000},
  {id: '4', name: 'Radiology', icon: images.PharmacyService, price: 2000},
  {id: '5', name: 'Vaccination', icon: images.PharmacyService, price: 2000},
  {id: '6', name: 'Microchipping', icon: images.GroomingService, price: 2000},
  {
    id: '7',
    name: 'Preventive eye checkup',
    icon: images.VetServices,
    price: 2000,
  },
];

const additionalServices = [
  {id: '1', title: 'Chest X-rays', price: '₹ 1,000'},
  {id: '2', title: 'Orthopaedic X-rays', price: '₹ 1,000'},
  {id: '3', title: 'Abdominal X-rays', price: '₹ 1,000'},
  {id: '4', title: 'Dental X-rays', price: '₹ 1,000'},
];

const {width} = Dimensions.get('window');
const NUM_COLUMNS = 3;
const ITEM_SIZE = (width - 74) / NUM_COLUMNS;

const AdditionalServicesScreen = () => {
  const navigation = useNavigation();

  const [selectedServices, setSelectedServices] = useState([]);
  const [addBtn, setAddBtn] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // ✅ Correct useRef
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['96%'];

  // ✅ Ensure these functions work correctly
  const openModal = useCallback(() => {
    setIsBottomSheetOpen(true);
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.dismiss();
    setAddBtn(true);
  }, []);

  const handleSelect = id => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id],
    );
  };

  const toggleService = id => {
    setSelectedServices(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id],
    );
  };
  const getServiceNumber = id => {
    const index = selectedServices.indexOf(id);
    return index !== -1 ? index + 1 : null;
  };
  const handleContinue = () => {
    const selectedServiceNames = services
      .filter(service => selectedServices.includes(service.id))
      .map(service => service.name);

    navigation.navigate(screens.InProgressHomeVisit, {
      selectedServicesNames: selectedServiceNames,
    });
  };

  const renderItem = ({item}) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item.id)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: isSelected ? '#FFF5F5' : '#F9F9F9',
          padding: 16,
          borderRadius: 12,
          marginBottom: 10,
          borderWidth: isSelected ? 1 : 0,
          borderColor: isSelected ? '#FF6B6B' : 'transparent',
        }}>
        <>
          <View style={{flexDirection: 'column'}}>
            <View style={{marginLeft: 10}}>
              <View className="flex flex-row justify-between">
                <View className="flex flex-row gap-[15px]">
                  <Image
                    source={require('../../../assets/images/serviceDog.png')}
                    style={{tintColor: primary}}
                  />
                  <Text style={{fontSize: 17, fontFamily: 'Nunito-Bold'}}>
                    {item.title}
                  </Text>
                </View>
                {isSelected && (
                  <Image
                    source={require('../../../assets/images/footPrint.png')}
                    className="w-[20px] h-[20px] mr-[5px]"
                  />
                )}
              </View>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  marginTop: 6.2,
                  marginLeft: 31,
                  fontFamily: 'Nunito-Regular',
                  color: '#7F7F7F',
                }}>
                X-ray agency in BOM and/or vets with portable x-ray device
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Nunito-Bold',
                  fontSize: 18,
                  marginLeft: 41,
                }}>
                {item.price}
              </Text>
            </View>
          </View>
        </>
      </TouchableOpacity>
    );
  };
  const estimateBottomSheetRef = useRef(null);
  const estimateSnapPoints = useMemo(() => ['60%'], []);
  const openEstimateModal = useCallback(() => {
    estimateBottomSheetRef.current?.present();
  }, []);

  const closeEstimateModal = useCallback(() => {
    const selectedServiceNames = services
      .filter(service => selectedServices.includes(service.id))
      .map(service => service.name);

    navigation.navigate(screens.InProgressHomeVisit, {
      selectedServicesNames: selectedServiceNames,
    });

    estimateBottomSheetRef.current?.dismiss();
  }, [selectedServices, navigation]);
  const serviceBottomSheetRef = useRef(null);
  const serviceSnapPoints = ['50%'];
  const openServiceModal = useCallback(() => {
    serviceBottomSheetRef.current?.present();
  }, []);

  const closeServiceModal = useCallback(() => {
    // navigation.navigate(screens.InProgressHomeVisit2);

    serviceBottomSheetRef.current?.dismiss();
  }, []);
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <View
            className={`flex-1 bg-white  ${
              isBottomSheetOpen ? 'opacity-50' : 'opacity-100'
            }`}>
            <Text
              className="mt-1 mb-2 text-[26px] text-[#1C222F]"
              style={{fontFamily: 'PTSans-Bold'}}>
              Select your services
            </Text>
            <Text
              className="mt-1 mb-2 text-[14px] text-[#787A82]"
              style={{fontFamily: 'Proxima-Nove-Regular'}}>
              You can choose multiple services
            </Text>
            <View className="flex-row flex-wrap justify-between mt-[18px]">
              {services.map(item => {
                const isSelected = selectedServices.includes(item.id);
                const serviceNumber = getServiceNumber(item.id);
                return (
                  <View key={item.id}>
                    <TouchableOpacity
                      className={
                        isSelected
                          ? 'border border-[#e8d5db]  items-center justify-center bg-[#d75880] shadow-md-light rounded-2xl '
                          : 'bg-[#f3f6f7] items-center justify-center border border-[#e8e9eb] shadow-md-light rounded-2xl '
                      }
                      style={{width: ITEM_SIZE, height: ITEM_SIZE}}
                      onPress={() => toggleService(item.id)}>
                      <Image
                        source={item.icon}
                        className="h-[60px] w-[62px]"
                        style={{
                          tintColor: isSelected ? '#f3f6f7' : '#d75880', // White when selected, Grey when not selected
                        }}
                        resizeMode="contain"
                      />
                      {isSelected && (
                        <View className="absolute top-0 right-0 bg-pastelPrimary rounded-full w-[22px] h-[22px] flex items-center justify-center">
                          <Text className="text-black text-[12px] font-Nunito-Bold">
                            {serviceNumber}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                    <Text
                      className="text-center mt-[10px] mb-5 text-[#1C222F] text-[14px] w-[100px]"
                      style={{fontFamily: 'Figtree-SemiBold'}}>
                      {item.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </BottomSheetModalProvider>
      {/* ✅ Bottom Sheet Modal Fixed */}
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <View style={{padding: 16}}>
          <BottomSheetView>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Radiology</Text>
            <Text style={{color: 'gray', marginBottom: 16}}>
              You can choose multiple Vaccines
            </Text>
            <FlatList
              data={additionalServices}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
            <TouchableOpacity
              onPress={closeModal}
              style={{
                backgroundColor: '#d75880',
                padding: 15,
                borderRadius: 15,
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </BottomSheetView>
        </View>
      </BottomSheetModal>
      <View
        className="bg-white flex px-6 justify-center  shadow-lg shadow-gray-950 h-[100px] w-full"
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 50, height: 60}, // Adjust as needed
          shadowOpacity: 50, // Lower for subtle shadows
          shadowRadius: 10,
          elevation: 18, // Android shadow
        }}>
        {!addBtn ? (
          // <TouchableOpacity onPress={openModal}>
          //   <View className="bg-white flex px-6 justify-center h-[100px] w-full  ">
          //     <View className=" h-[60px] w-[345px] bg-primary rounded-[15px]  ">
          //       <Text className="font-Nunito-Bold mt-[18px] text-[20px] text-white text-center">
          //         Complete
          //       </Text>
          //     </View>
          //   </View>
          // </TouchableOpacity>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 50, height: 60}, // Adjust as needed
              shadowOpacity: 50, // Lower for subtle shadows
              shadowRadius: 10,
              elevation: 18, // Android shadow
            }}>
            <TouchableOpacity
              className="h-[60px] bg-primary items-center justify-center rounded-2xl"
              onPress={openModal}>
              <Text className="text-[20px] text-white font-Nunito-Bold text-center">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className=" h-[60px] bg-primary rounded-[15px] mb-[20px] ">
            <View className="flex flex-row items-center justify-between px-6 gap-[25px]">
              <TouchableOpacity onPress={openServiceModal}>
                <View className="flex flex-row mt-[20px] gap-[5px] items-center">
                  <Text className="text-white text-[14px] font-Nunito-Regular ">
                    {selectedServices.length} Services |
                  </Text>
                  <Text className="text-white text-[14px] font-Nunito-Regular">
                    ₹
                    {services
                      .filter(service => selectedServices.includes(service.id))
                      .reduce((total, service) => total + service.price, 0)}
                  </Text>
                  <Image
                    source={require('../../../assets/images/upArrow.png')}
                  />
                </View>
              </TouchableOpacity>
              <BottomSheetModal
                ref={serviceBottomSheetRef}
                index={0}
                snapPoints={serviceSnapPoints}
                backdropComponent={({style}) => (
                  <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
                )}>
                <View style={{padding: 16}}>
                  <BottomSheetView>
                    <Text className="text-[18px] font-PTSans-Bold text-[#000000]">
                      Selected services
                    </Text>
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000] mt-[30px]">
                      Radiology
                    </Text>
                    <View className="flex flex-row items-center justify-between">
                      <Text
                        style={{
                          color: 'gray',
                          marginBottom: 16,
                          marginTop: 14,
                        }}>
                        Chest X-rays
                      </Text>
                      <Text className="text-[#7f7f7f] text-[14px] font-Nunito-Regular">
                        ₹ 1,000.00
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={closeServiceModal}
                      className="bg-primary rounded-2xl mb-[50px] mt-[60px]">
                      <View className="flex flex-row items-center justify-between pt-[21px] pb-[20px] ml-[20px]">
                        <View className="flex flex-row  gap-[5px] items-center ">
                          <Text className="text-white text-[14px] font-Nunito-Regular ">
                            {selectedServices.length} Services |
                          </Text>
                          <Text className="text-white text-[14px] font-Nunito-Regular">
                            ₹
                            {services
                              .filter(service =>
                                selectedServices.includes(service.id),
                              )
                              .reduce(
                                (total, service) => total + service.price,
                                0,
                              )}
                          </Text>
                          <Image
                            source={require('../../../assets/images/downArrowIcon.png')}
                            style={{tintColor: 'white'}}
                            className="ml-[14px]"
                          />
                        </View>
                        <View className="mr-[25px]">
                          <Text className="text-[16px] text-white font-Nunito-Bold">
                            Proceed
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </BottomSheetView>
                </View>
              </BottomSheetModal>
              <TouchableOpacity onPress={openEstimateModal}>
                <Text className="font-Nunito-Bold mt-[18px] text-[20px] text-white  text-center">
                  Send Estimate
                </Text>
              </TouchableOpacity>

              <BottomSheetModal
                ref={estimateBottomSheetRef}
                index={0}
                snapPoints={estimateSnapPoints}
                backdropComponent={({style}) => (
                  <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
                )}>
                <View className="px-5 mb-[20px]">
                  <BottomSheetView>
                    <View className="flex items-center justify-center">
                      <Image
                        source={require('../../../assets/images/paymentDone.png')}
                      />
                      <Text className="text-[26px] font-PTSans-Bold text-[#000000] text-center">
                        Additional Services Payment received succesful
                      </Text>
                      <Text className=" h-[42px] text-[14px] font-Nunito-Regular text-[#000000] text-center mt-[15px]">
                        Donec in risus eget leo gravida tempor. Integer nec
                        augue erat. Ut
                      </Text>
                    </View>
                    <TouchableOpacity
                      className="bg-primary items-center justify-center h-[56px] rounded-2xl mt-[15px] mb-[20px]"
                      onPress={closeEstimateModal}>
                      <Text className="text-[20px] text-white font-Nunito-Bold text-center">
                        Done
                      </Text>
                    </TouchableOpacity>
                  </BottomSheetView>
                </View>
              </BottomSheetModal>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fixedButtonContainer: {
    // flex: 1,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    // paddingVertical: 10,
  },
  continueButton: {
    backgroundColor: '#FF5362',
    height: 60,
    width: 325,
    marginTop: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 30,
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default AdditionalServicesScreen;
