import {View, Text, ScrollView, Image, ImageBackground} from 'react-native';
import images from '../../../assets/images';
import {primary} from '../../../assets/theme/colors';

const FileItem = ({date}) => {
  return (
    <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl p-[15px] pr-[18.3px] flex-row justify-between">
      <View className="gap-[12px] flex-row">
        <View className="h-[68px] aspect-square rounded-[10px] bg-[#F5F2ED] justify-center items-center overflow-hidden">
          <ImageBackground
            source={images.reportPaceholder} // Background image URL
            className="h-full w-[58px] justify-center items-center">
            <Image
              source={images.Veiw}
              className="h-4 w-[21.43px]"
              resizeMode="contain"
            />
          </ImageBackground>
        </View>

        <View>
          <Text
            // style={{fontFamily: 'Nunito-Bold'}}
            className="text-darkGunmetal mt-[3px] mb-[7px] font-Nunito-Bold">
            File name
          </Text>
          <Text
            className=" text-gray-900 text-[12px]"
            style={{fontFamily: 'Proxima-Nova-Regular'}}>
            24 April, 2024
          </Text>
        </View>
      </View>
      <View className="gap-[12px] flex-row">
        <Image
          source={images.download}
          className="h-[14px] w-[15.18px]"
          style={{tintColor: primary}}
        />
        <Image
          source={images.share}
          className="h-[14px] w-[12.66px]"
          style={{tintColor: primary}}
        />
      </View>
    </View>
  );
};

const ConsultationSummaryScreen = () => {
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        {/* Consultation Summary */}

        <View className="mt-[14.8px] bg-pastelGrey border border-pastelgreyBorder mb-[30px] rounded-2xl p-[15px] pb-[18px] flex-row gap-[9.4px]">
          <Image
            source={images.services}
            resizeMode="contain"
            className="h-[18.01px] w-[16.29px] "
            style={{tintColor: primary}}
          />
          <View className="flex-shrink">
            <Text
              className="text-darkGunmetal text-[14px]"
              style={{fontFamily: 'Nunito-Bold'}}>
              Consultation summary
            </Text>
            <Text
              className="text-[14px] text-[#7F7F7F] mt-[6px] mb-[11px]"
              style={{fontFamily: 'Nunito-Bold'}}>
              Dr. Santosh
            </Text>
            <Text
              className="text-[14px] text-[#7F7F7F]"
              style={{fontFamily: 'Nunito-Regular'}}>
              You can view, share, download your prescription and reports below.
            </Text>
          </View>
        </View>

        {/* Prescription Section */}
        <Text
          style={{fontFamily: 'PTSans-Bold'}}
          className="text-[16px] mb-[12px]">
          Prescription
        </Text>
        <FileItem fileName="Prescription 1" date="24 April, 2024" />

        {/* Reports Section */}

        <Text
          style={{fontFamily: 'PTSans-Bold'}}
          className="text-[16px] mb-[12px] mt-[30px]">
          Reports
        </Text>
        {['26 April, 2024', '26 April, 2024'].map((date, index) => (
          <View key={index} className="mb-[15px]">
            <FileItem fileName="Prescription 1" date={date} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ConsultationSummaryScreen;

// const styles = StyleSheet.create({});
