import React, { useRef, useEffect, useContext } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Box, View, Text } from "native-base";
import Brain from "../../assets/Brain.png";
import { LoadingContext } from "../../contexts/LoadingContext";
import { globalStyles } from "../../globalStyles";

const Loading = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const { isLoading } = useContext(LoadingContext);

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

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Animated.Image
          source={Brain}
          alt="brain"
          style={[
            { width: 200, height: 200 },
            { transform: [{ rotateY: spin }] },
          ]}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.flex1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    zIndex: 9,
  },
  overlay: {
    alignItems: "center",
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
    ...globalStyles.textColorSpecial,
    marginTop: 20,
    padding: 10,
  },
});

export default Loading;
