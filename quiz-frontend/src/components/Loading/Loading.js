import React, { useRef, useEffect } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Box, View } from "native-base";
import Brain from "../../assets/Brain.png";

const Loading = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Box style={styles.container}>
      <View>
        <Animated.Image
          source={Brain}
          alt="brain"
          style={[
            { width: 200, height: 200 },
            { transform: [{ rotateY: spin }] },
          ]}
        />
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(140,108,208,0.1)",
  },
});

export default Loading;
