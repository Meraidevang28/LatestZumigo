import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import DualOptionSelector from '../../../components/shared/DualOptionSelector';
import CustomTextInput from '../../../components/shared/CustomTextInput';

const EditPetDetails = ({navigation}) => {
  const [name, setName] = useState('Max');
  const [breed, setBreed] = useState('Australian Shepherd');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('3 Years 6 Months');
  const [weight, setWeight] = useState('');
  const [microchip, setMicrochip] = useState('');
  const [isKCIRegister, setIsKCIRegister] = useState(null);

  return (
    <View className="flex-1 bg-white px-6">
      {/* Image and Add Image */}

      <ScrollView
        className="flex-1 bg-white "
        showsVerticalScrollIndicator={false}>
        <View className=" flex-row gap-[10px] my-5">
          <Image
            source={require('../../../assets/images/DummyImages/Dog.png')} // Placeholder image
            className="rounded-2xl h-[100px] w-[100px]"
          />
          <TouchableOpacity className="h-[100px] w-[100px] bg-pastelGrey  rounded-2xl border border-pastelgreyBorder justify-center items-center gap-[6px]">
            <Image
              source={images.ImageIcon} // Placeholder image
              className="h-5 w-5"
              resizeMode="contain"
            />
            <Text
              className="text-[12px] text-[#333333] opacity-50"
              style={{fontFamily: 'Proxima-Nova-Regular'}}>
              Add image
            </Text>
          </TouchableOpacity>
        </View>
        {/* Input Fields */}
        <CustomTextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl text-[16px] p-5 mb-[15px] ">
          <Text>{breed}</Text>
        </View>
        {/* Gender Selection */}
        <DualOptionSelector
          title1="Male"
          title2="Female"
          slected={gender}
          setSelected={setGender}
        />
        {/* Age */}
        <View className=" mt-[15px]" />
        <CustomTextInput placeholder="Age" value={age} onChangeText={setAge} />
        {/* Weight */}
        <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl text-[16px] px-5 py-2  flex-row justify-between items-center mb-5">
          <TextInput
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholderTextColor="#00000080"
            className={` font-Nunito-Regular  `}
          />
          <Text
            style={{fontFamily: 'Proxima-Nova-Bold'}}
            className="text-[#333333] opacity-30">
            Kgs
          </Text>
        </View>

        {/* Microchip Input */}
        <CustomTextInput
          placeholder="Microchip number"
          value={microchip}
          onChangeText={setMicrochip}
        />
        <TouchableOpacity className=" bg-pastelGrey border border-pastelgreyBorder p-[19px] rounded-2xl flex-row justify-between items-center mb-[15px]">
          <Text className="font-Nunito-Regular text-black opacity-50">
            Date of microchipping
          </Text>
          <Image
            source={images.timedate}
            resizeMode="contain"
            className=" h-[18px] w-[18px]"
          />
        </TouchableOpacity>
        <View className="pb-[100px]">
          <Text className=" mt-[15px] text-[16px] font-Nunito-Bold">
            Do you have KCI Registration?
          </Text>
          <View className=" mt-[15px]">
            <DualOptionSelector
              title1="Yes"
              title2="No"
              slected={isKCIRegister}
              setSelected={setIsKCIRegister}
            />
          </View>
        </View>
      </ScrollView>
      {/* Save Button */}
      <FooterBtn title="Save" onClick={() => navigation.goBack()} />
    </View>
  );
};

export default EditPetDetails;
