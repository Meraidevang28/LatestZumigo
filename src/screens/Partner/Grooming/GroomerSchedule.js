import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import FooterBtn from '../../../components/shared/FooterBtn';
import images from '../../../assets/images';

const GroomerSchedule = ({navigation}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [selectedDays, setSelectedDays] = useState([]);
  const [sameHour, setSameHour] = useState(false);

  const toggleDaySelection = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day)); // Unselect
    } else {
      setSelectedDays([...selectedDays, day]); // Select
    }
  };

  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <View className="mt-[15px] mb-2">
          <RegistrationProgressBar screenNo={5} n={6} />
        </View>
        <Text className="text-[14px] text-[#7f7f7f] font-Nunito-Regular mb-[21px]">
          Set up a work calendar
        </Text>
        <Text className=" font-PTSans-Bold text-[26px]">
          Schedule your work for a week?
        </Text>
        <Text className=" opacity-50 mt-2 font-Nunito-Regular">
          Please set your start and end dates when you are available to work.
        </Text>

        {/* Week day  */}
        <View className="flex-1 flex-row items-center gap-[6px] mt-4">
          {weekDays.map((day, index) => {
            const isSelected = selectedDays.includes(day);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => toggleDaySelection(day)}
                className={` flex-1 border rounded-[10px]  ${
                  isSelected
                    ? 'bg-primary  border-primary'
                    : 'bg-pastelGrey border-pastelgreyBorder'
                }`}>
                <Text
                  className={` text-center py-5 font-Nunito-Regular ${
                    isSelected ? 'text-white ' : 'text-[#7f7f7f]'
                  }`}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl mt-[30px] mb-[10px] p-4  flex-row items-center justify-between">
          <Text className="text-[15px] font-Nunito-Regular">
            Use same hours for all days
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#d75880'}}
            thumbColor={sameHour ? '#f7f7f7' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setSameHour(val => !val)}
            value={sameHour}
          />
        </View>

        <View>
          <Text className=" mt-5 mb-3">Hours</Text>
          <View className=" border border-pastelgreyBorder bg-pastelGrey py-3 px-4 rounded-2xl flex-row gap-[25px] items-center">
            <View className="flex-1 flex-row gap-[10px]">
              <TouchableOpacity className="flex-1  border border-pastelgreyBorder bg-pastelGrey items-center py-[10px] rounded-[10px]">
                <Text className=" font-Nunito-Regular">9:00 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1  border border-pastelgreyBorder bg-pastelGrey items-center py-[10px] rounded-[10px]">
                <Text className=" font-Nunito-Regular">12:00 PM</Text>
              </TouchableOpacity>
            </View>
            <View className=" flex-row gap-[15px]">
              <Image
                source={images.secondaryAdd}
                className=" w-[14px] h-[14px]"
                resizeMode="contain"
              />
              <Image
                source={images.deleteImage}
                className=" w-[11px] h-[14px]"
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View className=" mb-40" />
      </ScrollView>
      <FooterBtn
        title={'Continue'}
        // onClick={() => navigation.navigate(screens.GroomerSchedule)}
      />
    </View>
  );
};

export default GroomerSchedule;
