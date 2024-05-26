import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Agenda, AgendaList } from "react-native-calendars";
import getDataShedule from "../ICALfactory/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Localization from "../assets/redefinition/Names";

Localization();

const Task = ({ navigation }) => {
  const Content = {
    // "2024-05-26": [
    //   { name: "0", data: "lorem00", time: "12:30" },
    //   { name: "01", data: "lorem01", time: "12:31" },
    //   { name: "02", data: "lorem02", time: "12:32" },
    //   { name: "03", data: "lorem03", time: "12:33" },
    // ],
    // "2024-05-24": [{ name: "1", data: "lorem1", time: "13:30" }],
    // "2024-05-23": [{ name: "2", data: "lorem2", time: "14:30" }],
    // "2024-05-27": [{ name: "3", data: "lorem3", time: "15:30" }],
    // "2024-05-28": [{ name: "4", data: "lorem4", time: "16:30" }],
  };

  function addContent(date, name, auditory, time) {
    if (Content[date]) {
      Content[date].push({ name: name, data: auditory, time: time });
    } else {
      Content[date] = [{ name: name, data: auditory, time: time }];
    }
  }

  async function loadShedule() {
    const value = JSON.parse(await AsyncStorage.getItem("userForm"));
    let email = value.email;
    let password = value.password;

    let data = await getDataShedule(email, password).then(
      (response) => response
    );
    data.forEach((element) => {
      let date = element["event_date"].substring(0, 10);
      let name = element["disciplines"];
      let auditory = element["auditory"];
      let begin_time = element["begin_time"];
      addContent(date, name, auditory, begin_time);
    });
  }
  loadShedule();
  return (
    // <View style={first_bg.container}>
    //   <AgendaScreen />
    // </View>

    <View style={styles.container}>
      <Agenda
        items={Content}
        renderItem={(item) => (
          <View style={styles.containerItem}>
            <Text style={styles.containerItemName}>{item.name}</Text>
            <View style={styles.flexForDataAndTime}>
              <Text style={styles.containerItemData}>{item.data}</Text>
              <Text style={styles.containerItemTime}>{item.time}</Text>
            </View>
          </View>
        )}
        theme={{
          calendarBackground: "#3E4556",
          backgroundColor: "green",
          textSectionTitleColor: "#9E9E9E",
          dayTextColor: "#FFFFFF",
          monthTextColor: "#FFFFFF",

          agendaDayNumColor: "#3E4556",
          agendaDayTextColor: "#3E4556",
          agendaTodayColor: "#3E4556",
          agendaDayTextColor: "#3E4556",

          agendaKnobColor: "#768390",
          reservationsBackgroundColor: "#3E4556",
        }}
        showOnlySelectedDayItems={true}
        pastScrollRange={10}
        futureScrollRange={10}
        agendaDayNumColor={false}
        firstDay={1}
        // renderEmptyDate={() => {
        //   return (
        //     <View style={styles.containerItem}>
        //       <Text style={styles.containerItemName}>Тут пока ничего нет</Text>
        //     </View>
        //   );
        // }}
      />
      <View style={styles.btn}>
        <Button
          color="#6393DB"
          title="+"
          onPress={() => {
            console.log("111111");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3E4556",
    paddingTop: 40,
  },
  btn: {
    width: 100,
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 10,
  },
  containerItem: {
    backgroundColor: "#262D3F",
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 13,
    paddingRight: 13,
    marginLeft: -48,
    marginRight: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  flexForDataAndTime: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerItemName: {
    color: "#FFFFFF",
    paddingBottom: 21,
    paddingBottom: 9,
  },
  containerItemData: {
    color: "#FFFFFF",
  },
  containerItemTime: {
    color: "#FFFFFF",
  },
});

export default Task;
