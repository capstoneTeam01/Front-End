import React from "react";
import { Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import ProviderPlainButton from "../components/ProviderPlainButton";
import ProviderHexAvatar from "../components/ProviderHexAvatar";
import COLORS from "../constants/colors";
import FONT from "../constants/typography";

const androidTopSpace = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

const ProviderConfirmationScreen = ({ navigation, route }) => {
  const count = route?.params?.selectedProviderIds?.length || 0;
  const sent = route?.params?.quoteStatus === "email-sent";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.wrap, { paddingTop: 26 + androidTopSpace }]}>
        <View style={styles.card}>
          <View style={styles.successIconWrap}>
            <ProviderHexAvatar label="✓" size={54} selected />
            <Text style={styles.checkOverlay}>✓</Text>
          </View>

          <Text style={styles.title}>{sent ? "Email Sent" : "Request Prepared"}</Text>
          <Text style={styles.subtitle}>
            {sent
              ? `Your request has been sent to ${count} selected provider${count === 1 ? "" : "s"}.`
              : "Your request was prepared, but it was not sent."}
          </Text>

          {route?.params?.quoteRequestId ? (
            <Text style={styles.reference}>Reference: {route.params.quoteRequestId}</Text>
          ) : null}

          <View style={styles.actions}>
            <View style={styles.actionButton}>
              <ProviderPlainButton title="Recent Scans" onPress={() => navigation.navigate("MyRepairs")} />
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
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    paddingHorizontal: 24,
    paddingVertical: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
  },
  successIconWrap: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  checkOverlay: {
    fontFamily: FONT.extraBold,
    position: "absolute",
    color: COLORS.providerBrown,
    fontWeight: "900",
    fontSize: 17,
  },
  title: {
    fontFamily: FONT.extraBold,
    color: COLORS.textPrimary,
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: FONT.regular,
    color: COLORS.providerMidGray,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
  },
  reference: {
    fontFamily: FONT.regular,
    color: COLORS.providerMidGray,
    fontSize: 10,
    marginTop: 14,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 30,
  },
  actionButton: {
    width: 142,
  },
  homeButton: {
    width: 112,
    minHeight: 46,
    borderRadius: 13,
    backgroundColor: COLORS.honeyLight,
    alignItems: "center",
    justifyContent: "center",
  },
  homeText: {
    fontFamily: FONT.bold,
    color: COLORS.providerBrown,
    fontSize: 13,
    fontWeight: "700",
  },
});

export default ProviderConfirmationScreen;
