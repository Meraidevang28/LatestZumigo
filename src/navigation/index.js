import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './Auth';
import {useSelector} from 'react-redux';
import PetParents from './PetParents';
import Partner from './Partner';
import {user_type} from '../constants/constants';

const AppNavigation = () => {
  const {isAuthenticated, user} = useSelector(state => state.auth);
  console.log(isAuthenticated, user);
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
  );
};

export default AppNavigation;
