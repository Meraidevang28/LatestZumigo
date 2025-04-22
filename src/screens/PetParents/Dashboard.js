import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import screens from '../../constants/screens';
import images from '../../assets/images';
import CTACarousel from '../../components/PetParentDashboard/Carousel/CTACarousel';
import TopSpecialistsCard from '../../components/PetParentDashboard/TopSpecialistsCard';
import ImageCarousel from '../../components/PetParentDashboard/Carousel/ImageCarousel';
import HowItworkCarousel from '../../components/PetParentDashboard/Carousel/HowItworkCarousel';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const doctors = [
  {
    id: '1',
    name: 'Dr. Manisha',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 134,
    image: images.VetImage2,
  },
  {
    id: '2',
    name: 'Dr. Esha Singh',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 114,
    image: images.VetImage2,
  },
  {
    id: '3',
    name: 'Dr. Preeti Jain',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 134,
    image: images.VetImage2,
  },
  {
    id: '4',
    name: 'Dr. Sunil Krishna',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 142,
    image: images.VetImage2,
  },
];

const advTwoData = [
  {
    image: images.AD2,
  },
  {
    image: images.AD2,
  },
  {
    image: images.AD2,
  },
  {
    image: images.AD2,
  },
];

const advOneData = [
  {
    image: images.DashboardCatIcon,
    title: 'Pick a Service',
    descriptionPrefix: 'Book an appointment ',
    descriptionBold: 'through our app.',
  },
  {
    image: images.DashboardCatCalenderIcon,
    title: 'Select a Preferred Date and Time',
    descriptionPrefix: 'We prioritize your ',
    descriptionBold: 'comfort and convenience',
    descriptionSuffix:
      '. Select services for the same day or schedule a future appointment.',
  },
  {
    image: images.DashboardCarIcon,
    title: 'Experience At-Home Veterinary Care',
    descriptionPrefix: 'Providing healthcare services to your pet right ',
    descriptionBold: 'at your doorstep ',
  },
];

const categories = [
  { id: '1', name: 'Vaccinations', icon: images.vaccinationImageIcon },
  { id: '2', name: 'Groomers', icon: images.groomersIcon },
  { id: '3', name: 'Food & Nutrition', icon: images.foodnutritionIcon },
  { id: '4', name: 'Radiology', icon: images.radiologyImage },
];

