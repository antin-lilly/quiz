import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../globalStyles';

const StyledButton = ({ onPress, text, buttonStyle, textStyle, disabled }) =>
{
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledButton : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.textColor, disabled ? styles.disabledText : null]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...globalStyles.button,
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
  textColor: {
    ...globalStyles.fontSize16,
    ...globalStyles.textColorWhite,
  },
  disabledText: {
    color: 'gray',
  },
});

export default StyledButton;
