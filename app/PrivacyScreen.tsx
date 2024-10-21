import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { colors } from '../styles/themes'; // Import colors from the global theme

const Privacy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.header}>Privacy Policy</Text>
          <Text style={styles.paragraph}>
            At Langroove, we prioritize your privacy and the secure handling of your data.
            We use Firebase to store user information, including your profile and preferences.
          </Text>
          <Text style={styles.paragraph}>
            While your conversations are not encrypted, we ensure that your data is handled responsibly.
            Messages sent for translation via the LibreTranslate API are processed solely for translation purposes 
            and are not stored or shared.
          </Text>
          <Text style={styles.paragraph}>
            We do not sell or share your personal information with third parties.
            For more information, please see our full privacy policy.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
    marginBottom: 10,
  },
});

export default Privacy;
