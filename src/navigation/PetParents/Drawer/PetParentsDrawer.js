import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../../../screens/PetParents/Dashboard';
import CustomDrawerContent from './CustomDrawerContent';
import PetParentsBottomTab from '../BottomTab/PetParentsBottomTab';

const Drawer = createDrawerNavigator();

const PetParentsDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: '100%',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="DashboardDrawer"
        component={PetParentsBottomTab}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default PetParentsDrawer;
