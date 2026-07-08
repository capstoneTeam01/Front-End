import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

import COLORS from "../../constants/colors";
import styles from "./AuthFooterTrayStyle";

const AuthFooterTray = ({ children }) => {
  return (
    <View style={styles.tray}>
      <Svg
        pointerEvents="none"
        style={styles.shape}
        viewBox="0 0 402 102"
        preserveAspectRatio="none"
      >
        <Path
          d="M0 38 L17 9 C21.5 3.5 29 0 38 0 H364 C373 0 380.5 3.5 385 9 L402 38 V102 H0 Z"
          fill={COLORS.lightHoney}
        />
      </Svg>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default AuthFooterTray;
