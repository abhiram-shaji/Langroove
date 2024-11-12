import React from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import ChatListItem from "../components/ChatListItem";
import styles from "../styles/ChatListScreenStyles";
import { useChatList } from "../hooks/useChatList";
import useSearch from "../hooks/useSearch";
import { StackScreenProps } from "@react-navigation/stack"; // Import StackScreenProps
import { RootStackParamList } from "../app/App";

// Define ChatListScreen's props using StackScreenProps
type ChatListScreenProps = StackScreenProps<RootStackParamList, 'ChatListScreen'>;

const ChatListScreen: React.FC<ChatListScreenProps> = () => {
  const chats = useChatList();
  const { search, setSearch, filteredData } = useSearch(chats);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search friends..."
        value={search}
        onChangeText={setSearch}
      />
      <ScrollView>
        {filteredData.length > 0 ? (
          filteredData.map((chat) => (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              name={chat.name}
              avatar={chat.avatar}
              lastMessage={chat.lastMessage}
            />
          ))
        ) : (
          <View style={styles.noChatsContainer}>
            <Text style={styles.noChatsText}>No chats available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ChatListScreen;
