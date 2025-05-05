import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import images from '../../../assets/images';
import {primary} from '../../../assets/theme/colors';
import FooterBtn from '../../../components/shared/FooterBtn';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import screens from '../../../constants/screens';
const PreviewProceedPaymentGroomer = ({navigation}) => {
  const petDetails = [
    {
      id: 1,
      image: images.TeleImage,
      petName: 'MAX',
      petBreed: 'German Shepherd',
      petGender: 'Male',
      petAge: 'Age 5yrs',
      petWeight: '30kg',
    },
  ];
  const [couponCode, setCouponCode] = useState('');
  const [accepted, setAccepted] = useState(false);

  const petDetailsbottomSheetRef = useRef(null);
  const petDetailssnapPoints = useMemo(() => ['60%'], []);
  const openpetDetailsBottomSheet = useCallback(() => {
    petDetailsbottomSheetRef.current?.present();
  });
  const closepetDetailsBottomSheet = useCallback(() => {
    petDetailsbottomSheetRef.current?.dismiss();
  });

  const petServiceDetailsbottomSheetRef = useRef(null);
  const petServicesnapPoints = useMemo(() => ['60%'], []);
  const openpetServiceBottomSheet = useCallback(() => {
    petServiceDetailsbottomSheetRef.current?.present();
  });
  const closepetServiceBottomSheet = useCallback(() => {
    petServiceDetailsbottomSheetRef.current?.dismiss();
  });

  const editBtnPressed = () => {
    navigation.navigate(screens.SelectDateTimeGroomer);
  };
  const proceedToPayment = () => {
    navigation.navigate(screens.PaymentScreen);
  };
  const termsConditionbottomSheet = useRef(null);
  const termsConditionsnapPoints = useMemo(() => ['60%'], []);
  const openTermsConditionBottomSheet = useCallback(() => {
    termsConditionbottomSheet.current?.present();
  });
  const closeTermsConditionBottomSheet = useCallback(() => {
    termsConditionbottomSheet.current?.dismiss();
  });
  const [applied, setApplied] = useState(false);
  const handleToggleCoupon = () => {
    setApplied(prev => !prev);
  };
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <ScrollView>
            <Text
              className="text-[23px] font-Nunito-Regular "
              style={{fontWeight: '700'}}>
              Preview and Proceed Payment
            </Text>
            <View className="bg-[#F2F6F733] border border-[#848A9A33] mt-5 rounded-2xl">
              <View className="flex flex-row px-3 py-5  gap-3">
                <View>
                  <Image
                    source={require('../../../assets/images/DummyImages/groomer1.png')}
                    style={{width: 90, height: 90, resizeMode: 'contain'}}
                  />
                </View>
                <View className="flex flex-col">
                  <Text className="text-[20px] font-PTSans-Bold">Pet Folk</Text>
                  <Text
                    className="text-[14px] text-[#838999] mt-1 font-Nunito-Regular"
                    style={{fontWeight: '400'}}>
                    Grooming Services
                  </Text>
                  <View className="flex flex-row mt-2 items-center">
                    <Image
                      source={images.star}
                      style={{width: 24, height: 23}}
                    />
                    <Text
                      className="text-[16px] text-primary mt-2 ml-2 font-Nunito-Regular"
                      style={{fontWeight: '700'}}>
                      4.5/5
                    </Text>
                    <Text
                      className="text-[14px] font-Nunito-Regular mt-2 ml-2 text-[#838999]"
                      style={{fontWeight: '500'}}>
                      (314 Review)
                    </Text>
                  </View>
                </View>
              </View>
              <Text className="w-full h-[0.5px] px-4 ml-3 bg-[#e8e9eb] mb-[15.5px]"></Text>
              <View className="flex flex-row items-center justify-between px-2 mb-3">
                <View className="flex flex-row items-center gap-2">
                  <Image
                    source={images.calender2}
                    style={{width: 20, height: 18}}
                  />
                  <Text
                    className="text-[13px] text-[#333333] "
                    style={{fontFamily: 'Nunito-Regular', fontWeight: '600'}}>
                    Wednesday, 24, April, 2024 | 8:00 AM
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => editBtnPressed()}
                  className="border-2 border-primary items-center justify-center rounded-full px-3 py-1">
                  <Text
                    className="text-primary font-Nunito-Regular text-[14px]"
                    style={{fontWeight: '700'}}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text
              className="text-[21px] mt-5 font-Nunito-Regular mb-3"
              style={{fontWeight: '500'}}>
              Pet Details
            </Text>
            <FlatList
              data={petDetails}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  className="bg-[#F2F6F733] rounded-[10px] border border-[#848A9A33]  py-3"
                  // onPress={() => openpetDetailsBottomSheet()}
                >
                  <View className="flex flex-row items-center justify-around">
                    <Image
                      source={item.image}
                      className="rounded-[20px]"
                      style={{width: 50, height: 50}}
                    />
                    <View className="flex flex-col">
                      <View className="flex flex-row items-center">
                        <Text
                          className="text-[16px] font-Nunito-Regular"
                          style={{fontWeight: '700'}}>
                          {item.petName}
                        </Text>
                        <Text
                          className="text-[15px] font-Nunito-Regular ml-2"
                          style={{fontWeight: '400', lineHeight: 26}}>
                          {item.petBreed}
                        </Text>
                      </View>
                      <View className="flex flex-row items-center">
                        <Text
                          className="text-[16px] text-[#BBBCB7] font-Nunito-Regular"
                          style={{fontWeight: '600'}}>
                          {item.petGender} |{' '}
                        </Text>
                        <Text
                          className="text-[16px] text-[#BBBCB7] font-Nunito-Regular"
                          style={{fontWeight: '600'}}>
                          {item.petAge} |{' '}
                        </Text>
                        <Text
                          className="text-[16px] text-[#BBBCB7] font-Nunito-Regular"
                          style={{fontWeight: '600'}}>
                          {item.petWeight}
                        </Text>
                      </View>
                    </View>
                    <Image
                      source={images.rightIcon}
                      style={{width: 10, height: 12}}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => {
                openpetServiceBottomSheet();
              }}
              className="bg-[#F2F6F733] border border-[#848A9A33] mt-4 py-4 h-[56px]  px-3 rounded-[10px]">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-3">
                  <Image
                    source={images.services}
                    style={{width: 18, height: 19}}
                  />
                  <Text
                    className="text-[18px] font-Nunito-Bold"
                    style={{fontWeight: '600'}}>
                    Service Details
                  </Text>
                </View>
                <Image
                  source={images.rightIcon}
                  style={{width: 10, height: 12}}
                />
              </View>
            </TouchableOpacity>

            <View className="bg-[#F2F6F733] border border-[#848A9A33] rounded-[10px] h-20 mt-5 px-1">
              <View className="flex flex-col mt-3">
                <View className="flex flex-row items-center justify-between ">
                  <View className="flex flex-row items-center py-1">
                    {applied ? (
                      <Image
                        source={require('../../../assets/images/DummyImages/check_circle.png')}
                        style={{width: 24, height: 24, resizeMode: 'contain'}}
                      />
                    ) : (
                      <Image
                        source={images.shoppingIcon}
                        style={{width: 24, height: 24, resizeMode: 'contain'}}
                      />
                    )}

                    <Text
                      className="text-[14px] font-Nunito-Regular ml-2"
                      style={{fontWeight: '600'}}>
                      {applied
                        ? 'You saved ₹100 with ‘ZUMIGO10’'
                        : 'Save ₹100 with ‘NEWCUSTOMER’'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={handleToggleCoupon}
                    className="border-2 border-primary items-center justify-center rounded-full px-1 py-1 ml-2">
                    <Text
                      className="text-primary font-Nunito-Regular text-[14px]"
                      style={{fontWeight: '700'}}>
                      {applied ? 'Remove' : 'Apply'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex flex-row mt-1 ml-3">
                  <TouchableOpacity
                    className="flex flex-row items-center"
                    onPress={() => {
                      navigation.navigate(screens.CouponsScreen);
                    }}>
                    <Text className="text-[#838999] px-6 text-[13px] ">
                      View all coupons
                    </Text>
                    <Image
                      source={images.rightWhite}
                      style={{
                        tintColor: '#838999',
                        height: 9,
                        width: 8,
                        left: -12,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text
              className="text-[21px] mt-5 font-Nunito-Regular "
              style={{fontWeight: '500'}}>
              Payment Summary
            </Text>
            <View className="bg-[#F2F6F733] border border-[#848A9A33] mt-4 rounded-[10px] py-5">
              <View className="flex flex-row items-center justify-between px-3">
                <Text
                  className="text-[18px] font-Nunito-Regular"
                  style={{fontWeight: '800'}}>
                  Package Amount
                </Text>
                <Text className="text-[18px] font-Nunito-Regular text-[#838999]">
                  ₹1,200.00
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between px-3 mt-4">
                <Text
                  className="text-[16px] font-Nunito-Regular text-[#838999]"
                  style={{fontWeight: '400'}}>
                  GST and other charges
                </Text>
                <Text
                  className="text-[16px] font-Nunito-Regular text-[#838999]"
                  style={{fontWeight: '400'}}>
                  ₹150
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between px-3 mt-4">
                <Text
                  className="text-[16px] font-Nunito-Regular text-[#838999]"
                  style={{fontWeight: '400'}}>
                  Add-ons Total
                </Text>
                <Text
                  className="text-[16px] font-Nunito-Regular text-[#838999]"
                  style={{fontWeight: '400'}}>
                  ₹0.00
                </Text>
              </View>
              <Text className="w-[295px] h-[0.5px] mt-3 px-3 ml-3 bg-[#e8e9eb] mb-[15.5px]"></Text>
              <View className="flex flex-row items-center justify-between px-3 mt-1">
                <Text
                  className="text-[16px] font-Nunito-Regular text-[#333333]"
                  style={{fontWeight: '700'}}>
                  Total
                </Text>
                <Text
                  className="text-[16px] font-Nunito-Regular text-[#333333]"
                  style={{fontWeight: '700'}}>
                  ₹1,350.00
                </Text>
              </View>
            </View>
            <Text
              className="text-[21px] mt-5 font-Nunito-Regular mb-3"
              style={{fontWeight: '500'}}>
              Address
            </Text>
            <View className="bg-[#F2F6F733] border border-[#848A9A33] px-3 py-4 rounded-[10px]">
              <View className="flex flex-row items-center justify-between">
                {/* <View className="flex flex-row items-center gap-4"> */}
                <View className="flex flex-row items-center gap-2">
                  <Image
                    source={images.address2}
                    style={{width: 18, height: 22}}
                  />
                  <Text
                    className="text-[16px] font-Nunito-Bold"
                    style={{fontWeight: 600}}>
                    Home
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate(screens.GroomingAddress)}
                  className="border-2 border-primary items-center justify-center rounded-full px-3 py-1">
                  <Text
                    className="text-primary font-Nunito-Regular text-[14px]"
                    style={{fontWeight: '700'}}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
              {/* </View> */}
              <Text
                className="text-[15px] text-[#838999] font-Nunito-Regular mt-3"
                style={{lineHeight: 23}}>
                Park View Estate, Road No. 2, Banjara Hills, Hyderabad,
                Telangana 500034, India
              </Text>
            </View>
            {/* <View className="bg-[#F2F6F733] border border-[#848A9A33] px-3 py-4 rounded-[10px] mt-5 ">
              <View className="flex flex-col">
                <View className="flex flex-row items-center gap-2">
                  <Image
                    source={images.disclaimerIcon}
                    style={{width: 24, height: 24, resizeMode: 'contain'}}
                  />
                  <Text
                    className="text-[16px] text-[#333333] font-Nunito-Regular"
                    style={{fontWeight: '600'}}>
                    Disclaimer
                  </Text>
                </View>
                <Text
                  className="text-[15px] text-[#838999] font-Nunito-Regular mt-2 "
                  style={{lineHeight: 23}}>
                  If your pet is having an emergency, such as excessive vomiting
                  or diarrhea, traumatic injury, difficulty breathing, please
                  contact your local veterinary emergency hospital.{' '}
                </Text>
              </View>
            </View> */}
            <View className="flex-row items-center mt-[30px] mb-[120px] gap-[13px]">
              <Switch
                trackColor={{false: '#E7ECF7', true: '#d75880'}}
                thumbColor={true ? '#fff' : '#fff'}
                value={accepted}
                onValueChange={() => setAccepted(!accepted)}
              />
              <View className="flex flex-row items-center">
                <Text
                  className="text-[15px] leading-[22px] font-Nunito-Regular"
                  style={{fontWeight: '400'}}>
                  I Accept the{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => openTermsConditionBottomSheet()}>
                  <Text
                    style={{color: primary, fontWeight: '400'}}
                    className="underline">
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <FooterBtn
            title="Proceed to Payment"
            onClick={() => {
              proceedToPayment();
            }}
          />
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={petDetailsbottomSheetRef}
        snapPoints={petDetailssnapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView style={{flex: 1}}>
          <View style={{flex: 1}}>
            {/* Scrollable Content */}
            <ScrollView
              contentContainerStyle={{paddingBottom: 100}}
              showsVerticalScrollIndicator={false}>
              <View className="p-3">
                <Text
                  className="text-[21px] mt-3 font-Nunito-Regular"
                  style={{fontWeight: 700}}>
                  Pet Details
                </Text>

                <View className="bg-[#F2F6F733] border border-[#848A9A33] mt-4 rounded-[10px] px-3 py-3">
                  <Text
                    className="text-[18px] font-Nunito-Regular"
                    style={{fontWeight: '700'}}>
                    Symptoms
                  </Text>

                  <View className="flex flex-row items-center justify-between gap-1">
                    <Text className="text-[#838999]">
                      Change in Appetite, Change in Activity Level
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        closepetDetailsBottomSheet();
                        navigation.navigate(screens.SelectSymptoms);
                      }}
                      className="border-2 border-primary items-center justify-center rounded-full px-3 py-1">
                      <Text
                        className="text-primary font-Nunito-Regular text-[14px]"
                        style={{fontWeight: '700'}}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="w-full h-[0.8px] bg-[#848A9A33] mt-3" />

                  <Text
                    className="text-[16px] mt-2 font-Nunito-Regular"
                    style={{fontWeight: 700}}>
                    Pet Images
                  </Text>

                  <View className="flex flex-row items-center mt-4 gap-4">
                    <Image
                      source={images.petDetailsImage}
                      style={{width: 91, height: 91}}
                    />
                    <Image
                      source={images.petDetailsImage}
                      style={{width: 91, height: 91}}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Fixed Footer */}
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                left: 0,
                right: 0,
                paddingHorizontal: 20,
              }}>
              <FooterBtn
                title="Okay"
                onClick={() => {
                  closepetDetailsBottomSheet();
                }}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      {/* <BottomSheetModal
        ref={petServiceDetailsbottomSheetRef}
        snapPoints={petServicesnapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View>
            <View className="p-3">
              <View className="bg-[#F2F6F733] border border-[#848A9A33] mt-4 rounded-[10px] px-3 py-3">
                <Text
                  className="text-[18px] font-Nunito-Regular"
                  style={{fontWeight: 700}}>
                  Package
                </Text>
                <View className="flex flex-row items-center justify-between mt-2">
                  <Text
                    className="text-[#838999] font-Nunito-Regular"
                    style={{fontWeight: 400}}>
                    Luxe Pamper
                  </Text>
                  <Text
                    className="text-[#838999] font-Nunito-Regular"
                    style={{fontWeight: 400}}>
                    ₹7,499.00
                  </Text>
                </View>

                <View className="w-full h-[0.6px] bg-[#838999] mt-2"></View>

                <Text
                  className="mt-2 text-[16px] text-[#333333] font-Nunito-Regular"
                  style={{fontWeight: 700}}>
                  Details
                </Text>
                <Text
                  className="mt-3 text-[#838999] font-Nunito-Regular"
                  style={{fontWeight: 400}}>
                  Deshedding, Combing and Brushing, Nail Clipping, Ear Cleaning,
                  Dental Care, Changes in breathing pattern.
                </Text>
                <Text
                  className=" mt-2 text-[#838999] font-Nunito-Regular"
                  style={{fontWeight: 400}}>
                  Note: Service durations are only an estimate and may vary
                  depending on the pet breed
                </Text>
              </View>
            </View>
            <FooterBtn
              title="Okay"
              onClick={() => {
                closepetServiceBottomSheet();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal> */}
      <BottomSheetModal
        ref={petServiceDetailsbottomSheetRef}
        snapPoints={petServicesnapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView style={{flex: 1}}>
          <View style={{flex: 1}}>
            {/* Scrollable content */}
            <ScrollView
              contentContainerStyle={{paddingBottom: 100}} // give space for footer
              showsVerticalScrollIndicator={false}>
              <View className="p-3">
                <View className="bg-[#F2F6F733] border border-[#848A9A33] mt-4 rounded-[10px] px-3 py-3">
                  <Text
                    className="text-[18px] font-Nunito-Regular"
                    style={{fontWeight: 700}}>
                    Package
                  </Text>
                  <View className="flex flex-row items-center justify-between mt-2">
                    <Text
                      className="text-[#838999] font-Nunito-Regular"
                      style={{fontWeight: 400}}>
                      Luxe Pamper
                    </Text>
                    <Text
                      className="text-[#838999] font-Nunito-Regular"
                      style={{fontWeight: 400}}>
                      ₹7,499.00
                    </Text>
                  </View>

                  <View className="w-full h-[0.6px] bg-[#838999] mt-2" />

                  <Text
                    className="mt-2 text-[16px] text-[#333333] font-Nunito-Regular"
                    style={{fontWeight: 700}}>
                    Details
                  </Text>
                  <Text
                    className="mt-3 text-[#838999] font-Nunito-Regular"
                    style={{fontWeight: 400}}>
                    Deshedding, Combing and Brushing, Nail Clipping, Ear
                    Cleaning, Dental Care, Changes in breathing pattern.
                  </Text>
                  <Text
                    className="mt-2 text-[#838999] font-Nunito-Regular"
                    style={{fontWeight: 400}}>
                    Note: Service durations are only an estimate and may vary
                    depending on the pet breed
                  </Text>
                </View>
              </View>
            </ScrollView>

            {/* Fixed Footer */}
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                left: 0,
                right: 0,
                paddingHorizontal: 20,
              }}>
              <FooterBtn
                title="Okay"
                onClick={() => {
                  closepetServiceBottomSheet();
                }}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={termsConditionbottomSheet}
        snapPoints={termsConditionsnapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="p-3">
            <Text
              className="text-[21px] mt-3  font-Nunito-Regular"
              style={{fontWeight: 700}}>
              Terms & Condtions
            </Text>
            <Text
              className="text-[14px] font-Nunito-Regular mt-3 text-[#838999] "
              style={{fontWeight: 400, lineHeight: 18}}>
              Fusce sit amet massa commodo, tincidunt justo at, luctus erat.
              Mauris accumsan magna nec nulla bibendum posuere. Etiam porta
              turpis sit amet risus egestas finibus. Sed efficitur tortor id
              lorem vehicula mollis. Nullam eget efficitur tellus. Ut non
              volutpat nisi. Fusce vel bibendum odio, sit amet maximus purus.
              Nam enim lectus, ultrices at nulla vel, ultrices mollis tellus.
              Morbi eget dignissim metus. Nulla interdum sem sodales lacus
              consectetur pharetra. Suspendisse potenti.Ut non volutpat nisi.
              Fusce vel bibendum odio, sit amet maximus purus. Nam enim lectus,
              ultrices at nulla vel, ultrices mollis tellus. Morbi eget
              dignissim metus. Nulla interdum sem sodales lacus consectetur
              pharetra. Suspendisse potenti.Ut non volutpat nisi. Fusce vel
              bibendum odio, sit amet maximus purus. Nam enim lectus, ultrices
              at nulla vel, ultrices mollis tellus. Morbi eget dignissim metus.
              Nulla interdum sem sodales lacus consectetur pharetra. Suspendisse
              potenti.
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default PreviewProceedPaymentGroomer;

const styles = StyleSheet.create({});
