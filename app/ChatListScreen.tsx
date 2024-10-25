import React from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import ChatListItem from "../components/ChatListItem";
import BottomNavBar from "../components/BottomNavBar";
import styles from "../styles/ChatListScreenStyles";
import { useChatList } from "../hooks/useChatList"; // Import the custom hook
import useSearch from "../hooks/useSearch"; // Import the useSearch hook

const ChatListScreen: React.FC = () => {
  const chats = useChatList(); // Use the custom hook to get chats
  const { search, setSearch, filteredData } = useSearch(chats); // Use search hook to filter chats

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search friends..."
        value={search}
        onChangeText={setSearch} // Update search term
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

      {/* Add the BottomNavBar at the bottom */}
      <BottomNavBar />
    </View>
  );
};

export default ChatListScreen;
