import {View, Text, Image} from 'react-native';
import React from 'react';
import images from '../../../assets/images';

const Card = ({title, value, img, dimensions}) => {
  return (
    <View className="flex-row gap-3">
      {/* <View className="h-4 aspect-square bg-pastelPrimary"></View> */}
      <Image source={img} className={`${dimensions}`} />
      <View>
        <Text
          className="text-gray-900 text-[12px] leading-none"
          style={{fontFamily: 'Proxima-Nova-Regular'}}>
          {title}
        </Text>
        <Text
          className=" text-darkGunmetal font-semibold text-[15px]"
          style={{fontFamily: 'Proxima-Nova-Semibold'}}>
          {value}
        </Text>
      </View>
    </View>
  );
};
const ContactUs = () => {
  return (
    <View className="flex-1 bg-white px-6">
      <View className="mt-[15px] mb-[11px]">
        <Text
          className="text-[12px] opacity-60"
          style={{fontFamily: 'Proxima-Nova-Regular'}}>
          Fusce sit amet massa commodo, tincidunt justo at, luctus erat. Mauris
          accumsan magna nec nulla bibendum posuere. Etiam porta turpis sit amet
          risus egestas finibus.
        </Text>
      </View>
      {/* Customer support */}

      <Text
        className="text-[18px] font-semibold text-darkGunmetal mb-[13px] mt-[20px]"
        style={{fontFamily: 'Proxima-Nova-Semibold'}}>
        Customer support
      </Text>

      <View className="bg-pastelGrey  border border-pastelgreyBorder rounded-2xl p-5 ">
        <Card
          title="Contact number"
          value={'+91 97048576875'}
          img={images.contact}
          dimensions="h-4 w-[15.99px]"
        />
        <View className=" mt-5" />
        <Card
          title="Email Address"
          value={'help@zumigo.pet'}
          img={images.email}
          dimensions="h-[13.9px] w-[17.37px]"
        />
      </View>

      {/* Social Media  */}
      <Text
        className="text-[18px] font-semibold text-darkGunmetal mb-[13px] mt-[20px]"
        style={{fontFamily: 'Proxima-Nova-Semibold'}}>
        Social Media
      </Text>
      <View className="bg-pastelGrey  border border-pastelgreyBorder rounded-2xl p-5">
        <Card
          title="Instagram"
          value={'@Zumigo'}
          img={images.insta}
          dimensions="h-4 w-4"
        />
        <View className=" mt-5" />
        <Card title="X" value={'@zumigo'} img={images.x} dimensions="h-4 w-4" />
      </View>
    </View>
  );
};

export default ContactUs;
