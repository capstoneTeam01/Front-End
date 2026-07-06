import React from "react";
import { View } from "react-native";
import styles from "./AuthFooterTrayStyle";

const AuthFooterTray = ({ children }) => {
  return <View style={styles.tray}>{children}</View>;
};

export default AuthFooterTray;
