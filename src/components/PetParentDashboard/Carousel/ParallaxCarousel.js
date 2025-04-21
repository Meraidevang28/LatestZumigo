import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import images from '../../../assets/images';

const {width} = Dimensions.get('window');

const CONTAINER_WIDTH = width - 32; // margin both side is 16 each

const ParallaxCarousel = ({data}) => {
  const progress = useSharedValue(0);

  return (
    <View className="flex-1 bg-[#c9c9c5] py-4">
      <Carousel
        loop
        width={width}
        height={282}
        data={[1, 2, 3]}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 175,
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 0.8,
        }}
        scrollAnimationDuration={800}
        onProgressChange={progress}
        renderItem={({item}) => (
          <View className="h-full">
            <Image
              source={images.off50}
              className=" h-[282px] w-full"
              resizeMode="contain"
            />
          </View>
        )}
      />

      {/* ✅ Pagination Dots */}

      <Pagination.Custom
        progress={progress}
        data={[1, 2, 3]}
        size={10}
        dotStyle={{
          borderRadius: 99,
          backgroundColor: '#FFFDFD1A',
        }}
        activeDotStyle={{
          borderRadius: 5,
          width: 40,
          height: 10,
          overflow: 'hidden',
          backgroundColor: '#FE6471',
        }}
        containerStyle={{
          gap: 10,
          marginTop: 10,
        }}
        horizontal
      />
    </View>
  );
};

export default ParallaxCarousel;
