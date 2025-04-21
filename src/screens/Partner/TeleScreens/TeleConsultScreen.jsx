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
import {useNavigation, useRoute} from '@react-navigation/native';
import {primary} from '../../../assets/theme/colors';

const TeleConsultScreen = () => {
  const route = useRoute();
  const {digestiveSystem, skinFur, eyesEars, note} = route.params || {};
  const isEmpty =
    (!digestiveSystem || digestiveSystem.length === 0) &&
    (!skinFur || skinFur.length === 0) &&
    (!eyesEars || eyesEars.length === 0);
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
                    <Text className="text-[20px] font-junegull-Regular text-primary">
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
                <View className="flex flex-row items-center  gap-[12.7px]  ml-[17px]  ">
                  <Image
                    source={require('../../../assets/images/services.png')}
                    className="w-[16.29px] h-[18.01px]"
                    style={{tintColor: primary}}
                  />
                  <Text className="text-[16px] font-Nunito-Bold">
                    Medical history
                  </Text>
                </View>
                <View className="mr-[24.8px]">
                  <Image
                    source={require('../../../assets/images/rightArrow.png')}
                    className="mt-[20px] mb-[20px] w-[8px] h-[10px]"
                    style={{tintColor: primary}}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <Text className="text-[16px] font-PTSans-Bold text-[#000000]  mt-[29.9px]">
              Treatment details
            </Text>
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.TeleDiagnosis);
              }}> */}
            <View className="flex w-full flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[15px]">
              {isEmpty ? (
                <View className="flex flex-row pl-[15px]">
                  <TouchableOpacity
                    onPress={() => navigation.navigate(screens.TeleDiagnosis)}
                    className="bg-pastelGrey rounded-xl flex flex-row items-center justify-between w-full  ">
                    <View className="flex flex-row items-center  gap-[12.7px]  ">
                      <Text className="text-[16px] font-Nunito-Bold ">
                        Add Diagnosis
                      </Text>
                    </View>
                    <View className="mr-[24.8px]">
                      <Image
                        source={require('../../../assets/images/secondaryAdd.png')}
                        className="mt-[18px] mb-[18px] w-[18px] h-[18px]"
                        style={{tintColor: primary}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View className="flex flex-col w-full">
                    <View className="flex-row justify-between items-center mb-3 mt-[15px] ml-[15px] mr-[15px] ">
                      <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                        Diagnosis Details
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('TeleDiagnosis')}
                        className="border border-red-500 rounded-md px-3 py-1">
                        <Text className="text-red-500 text-[14px] font-Nunito-Regular">
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Symptoms Section */}
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000] mb-2 ml-[15px]">
                      Symptoms -
                    </Text>
                    {/* Digestive System */}
                    {digestiveSystem?.length > 0 && (
                      <>
                        <Text className="text-[14px] ml-[15px] text-[#888888] font-Nunito-Regular mb-[13.5px]">
                          DIGESTIVE SYSTEM
                        </Text>
                        <View className="flex-row flex-wrap gap-2  ml-[15px]">
                          {digestiveSystem.map((item, index) => (
                            <View
                              key={index}
                              className="bg-pastelPrimary px-3 py-1 rounded-[20px]">
                              <Text className="text-primary text-[14px]   pt-[10px] pb-[10px]">
                                {item}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </>
                    )}

                    {/* Skin & Fur */}
                    {skinFur?.length > 0 && (
                      <>
                        <Text className="text-[14px] ml-[15px] text-[#888888] font-Nunito-Regular mb-[13.5px] mt-[25px]">
                          SKIN & FUR
                        </Text>
                        <View className="flex-row flex-wrap gap-2  ml-[15px]">
                          {skinFur.map((item, index) => (
                            <View
                              key={index}
                              className="bg-pastelPrimary px-3 py-1 rounded-[20px]">
                              <Text className="text-primary text-[14px]  pt-[10px] pb-[10px]">
                                {item}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </>
                    )}

                    {/* Eyes & Ears */}
                    {eyesEars?.length > 0 && (
                      <>
                        <Text className="text-[14px] ml-[15px] text-[#888888] font-Nunito-Regular mb-[13.5px] mt-[25px]">
                          EYES & EARS
                        </Text>
                        <View className="flex-row flex-wrap gap-2 ml-[15px]">
                          {eyesEars.map((item, index) => (
                            <View
                              key={index}
                              className="bg-pastelPrimary px-3 py-1 rounded-2xl">
                              <Text className="text-primary text-[14px] pt-[10px] pb-[10px]">
                                {item}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </>
                    )}
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000] mt-[25px] ml-[15px]">
                      Note -
                    </Text>
                    <Text className="text-[14px] text-[#888888] ml-[15px] mb-[20px] mt-[10px]">
                      {note ? note : 'No note provided.'}
                    </Text>
                  </View>
                </>
              )}
            </View>
            {/* </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.TeleMedicationScreen);
              }}>
              <View className=" flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder  rounded-[20px] mt-[15px]">
                <View className="flex flex-row items-center  gap-[12.7px]  ml-[17px] ">
                  <Text className="text-[16px] font-Nunito-Bold">
                    Add Medication
                  </Text>
                </View>
                <View className="mr-[24.8px]">
                  <Image
                    source={require('../../../assets/images/secondaryAdd.png')}
                    className="mt-[18px] mb-[18px] w-[18px] h-[18px]"
                    style={{tintColor: primary}}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder="Note"
              placeholderTextColor="#00000080"
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

export default TeleConsultScreen;

const styles = StyleSheet.create({});
