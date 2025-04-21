import React from 'react';
import {
  View,
  Text,
  SectionList,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import screens from '../../constants/screens';
import SelectServices from '../../screens/Partner/Register/SelectServices';
import {createStackNavigator} from '@react-navigation/stack';
import VerifyOTP from '../../screens/Auth/VerifyOTP';
import images from '../../assets/images';
import Vetdetails from '../../screens/Partner/Register/Vetdetails';
import VetServiceLocation from '../../screens/Partner/Register/VetServiceLocation';
import AddSpecialisation from '../../screens/Partner/Register/AddSpecialisation';
import AddServices from '../../screens/Partner/Register/AddServices';
import ScheduleWeek from '../../screens/Partner/Register/ScheduleWeek';
import ServicesAndPricings from '../../screens/Partner/Register/ServicesAndPricings';
import VetBankDetails from '../../screens/Partner/Register/VetBankDetails';
import VetAssistantDetails from '../../screens/Partner/Register/VetAssistantDetails';
import VetRegisterAgreement from '../../screens/Partner/Register/VetRegisterAgreement';
import VetDashboard from '../../screens/Partner/HomeScreens/VetDashboard';
import HomeVisitScreen from '../../screens/Partner/HomeScreens/HomeVisitScreen';
import NotificationComponent from '../../components/vetRegistrationComponents/NotificationComponent';
import TeleConsultationScreen from '../../screens/Partner/HomeScreens/TeleConsultationScreen';
import MedicalHistoryScreen from '../../screens/Partner/HomeScreens/MedicalHistoryScreen';
import ConsultationSummaryScreen from '../../screens/Partner/HomeScreens/ConsultationSummaryScreen';
import AdditionalServicesScreen from '../../screens/Partner/HomeScreens/AdditionalServiceScreens';
import ProfileScreen from '../../screens/Partner/DrawerScreens/Profile/ProfileScreen';
import EditProfileScreen from '../../screens/Partner/DrawerScreens/Profile/EditProfileScreen';
import AssistantsScreen from '../../screens/Partner/DrawerScreens/Assistants/AssistantsScreen';
import ScheduledAppointments from '../../screens/Partner/DrawerScreens/ScheduledAppointments/ScheduledAppointments';
import CompletedHomeVisitScreen from '../../components/vetRegistrationComponents/CompletedHomeVisitScreen';
import CancelledTeleConsultationScreen from '../../components/vetRegistrationComponents/CancelledTeleConsultationScreen';
import RatingFeedbackScreen from '../../screens/Partner/DrawerScreens/RatingAndFeedback/RatingFeedbackScreen';
import SettingScreen from '../../screens/Partner/DrawerScreens/SettingScreen/SettingScreen';
import TermsConditions from '../../screens/PetParents/Menu/TermsConditions';
import PrivacyPolicy from '../../screens/PetParents/Menu/PrivacyPolicy';
import ContactUs from '../../screens/PetParents/Menu/ContactUs';
import VetDrawer from '../Partner/Drawer/VetDrawer';
import CalendarScheduler from '../../screens/Partner/DrawerScreens/CalendarScheduler/CalendarScheduler';
import InProgressHomeVisit from '../../components/vetRegistrationComponents/InProgressHomeVisit';
import Diagnosis from '../../screens/Partner/HomeScreens/Diagnosis';
import InProgressHomeVisit2 from '../../components/vetRegistrationComponents/InProgressHomeVisit2';
import InProgressHomeVisit3 from '../../components/vetRegistrationComponents/InProgressHomeVisit3';
import InProgressHomeVisit4 from '../../components/vetRegistrationComponents/InProgressHomeVisit4';
import InProgressHomeVisit5 from '../../components/vetRegistrationComponents/InProgressHomeVisit5';
import AddMedicationSummaryScreen from '../../screens/Partner/HomeScreens/AddMedicationSummaryScreen';
import RadiologyScreen from '../../screens/Partner/HomeScreens/RadiologyScreen';
import AddMedicationScreen from '../../screens/Partner/HomeScreens/AddMedicationScreen';
import VetDashboard2 from '../../screens/Partner/HomeScreens/VetDashboard2';
import ScheduleAppointmentCompleted from '../../components/vetRegistrationComponents/ScheduleAppointmentCompleted';
import TeleConsultScreen from '../../screens/Partner/TeleScreens/TeleConsultScreen';
import TeleDiagnosis from '../../screens/Partner/TeleScreens/TeleDiagnosis';
import TeleConsultScreen2 from '../../screens/Partner/TeleScreens/TeleConsultScreen2';
import TeleConsultScreen3 from '../../screens/Partner/TeleScreens/TeleConsultScreen3';
import TeleMedicationScreen from '../../screens/Partner/TeleScreens/TeleMedicationScreen';
import TeleMedicationSummaryScreen from '../../screens/Partner/TeleScreens/TeleMedicationSummaryScreen';
import VetContactUs from '../../screens/Partner/DrawerScreens/ContactUs/VetContactUs';
import EditCalendar from '../../screens/Partner/DrawerScreens/CalendarScheduler/EditCalendar';
import AddAddress from '../../screens/Partner/Register/AddAddress';
import {useNavigation} from '@react-navigation/native';
import GroomerDetails from '../../screens/Partner/Grooming/GroomerDetails';
import GroomerCompanyDetails from '../../screens/Partner/Grooming/GroomerCompanyDetails';
import GroomerServiceArea from '../../screens/Partner/Grooming/GroomerServiceArea';
import GroomerChooseService from '../../screens/Partner/Grooming/GroomerChooseService';
import GroomerSchedule from '../../screens/Partner/Grooming/GroomerSchedule';
import {primary} from '../../assets/theme/colors';
import InfraSetup from '../../screens/Partner/Register/InfraSetup';
import FillAddressDetailsVet from '../../screens/Partner/Register/FillAddressDetailsVet';
import AddGrommerAddress from '../../screens/Partner/Grooming/AddGrommerAddress';
import GroomerAddressDetails from '../../screens/Partner/Grooming/GroomerAddressDetails';
import GroomerServiceLocation from '../../screens/Partner/Grooming/GroomerServiceLocation';
import GroomerSelectServiceArea from '../../screens/Partner/Grooming/GrommerSelectServiceArea';
import GroomerSelectServices from '../../screens/Partner/Grooming/GroomerSelectServices';
import MapViewScreenVet from '../../screens/Partner/Register/MapViewScreenVet';
import MapViewScreenParent from '../../screens/PetParents/HomeVisit/MapViewScreenParent';
const Stack = createStackNavigator();

const VetNavigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'Proxima-Nova-Semibold',
          fontSize: 18,
        },
        headerBackImage: () => (
          <Image
            source={images.BackBtn}
            className="w-[7.51px] h-[14.51px] ml-[14px] "
            style={{tintColor: primary}}
          />
        ),
      }}>
      {/* <Stack.Screen
        name={screens.VerifyOTP}
        component={VerifyOTP}
        options={{title: 'Register'}}
      /> */}
      <Stack.Screen
        name={screens.SelectServices}
        component={SelectServices}
        options={{title: 'Veterinarian Registration'}}
      />
      <Stack.Screen
        name={screens.Vetdetails}
        component={Vetdetails}
        options={{title: 'Veterinarian Registration'}}
      />
      <Stack.Screen
        name={screens.VetServiceLocation}
        component={VetServiceLocation}
        options={{title: 'Veterinarian Registration'}}
      />
      <Stack.Screen
        name={screens.AddSpecialisation}
        component={AddSpecialisation}
        options={{title: 'Veterinarian Registration'}}
      />
      <Stack.Screen
        name={screens.AddAddress}
        component={AddAddress}
        options={{title: 'Veterinarian Registration'}}
      />
      <Stack.Screen
        name={screens.FillAddressDetailsVet}
        component={FillAddressDetailsVet}
        options={{title: 'Address'}}
      />
      <Stack.Screen
        name={screens.InfraSetup}
        component={InfraSetup}
        options={{title: 'Veterinarian Registration'}}
      />
      <Stack.Screen
        name={screens.MapViewScreenVet}
        component={MapViewScreenVet}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screens.AddServices}
        component={AddServices}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name={screens.ScheduleWeek}
        component={ScheduleWeek}
        options={{title: 'Veterinarian Registration'}}
      />
      <Stack.Screen
        name={screens.ServicesAndPricings}
        component={ServicesAndPricings}
        options={{title: 'Veterinarian Registration'}}
      />
      <Stack.Screen
        name={screens.VetBankDetails}
        component={VetBankDetails}
        options={{title: 'Veterinarian Registration'}}
      />
      <Stack.Screen
        name={screens.VetAssistantDetails}
        component={VetAssistantDetails}
        options={{title: 'Veterinarian Registration'}}
      />
      <Stack.Screen
        name={screens.VetRegisterAgreement}
        component={VetRegisterAgreement}
        options={{title: 'Veterinarian Registration'}}
      />

      <Stack.Screen
        name={screens.Dashboard}
        component={VetDashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screens.HomeVisitScreen}
        component={HomeVisitScreen}
        options={{title: 'Home Visit'}} // Hide header for Dashboard screen
      />
      <Stack.Screen
        name={screens.NotificationComponent}
        component={NotificationComponent}
        options={{title: 'Notifications'}}
      />
      <Stack.Screen
        name={screens.TeleConsultationScreen}
        component={TeleConsultationScreen}
        options={{title: 'Tele consultation'}}
      />
      <Stack.Screen
        name={screens.MedicalHistoryScreen}
        component={MedicalHistoryScreen}
        options={{title: 'Medical History'}}
      />
      <Stack.Screen
        name={screens.ConsultationSummaryScreen}
        component={ConsultationSummaryScreen}
        options={{title: 'Medical History'}}
      />
      <Stack.Screen
        name={screens.AdditionalServicesScreen}
        component={AdditionalServicesScreen}
        options={{title: 'Home Visit'}}
      />
      <Stack.Screen
        name={screens.VetDrawer}
        component={VetDrawer}
        options={{
          headerTitle: () => (
            <Text className="text-[22px] font-junegull-Regular text-primary ">
              Zumigo
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name={screens.ProfileScreen}
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name={screens.EditProfileScreen}
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />
      <Stack.Screen
        name={screens.AssistantsScreen}
        component={AssistantsScreen}
        options={{title: 'Assistants'}}
      />
      <Stack.Screen
        name={screens.ScheduledAppointments}
        component={ScheduledAppointments}
        options={{title: 'Scheduled Appointments'}}
      />
      <Stack.Screen
        name={screens.CompletedHomeVisitScreen}
        component={CompletedHomeVisitScreen}
        options={{title: 'Home Visit'}}
      />
      <Stack.Screen
        name={screens.CancelledTeleConsultationScreen}
        component={CancelledTeleConsultationScreen}
        options={{title: 'Tele Consultation'}}
      />
      <Stack.Screen
        name={screens.RatingFeedbackScreen}
        component={RatingFeedbackScreen}
        options={{title: 'Rating and Feedbacks'}}
      />
      <Stack.Screen
        name={screens.SettingScreen}
        component={SettingScreen}
        options={{title: 'Settings'}}
      />
      <Stack.Screen
        name={screens.TermsConditions}
        component={TermsConditions}
        options={{title: 'Terms & Conditions'}}
      />
      <Stack.Screen
        name={screens.PrivacyPolicy}
        component={PrivacyPolicy}
        options={{title: 'Privacy Policy'}}
      />
      <Stack.Screen
        name={screens.ContactUs}
        component={ContactUs}
        options={{title: 'Contact Us'}}
      />
      <Stack.Screen
        name={screens.CalendarScheduler}
        component={CalendarScheduler}
        options={{title: 'Calendar Scheduler'}}
      />
      <Stack.Screen
        name={screens.InProgressHomeVisit}
        component={InProgressHomeVisit}
        options={{title: 'Home Visit '}}
      />
      <Stack.Screen
        name={screens.Diagnosis}
        component={Diagnosis}
        options={{title: 'Diagnosis'}}
      />
      <Stack.Screen
        name={screens.InProgressHomeVisit2}
        component={InProgressHomeVisit2}
        options={{title: 'Home Visit'}}
      />
      <Stack.Screen
        name={screens.AddMedicationScreen}
        component={AddMedicationScreen}
        options={{title: 'Add Medication'}}
      />
      <Stack.Screen
        name={screens.AddMedicationSummaryScreen}
        component={AddMedicationSummaryScreen}
        options={{title: 'Add Medication'}}
      />
      <Stack.Screen
        name={screens.InProgressHomeVisit3}
        component={InProgressHomeVisit3}
        options={{title: 'Home Visit'}}
      />
      <Stack.Screen
        name={screens.InProgressHomeVisit4}
        component={InProgressHomeVisit4}
        options={{title: 'Home Visit'}}
      />
      <Stack.Screen
        name={screens.InProgressHomeVisit5}
        component={InProgressHomeVisit5}
        options={{title: 'Home Visit'}}
      />
      <Stack.Screen
        name={screens.RadiologyScreen}
        component={RadiologyScreen}
        options={{title: 'Add Radiology Service'}}
      />
      <Stack.Screen
        name={screens.VetDashboard2}
        component={VetDashboard2}
        options={{
          headerTitle: () => (
            <View className="mt-[10px]">
              <Text className="text-lg font-bold text-gray-700 ml-[15px]">
                <Text className="text-[20px]  font-Nunito-Regular text-[#1C222F]">
                  Hello,{' '}
                </Text>
                <Text className="text-[20px] font-Nunito-Bold text-black">
                  Jeevan Kumar!
                </Text>
              </Text>
            </View>
          ),
          headerLeft: () => (
            <View className="mt-[10px]">
              <TouchableOpacity
                onPress={() => navigation.navigate(screens.VetDrawer)}>
                <Image
                  source={require('../../assets/images/sidbarOpen.png')}
                  className="ml-[24px] h-[20px] w-[23px] "
                  style={{tintColor: primary}}
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View className=" mt-[10px] flex flex-row gap-[16px] items-center justify-center mr-[24px]">
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/ContactUS.png')}
                  className="w-[18.56px] h-[19.98px]"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(screens.NotificationComponent)
                }>
                <Image
                  source={require('../../assets/images/BellIcon.png')}
                  className="w-[18.56px] h-[22.98px]"
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name={screens.ScheduleAppointmentCompleted}
        component={ScheduleAppointmentCompleted}
        options={{title: 'Home Visit'}}
      />
      <Stack.Screen
        name={screens.TeleConsultScreen}
        component={TeleConsultScreen}
        options={{title: 'Tele consultation'}}
      />
      <Stack.Screen
        name={screens.TeleDiagnosis}
        component={TeleDiagnosis}
        options={{title: 'Diagnosis'}}
      />
      <Stack.Screen
        name={screens.TeleConsultScreen2}
        component={TeleConsultScreen2}
        options={{title: 'Tele consultation'}}
      />
      <Stack.Screen
        name={screens.TeleConsultScreen3}
        component={TeleConsultScreen3}
        options={{title: 'Tele consultation'}}
      />
      <Stack.Screen
        name={screens.TeleMedicationScreen}
        component={TeleMedicationScreen}
        options={{title: 'Add Medication'}}
      />
      <Stack.Screen
        name={screens.TeleMedicationSummaryScreen}
        component={TeleMedicationSummaryScreen}
        options={{title: 'Add Medication'}}
      />
      <Stack.Screen
        name={screens.VetContactUs}
        component={VetContactUs}
        options={{title: 'Contact Us'}}
      />
      <Stack.Screen
        name={screens.EditCalendar}
        component={EditCalendar}
        options={{title: 'Edit calendar'}}
      />
      <Stack.Screen
        name={screens.GroomerDetails}
        component={GroomerDetails}
        options={{title: 'Groomer Registration'}}
      />
      <Stack.Screen
        name={screens.GroomerCompanyDetails}
        component={GroomerCompanyDetails}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name={screens.GroomerServiceArea}
        component={GroomerServiceArea}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name={screens.GroomerChooseService}
        component={GroomerChooseService}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name={screens.GroomerSchedule}
        component={GroomerSchedule}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name={screens.AddGrommerAddress}
        component={AddGrommerAddress}
        options={{title: 'Grommer Registraction'}}
      />
      <Stack.Screen
        name={screens.GroomerAddressDetails}
        component={GroomerAddressDetails}
        options={{title: 'Grommer Registraction'}}
      />
      <Stack.Screen
        name={screens.GroomerServiceLocation}
        component={GroomerServiceLocation}
        options={{title: 'Grommer Registraction'}}
      />
      <Stack.Screen
        name={screens.GroomerSelectServiceArea}
        component={GroomerSelectServiceArea}
        options={{title: 'Grommer Registraction'}}
      />
      <Stack.Screen
        name={screens.GroomerSelectServices}
        component={GroomerSelectServices}
        options={{title: 'Grommer Registraction'}}
      />
    </Stack.Navigator>
  );
};

export default VetNavigation;
