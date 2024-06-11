import {
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  TouchableHighlight,
} from "@gorhom/bottom-sheet";

import { Agenda } from "react-native-calendars";
import getDataShedule from "../ICALfactory/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Localization from "../assets/redefinition/Names";

import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";

Localization();

const Task = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(
    new Date().toISOString().split("T")[0].replace(/-/g, "-")
  );

  const Content = {
    "2024-06-10": [
      { name: "0", data: "lorem00", time: "12:30" },
      { name: "01", data: "lorem01", time: "12:31" },
      { name: "02", data: "lorem02", time: "12:32" },
      { name: "03", data: "lorem03", time: "12:33" },
    ],
    "2024-06-11": [{ name: "1", data: "lorem1", time: "13:30" }],
    "2024-06-13": [{ name: "2", data: "lorem2", time: "14:30" }],
    "2024-06-14": [{ name: "3", data: "lorem3", time: "15:30" }],
    "2024-06-15": [{ name: "4", data: "lorem4", time: "16:30" }],
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

  // loadShedule();

  const bottomSheetModalRef = useRef(null);

  function handleBottomSheet() {
    bottomSheetModalRef.current?.present();
  }

  const [newEventAdd, setnewEventAdd] = useState({
    time: "",
    date: "",
    name: "",
    description: "",
  });

  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date("1995-12-17T00:00:00"));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setTime(currentDate);
    let time = selectedDate?.toLocaleTimeString("en-GB").substring(0, 5);
    setnewEventAdd({ ...newEventAdd, time });
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
            renderEmptyData={() => {
              return (
                <View>
                  <Text>Тут пока ничего нет</Text>
                  <Text>Тут пока ничего нет</Text>
                  <Text>Тут пока ничего нет</Text>
                  <Text>Тут пока ничего нет</Text>
                  <Text>Тут пока ничего нет</Text>
                </View>
              );
            }}
            onDayPress={(day) => {
              let date = day.dateString;
              setnewEventAdd({ ...newEventAdd, date });
            }}
          />

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={["50%"]}
            backgroundStyle={{ backgroundColor: "" }}
          >
            <View style={bottomSheetStyles.container}>
              <View style={bottomSheetStyles.formName}>
                <TextInput
                  maxLength={100}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={bottomSheetStyles.input}
                  placeholder="Название"
                  placeholderTextColor="#6b7280"
                  value={newEventAdd.name}
                  onChangeText={(name) =>
                    setnewEventAdd({ ...newEventAdd, name })
                  }
                />
              </View>

              <View style={bottomSheetStyles.formDescription}>
                <TextInput
                  maxLength={300}
                  multiline={true}
                  numberOfLines={1}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={bottomSheetStyles.input}
                  placeholder="Описание"
                  placeholderTextColor="#6b7280"
                  value={newEventAdd.description}
                  onChangeText={(description) =>
                    setnewEventAdd({ ...newEventAdd, description })
                  }
                />
              </View>

              <View style={bottomSheetStyles.pickTimeContainer}>
                <View style={bottomSheetStyles.timePeaker}>
                  <TouchableOpacity
                    onPress={(event, time) => {
                      showMode();
                    }}
                    style={bottomSheetStyles.timePeaker}
                  >
                    <View style={bottomSheetStyles.timePeakerTextContainer}>
                      <Text style={bottomSheetStyles.timePeakerText}>
                        Выбрать время
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={bottomSheetStyles.dateString}>
                  <Text style={bottomSheetStyles.dateStringText}>
                    {time?.toLocaleTimeString("en-GB").substring(0, 5)}
                    {/* {selectedDay} */}
                  </Text>
                </View>
              </View>

              <View style={bottomSheetStyles.addEventContainer}>
                <View style={bottomSheetStyles.addEventBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      //TODO : INIT newEventAdd
                      addContent(
                        newEventAdd.date,
                        newEventAdd.name,
                        newEventAdd.description,
                        newEventAdd.time
                      );
                    }}
                  >
                    <View style={bottomSheetStyles.addEventTextContainer}>
                      <Text style={bottomSheetStyles.addEventText}>
                        Добавить событие
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {show && (
              <DateTimePicker
                mode="time"
                display="spinner"
                value={time}
                is24Hour={true}
                onChange={onChange}
                timeZoneName={"Asia/Yekaterinburg"}
              />
            )}
          </BottomSheetModal>

          <View style={styles.btn}>
            <Button
              color="#6393DB"
              title="Добавить задачу"
              onPress={() => {
                handleBottomSheet();
              }}
            />
          </View>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3E4556",
    paddingTop: 40,
  },
  btn: {
    // height: 50,
    width: 100,
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#6393DB",
    borderRadius: 4,
  },
  btnText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 14,
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

const bottomSheetStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  formName: {
    marginVertical: 10,
  },
  formDescription: {
    marginVertical: 10,

    textAlign: "auto",
  },
  input: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  timePeaker: { flex: 2 },
  timePeakerTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 50,
    // width: "200%",
  },
  timePeakerText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000",
  },
  pickTimeContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 20,
  },
  dateString: {
    backgroundColor: "gray",
    height: 50,
    borderRadius: 12,
    // width: "20%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dateStringText: {},
  addEventContainer: {
    marginVertical: 10,
  },
  addEventBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6393DB",
    borderRadius: 12,
    height: 50,
    width: "100%",
  },
  addEventText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    textTransform: "uppercase",
  },
});

export default Task;
