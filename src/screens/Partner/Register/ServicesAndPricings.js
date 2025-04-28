import {View, Text, SectionList, Switch, TouchableOpacity} from 'react-native';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {useRef, useMemo, useState, useCallback} from 'react';
const services = [
  {
    title: 'Illness and Diagnostic',
    data: [
      {
        name: 'Doorstep Visit',
        price: '₹850.00',
      },
      {
        name: 'Doorstep Lab Diagnostic Service',
        price: '₹650.00',
        subText: '(Per blood test)',
      },
    ],
  },
  {
    title: 'Preventive Care',
    data: [
      {
        name: 'Vaccination - Puppies',
        price: '₹7,499.00',
        details: ['Dewormer', 'Parvo Virus', 'DHPPI+'],
      },
      {
        name: 'Vaccination - Annual Boosters',
        price: '₹7,499.00',
        details: ['Anti-Rabies', 'Corona', 'DHPPI+'],
      },
      {
        name: 'Travel Certificates',
        price: '₹7,499.00',
        national: '(Domestic)',
      },
      {
        name: 'Travel Certificates',
        price: '₹7,499.00',
        national: '(International)',
      },
    ],
  },
];

const ServicesAndPricings = ({navigation}) => {
  const [accepted, setAccepted] = useState(false);
  const bottomSheetRef = useRef(null);

  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6 ">
          <View className="flex-1">
            {/* Progress bar  */}
            <View className="mt-[15px] mb-2">
              <RegistrationProgressBar screenNo={9} />
            </View>
            <Text className="text-[24px] font-Nunito-Bold mt-[20px]">
              Services & Pricings
            </Text>
            <SectionList
              showsVerticalScrollIndicator={false}
              sections={services}
              keyExtractor={(item, index) => item.name + index}
              renderItem={({item}) => (
                <View className="flex flex-row items-center justify-between border border-[#e8e9eb] shadow-md-light bg-[#f3f6f7] rounded-2xl p-[15px] mb-[15px]">
                  <View className="flex flex-col  ">
                    <Text
                      style={{fontFamily: 'Nunito-Regular', fontWeight: 600}}
                      className="text-[16px] mt-3 text-[#333333] w-[180px]">
                      {item.name}
                    </Text>
                    <Text className="text-[12px] text-[#838999]">
                      {item.national}
                    </Text>
                  </View>
                  <View className="flex flex-col items-center">
                    <Text
                      className=" text-[16px] mt-3 text-[#333333]"
                      style={{fontFamily: 'Nunito-Bold'}}>
                      {item.price}
                    </Text>
                    <Text className="text-[12px] text-[#838999]">
                      {item.subText}
                    </Text>
                  </View>
                </View>
              )}
              renderSectionHeader={({section: {title}}) => (
                <Text
                  className=" font-Nunito-Regular mt-[8px] mb-3 text-[16px] text-[#333333]"
                  style={{fontWeight: 500}}
                  // style={{fontFamily: ''}}
                >
                  {title}
                </Text>
              )}
              // ListFooterComponent={
              //   <View className="flex-row items-center mb-[100px] gap-[13px]">
              //     <Switch
              //       trackColor={{false: '#E7ECF7', true: '#d75880'}}
              //       thumbColor={true ? '#fff' : '#fff'}
              //       value={accepted}
              //       onValueChange={() => setAccepted(!accepted)}
              //     />
              //     <Text
              //       className="text-[15px] leading-[22px]"
              //       style={{fontFamily: 'Nunito-Regular'}}>
              //       I Accept the{' '}
              //       <Text className="text-[#d75880]">pricing policies</Text>
              //     </Text>
              //   </View>
              // }
            />
            {/* <FooterBtn
          title="Continue"
          onClick={() => navigation.navigate(screens.VetBankDetails)}
        /> */}
          </View>
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['80%']}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="flex p-4 bg-[#white] rounded-t-2xl">
            <Text className="text-lg font-PTSans-Bold ml-[15px] mb-[15px] ">
              Doorstep Visit
            </Text>
            <View className=" flex flex-col gap-[5px] justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-4 mt-4">
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Changes in body temperature
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Behavioural changes
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Altered appetite or thirst
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • vommiting or diarrhea
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • changes in eye appearance
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Cooughing or sneezing
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Changes in breathing pattern
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Lethargy
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Significant weight fluctuations
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Excessive pacing, shaking or whining
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Gestation
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • difficulty in walking or limping
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Itchiness in the ears or on skin
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Urinary changes
              </Text>
              <Text className="text-base font-Nunito-Regular text-[#000000]">
                • Faecal changes
              </Text>
              <Text className="mt-[26px] w-[267px] font-Nunito-Regular text-[#000000]">
                Vet will eaxmine for: Allergy & Dermatology, Orthopaedic
                Assessment, Neurological Consultation, Pain Management{' '}
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

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
          className="h-[60px] bg-primary items-center justify-center rounded-full "
          onPress={() => {
            navigation.navigate(screens.VetRegisterAgreement);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ServicesAndPricings;
