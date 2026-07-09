import React from "react";
import { Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import ProviderPlainButton from "../components/ProviderPlainButton";
import ProviderHexAvatar from "../components/ProviderHexAvatar";
import COLORS from "../constants/colors";
import { BUTTON_HEIGHT, RADIUS, SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

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
    paddingHorizontal: SIDE_PADDING,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.big,
    paddingHorizontal: SIDE_PADDING,
    paddingVertical: SPACING.large,
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
    position: "absolute",
    color: COLORS.providerBrown,
    ...TYPE.cardTitle,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    ...TYPE.sectionTitle,
  },
  subtitle: {
    color: COLORS.providerMidGray,
    textAlign: "center",
    ...TYPE.small,
  },
  reference: {
    color: COLORS.providerMidGray,
    marginTop: 14,
    ...TYPE.caption,
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
