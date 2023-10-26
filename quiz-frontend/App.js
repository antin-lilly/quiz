import React, { useContext } from "react";
import { NativeBaseProvider, Box, Text } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/components/screens/HomeScreen/HomeScreen";
import { ImageBackground, StyleSheet } from 'react-native';
import Sprinkle from "./src/assets/Sprinkle1.png";
import { globalStyles } from "./src/globalStyles";
import { LoadingProvider, LoadingContext } from "./src/contexts/LoadingContext";
import Loading from "./src/components/Loading/Loading";
import { NavigationContainer } from "@react-navigation/native";
import QuizScreen from "./src/components/screens/QuizScreen/QuizScreen";
import QuizResultScreen from "./src/components/screens/QuizResultScreen/QuizResultScreen";
import LoginScreen from "./src/components/screens/LoginScreen/Login";
import RegisterScreen from "./src/components/screens/RegisterScreen/Register";

const Stack = createNativeStackNavigator();


const App = () =>
{
  return (
    <NativeBaseProvider>
      <LoadingProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Register" }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Quiz Home" }}
            />
            <Stack.Screen name="Quiz" component={QuizScreen} initialParams={{ quizId: 1 }}
              options={{ title: 'Quiz' }} />
            <Stack.Screen name="QuizResult" component={QuizResultScreen} options={{ title: 'Quiz Result' }} />
          </Stack.Navigator>
        </NavigationContainer>
        <Loading />
      </LoadingProvider>
    </NativeBaseProvider>
  );
}

export default App;

