// /styles/FeedScreenStyles.ts

import { StyleSheet } from 'react-native';
import { colors } from './themes';

export const feedScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 10,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: 150,
    alignSelf: 'center',
  },
  addButtonText: {
    color: colors.background, // white text on black button
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  iconButton: {
    padding: 5,
  },
});

export const topicCardStyles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
  },
});
