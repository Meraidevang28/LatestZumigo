import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import images from '../../../assets/images';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {primary} from '../../../assets/theme/colors';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
const SelectGroomer = ({navigation}) => {
  const [selectedGroomerId, setSelectedGroomerId] = useState(null);
  const groomerData = [
    {
      id: 1,
      image: images.groomer1,
      title: 'Petfolk',
      sub_title: 'Pet Grooming Salon',
      rating: '4.4/5',
      review: '(314 Review)',
      footer: 'More Details',
    },
    {
      id: 2,
      image: images.groomer2,
      title: 'Just Groom',
      sub_title: 'Best Luxury Pet Spa & Salon',
      rating: '4.9/5',
      review: '(314 Review)',
      footer: 'More Details',
    },
    {
      id: 3,
      image: images.groomer3,
      title: 'Bubbles for Cuddles',
      sub_title: 'Pet Spa & Store',
      rating: '4.2/5',
      review: '(314 Review)',
      footer: 'More Details',
    },
    {
      id: 4,
      image: images.groomer4,
      title: 'Happy Pet Grooming',
      sub_title: 'Pet Groomer',
      rating: '4.0/5',
      review: '(314 Review)',
      footer: 'More Details',
    },
  ];
  const bottomSheetRef = useRef(null);

  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView>
        <Text
          className="text-[24px] font-Nunito-Regular"
          style={{fontWeight: 700}}>
          Select a Groomer
        </Text>
        <Text
          className="text-[16px] text-[#838999] font-Nunito-Regular mt-1"
          style={{fontWeight: 500}}>
          Groomers offering ‘Fresh & Clean’ service
        </Text>
        <View className="flex-row items-center bg-white border border-pastelgreyBorder rounded-2xl px-4 py-1 w-full mb-4 mt-3">
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
        <View className="mb-[150px]">
          <FlatList
            data={groomerData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              const isSelected = selectedGroomerId === item.id;
              return (
                <TouchableOpacity
                  onPress={() =>
                    setSelectedGroomerId(prev =>
                      prev === item.id ? null : item.id,
                    )
                  }
                  className={`py-5 flex flex-row items-center justify-between gap-4 mb-4 border border-[#848A9A33] rounded-[20px]`}
                  style={{
                    backgroundColor: isSelected ? '#FFEDF966' : '#F2F6F7',
                    borderColor: isSelected ? '#D7588033' : '#848A9A33',
                  }}>
                  <Image
                    source={item.image}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: 'contain',
                      marginLeft: 10,
                    }}
                  />

                  <View style={styles.textContent}>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-[20px] text-[#333333] font-PTSans-Bold">
                        {item.title}
                      </Text>

                      {/* 🐾 Show paw icon if selected */}
                      {isSelected && (
                        <Image
                          source={images.footPrint} // make sure this is in your images object
                          style={{width: 20, height: 20, marginRight: 20}}
                        />
                      )}
                    </View>

                    <Text
                      className="text-[15px] text-[#838999] font-Nunito-Regular"
                      style={{fontWeight: '400'}}>
                      {item.sub_title}
                    </Text>

                    <View className="flex flex-row items-center gap-2 mt-2">
                      <Image
                        source={images.star}
                        style={{width: 20, height: 20}}
                      />
                      <Text
                        className="text-[16px] text-primary font-Nunito-Regular"
                        style={{fontWeight: '700'}}>
                        {item.rating}
                      </Text>
                      <Text className="text-[14px] text-[#838999] font-Nunito-Regular">
                        {item.review}
                      </Text>
                    </View>

                    <TouchableOpacity onPress={openModal}>
                      <Text
                        className="text-[16px] font-Nunito-Regular text-[#D75880] underline mt-[7px]"
                        style={{fontWeight: '600'}}>
                        {item.footer}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
      <FooterBtn
        title="Book Appointment"
        onClick={() => navigation.navigate(screens.SelectDateTimeGroomer)}
      />
    </View>
  );
};

export default SelectGroomer;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  box: {
    // backgroundColor: '#fff',
    // borderRadius: 12,
    // padding: 12,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 4,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  image: {
    width: 80,
    height: 83,
    borderRadius: 12,
    marginRight: 12,
    left: 10,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333333',
  },
  subtitle: {
    color: '#666',
    marginBottom: 4,
  },
  description: {
    color: '#999',
  },
});
