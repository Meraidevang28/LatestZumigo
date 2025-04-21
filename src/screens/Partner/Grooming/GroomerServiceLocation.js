import React from 'react';
import {View, ScrollView} from 'react-native';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import SelectServiceArea from '../../../components/Partner/SelectServiceArea';
import GroomerSelectServiceArea from './GrommerSelectServiceArea';
const GroomerServiceLocation = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6 ">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        {/* Progress bar  */}
        <View className="mt-[15px] mb-2">
          <RegistrationProgressBar screenNo={3} />
        </View>

        <GroomerSelectServiceArea />
      </ScrollView>
      <FooterBtn
        title="Continue"
        onClick={() => navigation.navigate(screens.GroomerSelectServices)}
      />
    </View>
  );
};

export default GroomerServiceLocation;
