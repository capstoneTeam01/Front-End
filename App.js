import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";

import ImageUpload from "./src/components/ImageUpload";

import TestScreen from "./src/screens/TestScreen";


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageUpload />
      <StatusBar style="auto" />
      <TestScreen />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
