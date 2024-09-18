import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { styles } from "./styles/LoginStyles";

interface Credentials {
  username: string;
  password: string;
}

export default function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const handleInputChange = (field: keyof Credentials, value: string) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const handleLogin = () => {
    const { username, password } = credentials;

    if (!username || !password) {
      Alert.alert("Error", "Please fill out both fields");
    } else {
      // Implement login logic here
      Alert.alert("Success", `Logged in as ${username}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        value={credentials.username}
        onChangeText={(text) => handleInputChange("username", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={credentials.password}
        onChangeText={(text) => handleInputChange("password", text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
