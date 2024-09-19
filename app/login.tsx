// login.tsx
import React, { useState } from 'react';
import { Text, View, TextInput,  TouchableOpacity , Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LoginStyles } from './styles/LoginStyles';

interface Credentials {
  username: string;
  password: string;
}

export default function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });

  const router = useRouter();  // Use router for navigation

  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const handleLogin = () => {
    const { username, password } = credentials;

    if (!username || !password) {
      Alert.alert('Error', 'Please fill out both fields');
    } else {
      Alert.alert('Success', `Logged in as ${username}`);
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Langroove</Text>

      <TextInput
        placeholder="Username"
        value={credentials.username}
        onChangeText={(text) => handleInputChange('username', text)}
        style={LoginStyles.input}
      />
      <TextInput
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
        style={LoginStyles.input}
      />
    {/*<Button title="Login" onPress={handleLogin} />
    <Button title="Sign Up" onPress={() => router.push('/signup')} />
    */}  

      {/* Add SignUp Button */}
      <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
        <Text style={LoginStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={LoginStyles.button} onPress={() => router.push('/signup')}>
        <Text style={LoginStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
    </View>
  );
};