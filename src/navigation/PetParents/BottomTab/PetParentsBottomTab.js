import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavItem from './NavItem';
import images from '../../../assets/images';
import Dashboard from '../../../screens/PetParents/Dashboard';
import Appointments from '../../../screens/PetParents/Appointments/Appointments';
import Pets from '../../../screens/PetParents/Pets/Pets';

// Dummy screens
const HomeScreen = () => <View className="flex-1 bg-blue-200" />;
const BookingsScreen = () => <View className="flex-1 bg-green-200" />;
const MyPetsScreen = () => <View className="flex-1 bg-yellow-200" />;

const Tab = createBottomTabNavigator();

export default function PetParentsBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F78DA7',
          height: 70,
          borderRadius: 20,
          margin: 10,
        },
        tabBarShowLabel: false,
      }}
      tabBar={({state, navigation}) => (
        <View className="absolute bottom-0 left-0 right-0 bg-primary  pb-4 flex-row justify-around  rounded-[20px] mx-6 mb-6">
          {state.routes.map((route, index) => {
            const isActive = state.index === index;
            const icons = {
              Home: images.HomeIcon,
              Bookings: images.bookingIcon,
              MyPets: images.mypetIcon,
            };
            return (
              <NavItem
                key={route.key}
                icon={icons[route.name]}
                label={route.name}
                active={isActive}
                onPress={() => navigation.navigate(route.name)}
                // size={route.name === 'Home' ? 50 : 52} // Custom size for Home
              />
            );
          })}
        </View>
      )}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Bookings" component={Appointments} />
      <Tab.Screen name="MyPets" component={Pets} />
    </Tab.Navigator>
  );
}
