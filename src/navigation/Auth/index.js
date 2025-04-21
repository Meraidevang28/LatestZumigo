import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import VerifyOTP from "../../screens/Auth/VerifyOTP";
import LoginWithOTP from "../../screens/Auth/LoginWithOTP";
import screens from "../../constants/screens";
import { Image } from "react-native";
import images from "../../assets/images";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: "Proxima-Nova-Semibold",
          fontSize: 18,
        },
        headerBackImage: () => (
          <Image
            source={images.BackBtn}
            className="w-[7.51px] h-[14.51px] ml-[14px]"
            style={{ tintColor: "#1C222F" }}
          />
        ),
      }}
    >
      <Stack.Screen
        name={screens.LoginWithOTP}
        component={LoginWithOTP}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.VerifyOTP}
        component={VerifyOTP}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
