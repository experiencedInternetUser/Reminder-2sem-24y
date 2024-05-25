import { View, SafeAreaView, StyleSheet, Text, Button } from "react-native";
import React, { useState } from "react";
import { Agenda } from "react-native-calendars";
import getDataShedule from "../ICALfactory/request";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Task = ({ navigation }) => {
  const Content = {
    "2024-05-22": [{ name: "1", data: "lorem1", time: "12:30" }],
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

    <SafeAreaView style={styles.container}>
      <Agenda
        items={Content}
        renderItem={(item, isFirst) => (
          <View style={styles.containerItem}>
            <Text style={styles.containerItemName}>{item.name}</Text>
            <View style={styles.flexForDataAndTime}>
              <Text style={styles.containerItemData}>{item.data}</Text>
              <Text style={styles.containerItemTime}>{item.time}</Text>
            </View>
          </View>
        )}
        theme={{}}
      />
      <View>
        <Button
          title="+"
          color="#000000"
          onPress={() => {
            console.log("111111");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262D3F",
    marginTop: 40,
  },
  containerItem: {
    backgroundColor: "#262D3F",
    marginBottom: "8px",
  },
  flexForDataAndTime: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerItemName: {
    color: "#FFFFFF",
  },
  containerItemData: {
    color: "#FFFFFF",
  },
  containerItemTime: {
    color: "#FFFFFF",
  },
});

export default Task;
