import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import QuestionCard from '../components/QuestionCard'; // Import your QuestionCard component
import quiz from '../mockData/mockData';

const QuizScreen = ({ route, navigation }) =>
{
  const { quizId } = route.params; // Get quizId from navigation params
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (optionId) => {

    // Handle logic for checking if the selected option is correct
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options.find(
      (option) => option.id === optionId
    ).is_correct;

    setSelectedOptions([...selectedOptions, { optionId, isCorrect }])
  };
  const handleNextQuestion = () => {
    // Handle logic for moving to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle end of quiz
      navigation.navigate('QuizResult', { selectedOptions });
    }
  };
  // Fetch quiz and questions based on quizId
  const quiz1 = quiz?.quizzes;
  const questions = quiz?.questions;
  const currentQuestion = questions[currentQuestionIndex];


    return (
    <View>
      <Text>{quiz1?.title}</Text>
      <QuestionCard
        question={currentQuestion}
        onSelectOption={handleOptionSelect}
        selectedOptions={selectedOptions}
      />
      <Button title="Next" onPress={handleNextQuestion} />
    </View>
  );
};

export default QuizScreen;
