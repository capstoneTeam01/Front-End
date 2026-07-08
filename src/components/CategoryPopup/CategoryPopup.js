import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";

import CategoryIcon from "../CategoryIcon";
import CategoryCard from "../CategoryCard/CategoryCard";
import { CATEGORIES } from "../../data/repairData";
import styles from "./CategoryPopupStyle";
import COLORS from "../../constants/colors";

const CategoryPopup = ({ visible, onClose, onSelectCategory }) => {
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

            <Text style={styles.title}>Select Repair Category</Text>
            <Text style={styles.subtitle}>
              Choose the issue type before scanning.
            </Text>

            <View style={styles.grid}>
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  label={cat.label}
                  fill={COLORS.lightHoney}
                  icon={
                    <CategoryIcon
                      categoryId={cat.id}
                      size={24}
                      color={COLORS.secondary}
                    />
                  }
                  onPress={() => onSelectCategory?.(cat)}
                />
              ))}
            </View>

            <Text style={styles.footer}>
              Not sure? Choose the closest match.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default CategoryPopup;
