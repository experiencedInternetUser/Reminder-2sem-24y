import { View, SafeAreaView, StyleSheet, Text, Button } from "react-native";
import React, { useState } from "react";
import { Agenda } from "react-native-calendars";

const Task = ({ navigation }) => {
  const Content = {
    "2024-05-22": [{ name: "1", data: "lorem1", time: "12:30" }],
    "2024-05-22": [{ name: "12", data: "lorem1", time: "12:30" }],
    "2024-05-22": [{ name: "13", data: "lorem1", time: "12:30" }],
    "2024-05-22": [{ name: "1", data: "lorem1", time: "12:30" }],
    "2024-05-23": [{ name: "2", data: "lorem2", time: "12:30" }],
    "2024-05-24": [{ name: "3", data: "lorem3", time: "12:30" }],
  };

  function addContent(date, name, dataValue, time) {
    if (Content[date]) {
      Content[date].push({ name: name, data: dataValue, time: time });
    } else {
      Content[date] = [{ name: name, data: dataValue, time: time }];
    }
  }

  addContent("2024-05-22", "4", "lorem4", "13:00");
  addContent("2024-05-25", "5", "lorem5", "13:00");

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
