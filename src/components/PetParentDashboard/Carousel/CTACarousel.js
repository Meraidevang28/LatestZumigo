import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import images from '../../../assets/images';

const {width} = Dimensions.get('window');

const CONTAINER_WIDTH = width - 32; // margin both side is 16 each

const CarouselCard = ({item}) => (
  <View className="bg-[#ffdef6]  pl-[15px] rounded-[19px] mx-4 h-full flex-row justify-between">
    <View>
      <Text className="text-[#848A9A] font-PTSans-Bold text-[20px] leading-[28.8px] mt-[10px]">
        ZUMIGO
      </Text>
      <Text className="text-[#848A9A] font-PTSans-Bold text-[17px] leading-[20.4px] mt-[6px]">
        FROM{' '}
        <Text className=" text-[#848A9A] font-PTSans-Bold ">WOOF TO WOW:</Text>
      </Text>
      <Text className="text-[#848A9A]  font-Nunito-Bold text-[15px] leading-[17px] mt-[5px]">
        Transform Your Dog's
      </Text>
      <Text className="text-[#848A9A]  font-Nunito-Bold text-[15px] leading-[17px] mt-[3px]">
        Behavior with Us!
      </Text>
      <View className=" items-start mt-[5px]">
        <TouchableOpacity className=" bg-primary rounded-[10px] py-[8px] px-[18px] ">
          <Text className=" font-Proxima-Nova-Bold text-white">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Image
      source={images.petBookNow}
      style={{height: '110%', alignSelf: 'center', marginRight: 5}}
      resizeMode="contain"
    />
  </View>
);
const CTACarousel = ({data}) => {
  const progress = useSharedValue(0);

  return (
    <View className="flex-1 items-center justify-center">
      <Carousel
        loop
        width={width}
        height={CONTAINER_WIDTH / 2.18} // here 2.18 is aspect ratio
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
