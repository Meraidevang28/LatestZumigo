import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import images from '../../../assets/images';

const PaymentMethods = () => {
  const [defaultMethod, setDefaultMethod] = useState('ICICI');

  const paymentMethods = [
    {
      id: 'ICICI',
      bank: 'ICICI Bank',
      cardType: 'Visa',
      lastFour: '4455',
      logo: images.visa,
    },
    {
      id: 'HDFC',
      bank: 'HDFC Bank',
      cardType: 'Rupay',
      lastFour: '4455',
      logo: images.rupay,
    },
  ];

  return (
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <Text className=" font-Nunito-Bold text-[16px]  mt-5 mb-3">
        Payments Methods
      </Text>

      {paymentMethods.map(method => (
        <View
          key={method.id}
          className=" p-4 rounded-2xl border border-pastelgreyBorder bg-pastelGrey mb-5 flex-row gap-2">
          <View>
            <View className=" py-1 px-[7px] border rounded-[5px] border-[#DFDFDF] bg-white">
              <Image
                source={method.logo}
                className="w-[29px] "
                resizeMode="contain"
              />
            </View>
          </View>
          <View>
            <Text className=" text-[16px] font-Nunito-Bold">{method.bank}</Text>
            <Text className="text-gray-500 mb-[10px] mt-[6px] font-Nunito-Regular text-[12px] ">
              **** {method.lastFour}
            </Text>
            <View className="flex-row  gap-2">
              {defaultMethod === method.id ? (
                <TouchableOpacity className=" border border-[#FBA537] px-3 py-1 rounded-lg">
                  <Text className="text-[#FBA537]  font-Nunito-Regular">
                    Default
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="border border-[#7E7D7C] px-3 py-1 rounded-lg"
                  onPress={() => setDefaultMethod(method.id)}>
                  <Text className="text-[#7E7D7C] font-Nunito-Regular">
                    Set as default
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity className=" border border-[#d75880] px-3 py-1 rounded-lg">
                <Text className="text-[#d75880] font-Nunito-Regular">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* Credit & Debit Cards */}
      <Text className=" font-Nunito-Bold text-[16px]  mb-3">
        Credit & Debit cards
      </Text>

      <TouchableOpacity className="border-pastelgreyBorder bg-pastelGrey p-4 rounded-2xl border flex-row items-center gap-2">
        <View>
          <View className=" py-[3px] px-[15px] border rounded-[5px] border-[#DFDFDF] bg-white">
            <Image
              source={images.addnewcard}
              className="w-[14px] h-[27px]"
              resizeMode="contain"
            />
          </View>
        </View>
        <Text className=" font-Nunito-Bold text-[16px] ">Add new card</Text>
      </TouchableOpacity>

      {/* UPI */}
      <Text className=" font-Nunito-Bold text-[16px] mt-5 mb-3">UPI</Text>

      <View className="border-pastelgreyBorder bg-pastelGrey p-4 rounded-2xl border flex-row items-center gap-2">
        <View>
          <View className=" py-[2px] px-[7px] border rounded-[5px] border-[#DFDFDF] bg-white">
            <Image
              source={images.gpay}
              className="w-[29px] h-[29px]"
              resizeMode="contain"
            />
          </View>
        </View>
        <Text className="font-Nunito-Bold text-[16px] ">Google Pay</Text>
      </View>
    </View>
  );
};

export default PaymentMethods;
