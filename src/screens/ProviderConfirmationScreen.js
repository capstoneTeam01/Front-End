import React from "react";
import { Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProviderPlainButton from "../components/ProviderPlainButton";
import PolygonAsset from "../components/PolygonAsset";
import COLORS from "../constants/colors";
import { BUTTON_HEIGHT, RADIUS, SIDE_PADDING, TYPE } from "../constants/layout";

const androidTopSpace = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

const ProviderConfirmationScreen = ({ navigation, route }) => {
  const sent = route?.params?.quoteStatus === "email-sent";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.wrap, { paddingTop: 26 + androidTopSpace }]}>
        <View style={styles.card}>
          <View style={styles.handle} />

          <View style={styles.successIconWrap}>
            <PolygonAsset
              variant="polygon9"
              width={78}
              height={87}
              fill={COLORS.lightHoney}
            >
              <Ionicons
                name="checkmark-sharp"
                size={36}
                color={COLORS.secondary}
              />
            </PolygonAsset>
          </View>

          <Text style={styles.title}>{sent ? "Email Sent" : "Request Prepared"}</Text>
          <Text style={styles.subtitle}>
            {sent
              ? "Your request has been sent to selected providers."
              : "Your request was prepared, but it was not sent."}
          </Text>

          <View style={styles.actionsSpacer} />

          <View style={styles.actions}>
            <View style={styles.actionButton}>
              <ProviderPlainButton
                title="Recent Scans"
                onPress={() => navigation.navigate("MyRepairs")}
                style={styles.recentButton}
              />
            </View>
            <Pressable style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
              <Text style={styles.homeText}>Home</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  wrap: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SIDE_PADDING,
  },
  card: {
    minHeight: 420,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.big,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 18,
    paddingBottom: 78,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 6,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray700,
    marginBottom: 30,
  },
  successIconWrap: {
    width: 78,
    height: 87,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 26,
    ...TYPE.screenTitle,
  },
  subtitle: {
    color: COLORS.providerMidGray,
    textAlign: "center",
    paddingHorizontal: 10,
    ...TYPE.cardTitle,
  },
  actionsSpacer: {
    flex: 1,
    minHeight: 86,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
  },
  actionButton: {
    flex: 1,
  },
  recentButton: {
    paddingHorizontal: 8,
  },
  homeButton: {
    flex: 1,
    minHeight: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.honeyLight,
    alignItems: "center",
    justifyContent: "center",
  },
  homeText: {
    color: COLORS.providerBrown,
    ...TYPE.button,
  },
});

export default ProviderConfirmationScreen;
