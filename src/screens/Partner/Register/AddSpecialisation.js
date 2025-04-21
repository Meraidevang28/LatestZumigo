import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import {primary} from '../../../assets/theme/colors';
import images from '../../../assets/images';

const AddSpecialisation = ({navigation}) => {
  const [selectedSpecialisation, setselectedSpecialisation] = useState([]);

  const Specialisation = [
    'Internal Medicine',
    'Dermatology',
    'Surgery',
    'Ophthalmology',
    'Dentistry',
    'Anesthesiology',
    'Radiology',
    'Emergency and Critical Care',
  ];

  const toggleSpecialisationSelection = specialisation => {
    setselectedSpecialisation([specialisation]); // Only store the selected one
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <>
      <View className="flex-1 bg-white px-6 ">
        <ScrollView>
          {/* Progress bar  */}
          <View className="mt-[15px] mb-2">
            <RegistrationProgressBar screenNo={4} />
          </View>

          {/* title  */}

          <Text className=" mt-[15px] mb-[20px] text-[26px] text-darkGunmetal font-Nunito-Bold">
            Specialisation Details
          </Text>
          <View className="flex-row justify-between items-center px-4 py-2 bg-[#f7f7f7] border-[0.5px] border-[#e2e3e1] h-[63px] rounded-[20px] mb-[10px]">
            <Text
              className="text-[16px] text-[#000000] font-Nunito-Regular"
              style={{fontWeight: 400}}>
              Are you a specialist?
            </Text>
            <Switch
              trackColor={{false: '#ccc', true: primary}}
              thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#ccc"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {isEnabled ? (
            <View>
              <ScrollView
                className=" bg-white"
                showsVerticalScrollIndicator={false}>
                <Text className="text-[24px] font-Nunito-Bold mb-[10px]">
                  Add your Specialisation
                </Text>
                <Text className="text-[18px] font-Nunito-Regular text-[#333333] mb-[15px]">
                  You can choose one specialisation
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {Specialisation.map((specialisation, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                        selectedSpecialisation.includes(specialisation)
                          ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
                          : 'bg-[#f3f6f7] border border-[#BBBCB7] shadow-md-light'
                      }`}
                      onPress={() =>
                        toggleSpecialisationSelection(specialisation)
                      }>
                      <Text
                        className={` text-[16px] leading-6  ${
                          !selectedSpecialisation.includes(specialisation)
                            ? ' text-[#838999] font-Nunito-Bold'
                            : ' text-white font-Nunito-Bold'
                        }`}>
                        {specialisation}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          ) : (
            <View className="px-2 bottom-[-180px] bg-white flex justify-center items-center">
              <Image
                source={images.vaterinarianIcon}
                className="w-full h-[250px]"
                style={{resizeMode: 'contain'}}
              />
            </View>
          )}
        </ScrollView>
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
            navigation.navigate(screens.InfraSetup);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddSpecialisation;
