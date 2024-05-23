import RNFS from "react-native-fs";

export default async function SetUserData(email, password) {
  const directoryPath = RNFS.DocumentDirectoryPath + "/DataUser";
  const filePath = directoryPath + "/dontlook.txt";

  try {
    await RNFS.mkdir(directoryPath);
    await RNFS.writeFile(filePath, email + " " + password, "utf8");
    Alert.alert("УРАААА ПОБЕДА", "ну и где это");
  } catch (error) {
    Alert.alert("Error", `Failed to write file: ${error.message}`);
  }

  const readFile = async () => {
    const path = RNFS.DocumentDirectoryPath + "/dontlook.txt";

    try {
      const content = await RNFS.readFile(path, "utf8");
      Alert.alert("File Content", content);
    } catch (error) {
      Alert.alert("Error", `Failed to read file: ${error.message}`);
    }
  };

  readFile();
}
