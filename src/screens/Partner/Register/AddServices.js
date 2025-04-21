import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';

const AddServices = ({navigation}) => {
  const [selectedServices, setselectedServices] = useState([]);

  const Services = [
    'in-house lab',
    'portable ECG equipment',
    'portable radiology equipment',
    'vaccination',
    'in-house pharmacy',
    'portable equipment for eye checkup',
    'microchipping',
  ];

  const toggleServiceselection = services => {
    setselectedServices(prev =>
      prev.includes(services)
        ? prev.filter(a => a !== services)
        : [...prev, services],
    );
  };
  return (
    <>
      <View className="flex-1 bg-white px-6 ">
        <View className="flex-1">
          {/* Progress bar  */}
          <View className="mt-[15px] mb-2">
            <RegistrationProgressBar screenNo={4} />
          </View>
          <Text className="text-gray-900 mb-[10px] font-[Nunito-Regular]">
            Add Services
          </Text>

          {/* title  */}

          <Text className=" mt-[15px] mb-1 text-[26px] text-darkGunmetal font-[PTSans-Bold]">
            Add your Services
          </Text>
          <Text
            className="text-[#787A82] mb-[30px]"
            style={{fontFamily: 'Nunito-Regular'}}>
            You can choose multiple Serviceses
          </Text>
          <ScrollView
            className=" bg-white "
            showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap gap-2">
              {Services.map((services, index) => (
                <TouchableOpacity
                  key={index}
                  className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                    selectedServices.includes(services)
                      ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
                      : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
                  }`}
                  onPress={() => toggleServiceselection(services)}>
                  <Text
                    className={` text-[16px] font-Nunito-Regular leading-6 ${
                      !selectedServices.includes(services)
                        ? ' text-darkGunmetal'
                        : ' text-white'
                    }`}>
                    {services}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          {/* <FooterBtn
            title="Continue"
            onClick={() => navigation.navigate(screens.ScheduleWeek)}
          /> */}
        </View>
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
          className="h-[60px] bg-primary items-center justify-center rounded-2xl"
          onPress={() => {
            navigation.navigate(screens.ScheduleWeek);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddServices;
