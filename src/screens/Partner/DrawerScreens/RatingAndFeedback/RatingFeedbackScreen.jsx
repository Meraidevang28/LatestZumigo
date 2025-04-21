import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import images from '../../../../assets/images';
import React from 'react';
import ReviewCard from '../../../../components/vetRegistrationComponents/ReviewCard';

const RatingFeedbackScreen = () => {
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView>
        <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[20px]">
          <View className="flex flex-col ml-[15px] ">
            <View className="flex flex-row items-center gap-[10px] mt-[15px]">
              <Text className="text-[36px] font-Nunito-Bold text-[#000000]">
                4.6
              </Text>
              <View className="flex flex-row">
                <Image
                  source={require('../../../../assets/images/RedStar.png')}
                  className="w-[18.25px] h-[17.49px]"
                />
                <Image
                  source={require('../../../../assets/images/RedStar.png')}
                  className="w-[18.25px] h-[17.49px]"
                />
                <Image
                  source={require('../../../../assets/images/RedStar.png')}
                  className="w-[18.25px] h-[17.49px]"
                />
                <Image
                  source={require('../../../../assets/images/RedStar.png')}
                  className="w-[18.25px] h-[17.49px]"
                />
                <Image
                  source={require('../../../../assets/images/RedStar.png')}
                  className="w-[18.25px] h-[17.49px]"
                />
              </View>
            </View>
            <Text className="text-[16px] text-[#7f7f7f] font-Nunito-Regular mb-[17px]">
              Based on 546 ratings
            </Text>
          </View>
        </View>
        <Text className="text-[16px] font-PTSans-Bold text-[#000000] mt-[30px] mb-[12.3px]">
          Reviews
        </Text>
        <ReviewCard initials="JS" name="Jone Smith" day="3" />
        <Text className=" h-[0.2px] bg-[#e8e9eb] ml-[15px] mt-[17.1px] mb-[15.5px]"></Text>
        <ReviewCard initials="SA" name="Santosh" day="8" />
        <Text className=" h-[0.2px] bg-[#e8e9eb] ml-[15px] mt-[17.1px] mb-[15.5px]"></Text>
        <ReviewCard initials="JK" name="Jeevan Kumar" day="3" />
        <Text className=" h-[0.2px] bg-[#e8e9eb] ml-[15px] mt-[17.1px] mb-[15.5px]"></Text>
        <ReviewCard initials="VB" name="Vivek B" day="3" />

        <TouchableOpacity>
          <Text className="text-primary mt-[30.3px] text-center underline mb-[50px]">
            More details
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RatingFeedbackScreen;

const styles = StyleSheet.create({});
