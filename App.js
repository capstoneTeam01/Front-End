import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";

import ImageUpload from "./src/components/ImageUpload";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageUpload />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
