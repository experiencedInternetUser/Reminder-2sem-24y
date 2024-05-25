import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/tab';
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native'
import Login from './screens/LoginScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator} from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;