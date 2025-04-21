import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Dimensions} from 'react-native';
const CustomSvg = () => {
  const {width} = Dimensions.get('window');
  return (
    <Svg
      viewBox="0 -12 408 129"
      width={width}
      height={72} // Adjust this based on how tall your wave/background should be
      preserveAspectRatio="none" // Use none to force it to stretch instead of cropping
    >
      <Path
        d="M0,642.5V21.4c48.4-29.8,103.4-25,187.8,42.9c67.5,54.4,174.6,36.2,219.8,20.3c0.3,162.9,0.8,501.4,0,551.9
        c-0.8,50.5-20,66.4-29.5,67.9c-109.4,0.4-332.5,1-350.1,0C10.4,703.5,2,662.8,0,642.5z"
        fill="white"
      />
    </Svg>
  );
};

export default CustomSvg;
