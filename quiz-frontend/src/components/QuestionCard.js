import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuestionCard = ({ question, onSelectOption, selectedOptions }) =>
{
  const [allOptionsSelected, setAllOptionsSelected] = useState(false);

  const handleOptionSelect = (optionId) => {
    onSelectOption(optionId);
    checkAllOptionsSelected();
  };

  const checkAllOptionsSelected = () => {
    const allSelected = question.options.every((option) =>
      selectedOptions.includes(option.id)
    );
    setAllOptionsSelected(allSelected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question_text}</Text>
      {question.options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionButton,
            selectedOptions.includes(option.id) && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(option.id)}
        >
          <Text style={styles.optionText}>{option.option_text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 14,
  },
});

export default QuestionCard;
