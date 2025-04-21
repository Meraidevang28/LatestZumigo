import {View, Text} from 'react-native';
import React from 'react';
import BottomSheet from '../shared/BottomSheet';
import {ScrollView} from 'react-native-gesture-handler';

const services = [
  {
    title: 'Vaccination',
    items: [
      {name: 'Puppies', price: 7499},
      {name: 'DHPPiL', price: 1499},
    ],
  },
  {
    title: 'Microchipping',
    price: 1500, // No sub-items, so show price in the header
  },
];

const VetBookingServices = ({innerRef}) => {
  return (
    <BottomSheet ref={innerRef}>
      <View className="px-6">
        <Text className="text-[18px] font-bold mt-[26px] mb-6 font-Nunito-Bold">
          Service details
        </Text>
        <ScrollView>
          <View className="mb-28">
            <View className=" bg-pastelGrey border border-pastelgreyBorder p-4 rounded-lg">
              {services.map((service, index) => (
                <View key={index}>
                  <View className="flex-row justify-between">
                    <Text className=" text-[16px] font-Nunito-Bold">
                      {service.title}
                    </Text>
                    {!service.items && (
                      <Text className=" opacity-50 font-Nunito-Regular">
                        ₹ {service.price.toFixed(2)}
                      </Text>
                    )}
                  </View>

                  {service.items &&
                    service.items.map((item, subIndex) => (
                      <View
                        key={subIndex}
                        className="flex-row justify-between mt-1">
                        <Text className="opacity-50 font-Nunito-Regular">
                          {item.name}
                        </Text>
                        <Text className="opacity-50  font-Nunito-Regular">
                          ₹ {item.price.toFixed(2)}
                        </Text>
                      </View>
                    ))}

                  {/* Divider, but not after the last item */}
                  {index < services.length - 1 && (
                    <View className="border-b  border-b-pastelgreyBorder my-4" />
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default VetBookingServices;
