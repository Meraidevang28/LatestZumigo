import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import images from '../../../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width} = Dimensions.get('window');

const CONTAINER_WIDTH = width - 32; // margin both side is 16 each
const CAROUSEL_HEIGHT = CONTAINER_WIDTH / 1.8; // Increased height

const CarouselCard = ({item}) => (
  <View className="bg-[#ffdef6] h-full py-9 pl-6 rounded-[19px] mx-4 flex-row justify-between items-center ">
    <View>
      <Text className="text-[#848A9A] font-PTSans-Bold text-[20px] leading-[28.8px] mt-[5px] mb-4">
        ZUMIGO
      </Text>
      <Text className="text-[#848A9A] font-PTSans-Bold text-[17px] leading-[20.4px] mt-[6px]">
        FROM{' '}
        <Text className="text-[#848A9A] font-PTSans-Bold">WOOF TO WOW:</Text>
      </Text>
      <Text className="text-[#848A9A] font-Nunito-Bold text-[15px] leading-[17px] mt-[5px]">
        Transform Your Dog's
      </Text>
      <Text className="text-[#848A9A] font-Nunito-Bold text-[15px] leading-[17px] mt-[3px]">
        Behavior with Us!
      </Text>
      <View className="items-start mt-[15px]">
        <TouchableOpacity className="bg-primary rounded-full py-[8px] px-[18px]">
          <Text className="font-Proxima-Nova-Bold text-white">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>

    <Image
      source={images.petBookNow}
      className="mt-[15px]"
      style={{
        height: hp(40), // ~230 on standard 812 height screen
        width: wp(41), // ~145 on standard 375 width screen
        alignSelf: 'center',
        marginRight: wp(1.5),
      }}
      resizeMode="contain"
    />
  </View>
);
const CTACarousel = ({data}) => {
  const progress = useSharedValue(0);

  return (
    <View className="flex-1 items-center justify-center py-6">
      <Carousel
        loop
        width={width}
        height={CAROUSEL_HEIGHT}
        data={data}
        scrollAnimationDuration={800}
        onProgressChange={progress}
        renderItem={({item}) => <CarouselCard item={item} />}
      />

      {/* ✅ Pagination Dots */}

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{backgroundColor: '#D9D9D9', borderRadius: 99}}
        activeDotStyle={{backgroundColor: '#d75880'}}
        containerStyle={{gap: 8, marginTop: 7}}
      />
    </View>
  );
};

export default CTACarousel;
