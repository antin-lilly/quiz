import React, { useEffect, useMemo, useContext, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, Box, Text } from "native-base";
import { globalStyles } from "../../globalStyles";
import QuizService from "../../services/Quiz.service";
import { LoadingContext } from "../../contexts/LoadingContext";
import LoadingWrapper from "../Loading/LoadingWrapper";
// import Loading from "../Loading/Loading";
import useLoader from "../../hooks/useLoader";

const styles = StyleSheet.create({
  quizItemContainer: {
    ...globalStyles.backgroundColorSecondary,
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  quizTitle: {
    ...globalStyles.fontSize20,
    ...globalStyles.fontWeightBold,
    ...globalStyles.textColorPrimary,
    marginBottom: 10,
  },
  quizDescription: {
    ...globalStyles.fontSize16,
    ...globalStyles.textColorPrimary,
  },
  startButton: {
    marginTop: 25,
    alignSelf: "flex-end",
    ...globalStyles.backgroundColorPrimary,
    width: "100%",
  },
  startButtonText: {
    ...globalStyles.textColorWhite,
    ...globalStyles.fontSize16,
  },
});

const QuestionList = ({ navigation, searchText }) => {
  // const { startLoading, stopLoading, isLoading, setLoading } =
  // useContext(LoadingContext);
  const { loading, setLoading } = useLoader();

  const [quizzes, setQuizzes] = useState([]);

  const filteredList = useMemo(() => {
    const filteredQuizzes = quizzes.filter((quiz) =>
      quiz.title.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredQuizzes;
  }, [searchText, quizzes]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    setLoading(true);
    QuizService.getAll()
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(loading);

  const renderQuizItem = ({ item }) => (
    <Box style={styles.quizItemContainer} _last={{ borderBottomWidth: 0 }}>
      <Text style={styles.quizTitle}>{item.title}</Text>
      <Text style={styles.quizDescription}>{item.description}</Text>
      <Button
        onPress={() =>
          navigation.navigate("Quiz", { quizId: item.ID, title: item.title })
        }
        size="lg"
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>Start Quiz</Text>
      </Button>
    </Box>
  );

  return (
    <>
      <LoadingWrapper />
      {!loading && filteredList.length > 0 && (
        <FlatList
          data={filteredList}
          renderItem={renderQuizItem}
          keyExtractor={(item) => item.ID.toString()}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
        />
      )}
    </>
  );
};

export default QuestionList;
