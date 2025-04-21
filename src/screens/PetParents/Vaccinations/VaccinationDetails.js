import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SectionList,
} from 'react-native';
import React from 'react';
import images from '../../../assets/images';
import screens from '../../../constants/screens';

const vaccinations = [
  {
    title: 'Due',
    data: [
      {id: '1', name: 'Distemper', type: 'due'},
      {id: '2', name: 'Measles', type: 'due'},
      {id: '3', name: 'Parainfluenza', type: 'due'},
    ],
  },
  {
    title: 'Completed',
    data: [{id: '4', name: 'Bordatella', type: 'completed'}],
  },
];

const VaccinationDetails = ({navigation}) => {
  const handlePress = item => {
    if (item.type === 'due') {
      navigation.navigate(screens.AddVaccinationDetails, {vaccine: item?.name});
    }
    if (item.type === 'completed') {
      navigation.navigate(screens.VaccinationHistory, {vaccine: item?.name});
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      className="flex-row items-center bg-pastelGrey p-5 rounded-2xl border mb-3 border-pastelgreyBorder"
      onPress={() => handlePress(item)}>
      <Image
        source={images.dose}
        className=" h-7 w-7"
        resizeMode="contain"
        style={{tintColor: '#d75880'}}
      />
      <Text className="ml-2 text-lg font-semibold text-black flex-1">
        {item.name}
      </Text>
      <Image
        source={images.secondaryBack}
        className=" h-[14px]"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
  return (
    <View className="flex-1 bg-white px-6">
      {/* Age Range Card */}
      <View className=" bg-pastelPrimary p-5 rounded-xl flex-row items-center justify-between">
        <Text className="text-[20px]  text-black">
          <Text className=" font-bold">6-8</Text> Weeks
        </Text>
        <Image
          source={images.dogIcon}
          className=" h-[40px] w-[55px]"
          resizeMode="contain"
          style={{tintColor: '#d75880'}}
        />
      </View>

      {/* Section List */}
      <SectionList
        sections={vaccinations}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={({section: {title}}) => (
          <Text className="text-lg font-semibold mt-4 mb-2">{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default VaccinationDetails;
