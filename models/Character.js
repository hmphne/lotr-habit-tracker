import React from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

export default function Character({ position, fadeAnim, image }) {
  const [x, y] = position;

  return (
    <Animated.View
      style={[
        styles.characterContainer,
        {
          transform: [{ translateX: x }, { translateY: y }],
          opacity: fadeAnim,
        },
      ]}
    >
      <Image source={image} style={styles.characterSmall} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  characterContainer: {
    position: "absolute",
    zIndex: 10,
  },
  characterSmall: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});
