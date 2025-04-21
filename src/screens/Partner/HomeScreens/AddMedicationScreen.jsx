import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import TextInputs from '../../../components/vetRegistrationComponents/TextInputs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {useState, useRef, useMemo, useCallback} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../constants/screens';
import {primary} from '../../../assets/theme/colors';

const AddMedicationScreen = () => {
  const navigation = useNavigation();
  const [selectDose, setSelectedDose] = useState([]);
  const Dose = ['Capsule', 'Syrup', 'Injection', 'Powder', 'Ointment', 'Drops'];
  const toggleDoseSelection = dose => {
    setSelectedDose(prev =>
      prev.includes(dose) ? prev.filter(a => a !== dose) : [...prev, dose],
    );
  };
  const [selectTakeMedicine, setSelectedTakeMedicine] = useState([]);
  const takeMedicines = [
    'After Food',
    'Before Food',
    'Any Time',
    'Empty Stomach',
  ];
  const toggleTakeMedicineSelection = takeMedicine => {
    setSelectedTakeMedicine(prev =>
      prev.includes(takeMedicine)
        ? prev.filter(a => a !== takeMedicine)
        : [...prev, takeMedicine],
    );
  };
  const [frequencyOptions, setFrequencyOptions] = useState([
    {label: 'Monthly', highlight: false},
    {label: 'Weekly', highlight: false},
    {label: 'Daily', highlight: false},
    {label: 'Twice a day', highlight: false},
    {label: 'Twice a week', highlight: false},
    {label: 'Every 6 hours', highlight: false},
  ]);
  const handleSelectFrequency = index => {
    setFrequencyOptions(prev =>
      prev.map((item, i) => ({
        ...item,
        highlight: i === index,
      })),
    );
  };
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%'], []);
  const renderItem = useCallback(
    ({item, index}) => (
      <TouchableOpacity
        onPress={() => handleSelectFrequency(index)}
        className="p-4 border-b border-gray-300 flex-row justify-between items-center">
        <Text
          className={
            item.highlight
              ? 'text-red-500 font-Nunito-Regular'
              : 'text-black font-Proxima-Nova-Regular'
          }>
          {item.label}
        </Text>
        {item.highlight && (
          <Image
            source={require('../../../assets/images/footPrint.png')}
            className="w-[19.99px] h-[17.13px]"
          />
        )}
      </TouchableOpacity>
    ),
    [],
  );
  const handleOpenBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };
  const [morningMinusPressed, setMorningMinusPressed] = useState(false);
  const [morningPlusPressed, setMorningPlusPressed] = useState(false);
  const [noonMinusPressed, setNoonMinusPressed] = useState(false);
  const [noonPlusPressed, setNoonPlusPressed] = useState(false);
  const [eveningMinusPressed, setEveningMinusPressed] = useState(false);
  const [eveningPlusPressed, setEveningPlusPressed] = useState(false);
  const [nightMinusPressed, setNightMinusPressed] = useState(false);
  const [nightPlusPressed, setNightPlusPressed] = useState(false);
  const [anytimeMinusPressed, setAnytimeMinusPressed] = useState(false);
  const [anytimePlusPressed, setAnytimePlusPressed] = useState(false);
  const defaultBgColor = 'bg-mediumGrey';
  const pressedBgColor = 'bg-primary';
  const [morningQuantity, setMorningQuantity] = useState(0);
  const [noonQuantity, setNoonQuantity] = useState(0);
  const [eveningQuantity, setEveningQuantity] = useState(0);
  const [nightQuantity, setNightQuantity] = useState(0);
  const [anytimeQuantity, setAnytimeQuantity] = useState(0);
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <View className="flex-1">
            <ScrollView>
              <View className=" h-[58px]  bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mb-[15px]  ">
                <TextInput
                  placeholder="Medication name"
                  placeholderTextColor="#00000080"
                  className="text-[#000000] pl-4 mt-[5px]"
                  style={{lineHeight: 22}}></TextInput>
              </View>
              <View className=" h-[58px]  bg-pastelGrey border border-pastelgreyBorder rounded-[15px] mb-[15px]  ">
                <TextInput
                  placeholder="No of days"
                  placeholderTextColor="#00000080"
                  className="text-[#000000] pl-4 mt-[5px]"
                  style={{lineHeight: 22}}></TextInput>
              </View>
              <TouchableOpacity onPress={handleOpenBottomSheet}>
                <View className=" flex flex-row  items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-2xl h-[58px]  pt-[10px] pb-[10px]  pr-[10px]">
                  <Text
                    className={`text-[16px] ml-[15px] font-Nunito-Regular ${
                      frequencyOptions.find(item => item.highlight)
                        ? 'text-[#000000]' // Highlight color
                        : 'text-[#00000080]' // Default color
                    }`}>
                    {frequencyOptions.find(item => item.highlight)?.label ||
                      'Select Frequency'}
                  </Text>
                  <Image
                    source={require('../../../assets/images/ArrowDown.png')}
                    className=" mr-[25.3px] w-[15px] h-[9px]"
                    style={{tintColor: primary}}
                  />
                </View>
              </TouchableOpacity>

              <Text className="text-[16px] text-[#000000] font-PTSans-Bold mt-[30px] mb-[12px]">
                Take(Dose Form)
              </Text>
              <View className="flex-row flex-wrap gap-2 w-[345px]">
                {Dose.map((dose, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                      selectDose.includes(dose)
                        ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
                        : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
                    }`}
                    onPress={() => toggleDoseSelection(dose)}>
                    <Text
                      className={` text-[16px] leading-6 font-[Nunito-Regular] ${
                        !selectDose.includes(dose)
                          ? ' text-darkGunmetal'
                          : ' text-white'
                      }`}>
                      {dose}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text className="text-[16px] text-[#000000] font-PTSans-Bold mt-[30px] mb-[12px]">
                Schedule
              </Text>
              <View className="w-full flex flex-row  gap-[14.4px]">
                <View className="flex-1 flex flex-col">
                  <Text className="mb-[11.9px]">Morning (Qty)</Text>
                  <View
                    className="flex-1 flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[20px]"
                    style={{
                      paddingHorizontal: wp(2),
                      paddingVertical: hp(),
                    }}>
                    {/* ✅ Minus Button */}
                    <TouchableOpacity
                      className={`rounded-2xl flex items-center justify-center ${
                        morningMinusPressed ? pressedBgColor : defaultBgColor
                      }`}
                      style={{
                        width: wp(10),
                        height: wp(10),
                        margin: wp(1.2),
                      }}
                      onPress={() => {
                        if (morningQuantity > 0) {
                          setMorningMinusPressed(true);
                          setMorningQuantity(morningQuantity - 1);
                        }
                      }}>
                      <Image
                        source={require('../../../assets/images/minusicon.png')}
                        style={{
                          width: wp(5),
                          height: wp(5),
                          tintColor: '#000000',
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    {/* ✅ Quantity Text */}
                    <Text
                      className="text-[16px] text-[#000000] font-Nunito-Bold text-center "
                      style={{
                        marginHorizontal: wp(4),
                        fontSize: wp(4),
                      }}>
                      {morningQuantity}
                    </Text>

                    {/* ✅ Plus Button */}
                    <TouchableOpacity
                      className={`rounded-2xl flex items-center justify-center  ${
                        morningPlusPressed ? pressedBgColor : defaultBgColor
                      }`}
                      style={{
                        width: wp(10),
                        height: wp(10),
                        margin: wp(2),
                      }}
                      onPress={() => {
                        setMorningPlusPressed(true);
                        setMorningQuantity(morningQuantity + 1);
                      }}>
                      <Image
                        source={require('../../../assets/images/Plus-Symbol.png')}
                        style={{
                          width: wp(10),
                          height: wp(5),
                          tintColor: '#000000',
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className=" flex-1 flex flex-col">
                  <Text className="mb-[11.9px]">Noon (Qty)</Text>
                  <View
                    className="flex-1 flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[20px]"
                    style={{
                      paddingHorizontal: wp(2),
                      paddingVertical: hp(),
                    }}>
                    {/* ✅ Minus Button */}
                    <TouchableOpacity
                      className={`rounded-2xl flex items-center justify-center ${
                        noonMinusPressed ? pressedBgColor : defaultBgColor
                      }`}
                      style={{
                        width: wp(10),
                        height: wp(10),
                        margin: wp(1.2),
                      }}
                      onPress={() => {
                        if (noonQuantity > 0) {
                          setNoonMinusPressed(true);
                          setNoonQuantity(noonQuantity - 1);
                        }
                      }}>
                      <Image
                        source={require('../../../assets/images/minusicon.png')}
                        style={{
                          width: wp(5),
                          height: wp(5),
                          tintColor: '#000000',
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    {/* ✅ Quantity Text */}
                    <Text
                      className="text-[16px] text-[#000000] text-center font-Nunito-Bold"
                      style={{
                        marginHorizontal: wp(4),
                        fontSize: wp(4),
                      }}>
                      {noonQuantity}
                    </Text>

                    {/* ✅ Plus Button */}
                    <TouchableOpacity
                      className={`rounded-2xl flex items-center justify-center  ${
                        noonPlusPressed ? pressedBgColor : defaultBgColor
                      }`}
                      style={{
                        width: wp(10),
                        height: wp(10),
                        margin: wp(1.2),
                      }}
                      onPress={() => {
                        setNoonPlusPressed(true);
                        setNoonQuantity(noonQuantity + 1);
                      }}>
                      <Image
                        source={require('../../../assets/images/Plus-Symbol.png')}
                        style={{
                          width: wp(5),
                          height: wp(5),
                          tintColor: '#000000',
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View className="w-full flex flex-row  gap-[14.4px]">
                <View className="flex-1 flex flex-col">
                  <Text className="mb-[11.9px] mt-[22px]">Evening (Qty)</Text>
                  <View
                    className="flex-1 flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[20px]"
                    style={{
                      paddingHorizontal: wp(2),
                      paddingVertical: hp(),
                    }}>
                    {/* ✅ Minus Button */}
                    <TouchableOpacity
                      className={`rounded-2xl flex items-center justify-center ${
                        eveningMinusPressed ? pressedBgColor : defaultBgColor
                      }`}
                      style={{
                        width: wp(10),
                        height: wp(10),
                        margin: wp(1.2),
                      }}
                      onPress={() => {
                        if (eveningQuantity > 0) {
                          setEveningMinusPressed(true);
                          setEveningQuantity(eveningQuantity - 1);
                        }
                      }}>
                      <Image
                        source={require('../../../assets/images/minusicon.png')}
                        style={{
                          width: wp(5),
                          height: wp(5),
                          tintColor: '#000000',
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    {/* ✅ Quantity Text */}
                    <Text
                      className="text-[16px] text-[#000000] font-Nunito-Bold"
                      style={{
                        marginHorizontal: wp(4),
                        fontSize: wp(4),
                      }}>
                      {eveningQuantity}
                    </Text>

                    {/* ✅ Plus Button */}
                    <TouchableOpacity
                      className={`rounded-2xl flex items-center justify-center  ${
                        eveningPlusPressed ? pressedBgColor : defaultBgColor
                      }`}
                      style={{
                        width: wp(10),
                        height: wp(10),
                        margin: wp(1.2),
                      }}
                      onPress={() => {
                        setEveningPlusPressed(true);
                        setEveningQuantity(eveningQuantity + 1);
                      }}>
                      <Image
                        source={require('../../../assets/images/Plus-Symbol.png')}
                        style={{
                          width: wp(5),
                          height: wp(5),
                          tintColor: '#000000',
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex-1 flex flex-col">
                  <Text className="mb-[11.9px] mt-[22px]">Night (Qty)</Text>

                  <View
                    className="flex-1 flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-[20px]"
                    style={{
                      paddingHorizontal: wp(2),
                      paddingVertical: hp(),
                    }}>
                    {/* ✅ Minus Button */}
                    <TouchableOpacity
                      className={`rounded-2xl flex items-center justify-center ${
                        nightMinusPressed ? pressedBgColor : defaultBgColor
                      }`}
                      style={{
                        width: wp(10),
                        height: wp(10),
                        margin: wp(1.2),
                      }}
                      onPress={() => {
                        if (nightQuantity > 0) {
                          setNightMinusPressed(true);
                          setNightQuantity(nightQuantity - 1);
                        }
                      }}>
                      <Image
                        source={require('../../../assets/images/minusicon.png')}
                        style={{
                          width: wp(5),
                          height: wp(5),
                          tintColor: '#000000',
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    {/* ✅ Quantity Text */}
                    <Text
                      className="text-[16px] text-[#000000] font-Nunito-Bold"
                      style={{
                        marginHorizontal: wp(4),
                        fontSize: wp(4),
                      }}>
                      {nightQuantity}
                    </Text>

                    {/* ✅ Plus Button */}
                    <TouchableOpacity
                      className={`rounded-2xl flex items-center justify-center  ${
                        nightPlusPressed ? pressedBgColor : defaultBgColor
                      }`}
                      style={{
                        width: wp(10),
                        height: wp(10),
                        margin: wp(1.2),
                      }}
                      onPress={() => {
                        setNightPlusPressed(true);
                        setNightQuantity(nightQuantity + 1);
                      }}>
                      <Image
                        source={require('../../../assets/images/Plus-Symbol.png')}
                        style={{
                          width: wp(5),
                          height: wp(5),
                          tintColor: '#000000',
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View className="flex flex-col">
                <Text className="mb-[11.9px] mt-[22px]">Any Time (Qty)</Text>
                <View
                  className=" flex-row items-center bg-pastelGrey border border-pastelgreyBorder rounded-[20px]"
                  style={{
                    alignSelf: 'flex-start', // ✅ Center the content horizontally
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f3f6f7',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: wp(2),
                    paddingVertical: hp(),
                  }}>
                  {/* ✅ Minus Button */}
                  <TouchableOpacity
                    className={`rounded-2xl flex items-center justify-center ${
                      anytimeMinusPressed ? pressedBgColor : defaultBgColor
                    }`}
                    style={{
                      width: wp(10),
                      height: wp(10),
                      margin: wp(1.2),
                    }}
                    onPress={() => {
                      if (anytimeQuantity > 0) {
                        setAnytimeMinusPressed(true);
                        setAnytimeQuantity(anytimeQuantity - 1);
                      }
                    }}>
                    <Image
                      source={require('../../../assets/images/minusicon.png')}
                      style={{
                        width: wp(5),
                        height: wp(5),
                        tintColor: '#000000',
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  {/* ✅ Quantity Text */}
                  <Text
                    className="text-[16px] text-[#000000] font-Nunito-Bold"
                    style={{
                      marginHorizontal: wp(4),
                      fontSize: wp(4),
                    }}>
                    {anytimeQuantity}
                  </Text>

                  {/* ✅ Plus Button */}
                  <TouchableOpacity
                    className={`rounded-2xl flex items-center justify-center ${
                      anytimePlusPressed ? pressedBgColor : defaultBgColor
                    }`}
                    style={{
                      width: wp(10),
                      height: wp(10),
                      margin: wp(1.2),
                    }}
                    onPress={() => {
                      setAnytimePlusPressed(true);
                      setAnytimeQuantity(anytimeQuantity + 1);
                    }}>
                    <Image
                      source={require('../../../assets/images/Plus-Symbol.png')}
                      style={{
                        width: wp(5),
                        height: wp(5),
                        tintColor: '#000000',
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-[16px] text-[#000000] font-PTSans-Bold mt-[30px] mb-[12px]">
                To be Taken
              </Text>

              <View className="flex-row flex-wrap gap-2 ">
                {takeMedicines.map((takeMedicine, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                      selectTakeMedicine.includes(takeMedicine)
                        ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
                        : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
                    }`}
                    onPress={() => toggleTakeMedicineSelection(takeMedicine)}>
                    <Text
                      className={` text-[16px] leading-6 font-[Nunito-Regular] ${
                        !selectTakeMedicine.includes(takeMedicine)
                          ? ' text-darkGunmetal'
                          : ' text-white'
                      }`}>
                      {takeMedicine}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text className="text-[16px] text-[#000000] font-PTSans-Bold mt-[30px] mb-[12px]">
                Instructions
              </Text>
              <TextInput
                className=" pl-[15px] h-[98px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl mb-[120px] text-[#000000]"
                placeholder="Notes"
                placeholderTextColor="#00000080"
                textAlignVertical="top"></TextInput>
            </ScrollView>
          </View>
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['50%', '70%']}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="p-4">
            <Text className="text-lg font-semibold text-[18px] font-PTSans-Bold">
              Select Frequency
            </Text>
          </View>
          <FlatList
            data={frequencyOptions}
            keyExtractor={item => item.label}
            renderItem={renderItem}
          />
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
          className="h-[60px] bg-primary items-center justify-center rounded-2xl"
          onPress={() =>
            navigation.navigate(screens.AddMedicationSummaryScreen)
          }>
          <Text className="font-Nunito-Bold mt-[18px] mb-[20px] text-[20px] text-white text-center">
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddMedicationScreen;

const styles = StyleSheet.create({});
