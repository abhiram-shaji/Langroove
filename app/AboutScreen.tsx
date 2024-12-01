import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { colors } from '../styles/themes'; // Import colors from the global theme

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.header}>About Langroove</Text>
          <Text style={styles.paragraph}>
            Langroove is an interactive language learning platform designed to connect users through real-time
            conversations and collaborative learning. With text, voice, and group chat options, Langroove enables
            users to practice languages with others in a fun, social environment.
          </Text>
          <Text style={styles.paragraph}>
            Our built-in translation tool, powered by LibreTranslate, allows you to communicate seamlessly with others,
            even if you're not fluent in their language.
          </Text>
          <Text style={styles.paragraph}>
            By storing your data securely with Firebase, we ensure a safe and personalized experience.
            Join Langroove today to enhance your language skills through meaningful interactions!
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.secondary,
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
    color: colors.headline,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.paragraph,
    marginBottom: 10,
  },
});

export default About;
