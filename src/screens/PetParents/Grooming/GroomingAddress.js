import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';

const GroomingAddress = ({navigation}) => {
  const locationData = [
    {
      id: 1,
      image: images.address2,
      title: 'Hyderabad',
      address:
        'Park View Estate, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034, India',
    },
    {
      id: 2,
      image: images.address2,
      title: 'Bengaluru',
      address:
        'Park View Estate, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034, India',
    },
  ];
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView>
        <Text
          className="text-[24px] font-Nunito-Regular"
          style={{fontWeight: 700}}>
          Select Address
        </Text>
        <View className="mb-[150px]">
          <View className="flex-row items-center bg-white border border-pastelgreyBorder rounded-2xl px-4 py-2 w-full mb-4 mt-3">
            <Image source={images.search} className="h-4 w-4" />
            <View className="w-[1px] h-5 bg-[#A5A4A380] mx-3" />
            <TextInput
              placeholder="Search by..."
              placeholderTextColor="#A5A4A380"
              style={{
                fontFamily: 'Nunito-Regular',
              }}
              className="flex-1 text-gray-600"
            />
          </View>
          <View className="flex flex-row items-center mt-4 gap-2">
            <Image
              source={images.locationIcon}
              style={{width: 24, height: 21}}
            />
            <Text
              className="text-[18px] text-primary font-Nunito-Regular"
              style={{fontWeight: 600}}>
              Use Current Location{' '}
            </Text>
          </View>
          <Text
            className="text-[16px] mt-4 font-Nunito-Regular text-primary"
            style={{fontWeight: 600}}>
            + Add New Address
          </Text>
          <Text
            className="text-[21px] mt-6 font-Nunito-Regular"
            style={{fontWeight: 500}}>
            Saved Addresses
          </Text>
          <View className="bg-[#FFEDF966] mt-3 border border-[#D7588033] px-2 py-4 rounded-[10px]">
            <View className="flex flex-row items-center gap-2">
              <Image source={images.address2} style={{width: 18, height: 22}} />
              <Text
                className="text-[16px] font-Nunito-Regular"
                style={{fontWeight: 600}}>
                Home
              </Text>
            </View>
            <Text
              className="text-[16px] mt-3 ml-2 font-Nunito-Regular"
              style={{fontWeight: 400, lineHeight: 23}}>
              Park View Estate, Road No. 2, Banjara Hills, Hyderabad, Telangana
              500034, India
            </Text>
          </View>
          <FlatList
            data={locationData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View className="bg-[#F2F6F733] border border-[#848A9A33] rounded-[10px] mt-2 px-2 py-4">
                <View className="flex flex-row items-center gap-2">
                  <Image
                    source={images.address2}
                    style={{width: 18, height: 22}}
                  />
                  <Text
                    className="text-[16px] font-Nunito-Regular"
                    style={{fontWeight: 600}}>
                    {item.title}
                  </Text>
                </View>
                <Text
                  className="text-[16px] mt-3 ml-2 font-Nunito-Regular"
                  style={{fontWeight: 400, lineHeight: 23}}>
                  {item.address}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <FooterBtn
        title="Okay"
        onClick={() => {
          navigation.navigate(screens.PreviewProceedPaymentGroomer);
        }}
      />
    </View>
  );
};

export default GroomingAddress;

const styles = StyleSheet.create({});
