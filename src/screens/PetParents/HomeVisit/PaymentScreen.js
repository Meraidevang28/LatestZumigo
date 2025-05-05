import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Switch,
} from 'react-native';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import FastImage from 'react-native-fast-image';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import screens from '../../../constants/screens';
const PaymentScreen = ({navigation}) => {
  const paymentSuccessbottomSheet = useRef(null);
  const paymentSuccesssnapPoints = useMemo(() => ['100%'], []);
  const openpaymentSuccessBottomSheet = useCallback(() => {
    paymentSuccessbottomSheet.current?.present();
  });
  const closepaymentSuccessBottomSheet = useCallback(() => {
    paymentSuccessbottomSheet.current?.dismiss();
  });
  const handleContinue = () => {
    openpaymentSuccessBottomSheet();
  };
  const doctors = [
    {
      id: '1',
      name: 'Dr. Manisha Jain',
      degree: 'Master Of Veterinary Science',
      rating: '4.4/5',
      reviews: 314,
      image: images.VetImage2,
    },
  ];
  const [accepted, setAccepted] = useState(true);
  const handleBackToHome = () => {
    navigation.navigate(screens.Dashboard);
    closepaymentSuccessBottomSheet();
  };
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white">
          <Image
            source={images.ZumigoLogo}
            style={{width: '60%', height: 64}}
            className="mt-8 ml-3"
          />
          <View className="bg-[#FFEDF966] w-[80%] px-6 mt-4 py-4 ml-4 rounded-[20px]">
            <View className="flex flex-row items-center gap-4">
              <Image
                source={images.paymentIcon}
                style={{width: 16, height: 17, resizeMode: 'contain'}}
              />
              <Text
                className="text-[14px] font-Nunito-Regular "
                style={{fontWeight: 400}}>
                Payment gateway Trusted Business
              </Text>
            </View>
          </View>
        </View>
        <FooterBtn
          title="Continue"
          onClick={() => {
            handleContinue();
          }}
        />
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={paymentSuccessbottomSheet}
        snapPoints={paymentSuccesssnapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="p-3">
            <View className="flex items-center rounded-full">
              <FastImage
                source={require('../../../assets/images/DummyImages/paymentSuccessGIF.gif')}
                style={{
                  width: 145,
                  height: 165,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  // backgroundColor: 'black',
                  borderRadius: '100%',
                }}
              />
            </View>
            <View className="flex flex-row items-center justify-center">
              <FastImage
                source={require('../../../assets/images/DummyImages/RightGIF.gif')}
                style={{width: 60, height: 60, resizeMode: 'contain'}}
              />
              <Text
                className="text-[24px] font-Nunito-Regular"
                style={{fontWeight: 700}}>
                Payment Successful!
              </Text>
            </View>
            <View className="bg-[#F2F6F733] border border-[#848A9A33] rounded-[10px] py-3 px-3 mb-5">
              <View className="flex flex-row items-center justify-between ">
                <View className="flex flex-row items-center gap-2">
                  <Image
                    source={images.stethoscope}
                    style={{width: 18, height: 18}}
                  />
                  <Text
                    className="text-[15px] font-Nunito-Regular"
                    style={{fontWeight: 400}}>
                    Teleconsultation
                  </Text>
                </View>
                <Text
                  className="text-[16px] font-Nunito-Regular"
                  style={{fontWeight: 700}}>
                  Consultation
                </Text>
              </View>
              <View className="bg-[#848A9A33] w-full h-[0.6px] mt-3"></View>
              <View className="flex flex-row items-center justify-between mt-3">
                <View className="flex flex-row items-center gap-2">
                  <Image
                    source={images.calendar_month}
                    style={{width: 18, height: 18}}
                  />
                  <Text
                    className="text-[15px] font-Nunito-Regular"
                    style={{fontWeight: 400}}>
                    Date
                  </Text>
                </View>
                <Text
                  className="text-[16px] font-Nunito-Regular"
                  style={{fontWeight: 700}}>
                  24 April 2025
                </Text>
              </View>
              <View className="bg-[#848A9A33] w-full h-[0.6px] mt-3"></View>
              <View className="flex flex-row items-center justify-between mt-3">
                <View className="flex flex-row items-center gap-2">
                  <Image
                    source={images.alarm}
                    style={{width: 18, height: 18}}
                  />
                  <Text
                    className="text-[15px] font-Nunito-Regular"
                    style={{fontWeight: 400}}>
                    Time
                  </Text>
                </View>
                <Text
                  className="text-[16px] font-Nunito-Regular"
                  style={{fontWeight: 700}}>
                  09:00 AM
                </Text>
              </View>
              <View className="bg-[#848A9A33] w-full h-[0.6px] mt-3"></View>
              <FlatList
                data={doctors}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View className="mt-3 flex flex-row gap-3 ">
                    <Image
                      source={item.image}
                      style={{width: 90, height: 90, resizeMode: 'contain'}}
                    />
                    <View className="flex flex-col">
                      <Text
                        className="text-[20px] font-Nunito-Regular"
                        style={{fontWeight: 700}}>
                        {item.name}
                      </Text>
                      <Text
                        className="text-[14px] text-[#838999] font-Nunito-Regular"
                        style={{fontWeight: 500}}>
                        {item.degree}
                      </Text>
                      <View className="flex flex-row items-center ">
                        <Image
                          source={images.star}
                          style={{
                            width: 24,
                            height: 23,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text
                          className="text-[16px] text-primary ml-2 mt-2 font-Nunito-Regular"
                          style={{fontWeight: 700}}>
                          {item.rating}
                        </Text>
                        <Text className="text-[#838999] ml-2 mt-2">
                          ({item.reviews} Review)
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
              <View className="bg-[#848A9A33] w-full h-[0.6px] mt-3"></View>
              <View className="flex-row items-center mt-[30px] mb-[20px] gap-[13px]">
                <Switch
                  trackColor={{false: '#E7ECF7', true: '#d75880'}}
                  thumbColor={true ? '#fff' : '#fff'}
                  value={accepted}
                  onValueChange={() => setAccepted(!accepted)}
                />
                <Text
                  className="text-[15px] leading-[22px] font-Figtree-Regular"
                  style={{fontWeight: 400}}>
                  Whatsapp Notifications
                </Text>
              </View>
            </View>
          </View>
        </BottomSheetView>
        <FooterBtn title="Back to Home" onClick={() => handleBackToHome()} />
      </BottomSheetModal>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
