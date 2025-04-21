import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';

const AddvertisementCards = () => {
  return (
    <View className="mt-[51px] flex items-center justify-center mb-[51px] ">
      <ScrollView horizontal>
        <Image
          source={require('../../assets/images/add1.png')}
          className="w-[295px] h-[173px]"
        />
        <Image
          source={require('../../assets/images/add2.png')}
          className="w-[295px] h-[173px]"
        />
      </ScrollView>
    </View>
  );
};

export default AddvertisementCards;

const styles = StyleSheet.create({});
