import {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import images from '../../../../assets/images';
import screens from '../../../../constants/screens';
import {useNavigation} from '@react-navigation/native';

const upcomingAppointments = [
  {
    id: '1',
    petName: 'MAX',
    visitType: 'Home Visit',
    status: 'Scheduled',
    date: '24, April, 2024',
    time: '09:00 AM',
    image: images.dog,
  },
  {
    id: '2',
    petName: 'CHARLIE',
    visitType: 'Tele Consultation',
    status: 'Scheduled',
    date: '24, April, 2024',
    time: '09:30 AM',
    image: images.dog2,
  },
  {
    id: '3',
    petName: 'TEDDDY',
    visitType: 'Home Visit',
    status: 'Scheduled',
    date: '24, April, 2024',
    time: '09:30 AM',
    image: images.dog4,
  },
];

const pastAppointments = [
  {
    id: '4',
    petName: 'MAX',
    visitType: 'Home Visit',
    status: 'Completed',
    date: '24, April, 2024',
    time: '09:00 AM',
    image: images.dog,
  },
  {
    id: '5',
    petName: 'CHARLIE',
    visitType: 'Tele Consultation',
    status: 'Cancelled',
    date: '24, April, 2024',
    time: '09:00 AM',
    image: images.dog2,
  },
  {
    id: '6',
    petName: 'TEDDDY',
    visitType: 'Home Visit',
    status: 'Completed',
    date: '24, April, 2024',
    time: '09:00 AM',
    image: images.dog4,
  },
];

export default function ToggleButtons() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const navigation = useNavigation();
  const [selected, setSelected] = useState('Upcoming');
  const getStatusStyle = status => {
    switch (status) {
      case 'Scheduled':
        return 'bg-[#f5e3cb] text-[#FBA537]';
      case 'Completed':
        return 'bg-[#d0f5d2] text-[#1CBC28]';
      case 'Cancelled':
        return 'bg-[#f5c1c9] text-[#F45B5B]';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  const handleNavigation = status => {
    if (status === 'Scheduled') {
      navigation.navigate(screens.HomeVisitScreen);
    } else if (status === 'Completed') {
      navigation.navigate(screens.ScheduleAppointmentCompleted);
    } else if (status === 'Cancelled') {
      navigation.navigate(screens.CancelledTeleConsultationScreen);
    }
  };

  return (
    <View className="flex-1 bg-white px-6">
      <View className="my-5 flex-row bg-pastelGrey rounded-2xl overflow-hidden ">
        <TouchableOpacity
          className={`flex-1 p-[15px] items-center  rounded-2xl ${
            activeTab === 'Upcoming' ? ' bg-primary' : ''
          }`}
          onPress={() => setActiveTab('Upcoming')}>
          <Text
            className={` text-[16px]  leading-[22px] ${
              activeTab === 'Upcoming'
                ? ' text-white font-Proxima-Nova-Semibold'
                : ' text-[#969492] font-Proxima-Nova-Medium'
            }`}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-[15px] items-center  rounded-2xl ${
            activeTab === 'Past' ? ' bg-primary' : ''
          }`}
          onPress={() => setActiveTab('Past')}>
          <Text
            className={` text-[16px]   leading-[22px] ${
              activeTab === 'Past'
                ? ' text-white font-Proxima-Nova-Semibold'
                : ' text-[#969492] font-Proxima-Nova-Medium'
            }`}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <View className=" mt-[15px] rounded-2xl">
        {(activeTab === 'Upcoming'
          ? upcomingAppointments
          : pastAppointments
        ).map((item, index) => (
          <View
            key={index}
            className=" flex flex-row gap-[15px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder p-4 rounded-2xl ">
            <Image
              source={item.image}
              className="w-[68px] h-[68px] rounded-[15px]"
            />
            <View className="flex flex-col">
              <Text className="font-junegull-Regular text-[20px] text-primary mb-[5px]">
                {item.petName}
              </Text>
              <View className="flex flex-row items-center gap-[7px] w-[150px]">
                <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                  {item.visitType}
                </Text>
                <TouchableOpacity onPress={() => handleNavigation(item.status)}>
                  <View
                    className={` rounded-[7px] ${
                      getStatusStyle(item.status).split(' ')[0] // Extract bg-color
                    }`}>
                    <Text
                      className={`text-[12px] font-Nunito-Bold mt-[4.5px] mb-[4.5px] mr-[12px] ml-[11px] ${
                        getStatusStyle(item.status).split(' ')[1] // Extract text-color
                      }`}>
                      {item.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row items-center gap-[11.5px] mt-[5px] mb-[16px]">
                <Text className="text-[14px] font-Proxima-Nova-Bold">
                  {item.date}
                </Text>
                <Text className="text-[14px] font-Proxima-Nova-Bold">
                  {item.time}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
