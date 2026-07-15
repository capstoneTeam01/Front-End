import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./CityPickerSheetStyle";
import { CITIES } from "../../constants/cities";

const CityPickerSheet = ({ visible, selectedCity, onSelect, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.title}>Select Your City</Text>
            <Text style={styles.subtitle}>
              Choose your city for nearby repair professionals.
            </Text>

            <View style={styles.cityList}>
              {CITIES.map((city) => {
                const active = city === selectedCity;
                return (
                  <TouchableOpacity
                    key={city}
                    style={[styles.row, active && styles.rowActive]}
                    onPress={() => onSelect(city)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.rowText,
                        active && styles.rowTextActive,
                      ]}
                    >
                      {city}
                    </Text>
                    {active ? (
                      <Text style={styles.check}>✓</Text>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default CityPickerSheet;
