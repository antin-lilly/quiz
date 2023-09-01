import React, { useEffect, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, Box, Text } from "native-base";
import quiz from "../../mockData/mockData";

const styles = StyleSheet.create({
  quizItemContainer: {
    backgroundColor: "#fff",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C2732",
    marginBottom: 10,
  },
  quizDescription: {
    fontSize: 16,
    color: "#1C2732",
  },
  startButton: {
    marginTop: 25,
    alignSelf: "flex-end",
    backgroundColor: "#8c6cd0",
    width: "100%",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
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
