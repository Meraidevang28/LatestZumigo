import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';

const CouponsScreen = ({navigation}) => {
  const couponData = [
    {
      id: 1,
      image: images.shoppingIcon,
      title: '50% OFF up to ₹100',
      subheading: 'Save 100 with this code',
      footer: 'ZUMIGO10',
    },
    {
      id: 2,
      image: images.shoppingIcon,
      title: '50% OFF up to ₹100',
      subheading: 'Save 100 with this code',
      footer: 'ZUMIGO10',
    },
    {
      id: 3,
      image: images.shoppingIcon,
      title: '50% OFF up to ₹100',
      subheading: 'Save 100 with this code',
      footer: 'ZUMIGO10',
    },
  ];
  const paymentCouponData = [
    {
      id: 1,
      image: images.bankIcon,
      title: 'Flat 10% OFF using Amex Card',
      subheading: 'Save 100 with this code',
      footer: 'ZUMIGO10',
    },
  ];
  const [selectedCouponIds, setSelectedCouponIds] = useState([]);
  const [selectedPaymentCouponIds, setSelectedPaymentCouponIds] = useState([]);
  const toggleCouponSelection = id => {
    setSelectedCouponIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  };
  const togglePaymentCouponSelection = id => {
    setSelectedPaymentCouponIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  };
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView>
        <Text
          className="text-[21px] font-Nunito-Regular"
          style={{fontWeight: 500}}>
          Coupon & Discounts
        </Text>
        <View className="flex flex-row items-center justify-between bg-white border border-[#BBBCB7] mt-4 rounded-[15px] py-2 px-2">
          <TextInput
            placeholder="Enter Coupon Code "
            placeholderTextColor="#BBBCB7"
            className="text-[16px] text-[#333333]"></TextInput>
          <TouchableOpacity>
            <Text className="text-[18px] text-primary">Apply</Text>
          </TouchableOpacity>
        </View>
        <Text
          className="text-[21px] mt-3 font-Nunito-Regular mb-3"
          style={{fontWeight: 500}}>
          Coupons
        </Text>
        <FlatList
          data={couponData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const isSelected = selectedCouponIds.includes(item.id);

            return (
              <TouchableOpacity
                onPress={() => toggleCouponSelection(item.id)}
                className={`border rounded-[10px] mb-3 ${
                  isSelected
                    ? 'bg-[#FFEDF966] border-[#D7588033]'
                    : 'bg-[#F2F6F733] border-[#848A9A33]'
                }`}>
                <View className="flex flex-row py-3 px-2 gap-2 ">
                  <Image source={item.image} style={{width: 25, height: 25}} />
                  <View className="flex flex-col flex-1">
                    <Text
                      className="text-[18px] font-Nunito-Regular"
                      style={{fontWeight: 700}}>
                      {item.title}
                    </Text>
                    <Text
                      className="text-[14px] text-[#838999] mt-1 font-Nunito-Regular"
                      style={{fontWeight: 500}}>
                      {item.subheading}
                    </Text>
                    <Text
                      className="text-[14px] text-primary mt-1 font-Nunito-Regular"
                      style={{fontWeight: 500}}>
                      {item.footer}
                    </Text>
                  </View>

                  {isSelected && (
                    <Image
                      source={require('../../../assets/images/DummyImages/Paw1.png')} // ✅ Update this path to your actual paw icon
                      style={{width: 20, height: 20}}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Text
          className="text-[21px] mt-3 font-Nunito-Regular mb-3"
          style={{fontWeight: 500}}>
          Payment Coupons
        </Text>
        <FlatList
          data={paymentCouponData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const isSelected = selectedPaymentCouponIds.includes(item.id);

            return (
              <TouchableOpacity
                onPress={() => togglePaymentCouponSelection(item.id)}
                className={`border rounded-[10px] mb-[150px] ${
                  isSelected
                    ? 'bg-[#FFEDF966] border-[#D7588033]'
                    : 'bg-[#F2F6F733] border-[#848A9A33]'
                }`}>
                <View className="flex flex-row py-3 px-2 gap-2">
                  <Image source={item.image} style={{width: 25, height: 25}} />
                  <View className="flex flex-col flex-1">
                    <Text
                      className="text-[18px] font-Nunito-Regular"
                      style={{fontWeight: 700}}>
                      {item.title}
                    </Text>
                    <Text
                      className="text-[14px] text-[#838999] mt-1 font-Nunito-Regular"
                      style={{fontWeight: 500}}>
                      {item.subheading}
                    </Text>
                    <Text
                      className="text-[14px] text-primary mt-1 font-Nunito-Regular"
                      style={{fontWeight: 500}}>
                      {item.footer}
                    </Text>
                  </View>

                  {isSelected && (
                    <Image
                      source={require('../../../assets/images/DummyImages/Paw1.png')}
                      style={{width: 20, height: 20}}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
      <FooterBtn
        title="Update Coupons"
        onClick={() => {
          navigation.navigate(screens.PreviewProceedPayment);
        }}
      />
    </View>
  );
};

export default CouponsScreen;

const styles = StyleSheet.create({});
