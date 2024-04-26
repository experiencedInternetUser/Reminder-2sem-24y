import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/tab';
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native'
import Login from './screens/LoginScreen';

const App = () => {
  return(
    Login()


    // <NavigationContainer>
    //   <Tabs />
    // </NavigationContainer>
  );
}
export default App;