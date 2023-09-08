import React, { useContext } from "react";
import { NativeBaseProvider, Box, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/components/screens/HomeScreen/HomeScreen";
import { LoadingProvider, LoadingContext } from "./src/contexts/LoadingContext";
import Loading from "./src/components/Loading/Loading";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <LoadingProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Quiz Home" }}
            />
            <Stack.Screen name="Quiz" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Loading />
      </LoadingProvider>
    </NativeBaseProvider>
  );
}

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.title}</Text>;
};
