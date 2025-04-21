import {View} from 'react-native';
import React from 'react';

const RegistrationProgressBar = ({screenNo, n = 9}) => {
  const arr = Array.from({length: n}, (_, i) => i + 1);

  return (
    <View className="gap-[3px] flex-row ">
      {arr.map((v, i) => (
        <View
          className={`h-1 flex-1  pl-1 rounded-[10px] ${
            v <= screenNo ? 'bg-primary' : 'bg-pastelPrimary'
          }`}
          key={i}
        />
      ))}
    </View>
  );
};

export default RegistrationProgressBar;
