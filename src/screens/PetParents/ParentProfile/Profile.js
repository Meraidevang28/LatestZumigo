import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';

const profileData = [
  {id: '1', icon: images.Account, label: 'Jone Smith'},
  {id: '2', icon: images.secondaryCall, label: '+91 9916347786'},
  {id: '3', icon: images.email, label: 'jonesmith@hotmail.com'},
];

const Profile = ({navigation}) => {
  const renderItem = ({item}) => (
    <View className="flex-row items-center py-4">
      <Image
        source={item.icon}
        className=" h-[14px] w-6"
        resizeMode="contain"
      />
      <Text className="ml-2 text-base">{item.label}</Text>
    </View>
  );
  return (
    <View className="flex-1 bg-white px-6">
      {/* Profile Card */}
      <View className=" bg-pastelGrey px-4 rounded-xl border border-pastelgreyBorder">
        <FlatList
          data={profileData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View className="border-b-[0.5px] border-gray-300" />
          )}
        />
      </View>

      <FooterBtn
        title="Edit"
        onClick={() => navigation.navigate(screens.EditProfile)}
      />
    </View>
  );
};

export default Profile;
