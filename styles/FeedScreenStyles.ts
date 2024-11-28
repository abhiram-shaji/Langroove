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
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 20,
    color: colors.text,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80, // Add padding at the end of scrolling
  },
  addButton: {
    backgroundColor: "white",
    width: 60, // Match the container height
    height: 60, // Match the container height
    borderRadius: 30, // Half of width/height to keep it circular
    alignItems: "center",
    justifyContent: "center",
  
    // Border properties
    borderWidth: 2, // Adjust the thickness of the border
    borderColor: "black", // Light gray color for the border
  
    // Positioning to the bottom-right corner
    position: "absolute",
    right: 20, // Distance from the right edge of the screen
    bottom: 19, // Distance from the bottom edge of the screen
  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
    borderWidth: 2,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    flexWrap: "wrap",
  },
  viewProfileButton: {
    backgroundColor: colors.primary, // Blue background color
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  viewProfileButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  ownerNameText: {
    fontSize: 20, // Increase font size for the name
    fontWeight: '600',
  },
});
