import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image, Text } from "react-native";

import CalendarScreen from "../screens/CalendarScreen";
import Profile from "../screens/ProfileScreen";
import Task from "../screens/TaskScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#262D3F",
        },
      })}
    >
      <Tab.Screen name="Календарь" component={CalendarScreen} />
      <Tab.Screen name="Задачи" component={Task} />
      <Tab.Screen name="Профиль" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
