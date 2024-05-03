import React from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native'
import axios from 'axios';
import HTMLParser from 'react-native-html-parser';



const url = 'https://istudent.urfu.ru/s/schedule';

export default function check(email, password) {
    // axios.get(url, {
    //     auth: {
    //       username: email,
    //       password: password
    //     }
    //   })
    //   .then(response => {
    //     const html = response.data;
    //   })
    //   .catch(error => {
    //     console.error('Ошибка получения HTML-кода страницы:', error);
    //   })

    //   const parsedHTML = HTMLParser.parse(html);


    //   // Находим ссылку на iCal файл
    //   const findICalLink = parsedHTML.querySelector('.ical-link');
    //   const icalLink = findICalLink.getAttribute('href');
      

    return(
        console.log(email)
    );
}
  
