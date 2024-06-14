import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image, Text } from "react-native";
import Svg, { G, Path } from "react-native-svg";

import CalendarScreen from "../screens/CalendarScreen";
import Profile from "../screens/ProfileScreen";
import Task from "../screens/TaskScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#262D3F",
          height: 70,
          borderTopColor: "#262D3F",
        },
      })}
    >
      <Tab.Screen
        name="Календарь"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.container}>
                <Image
                  source={require("../assets/Icons/calendar.png")}
                  resizeMode="contain"
                  style={{ tintColor: focused ? "#6393DB" : "#fff" }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 12,
                    color: focused ? "#6393DB" : "#fff",
                  }}
                >
                  Календарь
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Задачи"
        component={Task}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.container}>
                <Image
                  source={require("../assets/Icons/task.png")}
                  resizeMode="contain"
                  style={{ tintColor: focused ? "#6393DB" : "#fff" }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 12,
                    color: focused ? "#6393DB" : "#fff",
                  }}
                >
                  Задачи
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Профиль"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.container}>
                <Image
                  source={require("../assets/Icons/profile.png")}
                  resizeMode="contain"
                  style={{ tintColor: focused ? "#6393DB" : "#fff" }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 12,
                    color: focused ? "#6393DB" : "#fff",
                  }}
                >
                  Профиль
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingTop: 8,
    paddingBottom: 12,
  },
});
export default Tabs;
