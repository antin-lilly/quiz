import React, { useState } from 'react';
import { View, Text, Button } from 'native-base';
import QuestionCard from '../components/QuestionCard'; // Import your QuestionCard component
import quiz from '../mockData/mockData';

const QuizScreen = ({ navigation, route }) =>
{

  const title = route.params.title;
  const quizId = route.params.quizId;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('QuizResult', { selectedOptions });
    }
  };

  const handleOptionSelect = (optionId) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options.find(
      (option) => option.id === optionId
    ).is_correct;
  
    const isAlreadySelected = selectedOptions.some(
      (selectedOption) => selectedOption.optionId === optionId
    );
  
    if (isAlreadySelected) {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((opt) => opt.optionId !== optionId)
      );
    } else {
      setSelectedOptions([...selectedOptions, { optionId, isCorrect }]);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const isNextButtonDisabled = selectedOptions.length === 0;

  const questions = quiz?.questions.filter((question) => question.quiz_id === quizId);

  const currentQuestion = questions[currentQuestionIndex];

    return (
    <View>
        <Text>{title}{quizId}</Text>
      <QuestionCard
        question={currentQuestion}
        onSelectOption={handleOptionSelect}
        selectedOptions={selectedOptions}
        />
         <Button
        title="Previous"
        onPress={handlePreviousQuestion}
        disabled={currentQuestionIndex === 0}
      />
        <Button
          title="Next"
          onPress={handleNextQuestion}
          disabled={isNextButtonDisabled}
        />
    </View>
  );
};

export default QuizScreen;
