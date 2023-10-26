import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { globalStyles } from '../../../globalStyles';
import AuthService from '../../../services/Auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await AuthService.register({ username, password });
      if (response.status === 200) {
        Alert.alert('User created', 'You may now log in with your credentials.');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Register failed', 'Please ensure you entered valid credentials.');
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
        <TouchableOpacity onPress={handleRegister}>
          <View style={[globalStyles.button, globalStyles.backgroundColorSpecial]}>
            <Text style={[globalStyles.textColorWhite, globalStyles.fontSize20]}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
