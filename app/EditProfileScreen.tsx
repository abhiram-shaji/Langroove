// app/EditProfileScreen.tsx

import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Menu, Provider as PaperProvider } from "react-native-paper";
import styles from "../styles/EditProfileScreenStyles";
import { colors } from "../styles/themes";
import { useEditProfile } from "../hooks/useEditProfile";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const {
    name,
    setName,
    nativeLanguages,
    setNativeLanguages,
    fluentLanguages,
    setFluentLanguages,
    learningLanguages,
    setLearningLanguages,
    bio,
    setBio,
    bioCharacterLimit,
    getFlagUrl,
    nativeLangMenuVisible,
    setNativeLangMenuVisible,
    fluentLangMenuVisible,
    setFluentLangMenuVisible,
    learningLangMenuVisible,
    setLearningLangMenuVisible,
    getAvailableLanguages,
    handleLanguageSelection,
    handleRemoveLanguage,
    saveProfile,
  } = useEditProfile();

  const handleSaveAndNavigate = async () => {
    await saveProfile(); // Wait for save to complete
    navigation.goBack(); // Navigate back to the Profile page
  };

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
    placeholderTextColor?: string; // Add this line
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

  const renderSelectedLanguages = (
    languages: string[],
    removeHandler: (lang: string) => void
  ) => (
    <View style={styles.languageSelectionContainer}>
      {languages.map((lang) => (
        <View key={lang} style={styles.languageItem}>
          <Image source={{ uri: getFlagUrl(lang) }} style={styles.flagIcon} />
          <Text style={{ color: colors.headline }}>{lang}</Text>
          <TouchableOpacity onPress={() => removeHandler(lang)}>
            <Text style={styles.removeText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <PaperProvider>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.header}>Edit Profile</Text>

        <InputField
          label="User Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={colors.paragraph}
        />

        {/* Native Languages Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Native Languages</Text>
          <Menu
            visible={nativeLangMenuVisible}
            onDismiss={() => setNativeLangMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setNativeLangMenuVisible(true)}
              >
                Select Native Languages
              </Button>
            }
          >
            {getAvailableLanguages(nativeLanguages).map((language) => (
              <Menu.Item
                key={language}
                onPress={() =>
                  handleLanguageSelection(
                    language,
                    setNativeLanguages,
                    setNativeLangMenuVisible
                  )
                }
                title={language}
                leadingIcon={() => (
                  <Image
                    source={{ uri: getFlagUrl(language) }}
                    style={styles.flagIcon}
                  />
                )}
              />
            ))}
          </Menu>
          {renderSelectedLanguages(nativeLanguages, (lang) =>
            handleRemoveLanguage(lang, setNativeLanguages)
          )}
        </View>

        {/* Fluent Languages Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Fluent Languages</Text>
          <Menu
            visible={fluentLangMenuVisible}
            onDismiss={() => setFluentLangMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setFluentLangMenuVisible(true)}
              >
                Select Fluent Languages
              </Button>
            }
          >
            {getAvailableLanguages(fluentLanguages).map((language) => (
              <Menu.Item
                key={language}
                onPress={() =>
                  handleLanguageSelection(
                    language,
                    setFluentLanguages,
                    setFluentLangMenuVisible
                  )
                }
                title={language}
                leadingIcon={() => (
                  <Image
                    source={{ uri: getFlagUrl(language) }}
                    style={styles.flagIcon}
                  />
                )}
              />
            ))}
          </Menu>
          {renderSelectedLanguages(fluentLanguages, (lang) =>
            handleRemoveLanguage(lang, setFluentLanguages)
          )}
        </View>

        {/* Learning Languages Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Learning Languages</Text>
          <Menu
            visible={learningLangMenuVisible}
            onDismiss={() => setLearningLangMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setLearningLangMenuVisible(true)}
              >
                Select Learning Languages
              </Button>
            }
          >
            {getAvailableLanguages(learningLanguages).map((language) => (
              <Menu.Item
                key={language}
                onPress={() =>
                  handleLanguageSelection(
                    language,
                    setLearningLanguages,
                    setLearningLangMenuVisible
                  )
                }
                title={language}
                leadingIcon={() => (
                  <Image
                    source={{ uri: getFlagUrl(language) }}
                    style={styles.flagIcon}
                  />
                )}
              />
            ))}
          </Menu>
          {renderSelectedLanguages(learningLanguages, (lang) =>
            handleRemoveLanguage(lang, setLearningLanguages)
          )}
        </View>

        {/* Personal Bio */}
        <View style={styles.bioSection}>
          <Text style={styles.label}>Personal Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={bio}
            onChangeText={(text) => {
              if (text.length <= bioCharacterLimit) setBio(text);
            }}
            placeholderTextColor={colors.paragraph}
            placeholder="Share something about yourself"
            multiline
          />
          <Text style={styles.charCount}>
            {bio.length}/{bioCharacterLimit}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSaveAndNavigate}
          style={styles.saveButton}
        >
          <Text style={{ color: colors.headline }}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </PaperProvider>
  );
};

export default EditProfileScreen;
