import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import CustomTextInput from '../../../components/shared/CustomTextInput';
import images from '../../../assets/images';
import screens from '../../../constants/screens';

const GroomerCompanyDetails = ({navigation}) => {
  const [form, setForm] = useState({
    companyName: '',
    pan: '',
    gstin: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500033',
    country: 'India',
  });
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <View className="mt-[15px] mb-2">
          <RegistrationProgressBar screenNo={2} n={6} />
        </View>
        <Text className="text-[14px] text-[#7f7f7f] font-Nunito-Regular mb-[21px]">
          Fill the Company details{' '}
        </Text>

        <CustomTextInput
          placeholder="Company name*"
          value={form.companyName}
          onChangeText={text => setForm({...form, companyName: text})}
        />
        <CustomTextInput
          placeholder="Company PAN*"
          value={form.companyName}
          onChangeText={text => setForm({...form, pan: text})}
        />
        <CustomTextInput
          placeholder="Company GSTIN*"
          value={form.gstin}
          onChangeText={text => setForm({...form, gstin: text})}
        />
        <TouchableOpacity className="flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-2xl py-[16px]">
          <Text className="text-[16px] ml-[15px] text-[#000000] font-Nunito-Regular">
            Upload Company Logo
          </Text>
          <Image
            source={images.upload}
            className="h-[18px] w-[15.81px] mr-[21.1px]"
          />
        </TouchableOpacity>

        {/* address  */}
        <Text className=" mt-5  mb-3 font-Nunito-Bold text-[16px]">
          Company Address
        </Text>
        <CustomTextInput
          placeholder="Address line 1"
          value={form.addressLine1}
          onChangeText={text => setForm({...form, addressLine1: text})}
        />
        <CustomTextInput
          placeholder="Address line 2"
          value={form.addressLine2}
          onChangeText={text => setForm({...form, addressLine2: text})}
        />
        <CustomTextInput
          placeholder="City"
          value={form.city}
          onChangeText={text => setForm({...form, city: text})}
        />
        <CustomTextInput
          placeholder="State"
          value={form.state}
          onChangeText={text => setForm({...form, state: text})}
        />
        <CustomTextInput
          placeholder="Pincode"
          value={form.postalCode}
          onChangeText={text => setForm({...form, postalCode: text})}
        />
        <CustomTextInput
          placeholder="Country"
          value={form.country}
          onChangeText={text => setForm({...form, country: text})}
        />
        <View className=" mb-40" />
      </ScrollView>
      <FooterBtn
        title={'Continue'}
        onClick={() => navigation.navigate(screens.GroomerServiceArea)}
      />
    </View>
  );
};

export default GroomerCompanyDetails;
