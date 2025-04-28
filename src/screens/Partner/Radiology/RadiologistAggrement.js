import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import {launchCamera} from 'react-native-image-picker';
import {PermissionsAndroid, Platform} from 'react-native';
import {primary} from '../../../assets/theme/colors';
const RadiologistAggrement = ({navigation}) => {
  const [accepted, setAccepted] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.warn('Camera permission denied');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'front',
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else if (response.assets?.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <>
      <View className="flex-1 bg-white px-6 ">
        <View className="flex-1">
          <ScrollView
            className=" bg-white "
            showsVerticalScrollIndicator={false}>
            <Text
              className="mb-[15px]  mt-5 text-darkGunmetal text-[26px] font-Nunito-Regular "
              style={{fontWeight: 700}}>
              Agreement
            </Text>
            <Text
              className="text-[12px] opacity-60 leading-[18px] mb-[19px]"
              style={{fontFamily: 'Nunito-Regular'}}>
              Fusce sit amet massa commodo, tincidunt justo at, luctus erat.
              Mauris accumsan magna nec nulla bibendum posuere. Etiam porta
              turpis sit amet risus egestas finibus. Sed efficitur tortor id
              lorem vehicula mollis. Nullam eget efficitur tellus. Ut non
              volutpat nisi. Fusce vel bibendum odio, sit amet maximus purus.
              Nam enim lectus, ultrices at nulla vel, ultrices mollis tellus.
              Morbi eget dignissim metus. Nulla interdum sem sodales lacus
              consectetur pharetra. Suspendisse potenti.
            </Text>

            <Text
              className="text-[12px] opacity-60 leading-[18px] mb-[19px]"
              style={{fontFamily: 'Proxima-Nunito-Regular'}}>
              Nulla sit amet semper metus. Pellentesque venenatis auctor
              euismod. Proin ullamcorper est sem, eget ullamcorper risus
              eleifend quis. Pellentesque at facilisis nulla, sit amet placerat
              dolor. Pellentesque suscipit tempor ullamcorper. Nunc a quam
              posuere, consectetur lectus eu, euismod ipsum. Integer non
              molestie sem. Cras varius suscipit est in ultrices. Suspendisse
              potenti. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Phasellus tincidunt eros
              in quam iaculis, vel scelerisque eros tincidunt. Donec quis
              sodales libero. Quisque at nunc quam.
            </Text>

            <View className="border-y border-pastelGrey py-[14px] pl-[18px]">
              <Text
                className="text-[16px] leading-5 font-Nunito-Regular"
                style={{fontWeight: 500}}>
                Security and privacy
              </Text>
            </View>

            <View className="flex-row items-center mt-[30px] mb-[20px] gap-[13px]">
              <Switch
                trackColor={{false: '#E7ECF7', true: '#d75880'}}
                thumbColor={true ? '#fff' : '#fff'}
                value={accepted}
                onValueChange={() => setAccepted(!accepted)}
              />
              <Text
                className="text-[15px] leading-[22px] font-Nunito-Regular"
                style={{fontWeight: 400}}>
                I Accept the Terms & Conditions
              </Text>
            </View>
            <View className="flex flex-col px-4 gap-[13px] mb-[10px] justify-between bg-[#F2F6F733] border border-[#BBBCB733] py-4 rounded-[20px]">
              {/* <View className="flex flex-row items-center justify-between"> */}
              {/* <View className="flex flex-row px-2 gap-10 items-center">
                <TouchableOpacity onPress={openCamera}>
                  <Image
                    source={require('../../../assets/images//DummyImages/camerarear.png')}
                    className="w-[25px] h-[25px]"
                    style={{tintColor: '#d75880'}}
                  />
                </TouchableOpacity>
                <Text className="text-[15px] leading-[22px] font-Nunito-Bold text-primary">
                  Take a Selfie
                </Text>
                <Image
                  source={require('../../../assets/images/DummyImages/MobileDogFinal.png')}
                />
              </View> */}
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row gap-2 items-center">
                  <TouchableOpacity onPress={openCamera}>
                    <Image
                      source={require('../../../assets/images//DummyImages/camerarear.png')}
                      className="w-[25px] h-[25px]"
                      style={{tintColor: '#d75880'}}
                    />
                  </TouchableOpacity>
                  <Text className="text-[15px] leading-[22px] font-Nunito-Bold text-primary">
                    Take a Selfie
                  </Text>
                </View>
                <View>
                  <Image
                    source={require('../../../assets/images/DummyImages/MobileDogFinal.png')}
                  />
                </View>
              </View>

              {/* </View> */}

              {imageUri && (
                <View>
                  <TouchableOpacity
                    onPress={() => setImageUri(null)}
                    style={{top: 5, left: 20}}>
                    <View
                      style={{
                        backgroundColor: primary, // You can change this to the desired color
                        borderRadius: 50, // Creates a circular shape
                        width: 20, // Adjust size
                        height: 20, // Adjust size
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: 40,
                        top: 10,
                      }}>
                      <Text className="text-white text-[15px] font-Nunito-Bold">
                        X
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Image
                    source={{uri: imageUri}}
                    className="w-[70px] h-[70px] rounded-[20px] mt-2"
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      {accepted && (
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
            className="h-[60px] bg-primary items-center justify-center rounded-full"
            onPress={() => {
              navigation.navigate(screens.Dashboard);
            }}>
            <Text className="text-[20px] text-white font-Nunito-Bold text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default RadiologistAggrement;
