import {View, Text} from 'react-native';
import React, {useState} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import CustomTextInput from '../../../components/shared/CustomTextInput';

const EditProfile = ({navigation}) => {
  const [firstName, setFirstName] = useState('Jone');
  const [lastName, setLastName] = useState('Smith');
  const [phone, setPhone] = useState('+91 9916347786');
  const [email, setEmail] = useState('jonesmith@hotmail.com');
  return (
    <View className="flex-1 bg-white px-6">
      <CustomTextInput
        value={firstName}
        placeholder="First name*"
        onChangeText={setFirstName}
      />

      <CustomTextInput
        placeholder="Last name*"
        value={lastName}
        onChangeText={setLastName}
      />

      <CustomTextInput
        value={phone}
        placeholder="Mobile No.*"
        onChangeText={setPhone}
      />

      <CustomTextInput
        placeholder="Email*"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <FooterBtn title="Save" onClick={() => navigation.goBack()} />
    </View>
  );
};

export default EditProfile;
