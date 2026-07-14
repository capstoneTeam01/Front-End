import React from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import CompletedRepairsScreen from "../screens/CompletedRepairsScreen";
import RepairStatusScreen from "../screens/RepairStatusScreen";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ScanDashboardScreen from "../screens/ScanDashboardScreen";
import ScanScreen from "../screens/ScanScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import MyRepairsScreen from "../screens/MyRepairsScreen";
import DIYSolutionScreen from "../screens/DIYSolutionScreen";
import ProviderListScreen from "../screens/ProviderListScreen";
import ProviderDetailsScreen from "../screens/ProviderDetailsScreen";
import ProviderAddressTimeScreen from "../screens/ProviderAddressTimeScreen";
import ProviderQuoteRequestScreen from "../screens/ProviderQuoteRequestScreen";
import ProviderConfirmationScreen from "../screens/ProviderConfirmationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import RecentScansScreen from "../screens/RecentScansScreen";

// Ref so non-component code (e.g. the API layer on a 401) can navigate.
export const navigationRef = createNavigationContainerRef();

const Stack = createNativeStackNavigator();

const bottomTabScreenOptions = {
  contentStyle: { backgroundColor: "#FDFDFD" },
  safeAreaInsets: { bottom: 0 },
  animation: "fade",
};

const authScreenOptions = {
  animation: "fade",
};

const confirmationScreenOptions = {
  animation: "slide_from_bottom",
  gestureDirection: "vertical",
};

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
          animationMatchesGesture: true,
          contentStyle: {
            backgroundColor: "#FDFDFD",
          },
        }}
      >
        {/* Auth & onboarding flow */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={authScreenOptions}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={authScreenOptions}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={authScreenOptions}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={authScreenOptions}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={authScreenOptions}
        />

        {/* Main app */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={bottomTabScreenOptions}
        />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen
          name="Scan"
          component={ScanDashboardScreen}
          options={bottomTabScreenOptions}
        />
        <Stack.Screen name="ScanCamera" component={ScanScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen
          name="MyRepairs"
          component={MyRepairsScreen}
          options={bottomTabScreenOptions}
        />
        <Stack.Screen name="DIYSolution" component={DIYSolutionScreen} />
        <Stack.Screen name="ProviderList" component={ProviderListScreen} />
        <Stack.Screen
          name="ProviderDetails"
          component={ProviderDetailsScreen}
        />
        <Stack.Screen
          name="ProviderAddressTime"
          component={ProviderAddressTimeScreen}
        />
        <Stack.Screen
          name="ProviderQuoteRequest"
          component={ProviderQuoteRequestScreen}
        />
        <Stack.Screen
          name="ProviderConfirmation"
          component={ProviderConfirmationScreen}
          options={confirmationScreenOptions}
        />
        <Stack.Screen name="RecentScans" component={RecentScansScreen} />
        <Stack.Screen name="RepairStatus" component={RepairStatusScreen} />
        <Stack.Screen
          name="CompletedRepairs"
          component={CompletedRepairsScreen}
        />

        {/* Profile */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={bottomTabScreenOptions}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
