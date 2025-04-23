import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import images from '../../../assets/images';
import screens from '../../../constants/screens';
const InfraSetup = ({navigation}) => {
  const [selectedinfrastructure, setSelectedInfrastructure] = useState([]);
  const Infrastructure = [
    'In-house Lab',
    'In-house Pharmacy',
    'Portable eye checkup equipment',
  ];
  const {width, height} = Dimensions.get('window');
  const imageHeight = height * 0.4;
  const toggleInfraSelection = Infrastructure => {
    setSelectedInfrastructure(prev =>
      prev.includes(Infrastructure)
        ? prev.filter(a => a !== Infrastructure)
        : [...prev, Infrastructure],
    );
  };
  return (
    <View className="flex-1 bg-white">
      <View className="mt-[15px] mb-2 px-6">
        <RegistrationProgressBar screenNo={4} />
      </View>
      <View className="flex-1 bg-white px-6">
        <Text className="text-[24px] font-Nunito-Bold mb-[15px] mt-[10px]">
          Provide Your Infrastructure Setup
        </Text>
        <ScrollView className=" bg-white " showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap gap-2">
            {Infrastructure.map((infrastructure, index) => (
              <TouchableOpacity
                key={index}
                className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                  selectedinfrastructure.includes(infrastructure)
                    ? 'border border-primaryBorder bg-[#d75880] shadow-md-light'
                    : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
                }`}
                onPress={() => toggleInfraSelection(infrastructure)}>
                <Text
                  className={` text-[16px] font-Nunito-Bold leading-6 ${
                    !selectedinfrastructure.includes(infrastructure)
                      ? ' text-[#838999]'
                      : ' text-white'
                  }`}>
                  {infrastructure}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 50, // adjust if you have a footer
          left: 25,
          right: 0,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          source={images.infraIcon}
          style={{
            width: width * 1.99, // responsive width
            height: imageHeight * 0.9, // responsive height
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        className="bg-white flex px-6 justify-center h-[100px] w-full"
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 50, height: 60}, // Adjust as needed
          shadowOpacity: 50, // Lower for subtle shadows
          shadowRadius: 10,
          elevation: 18, // Android shadow
        }}>
        <TouchableOpacity
          className="h-[60px] bg-primary items-center justify-center rounded-full"
          onPress={() => {
            navigation.navigate(screens.VetAssistantDetails);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InfraSetup;

const styles = StyleSheet.create({});
