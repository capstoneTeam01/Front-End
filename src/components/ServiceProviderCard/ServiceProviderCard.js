import React from "react";
import { View, Text } from "react-native";
import styles from "./ServiceProviderCardStyle";

const ServiceProviderCard = ({
  icon,
  title,
  rating,
  reviews,
  distance,
  actionIcon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.left}>
          <View style={styles.icon}>
            {icon}
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.info}>
              <View style={styles.rating}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.ratingText}>{rating}</Text>
              </View>

              <Text style={styles.reviewText}>
                ({reviews})
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.right}>
          <Text style={styles.distance}>{distance}</Text>
          {actionIcon}
        </View>
      </View>
    </View>
  );
};

export default ServiceProviderCard;