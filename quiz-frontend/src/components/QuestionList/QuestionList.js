import React, { useEffect, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, Box, Text } from "native-base";
import quiz from "../../mockData/mockData";
import { globalStyles } from "../../globalStyles";

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
  const filteredList = useMemo(() => {
    const filteredQuizzes = quiz.quizzes.filter((quiz) =>
      quiz.title.includes(searchText)
    );
    return filteredQuizzes;
  }, [searchText]);

  const renderQuizItem = ({ item }) => (
    <Box style={styles.quizItemContainer} _last={{ borderBottomWidth: 0 }}>
      <Text style={styles.quizTitle}>{item.title}</Text>
      <Text style={styles.quizDescription}>{item.description}</Text>
      <Button
        onPress={() =>
          navigation.navigate("Quiz", { quizId: item.id, title: item.title })
        }
        size="lg"
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>Start Quiz</Text>
      </Button>
    </Box>
  );

  return (
    <FlatList
      data={filteredList}
      renderItem={renderQuizItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingVertical: 16 }}
    />
  );
};

export default QuestionList;
