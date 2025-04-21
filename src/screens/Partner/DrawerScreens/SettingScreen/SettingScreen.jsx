import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import {primary} from '../../../../assets/theme/colors';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const SettingScreen = () => {
  const languages = [
    {
      id: 1,
      language: 'English',
    },
    {
      id: 2,
      language: 'Hindi',
    },
    {
      id: 3,
      language: 'Tamil',
    },
    {
      id: 4,
      language: 'Kannada',
    },
    {
      id: 5,
      language: 'Malayalam',
    },
  ];
  const languageBottomSheetRef = useRef(null);
  const languageSnapPoint = useMemo(() => ['80%'], []);
  const languageOpenModal = useCallback(() => {
    languageBottomSheetRef.current?.present();
  }, []);
  const languageCloseModal = useCallback(() => {
    languageBottomSheetRef.current?.dismiss();
  }, []);
  const [isEnabled, setIsEnabled] = useState({}); // Track switch state per language

  const toggleSwitch = id => {
    setIsEnabled(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const [isEnabledSettings, setIsEnabledSettings] = useState({
    notification: false,
    biometric: false,
    location: false,
  }); // Track switch state per language
  const toggleMainSwitch = key => {
    setIsEnabledSettings(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  return (
    <BottomSheetModalProvider>
      <View className="flex-1 bg-white px-6">
        <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[20px]">
          <View className="flex flex-row justify-between items-center mt-[20px] ml-[16px] mb-[20px]">
            <Text className="text-[15px] font-Nunito-Bold">
              Show remainder notification
            </Text>
            <Switch
              trackColor={{false: '#767577', true: primary}}
              thumbColor={
                isEnabledSettings.notification ? '#f7f7f7' : '#f4f3f4'
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleMainSwitch('notification')}
              value={isEnabledSettings.notification}
              className="mr-[12px]"
            />
          </View>
        </View>
        <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[20px]">
          <View className="flex flex-row justify-between items-center mt-[20px] ml-[16px] mb-[20px]">
            <Text className="text-[15px] font-Nunito-Bold">
              Enable biometric
            </Text>
            <Switch
              trackColor={{false: '#767577', true: primary}}
              thumbColor={isEnabledSettings.biometric ? '#f7f7f7' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleMainSwitch('biometric')}
              value={isEnabledSettings.biometric}
              className="mr-[12px]"
            />
          </View>
        </View>
        <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[20px]">
          <TouchableOpacity onPress={languageOpenModal}>
            <View className="flex flex-row justify-between items-center mt-[20px] ml-[16px] mb-[20px]">
              <Text className="text-[15px] font-Nunito-Bold">Language</Text>
              <Image
                source={require('../../../../assets/images/rightArrow.png')}
                className="mr-[12px] w-[8px] h-[11px]"
                style={{tintColor: primary}}
              />
            </View>
          </TouchableOpacity>
          <BottomSheetModal
            ref={languageBottomSheetRef}
            snapPoints={languageSnapPoint}
            backdropComponent={({style}) => (
              <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
            )}>
            <BottomSheetView>
              <View className="flex flex-row justify-between items-center p-4 bg-[#white] rounded-t-2xl">
                <Text className="text-[15px] text-[#000000] font-PTSans-Bold">
                  Select Language
                </Text>
              </View>
              <View className="p-4 bg-white flex flex-col gap-[10px] rounded-b-2xl">
                {languages.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    className="flex flex-row justify-between items-center py-3 px-4 bg-pastelGrey border border-pastelgreyBorder rounded-2xl"
                    onPress={() => console.log(`Selected: ${item.language}`)}>
                    <Text className="text-[16px] text-black font-Nunito-Regular">
                      {item.language}
                    </Text>
                    <Switch
                      trackColor={{false: '#767577', true: primary}}
                      thumbColor={isEnabled[item.id] ? '#f7f7f7' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => toggleSwitch(item.id)}
                      value={isEnabled[item.id] || false}
                      className="mr-[12px]"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
        <View className="] bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[20px]">
          <View className="flex flex-row justify-between items-center mt-[20px] ml-[16px] mb-[20px]">
            <Text className="text-[15px] font-Nunito-Bold">
              Enable Location
            </Text>
            <Switch
              trackColor={{false: '#767577', true: primary}}
              thumbColor={isEnabledSettings.location ? '#f7f7f7' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleMainSwitch('location')}
              value={isEnabledSettings.location}
              className="mr-[12px]"
            />
          </View>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
