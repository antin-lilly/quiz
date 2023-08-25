import React from "react";
import { Button } from "native-base";
import quiz from "../../../mockData/mockData";

const HomeScreen = ({ navigation }) => {
  console.log(quiz);
  return (
    <Button onPress={() => navigation.navigate("Quiz", { name: "Quiz" })}>
      Udji na kviz
    </Button>
  );
};

export default HomeScreen;
