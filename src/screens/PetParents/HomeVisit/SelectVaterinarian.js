import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectVaterinarian = ({ navigation, route }) => {

  const { params } = route
  const [responseData, setResponseData] = useState(null)
  const [selectedSct, setSelectedSct] = useState(null)


  const [selected, setSelected] = useState('');



  useEffect(() => {

    if (params) {


      fetchServiceData();


    }



  }, [params]);

  const fetchServiceData = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const consultationUuid = params.consultationTypeUUID
      const serviceGroupUuid = params.serviceGroupUUID
      const response = await fetch(`https://demoapi.zumigo.pet/api/Service/GetServiceMdl/${serviceGroupUuid}/${consultationUuid}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
      const data = await response.json();
      setResponseData(data)
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };


  return (
    <>
      <View className="flex-1 bg-white px-6">
        <Text className="text-[24px] text-black font-Nunito-Bold">
          Select your Vaterinarian
        </Text>
        <View className="h-[150px] bg-[#f7f7f7] border border-[#BBBCB7] mt-[30px] rounded-[20px] px-1">
          <Text className="mt-[30px] text-[16px] text-black font-Nunito-Regular left-4">
            Consult a
          </Text>
          <View className="flex flex-row items-center justify-around mt-[15px]">

            {
              responseData?.SCT?.map((sct) => (
                <>

                  <TouchableOpacity
                    onPress={() => {
                      setSelectedSct(sct)
                    }}
                    className={` h-[40px] w-[135.5px] border border-[#BBBCB7] flex items-center justify-center rounded-full  ${selectedSct?.UUID === sct.UUID ? 'bg-primary ' : 'bg-white'
                      }`}>
                    <Text
                      className={`text-[13px] text-center  ${selectedSct?.UUID === sct.UUID
                          ? 'text-white font-Nunito-Bold'
                          : 'text-[#BBBCB7]'
                        }`}>
                      {sct.SCTName}
                    </Text>
                  </TouchableOpacity>

                </>
              ))
            }


            {false && <TouchableOpacity
              onPress={() => setSelected('generalpractitioner')}
              className={` h-[50px] w-[167px] border border-[#BBBCB7] flex items-center justify-center rounded-full  ${selected === 'generalpractitioner' ? 'bg-primary ' : 'bg-white'
                }`}>
              <Text
                className={`text-[16px] text-center  ${selected === 'generalpractitioner'
                    ? 'text-white font-Nunito-Bold'
                    : 'text-[#BBBCB7]'
                  }`}>
                General Practitioner
              </Text>
            </TouchableOpacity>}
            {false && <TouchableOpacity
              onPress={() => setSelected('specialist')}
              className={` h-[40px] w-[135.5px] border border-[#BBBCB7] flex items-center justify-center rounded-full ${selected === 'specialist' ? 'bg-primary' : 'bg-white'
                }`}>
              <Text
                className={`text-[13px] ${selected === 'specialist'
                    ? 'text-white font-Nunito-Bold'
                    : 'text-[#BBBCB7]'
                  }`}>
                Specialist
              </Text>
            </TouchableOpacity>}
          </View>
        </View>
      </View>
      <View className="px-2 bottom-0 bg-white flex justify-center items-center">
        <Image source={images.vaterinarianIcon} className="w-full h-[250px]" />
      </View>
      <View
        className="bg-white flex px-6 justify-center h-[100px] w-full"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 50, height: 60 }, // Adjust as needed
          shadowOpacity: 50, // Lower for subtle shadows
          shadowRadius: 10,
          elevation: 18, // Android shadow
        }}>
        <TouchableOpacity
          onPress={() => {
            if (selectedSct?.UUID === responseData?.SCT[0]?.UUID) {
              navigation.navigate(screens.AddYourPet, {});
            } else if (selectedSct?.UUID === responseData?.SCT[1]?.UUID) {
              navigation.navigate(screens.SelectSpecialist, {
                scData: responseData?.SC
              });
            }
          }}
          className="h-[60px] bg-primary items-center justify-center rounded-full">
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SelectVaterinarian;

const styles = StyleSheet.create({});
