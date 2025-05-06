import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './Auth';
import {useSelector} from 'react-redux';
import PetParents from './PetParents';
import Partner from './Partner';
import {user_type} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileExists, setMobileExists] = useState(false);
  const {isAuthenticated, user} = useSelector(state => state.auth);
  useEffect(() => {
    const checkMobile = async () => {
      const mobile = await AsyncStorage.getItem('mobile_number');
      setMobileExists(!!mobile);
      setIsLoading(false);
    };
    checkMobile();
  }, []);
  console.log('isAuthenticated:', isAuthenticated, user);

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthNavigation />
      ) : user === user_type.PET_PARENT ? (
        <PetParents />
      ) : (
        <Partner />
      )}
    </NavigationContainer>
    // <NavigationContainer>
    //   {isLoading ? null : !isAuthenticated && mobileExists ? (
    //     <PetParents />
    //   ) : !isAuthenticated ? (
    //     <AuthNavigation />
    //   ) : user === user_type.PET_PARENT ? (
    //     <PetParents />
    //   ) : (
    //     <Partner />
    //   )}
    // </NavigationContainer>
  );
};

export default AppNavigation;
