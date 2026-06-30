import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ScreenHeader from "../components/ScreenHeader/ScreenHeader";
import styles from "./RecentScansScreenStyle";
import COLORS from "../constants/colors";

const RecentScansScreen = ({ navigation, route }) => {
  const scans = route?.params?.scans || [];

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader
        title="Recent Scans"
        showBack
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
    </SafeAreaView>
  );
};

export default RecentScansScreen;