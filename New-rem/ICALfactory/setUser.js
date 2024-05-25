import AsyncStorage from "@react-native-async-storage/async-storage";
import getDataShedule from "./request";

export default async function SetUserData(email, password) {
  const form = {
    email: email,
    password: password,
  };

  await AsyncStorage.setItem("userForm", JSON.stringify(form));

  const GetSaveItem = async () => {
    try {
      const value = await AsyncStorage.getItem("userForm");
      if (value !== null) {
        console.log(JSON.parse(value));
      } else {
        console.log("Данные не найдены");
      }
    } catch (error) {
      console.log(error);
      //alert
    }
  };

  //TODO
  return true;
}