const Dashboard = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const { width, height } = Dimensions.get('window');

  const [primaryServices, setPrimaryServices] = useState([]);
  const [serviceGroups, setServiceGroups] = useState([]);
  const [consultationTypes, setConsultationTypes] = useState([]);
  const [applicableCTUUIDs, setApplicableCTUUIDs] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  useEffect(() => {
    const fetchPrimaryServiceGroups = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const name = await AsyncStorage.getItem('first_name');
        const profileComplete = await AsyncStorage.getItem(
          'is_profile_complete',
        );
        if (name) {
          setFirstName(name);
          // console.log('First Name:', name);
        }
        if (profileComplete === 'true') {
          setIsProfileComplete(true);
        }
        const response = await fetch(
          'https://demoapi.zumigo.pet/api/Service/ServiceGroupConsultation',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const groups = data.ServiceGroup;
        setServiceGroups(groups);
        setConsultationTypes(data.ConsultationType);

        const filteredPrimary = groups.filter(item => item.DisplayAsPrimary);
        setPrimaryServices(filteredPrimary);

        // Extract ApplicableCTUUIDs where IsCategoryTypeApplicable is true
        const uuids = groups
          .filter(item => item.IsCategoryTypeApplicable)
          .map(item => item.ApplicableCTUUID)
          .filter(Boolean)
          .flatMap(uuidStr => uuidStr.split(',').map(uuid => uuid.trim().toLowerCase()));

        // console.log('Filtered Applicable CT UUIDs:', uuids);

        setApplicableCTUUIDs(uuids);


        // const matchedConsultations = allConsultations.filter(ct =>
        //   uuids.includes(ct.UUID.toLowerCase()),
        // );

        // console.log('Matched Consultation Names:');
        // matchedConsultations.forEach(ct => {
        //   console.log(`- ${ct.Consultation_Name}`);
        // });

      } catch (error) {
        console.error('Failed to fetch service groups:', error);
      }
    };

    fetchPrimaryServiceGroups();
  }, []);
  const filteredConsultations = consultationTypes.filter(ct =>
    primaryServices.some(group =>
      group.ApplicableCTUUID?.split(',')
        .map(uuid => uuid.trim().toLowerCase())
        .includes(ct.UUID.toLowerCase()),
    ),
  );
  const renderItem = ({ item }) => (
    <View className="flex flex-row items-center px-4 mb-6">
      {/* Text Block */}
      <View className="pt-10 mr-[6px] w-[150px]">
        {/* Split title if needed */}
        {item.Title?.split(',').map((line, idx) => (
          <Text
            key={idx}
            className="w-[207.21px]font-Nunito-Bold text-primary text-[16px] leading-6">
            {line.trim()}
          </Text>
        ))}

        <Text className="w-[139px] text-[15px] leading-[19.5px] text-[#333333] font-Nunito-Regular mt-[4px]">
          {item.SubTitle}
        </Text>
      </View>
      {/* Image */}
      <View className="bg-[#f2f6f7]">
        <Image
          source={{
            uri: `https://democms.zumigo.pet${item.Picture}`,
          }}
          className="rounded-full bg-[#f2f6f7]"
          style={{
            width: width * 0.42,
            height: width * 0.68,
            right: width * -0.08,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#f2f6f7]">
      <ScrollView
        className="flex-1  "
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {/* header section  */}
        <View className="ml-[14px] mr-[12px] mt-[7px] mb-[3px] flex-row items-center justify-between">
          {/* drawer open  user name */}
          <View className=" flex-row gap-[18px] items-center">
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={images.drawerIcon}
                className=" w-10 h-[37px]"
              // style={{tintColor: '#d75880'}}
              />
            </TouchableOpacity>
            <Text className="text-[25px] font-Nunito-Regular text-[#333333]">
              Hi,
              <Text className="font-Nunito-Regular text-[#333333]">
                {isProfileComplete ? ` ${firstName}` : ' Pet Parent'}
              </Text>
              <Text className="w-[20px]">!</Text>
            </Text>
          </View>

          {/* location , support and notification  */}

          <View className=" flex-row gap-[25px]">
            <Image
              source={images.contactusIcon}
              className=" w-[27px] h-[31px]"
              resizeMode="contain"
            // style={{tintColor: '#d75880'}}
            />
            <Image
              source={images.notificationIcon}
              className=" w-[31px] h-[31px]"
              resizeMode="contain"
            // style={{tintColor: '#d75880'}}
            />
          </View>
        </View>

        {/* intro section  */}
        <View className="flex flex-row items-center">
          <FlatList
            data={primaryServices}
            keyExtractor={item => item.UUID}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 10 }}
            scrollEnabled={false}
          />
        </View>

        <View className="px-[10px] flex-row gap-[10px] mb-[26px]">
          {filteredConsultations.map(consultation => (
            <TouchableOpacity
              key={consultation.UUID}
              className="bg-primary h-[50px] flex-1 rounded-[50px] items-center flex-row gap-1"
              onPress={async () => {
                // Conditional navigation based on consultation name
                await AsyncStorage.setItem('selected_consultation_uuid', consultation.UUID);
                // console.log(
                //   `${consultation.Consultation_Name} UUID:`,
                //   consultation.UUID,
                // );
                if (consultation.Consultaytion_Name === 'Vet Home Visit') {

                  try {


                    console.log({
                      serviceGroupUUID: serviceGroups.find((x) => x.DisplayAsPrimary).UUID || "",
                      consultationTypeUUID: consultationTypes.find((x) => x.IsServiceBased).UUID || ""
                    })

                    navigation.navigate(screens.ServiceSelection, {
                      serviceGroupUUID: serviceGroups.find((x) => x.DisplayAsPrimary).UUID || "",
                      consultationTypeUUID: consultationTypes.find((x) => x.IsServiceBased).UUID || ""
                    }); // Replace `screens.HomeVisit` with your actual route


                  } catch (err) {
                    console.log(err)
                  }
                } else if (
                  consultation.Consultaytion_Name === 'Teleconsultation'
                ) {
                  console.log("292")

                  navigation.navigate(screens.SelectVaterinarian, {
                    headerTitle: 'Tele Consultation',
                    serviceGroupUUID: serviceGroups.find((x) => x.DisplayAsPrimary).UUID || "",
                    consultationTypeUUID: consultationTypes.find((x) => !x.IsServiceBased).UUID || ""

                  }); // Replace `screens.TeleConsultation` with your actual route
                }
              }}>
              <Image
                source={{
                  uri: `https://democms.zumigo.pet${consultation.Icon ?? ''}`,
                }}
                className="w-[28px] h-[23px] ml-[26px]"
                resizeMode="contain"
              // defaultSource={require('../assets/defaultIcon.png')} // optional fallback
              />
              <Text className="text-[15px] font-Nunito-Bold text-white">
                {consultation.Consultaytion_Name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row items-center px-4 gap-2 justify-between flex-wrap">

          {serviceGroups
            .filter(item => !item.DisplayAsPrimary)
            .map((item, index) => (
              <View
                key={index}
                className="items-center gap-1.5"
                style={{ width: width * 0.28 }}>
                <Image
                  source={{ uri: `https://democms.zumigo.pet${item.Picture}` }}
                  style={{
                    width: '100%',
                    height: width * 0.28,
                    resizeMode: 'cover',
                    borderRadius: 20,
                    backgroundColor: '#f2f6f7',
                  }}
                />
                <Text className="text-[14px] text-center font-Nunito-Regular">
                  {item.GroupName}
                </Text>
              </View>
            ))}
        </View>

        <View className=" mt-10 mb-[18px]">
          <CTACarousel data={[1, 2, 3]} />
        </View>

        {/* white  background  */}
        <View className=" rounded-t-[25px] bg-white flex-1">
          {/* Top Specialist  */}

          <View className=" px-4 mb-[12px]">
            <Text className=" mt-[9px] font-Proxima-Nova-Bold text-[24px] leading-[48px]">
              Top Specialists
            </Text>
            {/* Category Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-3">
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  className={`px-4 py-2 mr-2 rounded-2xl border flex-row items-center gap-[6.5px] ${selectedCategory == category.id
                    ? 'bg-primary border-primary'
                    : 'bg-pastelGrey border-pastelgreyBorder'
                    }`}
                  onPress={() => setSelectedCategory(category.id)}>
                  <View
                    className={` h-[30px] w-[30px] rounded-full justify-center items-center  ${selectedCategory == category.id
                      ? 'bg-[#ffffff1A]'
                      : 'bg-pastelPrimary'
                      }`}>
                    <Image
                      source={category.icon}
                      className=" w-[28px] h-[28px]"
                      resizeMode="contain"
                      style={{
                        tintColor:
                          selectedCategory == category.id
                            ? '#ffffff'
                            : '#d75880',
                      }}
                    />
                  </View>
                  <Text
                    className={`font-Nunito-Regular ${selectedCategory == category.id
                      ? 'text-white'
                      : 'text-gray-500'
                      }`}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View className=" mt-[9px]">
              {doctors.map(doctor => (
                <TopSpecialistsCard key={doctor.id} doctor={doctor} />
              ))}
            </View>
          </View>

          {/* how it work  */}
          <Text className=" px-4 font-Proxima-Nova-Bold text-[20px] leading-6 text-[#4E4E4E] mb-[18px]">
            How it Works?
          </Text>
          <View className="mx-3  mb-[15px]  rounded-2xl">
            <HowItworkCarousel data={advOneData} aspectRatio={238 / 213} />
          </View>

          <View className=" mb-6 pb-36">
            <ImageCarousel data={advTwoData} aspectRatio={403 / 213} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;