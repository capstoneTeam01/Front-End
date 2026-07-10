import React, { useId } from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { ClipPath, Defs, Image as SvgImage, Path } from "react-native-svg";

import COLORS from "../../constants/colors";
import PolygonAsset, { POLYGON_ASSETS } from "../PolygonAsset";
import styles from "./HexAvatarStyle";

const HEX_PATH = POLYGON_ASSETS.polygon9.path;

const HexAvatar = ({
  size = 110,
  imageUri = null,
  showEditBadge = false,
  onEditPress,
}) => {
  const height = (size * 89) / 80;
  const clipId = useId().replace(/:/g, "");
  const hasImage = Boolean(imageUri);

  return (
    <View style={[styles.wrap, { width: size, height }]}>
      {hasImage ? (
        <Svg width={size} height={height} viewBox="0 0 80 89">
          <Defs>
            <ClipPath id={clipId}>
              <Path d={HEX_PATH} />
            </ClipPath>
          </Defs>
          <Path d={HEX_PATH} fill={COLORS.lightHoney} />
          <SvgImage
            href={imageUri}
            x="0"
            y="0"
            width="80"
            height="89"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        </Svg>
      ) : (
        <>
          <PolygonAsset
            variant="polygon9"
            width={size}
            height={height}
            fill={COLORS.lightHoney}
            style={styles.polygon}
          />
          <View style={styles.iconLayer}>
            <Ionicons
              name="person-outline"
              size={size * 0.34}
              color={COLORS.secondary}
            />
          </View>
        </>
      )}

      {showEditBadge && (
        <Pressable
          onPress={onEditPress}
          style={styles.editBadge}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Edit profile photo"
        >
          <Ionicons name="pencil" size={14} color={COLORS.white} />
        </Pressable>
      )}
    </View>
  );
};

export default HexAvatar;
