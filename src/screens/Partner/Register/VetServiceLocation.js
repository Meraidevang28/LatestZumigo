import React from 'react';
import {View, ScrollView} from 'react-native';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import SelectServiceArea from '../../../components/Partner/SelectServiceArea';

const VetServiceLocation = ({navigation}) => {
  return (
    <View className="flex-1 bg-white px-6 ">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        {/* Progress bar  */}
        <View className="mt-[15px] mb-2">
          <RegistrationProgressBar screenNo={3} />
        </View>

        <SelectServiceArea />
      </ScrollView>
      <FooterBtn
        title="Continue"
        onClick={() => navigation.navigate(screens.AddSpecialisation)}
      />
    </View>
  );
};

export default VetServiceLocation;
