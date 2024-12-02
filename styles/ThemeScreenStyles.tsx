// ThemeScreenStyles.tsx
import { StyleSheet } from "react-native";
import { colors } from "../styles/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.background,
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  radioOuterSelected: {
    backgroundColor: colors.accent,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    color: colors.paragraph,
    marginLeft: 10,
  },
});
