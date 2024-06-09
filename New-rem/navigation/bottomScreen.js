import {
  Button,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";

export default function BottomScreen() {
  const bottomSheetModalRef = useRef(null);

  return (
    <BottomSheetModalProvider>
      <View>
        <BottomSheetModal ref={bottomSheetModalRef}>
          <Text>124242</Text>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}
