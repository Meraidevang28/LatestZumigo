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
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {useState, useRef, useMemo, useCallback} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../constants/screens';
const RadiologyScreen = () => {
  const [uploadBtnPressed, setUploadBtnPressed] = useState(false);
  const toggleBtn = () => {
    const newImage = require('../../../assets/images/DummyImages/XRayImage.png');

    // ✅ Add the new image to the array without removing the old one
    setImages(prevImages => [...prevImages, newImage]);
  };
  const [images, setImages] = useState([]);
  const frequencyOptions = [
    {label: 'X-rays', highlight: false},
    {label: 'Chest X-rays ', highlight: false},
    {label: 'Orthopaedic X-rays', highlight: false},
    {label: 'Abdominal X-rays ', highlight: true},
    {label: 'Dental X-rays', highlight: false},
  ];
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%'], []);
  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity className="p-4 border-b border-gray-300 flex-row justify-between items-center">
        <Text
          className={
            item.highlight
              ? 'text-red-500 font-Nunito-Regular '
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
  const navigation = useNavigation();
  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <View className="flex-1">
            <TouchableOpacity onPress={handleOpenBottomSheet}>
              <View className=" flex flex-row  items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-2xl h-[58px]  pt-[10px] pb-[10px] pl-[10px] pr-[10px]">
                <Text className="text-[16px] text-[#000000] ml-[15px] font-Nunito-Bold">
                  Abdominal X-rays
                </Text>
                <Image
                  source={require('../../../assets/images/ArrowDown.png')}
                  className="mr-[25.3px] w-[11.97px] h-[7.09px]"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleBtn}>
              <View className="flex flex-row w-[139px] h-[46px] mt-[20px] items-center gap-[10px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                <Image
                  source={require('../../../assets/images/secondaryAdd.png')}
                  className="w-[18px] h-[18px] ml-[20px]"
                />
                <Text className="text-[14px] font-Nunito-Regular text-[#6319C4]">
                  Upload file
                </Text>
              </View>
            </TouchableOpacity>
            <View className="flex flex-row flex-wrap gap-2 mt-[20px]">
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={image}
                  className="w-[71px] h-[72px] ml-[5px]"
                />
              ))}
            </View>
            <Text className="text-[16px] font-PTSans-Bold text-[#000000] mt-[30px]">
              Notes
            </Text>
            <TextInput
              className=" pl-[15px] mt-[10px] pt-0 h-[98px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl "
              placeholder="Enter"
              placeholderTextColor="#00000080"></TextInput>
            {/* <FooterBtn
          title="Add"
          onClick={() => {
            navigation.navigate(screens.InProgressHomeVisit5);
          }}
        /> */}
          </View>
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['50%', '60']}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="p-4">
            <Text className="text-lg font-PTSans-Bold">Lab Diagnostic</Text>
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
          onPress={() => navigation.navigate(screens.InProgressHomeVisit5)}>
          <Text className="font-Nunito-Bold mt-[18px] mb-[20px] text-[20px] text-white text-center">
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RadiologyScreen;

const styles = StyleSheet.create({});
