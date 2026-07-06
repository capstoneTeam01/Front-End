import React from "react";
import { View, Text } from "react-native";
import styles from "./WelcomeScreenStyle.js";
import HeroHexagon from "../components/HeroHexagon/HeroHexagon";
import AuthButton from "../components/AuthButton/AuthButton";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import Welcome from "../components/Mascot/Welcome.svg";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.heroWrap}>
        <HeroHexagon flatTop width={280} contentOffsetY={16}>
          <Welcome width={150} height={150} />
        </HeroHexagon>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>Welcome to FixBee</Text>
        <Text style={styles.body}>
          Your home repair companion. Identify issues, get solutions and connect
          with trusted professionals.
        </Text>
      </View>

      <AuthFooterTray>
        <View style={styles.buttonRow}>
          <View style={styles.buttonHalf}>
            <AuthButton
              label="Sign Up"
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
          <View style={styles.buttonHalf}>
            <AuthButton
              label="Login"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </AuthFooterTray>
    </View>
  );
};

export default WelcomeScreen;
