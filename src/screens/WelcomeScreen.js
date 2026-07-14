import React from "react";
import { useWindowDimensions, View, Text } from "react-native";
import styles from "./WelcomeScreenStyle.js";
import AuthButton from "../components/AuthButton/AuthButton";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import HoneycombBackground from "../components/HoneycombBackground";
import PolygonAsset from "../components/PolygonAsset";
import Welcome from "../components/Mascot/Welcome.svg";

const FIGMA_FRAME_WIDTH = 402;
const HERO_WIDTH = 354;
const MASCOT_WIDTH = 150;
const MASCOT_HEIGHT = 174;

const WelcomeScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const scale = width / FIGMA_FRAME_WIDTH;

  return (
    <View style={styles.container}>
      <HoneycombBackground variant="welcome" />

      <View style={styles.heroWrap}>
        <PolygonAsset
          variant="polygon5"
          width={Math.round(HERO_WIDTH * scale)}
          contentStyle={styles.heroContent}
        >
          <Welcome
            width={Math.round(MASCOT_WIDTH * scale)}
            height={Math.round(MASCOT_HEIGHT * scale)}
          />
        </PolygonAsset>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>Welcome to FixBee</Text>
        <Text style={styles.body}>
          Your home repair companion.{"\n"}
          Identify issues, get solutions and connect with trusted professionals.
        </Text>
      </View>

      <AuthFooterTray>
        <View style={styles.buttonRow}>
          <View style={styles.buttonHalf}>
            <AuthButton
              label="Sign Up"
              onPress={() => navigation.navigate("SignUp")}
              style={styles.welcomeButton}
              labelStyle={styles.welcomeButtonLabel}
            />
          </View>
          <View style={styles.buttonHalf}>
            <AuthButton
              label="Login"
              onPress={() => navigation.navigate("Login")}
              style={styles.welcomeButton}
              labelStyle={styles.welcomeButtonLabel}
            />
          </View>
        </View>
      </AuthFooterTray>
    </View>
  );
};

export default WelcomeScreen;
