import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './styles/themes'; // Assuming colors are imported from your themes.js

// Dummy data for topics
const topics = [
  { id: 1, title: 'React Native', description: 'Learn about React Native basics.' },
  { id: 2, title: 'Expo', description: 'All about Expo for React Native.' },
  { id: 3, title: 'JavaScript', description: 'Deep dive into JavaScript topics.' },
];

const FeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header with Plus Icon and Profile Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feed</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-circle-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content for Topic Cards */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {topics.map((topic) => (
          <Card key={topic.id} style={styles.card} onPress={() => console.log(`Tapped on ${topic.title}`)}>
            <Card.Title
              title={topic.title}
              subtitle={topic.description}
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  iconButton: {
    padding: 5,
  },
  scrollContainer: {
    padding: 10,
  },
  card: {
    marginVertical: 8,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
  },
});
