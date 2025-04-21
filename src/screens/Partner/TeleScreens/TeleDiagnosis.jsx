import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useCallback} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import screens from '../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
const TeleDiagnosis = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);
  const digestiveSystem = [
    'Diarrhea',
    'Decreased appetite',
    'Vomiting',
    'Swallowing & chewing issues',
    'Inter parasities',
  ];
  const skinfur = [
    'Rashes, redness',
    'Wounds',
    'Allergies',
    'Dry hair & flaky skin',
  ];
  const eyesears = ['Watery eyes', 'Eye Discharge', 'Sore eyes', 'Glaucoma'];

  const [note, setNote] = useState('');
  const {width} = Dimensions.get('window');
  const NUM_COLUMNS = 3;
  const ITEM_SIZE = (width - 100) / NUM_COLUMNS; // Ensures square shape
  const [selectedSystem, setSelectedSystem] = useState([]);
  const toggledigestiveSystem = area => {
    setSelectedSystem(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area],
    );
  };
  const [selectedSkin, setSelectedSkin] = useState([]);
  const toggleSkinFurSystem = area => {
    setSelectedSkin(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area],
    );
  };
  const [selectedEyes, setSelectedEyes] = useState([]);
  const toggleEyesSystem = area => {
    setSelectedEyes(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area],
    );
  };
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <View className="flex-1">
            <ScrollView>
              <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl ">
                <View className="flex flex-row items-center pl-[15px] ">
                  <Image
                    source={require('../../../assets/images/search.png')}
                    className="w-[16px] h-[16px]"
                  />
                  <Text className="ml-[11.1px] text-[#A5A4A3] ">|</Text>
                  <TextInput
                    placeholder="Search by..."
                    placeholderTextColor="#00000080"
                    className="ml-[12px] text-[#000000] pt-[14px] pb-[15px]"></TextInput>
                </View>
              </View>
              <Text className="text-[16px] font-PTSans-Bold text-[#000000] mt-[30px] mb-[12px]">
                DIGESTIVE SYSTEM
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {digestiveSystem.map((area, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                      selectedSystem.includes(area)
                        ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
                        : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
                    }`}
                    onPress={() => toggledigestiveSystem(area)}>
                    <Text
                      className={` text-[16px] leading-6 font-[Nunito-Regular] ${
                        !selectedSystem.includes(area)
                          ? ' text-darkGunmetal'
                          : ' text-white'
                      }`}>
                      {area}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text className="text-[16px] font-PTSans-Bold text-[#000000] mt-[30px] mb-[12px]">
                SKIN & FUR
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {skinfur.map((area, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                      selectedSkin.includes(area)
                        ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
                        : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
                    }`}
                    onPress={() => toggleSkinFurSystem(area)}>
                    <Text
                      className={` text-[16px] leading-6 font-[Nunito-Regular] ${
                        !selectedSkin.includes(area)
                          ? ' text-darkGunmetal'
                          : ' text-white'
                      }`}>
                      {area}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex flex-row items-center mt-[30px] mb-[12px] gap-[5px]">
                <Text className="text-[16px] font-PTSans-Bold text-[#000000] ">
                  EYES & EARS
                </Text>
                <Text className="text-[12px] font-Nunito-Regular text-[#7f7f7f]">
                  (Note: Indicate Left Or Right Eye / BOTH)
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2 mb-[90px]">
                {eyesears.map((area, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                      selectedEyes.includes(area)
                        ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
                        : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
                    }`}
                    onPress={() => toggleEyesSystem(area)}>
                    <Text
                      className={` text-[16px] leading-6 font-[Nunito-Regular] ${
                        !selectedEyes.includes(area)
                          ? ' text-darkGunmetal'
                          : ' text-white'
                      }`}>
                      {area}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          {/* <FooterBtn title="Next" onClick={openModal} /> */}

          <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={['50%', '60']}
            backdropComponent={({style}) => (
              <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
            )}>
            <BottomSheetView>
              <View className="flex p-4 bg-[#white] rounded-t-2xl">
                <Text className="text-lg font-PTSans-Bold ml-[15px] mb-[15px] ">
                  Description
                </Text>
                <View className=" h-[98px] flex flex-col gap-[5px] justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-4 mt-4">
                  <TextInput
                    placeholder="Notes"
                    placeholderTextColor="#00000080"
                    textAlignVertical="top"
                    className="text-[#000000]"></TextInput>
                </View>
              </View>
              <View className=" px-6 mb-[20px]">
                <TouchableOpacity
                  className="bg-primary items-center justify-center h-[56px] rounded-2xl"
                  onPress={() => {
                    navigation.navigate(screens.TeleConsultScreen, {
                      digestiveSystem: selectedSystem,
                      skinFur: selectedSkin,
                      eyesEars: selectedEyes,
                      note: note,
                    });
                  }}>
                  <Text className="text-[20px] text-white font-Nunito-Bold text-center">
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
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
            onPress={openModal}>
            <Text className="font-Nunito-Bold mt-[18px] mb-[20px] text-[20px] text-white text-center">
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModalProvider>
    </>
  );
};

export default TeleDiagnosis;
