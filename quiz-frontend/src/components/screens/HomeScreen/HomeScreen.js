import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, Box, Text } from "native-base";
import quiz from "../../../mockData/mockData";

const styles = StyleSheet.create({
  quizItemContainer: {
    backgroundColor: "#c2f2fc",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#694fad",
    marginBottom: 10,
  },
  quizDescription: {
    fontSize: 14,
    color: "#694fad",
  },
  startButton: {
    marginTop: 15,
    alignSelf: "flex-end",
    backgroundColor: "#fcc2ec",
  },
  startButtonText: {
    color: "#694fad",
    fontSize: 14,
  },
});

const HomeScreen = ({ navigation }) => {
  const renderQuizItem = ({ item }) => (
    <Box style={styles.quizItemContainer} _last={{ borderBottomWidth: 0 }}>
      <Text style={styles.quizTitle}>{item.title}</Text>
      <Text style={styles.quizDescription}>{item.description}</Text>
      <Button
        onPress={() =>
          navigation.navigate("Quiz", { quizId: item.id, title: item.title })
        }
        style={styles.startButton}
      >
        Start Quiz
      </Button>
    </Box>
  );

  return (
    <FlatList
      data={quiz.quizzes}
      renderItem={renderQuizItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingVertical: 16 }}
    />
  );
};

export default HomeScreen;
