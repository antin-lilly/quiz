import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../globalStyles';

const StyledButton = ({ onPress, text, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.textColor}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...globalStyles.button,
  },
  textColor: {
    ...globalStyles.fontSize16,
    ...globalStyles.textColorWhite,
  }
});

export default StyledButton;
