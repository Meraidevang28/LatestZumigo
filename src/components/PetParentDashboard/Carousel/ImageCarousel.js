import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const CONTAINER_WIDTH = width - 32; // margin both side is 16 each

const ImageCarousel = ({data, aspectRatio}) => {
  const progress = useSharedValue(0);

  return (
    <View className="flex-1">
      <Carousel
        loop
        width={width}
        height={CONTAINER_WIDTH / aspectRatio}
        data={data}
        scrollAnimationDuration={800}
        onProgressChange={progress}
        renderItem={({item}) => (
          <View className=" mx-4 h-full">
            <Image
              source={item.image}
              className=" h-full w-full"
              resizeMode="contain"
            />
          </View>
        )}
      />

      {/* ✅ Pagination Dots */}

      <Pagination.Custom
        progress={progress}
        data={data}
        size={10}
        dotStyle={{
          borderRadius: 99,
          backgroundColor: '#00000033',
        }}
        activeDotStyle={{
          borderRadius: 5,
          width: 40,
          height: 10,
          overflow: 'hidden',
          backgroundColor: '#d75880',
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

export default ImageCarousel;
