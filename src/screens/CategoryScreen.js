import React from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenHeader from "../components/ScreenHeader/ScreenHeader";
import ScanHexButton from "../components/ScanHexButton/ScanHexButton";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import RepairListItem from "../components/RepairListItem/RepairListItem";

import { CATEGORY_DETAILS } from "../data/repairData";
import COLORS from "../constants/colors";
import styles from "./CategoryScreenStyle";

const CategoryScreen = ({ navigation, route }) => {
  const categoryId = route?.params?.categoryId || "plumbing";
  const headerTitle = route?.params?.title || "Plumbing";

  const detail = CATEGORY_DETAILS[categoryId] || CATEGORY_DETAILS.plumbing;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title={headerTitle}
          showBack
          onBack={() => navigation?.goBack()}
          onBellPress={() => navigation?.navigate("Notifications")}
        />

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>{detail.title}</Text>
          <Text style={styles.bannerSubtitle}>{detail.description}</Text>
        </View>

        <View style={styles.scanWrap}>
          <ScanHexButton
            onPress={() =>
              navigation?.navigate("Scan", { categoryId, title: headerTitle })
            }
          />
        </View>

        <View style={styles.popularHeader}>
          <SectionHeader
            title="Popular Repairs"
            actionLabel="See All"
            onActionPress={() => {}}
          />
        </View>

        <View style={styles.repairsCard}>
          {detail.repairs.map((item, i) => (
            <RepairListItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              showDivider={i > 0}
              icon={
                <Ionicons
                  name={item.icon}
                  size={18}
                  color={COLORS.textPrimary}
                />
              }
              onPress={() =>
                navigation?.navigate("Scan", { categoryId, repairId: item.id })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;