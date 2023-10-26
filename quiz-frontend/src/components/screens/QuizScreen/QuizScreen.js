import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'native-base';
import QuizService from '../../../services/Quiz.service';
import QuestionService from '../../../services/Question.service';
import { StyleSheet, TouchableOpacity } from 'react-native';
import StyledButton from '../../StyledButton/StyledButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizScreen = ({ navigation, route }) => {
  const title = route.params.title;
  const quizId = route.params.quizId;
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questionType, setQuestionType] = useState(1);

  const getToken = async () => {
    try {
      const tokenFetch = await AsyncStorage.getItem('@token');
      return tokenFetch;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = await getToken();
      QuizService.getQuestions(quizId, token).then((res) => {
        setQuestions(res.data);
        setCurrentQuestion(res.data[0]);
      });
    };

    fetchQuestions();
  }, [quizId]);

  const fetchOptions = async (questionID) => {
    const token = await getToken();
    QuestionService.getOptions(questionID, token).then((res) => {
      setOptions(res.data);
    });
  };

  useEffect(() => {
    if (currentQuestion) {
      fetchOptions(currentQuestion?.ID);
      setQuestionType(currentQuestion?.questionType);
    }
  }, [currentQuestion]);

  const nextQuestion = () => {
    const nextQuestionIndex = questions.findIndex(
      (question) => question.ID === currentQuestion.ID
    ) + 1;
    setSelectedOptions([]);
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestion(questions[nextQuestionIndex]);
    } else {
      navigation.navigate('QuizResult', {
        title: title,
        quizId: quizId,
        score: score,
        totalQuestions: questions.length,
      });
    }
  };

  useEffect(() => {
    handleScore();
  }, [selectedOptions]);

  const handleScore = useCallback(() => {
    const correctOptionIds = options
      .filter((option) => option.isCorrect)
      .map((option) => option.ID);

    if (questionType === 1) {
      if (
        selectedOptions.length === 1 &&
        correctOptionIds.includes(selectedOptions[0])
      ) {
        setScore((prevScore) => prevScore + 1);
      }
    } else if (questionType === 2) {
      const allCorrectOptionsSelected = correctOptionIds.every(
        (correctOptionId) => selectedOptions.includes(correctOptionId)
      );
      const noIncorrectOptionsSelected = selectedOptions.every((optionId) =>
        correctOptionIds.includes(optionId)
      );

      if (allCorrectOptionsSelected && noIncorrectOptionsSelected) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  }, [selectedOptions, questionType, options]);

  const handleOptionPress = (optionId) => {
    if (questionType === 1) {
      setSelectedOptions([optionId]);
    } else if (questionType === 2) {
      setSelectedOptions((prevSelectedOptions) => {
        if (prevSelectedOptions.includes(optionId)) {
          return prevSelectedOptions.filter((id) => id !== optionId);
        } else {
          return [...prevSelectedOptions, optionId];
        }
      });
    }
  };

  useEffect(() => {
    if (selectedOptions.length > 0) {
      setNextButtonDisabled(false);
    } else {
      setNextButtonDisabled(true);
    }
  }, [selectedOptions]);

  const findQuestionIndex = (questionId) => {
    return (
      questions.findIndex((question) => question.ID === questionId) + 1
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion?.questionText}</Text>
        <Text style={styles.progressText}>
          {findQuestionIndex(currentQuestion?.ID)} / {questions.length}
        </Text>
      </View>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.ID}
          onPress={() => handleOptionPress(option.ID)}
          style={[
            styles.option,
            {
              backgroundColor: selectedOptions.includes(option.ID)
                ? 'rgb(203, 195, 227)'
                : 'white',
            },
          ]}
        >
          <Text key={option.ID} style={styles.optionText}>
            {option.optionText}
          </Text>
        </TouchableOpacity>
      ))}
      <StyledButton
        size="lg"
        text="Next Question"
        onPress={nextQuestion}
        disabled={nextButtonDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingTop: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  questionText: {
    flex: 2,
    fontSize: 18,
  },
  progressText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  option: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default QuizScreen;
