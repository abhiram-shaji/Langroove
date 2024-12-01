import { StyleSheet } from "react-native";
import { colors } from "./themes";

export const feedScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary, // Consistent background color
    paddingTop: 20,
  },
  topBar: {
    backgroundColor: colors.background, // Consistent background color
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8, // Add some rounding to the card
  },
  welcomeText: {
    fontSize: 20,
    color: colors.headline, // Headline color for visibility
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80, // Add padding at the end of scrolling
  },
  addButton: {
    backgroundColor: colors.accent, // Accent color for the button
    width: 60, // Match the container height
    height: 60, // Match the container height
    borderRadius: 30, // Half of width/height to keep it circular
    alignItems: "center",
    justifyContent: "center",
  
    // Border properties
    borderWidth: 2, // Adjust the thickness of the border
    borderColor: colors.border, // Border color from theme
  
    // Positioning to the bottom-right corner
    position: "absolute",
    right: 20, // Distance from the right edge of the screen
    bottom: 19, // Distance from the bottom edge of the screen
  
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // Shadow for Android
  },
});

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.secondary, // Consistent background color
    borderBottomWidth: 1,
    borderBottomColor: colors.border, // Border color from theme
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.headline, // Headline color for title
  },
  subtitle: {
    fontSize: 10,
    color: colors.paragraph, // Paragraph color for subtitle
  },
  iconButton: {
    padding: 5,
  },
});

export const topicCardStyles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: colors.background, // Consistent background color
    borderColor: colors.border, // Border color from theme
    borderWidth: 2,
    borderRadius: 8, // Add some rounding to the card
    padding: 12, // Add padding inside the card
  },
  description: {
    fontSize: 16,
    color: colors.paragraph, // Paragraph color for the description
    flexWrap: "wrap",
  },
  viewProfileButton: {
    backgroundColor: colors.accent, // Accent color for the button
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  viewProfileButtonText: {
    color: colors.headline, // Headline color for button text
    fontWeight: "bold",
  },
  ownerNameText: {
    fontSize: 20, // Increase font size for the name
    fontWeight: "600",
    color: colors.headline, // Headline color for the owner's name
  },
});
