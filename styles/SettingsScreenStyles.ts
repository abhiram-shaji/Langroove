import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // White background like Instagram
    padding: 16,
    paddingTop: 30,
  },
  header: {
    paddingTop: 50, // Add padding for safe area
    paddingBottom: 20,// Light gray background for the header
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6", // Subtle border at the bottom
    alignItems: "center", // Center align header content
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000", // Black text
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
    borderBottomColor: "#e6e6e6", // Light gray divider
  },
  buttonText: {
    fontSize: 20,
    color: "#000", // Black text
    fontWeight: "500",
  },
  icon: {
    fontSize: 20,
    color: "#888", // Gray for subtle icons
    marginRight: 12,
  },
});
