// app/EditProfileScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../styles/themes';
import styles from '../styles/EditProfileScreenStyles';

const EditProfileScreen = () => {
  const [name, setName] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [fluentLanguages, setFluentLanguages] = useState<string[]>([]);
  const [learningLanguages, setLearningLanguages] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const bioCharacterLimit = 200;

  const handleSaveProfile = () => {
    console.log({
      name,
      nativeLanguage,
      fluentLanguages,
      learningLanguages,
      bio,
    });
  };

  // Reusable InputField component within the same file
  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.accent}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Edit Profile</Text>

      <InputField
        label="User Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <InputField
        label="Native Language"
        value={nativeLanguage}
        onChangeText={setNativeLanguage}
        placeholder="e.g., English"
      />

      <InputField
        label="Fluent Languages"
        value={fluentLanguages.join(', ')}
        onChangeText={(text) => setFluentLanguages(text.split(',').map((l) => l.trim()))}
        placeholder="Add languages (comma-separated)"
      />

      <InputField
        label="Learning Languages"
        value={learningLanguages.join(', ')}
        onChangeText={(text) => setLearningLanguages(text.split(',').map((l) => l.trim()))}
        placeholder="Add learning languages (comma-separated)"
      />

      <View style={styles.bioSection}>
        <Text style={styles.label}>Personal Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={(text) => {
            if (text.length <= bioCharacterLimit) setBio(text);
          }}
          placeholder="Share something about yourself"
          multiline
        />
        <Text style={styles.charCount}>{bio.length}/{bioCharacterLimit}</Text>
      </View>

      <Button mode="contained" onPress={handleSaveProfile} style={styles.saveButton}>
        Save Profile
      </Button>
    </ScrollView>
  );
};

export default EditProfileScreen;
