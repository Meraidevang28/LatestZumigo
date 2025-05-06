import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectVaterinarian = ({navigation, route}) => {
  // const {params} = route;
  const {serviceGroupUUID, consultationTypeUUID, isTeleConsult, headerTitle} =
    route.params || {};

  const [responseData, setResponseData] = useState(null);
  const [selectedSct, setSelectedSct] = useState(null);

  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (serviceGroupUUID && consultationTypeUUID) {
      fetchServiceData();
    }
  }, [serviceGroupUUID, consultationTypeUUID]);
  console.log('serviceGroupUUID', serviceGroupUUID);
  console.log('consultationTypeUUID', consultationTypeUUID);

  // const fetchServiceData = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('auth_token');
  //     const consultationUuid = params.consultationTypeUUID;
  //     const serviceGroupUuid = params.serviceGroupUUID;
  //     // const ServiceGroupUuid = '3f930321-a4c7-4768-a018-c95278c0';
  //     // const ConsultationTypeUuid = '720dac47-9101-45c3-b0e0-afb7db3e';
  //     const response = await fetch(
  //       `https://demoapi.zumigo.pet/api/Service/GetServiceMdl/${serviceGroupUuid}/${consultationUuid}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: 'application/json',
  //         },
  //       },
  //     );
  //     console.log('consultationUuid', consultationUuid);
  //     console.log('serviceGroupUuid', serviceGroupUuid);

  //     const data = await response.json();
  //     console.log('Response status:', response.status);
  //     setResponseData(data);
  //   } catch (error) {
  //     console.error('Error fetching service data:', error);
  //   }
  // };
  const fetchServiceData = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await fetch(
        `https://demoapi.zumigo.pet/api/Service/GetServiceMdl/${serviceGroupUUID}/${consultationTypeUUID}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
      console.log('consultationTypeUUID', consultationTypeUUID);
      console.log('serviceGroupUUID', serviceGroupUUID);

      const data = await response.json();
      console.log('Response status:', response.status);
      setResponseData(data);
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
        <View className="h-[130px] bg-[#F2F6F733] border border-[#BBBCB7] mt-[30px] rounded-[20px] px-1">
          <Text className="mt-[20px] text-[16px] text-black font-Nunito-Regular left-4">
            Consult a
          </Text>
          <View className="flex flex-row items-center justify-around mt-[15px]">
            {responseData?.SCT?.map(sct => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSct(sct);
                  }}
                  className={` h-[50px] w-[145.5px] border border-[#BBBCB7] flex items-center justify-center rounded-full  ${
                    selectedSct?.UUID === sct.UUID
                      ? 'bg-primary border-primary'
                      : 'bg-white'
                  }`}>
                  <Text
                    className={`text-[13px] text-center  ${
                      selectedSct?.UUID === sct.UUID
                        ? 'text-white font-Nunito-Bold'
                        : 'text-[#BBBCB7] font-Nunito-Regular'
                    }`}>
                    {sct.SCTName}
                  </Text>
                </TouchableOpacity>
              </>
            ))}

            {false && (
              <TouchableOpacity
                onPress={() => setSelected('generalpractitioner')}
                className={` h-[50px] w-[167px] border border-[#BBBCB7] flex items-center justify-center rounded-full  ${
                  selected === 'generalpractitioner'
                    ? 'bg-primary '
                    : 'bg-white'
                }`}>
                <Text
                  className={`text-[16px] text-center  ${
                    selected === 'generalpractitioner'
                      ? 'text-white font-Nunito-Bold'
                      : 'text-[#BBBCB7] '
                  }`}>
                  General Practitioner
                </Text>
              </TouchableOpacity>
            )}
            {false && (
              <TouchableOpacity
                onPress={() => setSelected('specialist')}
                className={` h-[40px] w-[135.5px] border border-[#BBBCB7] flex items-center justify-center rounded-full ${
                  selected === 'specialist' ? 'bg-primary' : 'bg-white'
                }`}>
                <Text
                  className={`text-[13px] ${
                    selected === 'specialist'
                      ? 'text-white font-Nunito-Bold'
                      : 'text-[#BBBCB7]'
                  }`}>
                  Specialist
                </Text>
              </TouchableOpacity>
            )}
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
          shadowOffset: {width: 50, height: 60}, // Adjust as needed
          shadowOpacity: 50, // Lower for subtle shadows
          shadowRadius: 10,
          elevation: 18, // Android shadow
        }}>
        {/* <TouchableOpacity
          onPress={() => {
            if (selectedSct?.UUID === responseData?.SCT[0]?.UUID) {
              navigation.navigate(screens.SelectSymptoms, {});
            } else if (selectedSct?.UUID === responseData?.SCT[1]?.UUID) {
              navigation.navigate(screens.SelectSymptoms, {
                scData: responseData?.SC,
              });
            }
          }}
          className="h-[60px] bg-primary items-center justify-center rounded-full">
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            const selectedUUID = selectedSct?.UUID;
            console.log('Selected SCT UUID:', selectedUUID);

            if (selectedUUID === responseData?.SCT[0]?.UUID) {
              navigation.navigate(screens.SelectTeleSymptoms, {
                selectedSctUUID: selectedUUID,
              });
            } else if (selectedUUID === responseData?.SCT[1]?.UUID) {
              navigation.navigate(screens.SelectSpecialist, {
                selectedSctUUID: selectedUUID,
                scData: responseData?.SC,
              });
            } else {
              console.warn('Selected UUID did not match any SCT entries');
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
