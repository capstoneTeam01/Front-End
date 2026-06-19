import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ScanScreen from "../screens/ScanScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import MyRepairsScreen from "../screens/MyRepairsScreen";
import DIYSolutionScreen from "../screens/DIYSolutionScreen";
import ProviderListScreen from "../screens/ProviderListScreen";
import ProviderDetailsScreen from "../screens/ProviderDetailsScreen";
import ProviderAddressTimeScreen from "../screens/ProviderAddressTimeScreen";
import ProviderQuoteRequestScreen from "../screens/ProviderQuoteRequestScreen";
import ProviderConfirmationScreen from "../screens/ProviderConfirmationScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="MyRepairs" component={MyRepairsScreen} />
        <Stack.Screen name="DIYSolution" component={DIYSolutionScreen} />
        <Stack.Screen name="ProviderList" component={ProviderListScreen} />
        <Stack.Screen name="ProviderDetails" component={ProviderDetailsScreen} />
        <Stack.Screen name="ProviderAddressTime" component={ProviderAddressTimeScreen} />
        <Stack.Screen name="ProviderQuoteRequest" component={ProviderQuoteRequestScreen} />
        <Stack.Screen name="ProviderConfirmation" component={ProviderConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
