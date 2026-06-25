import React from "react";
import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";
import styles from "./CityPickerSheetStyle";
import { CITIES } from "../../constants/cities";

const CityPickerSheet = ({ visible, selectedCity, onSelect, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Select your city</Text>

        {CITIES.map((city) => {
          const active = city === selectedCity;
          return (
            <TouchableOpacity
              key={city}
              style={[styles.row, active && styles.rowActive]}
              onPress={() => onSelect(city)}
              activeOpacity={0.7}
            >
              <Text style={[styles.rowText, active && styles.rowTextActive]}>
                {city}
              </Text>
              {active && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </Modal>
  );
};

export default CityPickerSheet;
