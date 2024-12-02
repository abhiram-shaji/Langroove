import { StyleSheet } from "react-native";
import { colors } from "./themes";

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures the ScrollView takes only the required space
    backgroundColor: colors.background, // Consistent background
    alignItems: "center",
  },
  container: {
    padding: 20,
    backgroundColor: colors.background, // Consistent background
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  avatar: {
    marginBottom: 10,
    backgroundColor: colors.buttonBackground, // Use accent color for placeholder avatar background
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarText: {
    color: colors.accent, // Use accent color for change avatar text
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  infoContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: colors.headline, // Use headline color for name
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: colors.paragraph, // Use paragraph color for labels
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 15,
    height: 50,
    backgroundColor: colors.buttonBackground, // Accent color for the button
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: colors.headline, // Headline color for button text
    fontSize: 16,
    fontWeight: "bold",
  },

  bio: {
    fontSize: 16,
    fontStyle: "italic",
    color: colors.paragraph, // Use paragraph color for bio text
    marginBottom: 20,
    textAlign: "center",
  },
  languagesContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: "flex-start", // Align to the left for a horizontal row
    paddingHorizontal: 20,
  },
  languagesLabel: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "left",
    color: colors.headline, // Use headline color for labels
  },
  languagesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  languageCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: colors.secondary, // Use background color for language card
    borderColor: colors.border, // Use border color from theme
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  languageText: {
    fontSize: 16,
    color: colors.headline, // Use headline color for language text
    marginLeft: 5,
  },
  flagIcon: {
    width: 24,
    height: 16,
  },
  languagePlaceholder: {
    fontSize: 16,
    color: colors.paragraph, // Use paragraph color for placeholder text
    textAlign: "center",
    marginVertical: 10,
  },
});
