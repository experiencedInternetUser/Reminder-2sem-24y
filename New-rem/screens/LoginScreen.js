import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import getDataShedule from "../ICALfactory/request";
import SetUserData from "../ICALfactory/setUser";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    //background?
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{}}
            style={styles.headerImg}
            alt="Logo"
            //ахахахахахха альт
          />
          <Text style={styles.title}>ВХОД</Text>
          <Text style={styles.subtitle}>где</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="chushpan2005"
              placeholderTextColor="#6b7280"
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Пороль</Text>
            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="************"
              placeholderTextColor="#6b7280"
              value={form.password}
              onChangeText={(password) => setForm({ ...form, password })}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={async () => {
                // await getDataShedule(form.email, form.password);
                // console.log(await dataSchedule);
                await SetUserData(form.email, form.password);
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Зайти</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "red",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  btn: {
    backgroundColor: "#075eec",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#875eec",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
