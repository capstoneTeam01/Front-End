import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader/AppHeader";
import styles from "./RecentScansScreenStyle";
import COLORS from "../constants/colors";

const RecentScansScreen = ({ navigation, route }) => {
  const scans = route?.params?.scans || [];

  return (
    <View style={styles.safe}>
      <AppHeader
        title="Recent Scans"
        onBack={() => navigation?.goBack()}
      />

      <FlatList
        data={scans}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation?.navigate("DIYSolution", {
                analysisResult: {
                  ...item.analysis,
                  photoId: item.id,
                },
                urgency: item.analysis?.urgency || "Low",
              })
            }
          >
            <View style={styles.iconBox}>
              <Ionicons
                name="camera-outline"
                size={24}
                color={COLORS.textMuted}
              />
            </View>

            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                Plumbing  {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecentScansScreen;