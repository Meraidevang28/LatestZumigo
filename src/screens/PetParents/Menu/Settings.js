import {View, Text, Switch} from 'react-native';
import React from 'react';

let setting = [
  'Show reminder notification',
  'Enable biometric',
  'Enable location',
];
const Settings = () => {
  return (
    <View className="flex-1 bg-white px-6">
      <View className="mt-[15px]">
        {setting.map(settingItem => (
          <View
            className=" p-4 bg-pastelGrey border border-pastelgreyBorder rounded-2xl flex-row justify-between items-center mb-[10px]"
            key={settingItem}>
            <Text
              className="text-[16px] font-medium text-darkGunmetal "
              style={{fontFamily: 'Proxima-Nova-Medium'}}>
              {settingItem}
            </Text>
            <Switch
              trackColor={{false: '#fff', true: '#d75880'}}
              thumbColor={true ? '#fff' : '#fff'}
              value={true}
              style={{marginVertical: -12}}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Settings;
