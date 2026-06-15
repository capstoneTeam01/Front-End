import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppTextField from "../components/AppTextField/AppTextField";
import ServiceProviderCard from "../components/ServiceProviderCard/ServiceProviderCard";
import ToggleButton from "../components/ToggleButton/ToggleButton";

const TestScreen = () => {
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("today");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <View
        style={{
          gap: 20,
        }}
      >
        <AppTextField
          value={address}
          onChangeText={setAddress}
          placeholder="Street Address"
        />

        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <ToggleButton
            text="Today"
            isActive={selected === "today"}
            onPress={() => setSelected("today")}
          />

          <ToggleButton
            text="Tomorrow"
            isActive={selected === "tomorrow"}
            onPress={() => setSelected("tomorrow")}
          />

          <ToggleButton
            text="Select Date"
            isActive={selected === "date"}
            onPress={() => setSelected("date")}
          />
        </View>

        <ServiceProviderCard
          title="ABC Plumbing"
          rating="4.8"
          reviews="126"
          distance="2.3 km"
          icon={<View />}
          actionIcon={null}
        />
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;