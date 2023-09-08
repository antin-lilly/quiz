import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import QuizScreen from './src/screens/QuizScreen';
import QuizResultScreen from './src/screens/QuizResultScreen';
import { NativeBaseProvider, Box, Text } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/components/screens/HomeScreen/HomeScreen";
import { ImageBackground, StyleSheet } from 'react-native';
import Sprinkle from "./src/assets/Sprinkle1.png";
import { globalStyles } from "./src/globalStyles";

const Stack = createNativeStackNavigator();


const App = () => {
  return (

    <NativeBaseProvider>
      <ImageBackground  style={styles.imageBackground} source={Sprinkle}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Quiz Home" }}
              />
              <Stack.Screen name="Quiz" component={QuizScreen}   initialParams={{ quizId: 1 }}
                  options={{ title: 'Quiz' }} />
            <Stack.Screen name="QuizResult" component={QuizResultScreen} options={{ title: 'Quiz Result' }} />
        </Stack.Navigator>
        </NavigationContainer>
        </ImageBackground>
    </NativeBaseProvider>
  );
}


const styles = StyleSheet.create({

  imageBackground: {
    ...globalStyles.flex1,
    resizeMode: "cover",
  },
});


export default App;

