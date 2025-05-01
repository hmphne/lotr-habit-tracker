import { Animated } from "react-native";

export const animateTiming = (ref, toValue, duration = 500) => {
  return new Promise((resolve) => {
    Animated.timing(ref, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(resolve);
  });
};
