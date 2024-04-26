import { View } from 'react-native';
import first_bg from '../backrounds/first_bg'
import React, {useState} from 'react';
import AgendaScreen from './agenda';

const Task = ({navigation}) => {
    return (
        <View style ={first_bg.container}>
            <AgendaScreen />
        </View>
    );
}

  
export default Task;