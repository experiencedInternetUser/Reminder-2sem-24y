import React, {useState} from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text, Button, StyleSheet } from 'react-native';
import first_bg from '../assets/backGrounds/first_bg'
import Localization from '../assets/redefinition/Names';

Localization();
// LocaleConfig.locales['fr'] = {
//   monthNames: [
//       'Январь', 'Февраль', 'Март',
//       'Апрель', 'Май', 'Июнь',
//       'Июль', 'Август', 'Сентябрь',
//       'Октябрь', 'Ноябрь','Декабрь'],

//   monthNamesShort: ['Janv.', 'Févr.', 'Mars',
//                     'Avril', 'Mai', 'Juin',
//                     'Juil.', 'Août', 'Sept.',
//                     'Oct.', 'Nov.', 'Déc.'],

//   dayNames: ['Воскресенье', 'Понедельник', 'Вторник',
//              'Среда', 'Четверг', 'Пятница', 'Суббота'],

//   dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт.', 'Пт', 'Сб'],
// };

LocaleConfig.defaultLocale = 'fr';

const Testcalendar = () => {
    const [selected, setSelected] = useState('');

    return (
      <Calendar style ={StyleCalendar.calendar}
                theme={{
                  textDayFontFamily: 'Roboto',
                  textMonthFontFamily: 'Roboto',
                  textDayHeaderFontFamily: 'Roboto',

                  textMonthFontSize: 20,
                  monthTextColor:'#ffffff',            
                  textDayHeaderFontSize: 16,
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#6393DB',
                  calendarBackground: '#3E4556',
                  selectedDayBackgroundColor:'#6393DB',
                  dayTextColor: '#ffffff',
                  textDisabledColor: '#9E9E9E',
                  textDayFontSize : 20,   
                  textSectionTitleColor: '#6B9EEB',  

                  
                }}  
                onDayPress={day => {setSelected(day.dateString);}}
                markedDates={{[selected]: {selected: true, 
                                   disableTouchEvent: true, 
                                   selectedDotColor: 'orange'}}}   
                //renderArrow={left => <Arrow />}   
                
      />
    );
  };

const CalendarScreen = ({navigation}) => {
    return (
        <View style ={first_bg.container}>
            <Testcalendar />
        </View>
    );
}

const StyleCalendar = StyleSheet.create({
  calendar:{
    backgroundColor: '#3E4556',
    marginTop: 40,
    
  }
});

export default CalendarScreen;
