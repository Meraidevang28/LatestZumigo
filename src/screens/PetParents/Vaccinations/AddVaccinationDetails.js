import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';

const AddVaccinationDetails = ({navigation, route}) => {
  const {vaccine} = route?.params;
  useEffect(() => {
    navigation.setOptions({title: vaccine});
  }, []);

  const [selectedDose, setSelectedDose] = useState(null);
  const [isDone, setIsDone] = useState(false);
  return (
    <View className="flex-1 bg-white px-6">
      {/* Dose Selection */}
      <Text className="text-base font-semibold my-5">Select dose</Text>
      <View className="flex-row gap-2">
        {['Dose 1', 'Dose 2', 'Dose 3'].map((dose, index) => (
          <TouchableOpacity
            key={index}
            className={`bg-pastelGrey border  rounded-2xl items-center justify-between p-4 ${
              selectedDose === dose
                ? 'bg-primary  border-primary'
                : 'border-pastelgreyBorder bg-pastelGrey '
            }`}
            onPress={() => setSelectedDose(dose)}>
            <Text
              className={`text-base ${
                selectedDose === dose ? ' text-white ' : 'text-gray-500'
              }`}>
              {dose}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Vaccination Date */}
      <View className=" flex-row bg-pastelGrey border border-pastelgreyBorder rounded-2xl items-center justify-between p-4 my-5">
        <Text>Vaccination date</Text>
        <Image
          source={images.calender}
          className=" h-5 w-5"
          resizeMode="contain"
        />
      </View>
      {/* Upload Attachment */}
      <View className=" items-start">
        <View className=" flex-row bg-pastelGrey border border-pastelgreyBorder rounded-2xl items-center justify-center gap-3 p-4">
          <Image
            source={images.secondaryAdd}
            className=" h-[20px] w-[20px]"
            resizeMode="contain"
          />
          <Text className=" text-[16px] font-medium text-primary leading-[19px] font-Nunito-Regular">
            Upload Attachment
          </Text>
        </View>
      </View>

      {/* Mark as Done */}
      <View className="flex-row items-center mt-5">
        <Switch
          trackColor={{false: '#E7ECF7', true: '#d75880'}}
          thumbColor={true ? '#fff' : '#fff'}
          value={isDone}
          onValueChange={setIsDone}
          style={{margin: 0}}
        />
        <Text className="ml-2 text-base text-gray-600">Mark as done</Text>
      </View>

      <FooterBtn title="Save" onClick={() => navigation.goBack()} />
    </View>
  );
};

export default AddVaccinationDetails;
