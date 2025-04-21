import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import screens from '../../../constants/screens';
import {useNavigation} from '@react-navigation/native';

const TeleConsultScreen2 = () => {
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  return (
    <>
      <View className="flex-1 bg-white px-6">
        <ScrollView>
          <View className="flex-1">
            <Text className="text-[16px] font-PTSans-Bold text-[#000000] ">
              Pet Details
            </Text>
            <View className=" bg-pastelGrey border border-pastelgreyBorder mt-[12px] rounded-[20px]">
              <View className="flex flex-row mt-[15px] ml-[10px] gap-[15px]">
                <Image
                  // source={require('../../../assets/images/DummyImages/Dog.png')}
                  source={require('../../../assets/images/DummyImages/Dog.png')}
                  className="w-[59px] h-[59px]"
                />
                <View className="flex flex-col gap-[13px]">
                  <View className="flex flex-row gap-[6px]">
                    <Text className="text-[20px] font-junegull-Regular text-[#6319C4]">
                      MAX
                    </Text>
                    <Text className="text-[15px] font-Nunito-Bold text-[#000000]">
                      Australian Shepherd
                    </Text>
                  </View>
                  <View className="flex flex-row">
                    <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7F]">
                      {' '}
                      Male |{' '}
                    </Text>
                    <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7F]">
                      {' '}
                      Age 3 yrs |{' '}
                    </Text>
                    <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7F]">
                      {' '}
                      30 Kgs{' '}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex flex-col ml-[15.5px] mt-[20.5px] gap-[7px]">
                <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                  Symptoms -
                </Text>
                <Text className="text-[14px] font-Nunito-Regular text-[#7F7F7F]">
                  Change in Appetite, Change in Activity Level
                </Text>
              </View>
              <Text className="w-[314.5px] h-[0.5px] bg-[#bbbcb8] ml-[15px] mt-[16px] mb-[15px]"></Text>
              <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15.5px]">
                Pet Images
              </Text>
              <View className="flex flex-row gap-[10px] ml-[15.5px] mt-[12px]">
                <Image
                  source={require('../../../assets/images/DummyImages/Dog3.png')}
                  className="w-[70px] h-[58px]"
                />
                <Image
                  source={require('../../../assets/images/DummyImages/Dog3.png')}
                  className="w-[70px] h-[58px]"
                />
              </View>
              <Text className="w-[314.5px] h-[0.5px] bg-[#bbbcb8] ml-[15px] mt-[16px] mb-[15px]"></Text>
              <View className="flex flex-col gap-[7px]">
                <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15.5px]">
                  Note -
                </Text>
                <Text className="text-[14px] font-Nunito-Regular text-[#7F7E7C] ml-[15.5px] mb-[16.5px]">
                  Pellentesque suscipit tempor ullamcorper. Nuna quam posuere,
                  consectetur lectus eu,euismod ipsum.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.MedicalHistoryScreen)}>
              <View className=" flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder  rounded-[20px] mt-[15px]">
                <View className="flex flex-row items-center  gap-[12.7px] mt-[20px] ml-[17px] mb-[20px]">
                  <Image
                    source={require('../../../assets/images/services.png')}
                    className="w-[16.29px] h-[18.01px]"
                  />
                  <Text className="text-[16px] font-Nunito-Bold">
                    Medical history
                  </Text>
                </View>
                <View className="mr-[24.8px]">
                  <Image
                    source={require('../../../assets/images/rightArrow.png')}
                    className="mt-[20px] mb-[20px]"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <Text className="text-[16px] font-PTSans-Bold text-[#000000]  mt-[29.9px]">
              Treatment details
            </Text>
            <View>
              <View className="  bg-pastelGrey border border-pastelgreyBorder rounded-2xl mt-[15px]">
                <View className="flex flex-row items-center justify-between mt-[10px]">
                  <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15px]">
                    Diagnosis Details
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(screens.TeleDiagnosis)}>
                    <View className="w-[46px] h-[26px] rounded-[5px] bg-primary mr-[15px] border border-primaryBorder ">
                      <Text className="text-center text-white font-Nunito-Bold mt-[2px]">
                        Edit
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15px] mt-[21px] mb-[17px]">
                  Symptoms -
                </Text>
                <Text className="text-[15px] font-Nunito-Regular text-[#7f7f7f] ml-[15px] mb-[17px]">
                  DIGESTIVE SYSTEM
                </Text>
                <View className="flex flex-row ml-[15px]  gap-[20px] mb-[26px] w-[164px]">
                  <View className=" h-[34px] bg-[#c2a4eb] items-center justify-center rounded-[20px]">
                    <Text className="text-[#6319C4] text-[12px] font-Nunito-Bold text-center mt-[10px] mb-[10px]  ml-[14px] mr-[15px] ">
                      Diarrhea
                    </Text>
                  </View>
                  <View className=" h-[34px] bg-[#c2a4eb] items-center rounded-[20px] ">
                    <Text className="text-[#6319C4] text-[12px] font-Nunito-Bold text-center mt-[10px] ml-[14px] mr-[15px] ">
                      Vomiting
                    </Text>
                  </View>
                </View>
                <Text className="text-[15px] font-Nunito-Regular text-[#7f7f7f] ml-[15px] mb-[17px]">
                  SKIN & FUR
                </Text>
                <View className=" w-[116px] ml-[15px] bg-[#c2a4eb] items-center rounded-[20px]  ">
                  <Text className="text-[#6319C4] text-[12px] font-Nunito-Bold text-center mt-[10px] mb-[10px] ">
                    Rashes, redness
                  </Text>
                </View>
                <Text className="text-[16px] font-Nunito-Bold text-[#000000] ml-[15px] mt-[20px] mb-[11px]">
                  Note -
                </Text>
                <Text className="ml-[15px] mb-[15px] text-[12px] font-Nunito-Regular text-[#7f7f7f]">
                  Pellentesque suscipit tempor ullamcorper. Nun a quam posuere,
                  consectetur lectus eu, euismod ipsum.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.TeleMedicationScreen);
              }}>
              <View className=" flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder  rounded-[20px] mt-[15px]">
                <View className="flex flex-row items-center  gap-[12.7px] mt-[20px] ml-[17px] mb-[20px]">
                  <Text className="text-[16px] font-Nunito-Bold">
                    Add Medication
                  </Text>
                </View>
                <View className="mr-[24.8px]">
                  <Image
                    source={require('../../../assets/images/secondaryAdd.png')}
                    className="mt-[18px] mb-[18px] w-[18px] h-[18px]"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder="Note"
              placeholderTextColor="#000000"
              textAlignVertical="top"
              className="h-[98px] bg-pastelGrey border border-pastelgreyBorder mt-[20px] rounded-2xl text-[14px] text-[#000000] font-Nunito-Regular pl-[10px] pt-[10px]"></TextInput>
            <View className="flex-row items-center justify-between h-[58px] bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mt-[15px] mb-[15px]">
              <Text
                className="text-[16px] mt-[19px] mb-[21px] font-[Proxima-Nova-Medium] h-[20px]"
                style={{marginLeft: 19}}>
                Schedule Follow Up
              </Text>
              <Switch
                trackColor={{false: '#E7ECF7', true: '#FF5362'}}
                thumbColor={true ? '#fff' : '#fff'}
                value={accepted}
                onValueChange={() => setAccepted(!accepted)}
              />
            </View>
            <Text className="text-[16px] font-PTSans-Bold text-[#000000]  mt-[29.9px]">
              Payment summary
            </Text>
            <View className="mb-[30px]">
              <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mt-[10px]">
                <View className="mt-[15px] ml-[15px] flex flex-row items-center justify-between">
                  <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                    Service Charges
                  </Text>
                  <View className=" flex-row  items-center space-x-1">
                    <Text className="text-[14px] font-[Nunito-Regular] text-[#7F7F7F]  mr-[15px]">
                      ₹1,000.00
                    </Text>
                  </View>
                </View>
                <View className="mt-[15px] ml-[15px] flex flex-row  justify-between">
                  <Text className="text-[16px] font-[Proxima-Nova-Medium] text-[#7F7F7F]">
                    GST and other charges
                  </Text>
                  <View className="flex flex-row items-center ">
                    <Text className="text-[14px] font-[Nunito-Regular] text-[#7F7F7F] mr-[15px]">
                      ₹60.00
                    </Text>
                  </View>
                </View>

                <Text className=" h-[0.5px] bg-[#bbbcb8] ml-[15px] mt-[16px] mb-[15px] mr-[15px]"></Text>
                <View className="flex flex-row  justify-between ml-[20px]">
                  <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                    Total
                  </Text>
                  <View className="flex flex-row mb-[16px] items-center">
                    <Text className="text-[15px] font-[Nunito-Bold] text-[#000000] mr-[15px]">
                      ₹1,060.00
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
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
          className="h-[60px] bg-primary items-center justify-center rounded-2xl"
          onPress={() => {
            // navigation.navigate(screens.VetServiceLocation);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Finish Consultation
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TeleConsultScreen2;

const styles = StyleSheet.create({});
