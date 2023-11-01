import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { globalStyles } from '../../../globalStyles';
import AuthService from '../../../services/Auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('@token', token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await AuthService.login({ username, password });

      if (response.status === 200) {
        const data = response.data;
        storeToken(data.token);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        Alert.alert('Invalid credentials', 'Please check your username and password.');
      }
    }
  };

  return (
    <View style={[globalStyles.flex1, globalStyles.backgroundColorPrimary]}>
      <View style={{ padding: 20 }}>
        <TextInput
          style={[globalStyles.backgroundColorSecondary, globalStyles.textColorPrimary, globalStyles.fontSize16, { padding: 10, marginBottom: 10 }]}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={[globalStyles.backgroundColorSecondary, globalStyles.textColorPrimary, globalStyles.fontSize16, { padding: 10, marginBottom: 20 }]}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity onPress={handleLogin}>
          <View style={[globalStyles.button, globalStyles.backgroundColorSpecial]}>
            <Text style={[globalStyles.textColorWhite, globalStyles.fontSize20]}>Login</Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: 'blue' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
