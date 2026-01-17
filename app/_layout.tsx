import { Platform, View } from "react-native";

import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { globalStyles } from "@/styles/global-styles";

import * as SystemUI from "expo-system-ui";
const isAndroid = Platform.OS === "android";

if (isAndroid) {
  const isAndroid = Platform.OS === "android";
  if (isAndroid) {
    SystemUI.setBackgroundColorAsync("transparent");
  }
}

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("./fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={globalStyles.background}>
      <Slot />
      <StatusBar style="light" />
    </View>
  );
};

export default RootLayout;
