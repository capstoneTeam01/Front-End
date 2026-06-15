import React from "react";
import { ScrollView, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../components/ScreenHeader/ScreenHeader";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import RecentScanCard from "../components/RecentScanCard/RecentScanCard";
import RepairListItem from "../components/RepairListItem/RepairListItem";

import COLORS from "../constants/colors";
import styles from "./MyRepairsScreenStyle";

const recentScans = [
  {
    id: "1",
    title: "Sink Leak Pipe",
    date: "4 Days ago",
    status: "Issue Detected",
  },
  {
    id: "2",
    title: "Ceiling Stain",
    date: "2 Weeks ago",
    status: "Pending",
  },
];

const completedRepairs = [
  {
    id: "1",
    title: "Pipe Leak",
    subtitle: "2 days ago",
  },
  {
    id: "2",
    title: "Electrical Hazard",
    subtitle: "4 days ago",
  },
  {
    id: "3",
    title: "Water Damage",
    subtitle: "5 days ago",
  },
];

const MyRepairsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="My Repairs"
          onBellPress={() => navigation?.navigate("Notifications")}
        />

        <View style={styles.section}>
          <SectionHeader
            title="Recent Scans"
            actionLabel="See All"
            onActionPress={() => {}}
          />

          <FlatList
            horizontal
            data={recentScans}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scanList}
            renderItem={({ item }) => <RecentScanCard item={item} />}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Completed Repairs"
            actionLabel="See All"
            onActionPress={() => {}}
          />

          <View style={styles.completedList}>
            {completedRepairs.map((item) => (
              <RepairListItem
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                icon={
                  <Ionicons
                    name="camera-outline"
                    size={24}
                    color={COLORS.textMuted}
                  />
                }
                onPress={() => {}}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyRepairsScreen;