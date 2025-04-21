import {View, Dimensions} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;

const waveWidth = windowWidth / 7;

const WaveSvg = () => {
  return (
    <View className=" ">
      <Svg
        height="33"
        width={`${windowWidth}`}
        viewBox={`0 0 ${windowWidth} 33`}>
        <Path
          d={`M 0 16 q   25 25 ${waveWidth} 0 q 25 -25 ${waveWidth} 0 q 25 25 ${waveWidth} 0 q 25 -25 ${waveWidth} 0 q 25 25 ${waveWidth} 0  q 25 -25 ${waveWidth} 0 q 25 25 ${waveWidth} 0 l 0 15 l -880 0 z`}
          stroke="rgb(225, 225, 225)"
          strokeWidth="2"
          fill="rgb(225, 225, 225)"
        />
      </Svg>
    </View>
  );
};

export default WaveSvg;
