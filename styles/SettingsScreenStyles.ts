import { StyleSheet } from "react-native";
import { colors } from "./themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Use theme's background color
    padding: 16,
    paddingTop: 30,
  },
  header: {
    paddingTop: 50, // Add padding for safe area
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border, // Use border color from theme
    alignItems: "center", // Center align header content
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.headline, // Use headline color for header text
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 16, // Add spacing for buttons
  },
  buttonContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border, // Use border color from theme
  },
  buttonText: {
    fontSize: 20,
    color: colors.headline, // Use headline color for button text
    fontWeight: "500",
  },
  icon: {
    fontSize: 20,
    color: colors.paragraph, // Use paragraph color for subtle icons
    marginRight: 12,
  },
});
