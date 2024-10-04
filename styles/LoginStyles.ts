// YourComponent.js
import { StyleSheet } from "react-native";
import { colors } from "./themes"; 

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
  },
});
