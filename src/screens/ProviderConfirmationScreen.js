import React from "react";
import { Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import ProviderPlainButton from "../components/ProviderPlainButton";

const androidTopSpace = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const bottomButtonSpace = Platform.OS === "android" ? 72 : 20;

const ProviderConfirmationScreen = ({ navigation, route }) => {
  const count = route?.params?.selectedProviderIds?.length || 0;
  const opened = route?.params?.quoteStatus === "email-draft-opened";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 12, paddingTop: 12 + androidTopSpace, paddingBottom: bottomButtonSpace }}>
        <Text>Done</Text>
        <Text>{opened ? "Email draft opened." : "Email draft was prepared, but email app did not open."}</Text>
        <Text>Selected providers: {count}</Text>
        <ProviderPlainButton title="Home" onPress={() => navigation.navigate("Home")} />
        <ProviderPlainButton title="Recent Scans" onPress={() => navigation.navigate("MyRepairs")} />
      </View>
    </SafeAreaView>
  );
};

export default ProviderConfirmationScreen;
