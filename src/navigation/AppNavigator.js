import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ScanScreen from "../screens/ScanScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import MyRepairsScreen from "../screens/MyRepairsScreen";
import DIYSolutionScreen from "../screens/DIYSolutionScreen";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="MyRepairs" component={MyRepairsScreen} />
         <Stack.Screen name="DIYSolution" component={DIYSolutionScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
