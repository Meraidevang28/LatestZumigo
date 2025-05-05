import React, {useEffect} from 'react';
import './global.css';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation';
import store from './src/state/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import images from './src/assets/images';

// 🔒 Disable font scaling globally
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const toastConfig = {
  successfullyToast: ({text1, text2, props}) => (
    <View
      style={{
        width: '100%',
        marginHorizontal: 24,
      }}>
      <View className=" bg-[#47B553] border border-[#6BD376] mx-6 flex-row rounded-2xl p-4 items-center justify-between">
        <View className=" flex-row gap-4 items-center">
          <Image
            source={images.checkmark}
            className="h-6 w-6"
            resizeMode="contain"
          />
          <View>
            <Text className=" text-white  font-Nunito-Regular text-[16px]">
              {text1}
            </Text>
            <Text className=" text-white font-Nunito-Regular text-[16px]">
              {text2}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => Toast.hide()}>
          <Text className=" text-white font-Nunito-Bold text-[18px]">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),
};
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      </BottomSheetModalProvider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
};

export default App;
