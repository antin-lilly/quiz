import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const QuizResultScreen = ({ route, navigation }) =>
{
    const { selectedOptions } = route.params;
    const correctAnswers = selectedOptions.filter((opt) => opt.isCorrect);
    const percentageCorrect = (correctAnswers.length / selectedOptions.length) * 100;
  
  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Quiz Result</Text>
      <Text>You selected the following options:</Text>
      <View style={styles.selectedOptionsContainer}>
      <Text>Percentage of Correct Answers: {percentageCorrect}%</Text>

      {selectedOptions.map((opt, index) => (
        <Text
          key={index}
          style={[
            styles.selectedOptionText,
            opt.isCorrect ? styles.correctOption : styles.incorrectOption,
          ]}
        >
          Option ID: {opt.optionId} - {opt.isCorrect ? 'Correct' : 'Incorrect'}
        </Text>
      ))}

      </View>
      <Button
        title="Go Back to Home"
        onPress={() => navigation.navigate('Quiz')} // Replace with your navigation route
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedOptionsContainer: {
    marginTop: 16,
  },
  selectedOptionText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default QuizResultScreen;
