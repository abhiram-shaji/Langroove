// /styles/FeedScreenStyles.ts

import { StyleSheet } from "react-native";
import { colors } from "./themes";

export const feedScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
  topBar: {
    backgroundColor: colors.background,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    color: colors.text,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 10,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 60, // Set width and height to make it circular
    height: 60, // Same as width to ensure a perfect circle
    borderRadius: 30, // Half of the width/height to make it circular
    alignItems: 'center',
    justifyContent: 'center',
  
    // Positioning to the bottom-right corner
    position: 'absolute',
    right: 20, // Distance from the right edge of the screen
    bottom: 70, // Distance from the bottom edge of the screen

      // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4,

  // Android shadow
  elevation: 5,
  },
});

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  subtitle: {
    fontSize: 10,
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
  description: {
    fontSize: 16,
    color: colors.text,
    flexWrap: "wrap",
  },
});
