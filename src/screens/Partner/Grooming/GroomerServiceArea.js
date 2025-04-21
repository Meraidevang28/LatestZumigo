import {View, ScrollView} from 'react-native';
import React from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import SelectServiceArea from '../../../components/Partner/SelectServiceArea';
import screens from '../../../constants/screens';

const GroomerServiceArea = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <View className="mt-[15px] mb-2">
          <RegistrationProgressBar screenNo={3} n={6} />
        </View>
        <SelectServiceArea />

        <View className=" mb-40" />
      </ScrollView>
      <FooterBtn
        title={'Continue'}
        onClick={() => navigation.navigate(screens.GroomerChooseService)}
      />
    </View>
  );
};

export default GroomerServiceArea;
