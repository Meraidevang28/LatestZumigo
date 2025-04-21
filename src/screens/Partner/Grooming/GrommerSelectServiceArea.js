import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import images from '../../../assets/images';
import Slider from '@react-native-community/slider';
import {primary} from '../../../assets/theme/colors';
// import {primary} from '../../assets/theme/colors';

const areas = [
  'Nizampet',
  'Bachpally',
  'Hydernagar',
  'Madhapur',
  'Kavuri Hills',
];

const GroomerSelectServiceArea = ({navigation}) => {
  const [radius, setRadius] = useState(5);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const toggleAreaSelection = area => {
    setSelectedAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area],
    );
  };

  return (
    <View>
      <Text className="text-gray-900 mb-5 text-[24px] font-Nunito-Bold mt-[10px]">
        Select Your Service Area
      </Text>

      <Text className=" text-[#333333] text-[14px] mb-5 font-Nunito-Regular">
        Based on the address provided, we have populated the neighbourhood that
        you may prefer to serve.
      </Text>

      {/* radius  */}
      <View className="p-[15px] bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light rounded-2xl flex-row items-center">
        <View className="items-center">
          <Image
            source={images.trackIcon}
            className="h-[18px] mb-[5px] w-[18px]"
            resizeMode="contain"
            style={{tintColor: '#838999'}}
          />
          <Text className=" text-darkGunmetal text-[16px] font-[Nunito-Regular]">
            Radius
          </Text>
        </View>
        <View className="flex-1">
          <Slider
            style={{
              width: 190,
              height: 40,
              marginLeft: 10,
            }}
            minimumValue={5} // Minimum value of 5 km
            maximumValue={50} // Maximum value (e.g., 50 km)
            value={5} // Default value: 5 km
            step={1} // Steps in whole kilometers
            onValueChange={val => setRadius(val)} // Update range on slider change
            minimumTrackTintColor="#d75880" // Red color for the active track
            maximumTrackTintColor="#000000" // Grey color for the inactive track
            thumbTintColor="#d75880" // Red thumb color
            thumbImage={images.draggerIcon}
          />
        </View>
        <Text className=" text-[16px] text-primary font-[Nunito-Bold]">
          {radius} km
        </Text>
      </View>

      <Text
        className=" mt-2 mb-[30px] text-[#BBBCB7] text-[14px]"
        style={{fontFamily: 'Nunito-Regular'}}>
        The areas shown below are within the specified radius.
      </Text>

      <Text className="text-[#838999] mb-[15px] font-[Nunito-Regular]">
        Below are your selected areas
      </Text>

      <View className="flex-row flex-wrap gap-2">
        {areas.map((area, index) => (
          <TouchableOpacity
            key={index}
            className={`rounded-[20px] py-[14px] px-[15px] mb-2 border ${
              selectedAreas.includes(area)
                ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
                : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
            }`}
            onPress={() => toggleAreaSelection(area)}>
            <Text
              className={` text-[16px] leading-6  ${
                !selectedAreas.includes(area)
                  ? ' text-darkGunmetal font-Nunito-Regular'
                  : ' text-white font-Nunito-Bold'
              }`}>
              {area}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Image
        source={images.petLocationIcon}
        style={{resizeMode: 'contain'}}
        className="w-full h-[300px]  mb-[200px] left-[80px]"
      />
    </View>
  );
};

export default GroomerSelectServiceArea;
