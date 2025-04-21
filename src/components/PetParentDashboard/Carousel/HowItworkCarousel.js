// import React from 'react';
// import {View, Image, Text, Dimensions} from 'react-native';
// import Carousel, {Pagination} from 'react-native-reanimated-carousel';
// import {useSharedValue} from 'react-native-reanimated';

// const {width} = Dimensions.get('window');
// const CONTAINER_WIDTH = width - 32; // 16px margin on both sides

// const HowItworkCarousel = ({data, aspectRatio = 1.2}) => {
//   const progress = useSharedValue(0);

//   return (
//     <View className="flex-1">
//       <Carousel
//         loop
//         width={width}
//         height={CONTAINER_WIDTH / aspectRatio}
//         data={data}
//         scrollAnimationDuration={800}
//         onProgressChange={progress}
//         renderItem={({item, index}) => (
//           <View className="bg-white h-[300px] rounded-xl border border-[#E6E7E9]">
//             {/* Index + Image Wrapper with Border */}
//             <View className="border border-[#E6E7E9] rounded-xl mx-4 mt-4 pb-2">
//               {/* Number Badge */}
//               <View className="absolute top-2 left-2 bg-[#D1D1D1] rounded-[10px] px-4 py-3 z-10">
//                 <Text className="text-black text-xs font-semibold">
//                   {index + 1}
//                 </Text>
//               </View>

//               {/* Image */}
//               <Image
//                 source={item.image}
//                 resizeMode="contain"
//                 className="w-full h-[160px] mt-3"
//               />
//             </View>

//             {/* Title and Description */}
//             <View className="px-6 mt-3">
//               <Text className="text-black font-Nunito-Bold text-[16px] mb-1">
//                 {item.title}
//               </Text>
//               <Text className="text-black font-Nunito-Regular text-[16px]">
//                 {item.descriptionPrefix}
//                 <Text className="font-bold font-Nunito-Bold">
//                   {item.descriptionBold}
//                 </Text>
//               </Text>
//             </View>
//           </View>
//         )}
//       />

//       {/* Pagination Dots */}
//       <Pagination.Custom
//         progress={progress}
//         data={data}
//         size={10}
//         dotStyle={{
//           borderRadius: 99,
//           backgroundColor: '#00000033',
//         }}
//         activeDotStyle={{
//           borderRadius: 5,
//           width: 40,
//           height: 10,
//           overflow: 'hidden',
//           backgroundColor: '#d75880',
//         }}
//         containerStyle={{
//           gap: 10,
//           marginTop: 10,
//         }}
//         horizontal
//       />
//     </View>
//   );
// };

// export default HowItworkCarousel;
import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const CONTAINER_WIDTH = width - 32; // 16px margin on both sides
const BASE_HEIGHT = CONTAINER_WIDTH / 1.1; // adjust aspectRatio as needed

const HowItworkCarousel = ({data, aspectRatio = 1.2}) => {
  const progress = useSharedValue(0);

  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={BASE_HEIGHT}
        data={data}
        scrollAnimationDuration={800}
        onProgressChange={progress}
        renderItem={({item, index}) => (
          <View
            style={{
              backgroundColor: '#fff',
              height: BASE_HEIGHT,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#E6E7E9',
              overflow: 'hidden',
              paddingVertical: 8,
            }}>
            {/* Index + Image Border */}
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E6E7E9',
                borderRadius: 16,
                marginHorizontal: 16,
                marginTop: 12,
                paddingBottom: 8,
              }}>
              {/* Number Badge */}
              <View
                style={{
                  position: 'absolute',
                  top: -10,
                  left: -8,
                  backgroundColor: '#D1D1D1',
                  borderRadius: 8,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  zIndex: 10,
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 12, fontWeight: '600', color: '#000'}}>
                  {index + 1}
                </Text>
              </View>

              {/* Image */}
              <Image
                source={item.image}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: BASE_HEIGHT * 0.55, // about 55% of card height
                  marginTop: 12,
                }}
              />
            </View>

            {/* Text Content */}
            <View
              style={{
                paddingHorizontal: 18,
                marginTop: 12,
                marginBottom: 22,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: width * 0.04, // roughly 16px on standard devices
                  fontWeight: '700',
                  marginBottom: 4,
                }}>
                {item.title}
              </Text>
              {/* <Text
                style={{
                  color: '#000',
                  fontSize: width * 0.038,
                }}>
                {item.descriptionPrefix}
                <Text style={{fontWeight: '700'}}>{item.descriptionBold}</Text>
              </Text> */}
              <Text
                style={{
                  color: '#000',
                  fontSize: width * 0.035,
                  marginBlock: 4,
                }}>
                {item.descriptionPrefix}
                {item.descriptionBold && (
                  <Text style={{fontWeight: '700'}}>
                    {item.descriptionBold}
                  </Text>
                )}
                {item.descriptionSuffix || ''}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Pagination Dots */}
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

export default HowItworkCarousel;
