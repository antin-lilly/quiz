import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import StyledButton from '../../StyledButton/StyledButton';
import { globalStyles } from '../../../globalStyles';
import Sprinkle from "../../../assets/Sprinkle1.png";


const QuizResultScreen = ({ route, navigation }) =>
{
  const { score, totalQuestions, title } = route.params;

  return (
    <ImageBackground style={styles.imageBackground} source={Sprinkle}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.result} allowFontScaling >You scored {score} out of {totalQuestions}</Text>
        <StyledButton size="lg" text="Go Back to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  imageBackground: {
    ...globalStyles.flex1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba( 200,0, 100, 0.2 )',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 10,
    justifyContent: 'center',
    ...globalStyles.fontSize20,
    ...globalStyles.fontWeightBold,
    fontSize: 24,
  },
  result: {
    padding: 40,
    ...globalStyles.fontWeightBold,
    fontSize: 20,
  }
});

export default QuizResultScreen;
