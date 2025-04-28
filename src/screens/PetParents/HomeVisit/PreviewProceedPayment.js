import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../../assets/images';

const PreviewProceedPayment = () => {
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
  return (
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
                source={require('../../../assets/images/DummyImages/VetImage2.png')}
                style={{width: 90, height: 90, resizeMode: 'contain'}}
              />
            </View>
            <View className="flex flex-col">
              <Text className="text-[20px] font-PTSans-Bold">Dr. Manisha</Text>
              <Text
                className="text-[14px] text-[#838999] mt-1 font-Nunito-Regular"
                style={{fontWeight: '400'}}>
                Master of veterinary science
              </Text>
              <View className="flex flex-row mt-2 items-center">
                <Image source={images.star} style={{width: 24, height: 23}} />
                <Text
                  className="text-[16px] text-primary mt-2 ml-2 font-Nunito-Regular"
                  style={{fontWeight: '700'}}>
                  4.9/5
                </Text>
                <Text
                  className="text-[14px] font-Nunito-Regular mt-2 ml-2 text-[#838999]"
                  style={{fontWeight: '500'}}>
                  (314 Review)
                </Text>
              </View>
            </View>
          </View>
          <Text className="w-[295px] h-[0.5px] px-3 ml-3 bg-[#e8e9eb] mb-[15.5px]"></Text>
          <View className="flex flex-row items-center gap-2 px-3 mb-3">
            <Image source={images.calender2} style={{width: 20, height: 18}} />
            <Text
              className="text-[13px] text-[#333333] font-Nunito-Regular"
              style={{fontWeight: '500'}}>
              Wednesday, 24, April, 2024 | 8:00 AM
            </Text>
            <TouchableOpacity className="border border-primary items-center justify-center rounded-full px-3 py-1">
              <Text className="text-primary">Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          className="text-[21px] mt-5 font-Nunito-Regular "
          style={{fontWeight: '500'}}>
          Pet Details
        </Text>
        <FlatList
          data={petDetails}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View className="bg-[#F2F6F733] rounded-[15px] border border-[#848A9A33]  py-3">
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
            </View>
          )}
        />
        <View className="bg-[#F2F6F733] border border-[#848A9A33] mt-4 py-4 h-[56px]  px-3 rounded-[15px]">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-3">
              <Image source={images.services} style={{width: 18, height: 19}} />
              <Text
                className="text-[18px] font-Nunito-Bold"
                style={{fontWeight: '600'}}>
                Service Details
              </Text>
            </View>
            <Image source={images.rightIcon} style={{width: 10, height: 12}} />
          </View>
        </View>
        <Text
          className="text-[21px] mt-5 font-Nunito-Regular "
          style={{fontWeight: '500'}}>
          Coupons & Discounts
        </Text>
        <View className="bg-white border border-[#BBBCB7] h-[50px] rounded-[15px] mt-5 flex flex-row items-center justify-between px-2">
          <TextInput
            className="text-[16px] font-Nunito-Regular text-black"
            style={{fontWeight: '500'}}
            onChangeText={text => setCouponCode(text)}
            value={couponCode}
            placeholder="Enter Coupon Code"
            placeholderTextColor="#BBBCB7"></TextInput>
          <Text className="text-[18px] text-[#838999]">Apply</Text>
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
          className="text-[21px] mt-5 font-Nunito-Regular "
          style={{fontWeight: '500'}}>
          Address
        </Text>
        <View className="bg-[#F2F6F733] border border-[#848A9A33] px-3 py-4 rounded-[10px]">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-4">
              <Image source={images.address2} style={{width: 18, height: 22}} />
              <Text
                className="text-[16px] font-Nunito-Bold"
                style={{fontWeight: 600}}>
                Home
              </Text>
            </View>
            <TouchableOpacity className="border-2 border-primary items-center justify-center rounded-full px-3 py-1">
              <Text
                className="text-primary font-Nunito-Regular"
                style={{fontWeight: '700'}}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PreviewProceedPayment;

const styles = StyleSheet.create({});
