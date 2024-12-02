import { StyleSheet } from "react-native";
import { colors } from "./themes";

export const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  sentMessageContainer: {
    justifyContent: "flex-end",
  },
  receivedMessageContainer: {
    justifyContent: "flex-start",
  },
  messageWrapper: {
    maxWidth: "80%",
  },
  receivedMessageWrapper: {
    alignItems: "flex-start",
  },
  senderName: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 3,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "100%",
  },
  sentMessage: {
    backgroundColor: colors.accent,
  },
  receivedMessage: {
    backgroundColor: colors.secondary,
  },
  sentMessageText: {
    color: colors.headline,
  },
  receivedMessageText: {
    color: colors.headline,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: colors.accent,
  },
});
